import {Gtk} from "ags/gtk4"
import {variableConfig} from "../../config/config";
import {SpeedUnits, TemperatureUnits} from "../../config/schema/definitions/weather";
import {createBinding, createComputed, createState, For, Accessor, onCleanup} from "ags";
import {interval} from "ags/time";
import AstalNetwork from "gi://AstalNetwork?version=0.1";
import AstalIO from "gi://AstalIO?version=0.1";
import {fetchJson} from "../utils/networkRequest";

type HourlyWeather = {
    time: Date;
    temperature: number;
    uvIndex: number;
    isDay: number;
    weatherCode: number;
};

type DailyWeather = {
    time: Date;
    weatherCode: number;
    maxTemp: number;
    minTemp: number;
}

type Weather = {
    current: {
        temperature: number | null;
        weatherCode: number | null;
        humidity: number | null;
        windSpeed: number | null;
        isDay: number | null;
        uvIndex: number | null;
    };
    daily: DailyWeather[];
    hourly: HourlyWeather[];
};

const [weather, weatherSetter] = createState<Weather>({
    current: {
        temperature: null,
        weatherCode: null,
        humidity: null,
        windSpeed: null,
        isDay: null,
        uvIndex: null,
    },
    daily: [],
    hourly: [],
});

let lastWeatherUpdate = 0; // in milliseconds
const WEATHER_UPDATE_INTERVAL = 15 * 60 * 1000; // 15 minutes

function updateWeather() {
    const now = Date.now();
    if (now - lastWeatherUpdate < WEATHER_UPDATE_INTERVAL) {
        console.log("Weather update skipped — too soon");
        return;
    }

    lastWeatherUpdate = now;

    const url = "https://api.open-meteo.com/v1/forecast" +
        `?latitude=${variableConfig.weather.latitude.get()}&longitude=${variableConfig.weather.longitude.get()}` +
        "&daily=weather_code,temperature_2m_max,temperature_2m_min" +
        "&hourly=temperature_2m,uv_index,is_day,weather_code" +
        "&current=temperature_2m,uv_index,weather_code,is_day,relative_humidity_2m,wind_speed_10m" +
        "&timezone=GMT" +
        `${variableConfig.weather.speedUnit.get() === SpeedUnits.MPH ? "&wind_speed_unit=mph" : ""}` +
        `${variableConfig.weather.temperatureUnit.get() === TemperatureUnits.F ? "&temperature_unit=fahrenheit" : ""}`;

    console.log("Getting weather...")

    fetchJson(url)
        .then((json) => {
            const toDate = (str: string): Date => new Date(`${str}:00Z`);
            const dailyToDate = (str: string): Date => new Date(`${str}T00:00:00Z`);

            const c = json.current;
            const d = json.daily;
            const h = json.hourly;

            const hourly = h.time.map((_: any, i: number) => ({
                time: toDate(h.time[i]),
                temperature: h.temperature_2m[i],
                uvIndex: h.uv_index[i],
                isDay: h.is_day[i],
                weatherCode: h.weather_code[i],
            }));

            const daily = d.time.map((_: any, i: number) => ({
                time: dailyToDate(d.time[i]),
                weatherCode: d.weather_code[i],
                minTemp: d.temperature_2m_min[i],
                maxTemp: d.temperature_2m_max[i],
            }));

            weatherSetter({
                current: {
                    temperature: c.temperature_2m ?? null,
                    weatherCode: c.weather_code ?? null,
                    humidity: c.relative_humidity_2m ?? null,
                    windSpeed: c.wind_speed_10m ?? null,
                    isDay: c.is_day ?? null,
                    uvIndex: c.uv_index ?? null,
                },
                daily,
                hourly,
            });
        })
        .catch((error) => {
            logError(error);
        })
        .finally(() => {
            console.log("Weather done")
        })
}

export function getWeatherIcon(code: number | null, isDay: boolean = true): string {
    const nf = {
        sun: "",         // nf-weather-day_sunny
        moon: "",        // nf-weather-night_clear
        cloudy: "",      // nf-weather-cloud
        partlyCloudyDay: "", // nf-weather-day_cloudy
        partlyCloudyNight: "", // nf-weather-night_alt_cloudy
        overcast: "",    // nf-weather-cloudy
        fog: "",         // nf-weather-fog
        drizzle: "",     // nf-weather-showers
        rain: "",        // nf-weather-rain
        thunderstorm: "", // nf-weather-storm_showers
        snow: "",        // nf-weather-snow
        sleet: "",       // nf-weather-sleet
        unknown: "",     // nf-weather-na
    };

    switch (code) {
        case 0:
            return isDay ? nf.sun : nf.moon;
        case 1:
        case 2:
            return isDay ? nf.partlyCloudyDay : nf.partlyCloudyNight;
        case 3:
            return nf.overcast;
        case 45:
        case 48:
            return nf.fog;
        case 51:
        case 53:
        case 55:
            return nf.drizzle;
        case 56:
        case 57:
            return nf.sleet;
        case 61:
        case 63:
        case 65:
            return nf.rain;
        case 66:
        case 67:
            return nf.sleet;
        case 71:
        case 73:
        case 75:
        case 77:
            return nf.snow;
        case 80:
        case 81:
        case 82:
            return nf.rain;
        case 85:
        case 86:
            return nf.snow;
        case 95:
        case 96:
        case 99:
            return nf.thunderstorm;
        default:
            return nf.unknown;
    }
}

let updateIntervalBinding: Accessor | null = null
let network = AstalNetwork.get_default()
let updateInterval: AstalIO.Time | null = null

