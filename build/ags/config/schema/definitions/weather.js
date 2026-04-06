"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.weatherSchema = exports.SPEED_UNITS = exports.SpeedUnits = exports.TEMP_UNITS = exports.TemperatureUnits = void 0;
var TemperatureUnits;
(function (TemperatureUnits) {
    TemperatureUnits["F"] = "fahrenheit";
    TemperatureUnits["C"] = "celsius";
})(TemperatureUnits || (exports.TemperatureUnits = TemperatureUnits = {}));
exports.TEMP_UNITS = Object.values(TemperatureUnits);
var SpeedUnits;
(function (SpeedUnits) {
    SpeedUnits["MPH"] = "mph";
    SpeedUnits["KPH"] = "kph";
})(SpeedUnits || (exports.SpeedUnits = SpeedUnits = {}));
exports.SPEED_UNITS = Object.values(SpeedUnits);
exports.weatherSchema = {
    name: "weather",
    type: "object",
    description: "Configuration for the menu bar widget.",
    children: [
        {
            name: "latitude",
            type: "string",
            default: "0.0",
            description: "Latitude coordinate for weather location",
        },
        {
            name: "longitude",
            type: "string",
            default: "0.0",
            description: "Longitude coordinate for weather location",
        },
        {
            name: "temperatureUnit",
            type: "enum",
            enumValues: exports.TEMP_UNITS,
            default: TemperatureUnits.F,
            description: "Temperature unit",
        },
        {
            name: "speedUnit",
            type: "enum",
            enumValues: exports.SPEED_UNITS,
            default: SpeedUnits.MPH,
            description: "Speed unit",
        },
    ],
};