function setupUpdateInterval() {
    if (updateIntervalBinding !== null) {
        return
    }

    updateIntervalBinding = createBinding(network, "connectivity")
    const unsub = updateIntervalBinding.subscribe(() => {
        if (updateInterval !== null) {
            updateInterval.cancel()
            updateInterval = null
        }
        if (network.connectivity === AstalNetwork.Connectivity.FULL) {
            updateInterval = interval(WEATHER_UPDATE_INTERVAL, () => {
                updateWeather()
            })
            return;
        }
    })
    onCleanup(unsub)

    if (network.connectivity === AstalNetwork.Connectivity.FULL) {
        updateInterval = interval(WEATHER_UPDATE_INTERVAL, () => {
            updateWeather()
        })
        return;
    }
}

export default function() {
    setupUpdateInterval()

    const hourlyWeather = createComputed([
        weather
    ], (weather) => {
        const now = new Date()
        return weather.hourly
            .filter((h) => h.time >= now)
            .slice(0, 4)
    })

    const dailyWeather = createComputed([
        weather
    ], (weather) => {
        return weather.daily.slice(0, 4)
    })

    return <box
        orientation={Gtk.Orientation.VERTICAL}
        spacing={10}>
        <label
            cssClasses={["labelXL"]}
            label={weather.as((weather) => {
                const code = weather?.current?.weatherCode;
                const isDay = weather?.current?.isDay;
                const temp = weather?.current?.temperature;
                const unit = variableConfig.weather.temperatureUnit.asAccessor().get();

                if (code == null || isDay == null || temp == null) {
                    return "N/A";
                }

                const icon = getWeatherIcon(code, isDay === 1);
                return `${icon}  ${temp}${unit === TemperatureUnits.F ? "F" : "C"}`;
            })}/>
        <box
            halign={Gtk.Align.CENTER}
            spacing={30}
            orientation={Gtk.Orientation.HORIZONTAL}>
            <box
                orientation={Gtk.Orientation.VERTICAL}>
                <label
                    cssClasses={["labelMedium"]}
                    label={weather.as((weather) => {
                        const humidity = weather?.current?.humidity;
                        return humidity != null ? `  ${humidity}%` : "N/A";
                    })}
                />
                <label
                    cssClasses={["labelSmall"]}
                    label="Humidity"/>
            </box>

            <box
                orientation={Gtk.Orientation.VERTICAL}>
                <label
                    cssClasses={["labelMedium"]}
                    label={weather.as((weather) => {
                        const uv = weather?.current?.uvIndex;
                        return uv != null ? `󱩅 ${uv}` : "N/A";
                    })}
                />
                <label
                    cssClasses={["labelSmall"]}
                    label="UV index"/>
            </box>
            <box
                orientation={Gtk.Orientation.VERTICAL}>
                <label
                    cssClasses={["labelMedium"]}
                    label={weather.as((weather) => {
                        const wind = weather?.current?.windSpeed;
                        const unit = variableConfig.weather.speedUnit.get() === SpeedUnits.MPH ? "m/h" : "k/h";
                        return wind != null ? `  ${wind} ${unit}` : "N/A";
                    })}
                />
                <label
                    cssClasses={["labelSmall"]}
                    label="Wind speed"/>
            </box>
        </box>
        <label
            marginTop={20}
            label="Hourly"
            cssClasses={["labelLargeBold"]}/>
        <box
            orientation={Gtk.Orientation.HORIZONTAL}
            halign={Gtk.Align.CENTER}
            spacing={30}>
            <For each={hourlyWeather}>
                {(hourly) => {
                    return <box
                        orientation={Gtk.Orientation.VERTICAL}>
                        <label
                            cssClasses={["labelSmall"]}
                            label={variableConfig.clockFormat24h.asAccessor().as((format24h) => {
                                return hourly.time.toLocaleTimeString([], { hour: 'numeric', hour12: !format24h })
                            })}/>
                        <label
                            cssClasses={["labelLarge"]}
                            label={getWeatherIcon(hourly.weatherCode, hourly.isDay === 1)}/>
                        <label
                            cssClasses={["labelSmall"]}
                            label={
                                hourly.temperature != null
                                    ? `${hourly.temperature}${variableConfig.weather.temperatureUnit.get() === TemperatureUnits.F ? "F" : "C"}`
                                    : "N/A"
                            }
                        />
                        <label
                            cssClasses={["labelSmall"]}
                            label={
                                hourly.uvIndex != null
                                    ? `󱩅 ${hourly.uvIndex}`
                                    : "N/A"
                            }
                        />
                    </box>
                }}
            </For>
        </box>
        <label
            marginTop={20}
            label="Daily"
            cssClasses={["labelLargeBold"]}/>
        <box
            orientation={Gtk.Orientation.HORIZONTAL}
            halign={Gtk.Align.CENTER}
            spacing={30}>
            <For each={dailyWeather}>
                {(daily) => {
                    return <box
                        orientation={Gtk.Orientation.VERTICAL}>
                        <label
                            cssClasses={["labelSmall"]}
                            label={daily.time.toLocaleDateString([], { weekday: 'short', timeZone: 'UTC' })}/>
                        <label
                            cssClasses={["labelLarge"]}
                            label={getWeatherIcon(daily.weatherCode, true)}/>
                        <label
                            cssClasses={["labelSmall"]}
                            label={
                                daily.maxTemp != null
                                    ? `${daily.maxTemp}${variableConfig.weather.temperatureUnit.get() === TemperatureUnits.F ? "F" : "C"}`
                                    : "N/A"
                            }
                        />
                        <label
                            cssClasses={["labelSmall"]}
                            label={
                                daily.minTemp != null
                                    ? `${daily.minTemp}${variableConfig.weather.temperatureUnit.get() === TemperatureUnits.F ? "F" : "C"}`
                                    : "N/A"
                            }
                        />
                    </box>
                }}
            </For>
        </box>
    </box>
}
