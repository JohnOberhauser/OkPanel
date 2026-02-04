import AstalApps from "gi://AstalApps";
import GioUnix from "gi://GioUnix";
import {nerdFontFuzzyQuery} from "./nerdFontFuzzyQuery";

export function getApp(clientClass: string) {
    const apps = new AstalApps.Apps()
    const applications = apps.fuzzy_query(clientClass)
    if (applications.length > 0) {
        return applications[0]
    } else {
        const splitClass = clientClass.split(".")
        if (splitClass.length > 1) {
            const lastEntry = splitClass[splitClass.length - 1]
            const applications = apps.fuzzy_query(lastEntry)
            if (applications.length > 0) {
                console.log(`found app ${applications[0].name}`)
                return applications[0]
            }
        }
        return null
    }
}

export function getAppGlyph(
    app: AstalApps.Application | null,
) {
    if (app === null) {
        return "󰘔"
    }
    let appName: string = ""
    let appDescription: string = ""
    let appCategories: string = ""
    let appKeywords: string[] = []
    if (app.name !== null) {
        appName = app.name
    }
    if (app.description !== null) {
        appDescription = app.description
    }
    if (app.entry !== null) {
        const appInfo = GioUnix.DesktopAppInfo.new(app.entry)
        const categories = appInfo.get_categories()
        if (categories !== null) {
            appCategories = categories
        }
        const keywords = appInfo.get_keywords()
        if (keywords !== null) {
            appKeywords = keywords
        }
    }

    const result = nerdFontFuzzyQuery(
        {
            primary: [appName],
            secondary: [appDescription, appCategories, ...appKeywords],
        }
    )

    console.log("=================\n"
        + `appName: ${appName}\n`
        + `appDescription: ${appDescription}\n`
        + `appCategories: ${appCategories}\n`
        + `appKeywords: ${appKeywords}\n`
        + `results: \n${result.slice(0, 10).map((it) => `${it.key}\n`)}`
    )

    if (result.length === 0) return "󰘔"
    const cleaned = result[0].value.trim().replace(/^0x/i, "").replace(/^u\+/i, "");
    const codePoint = Number.parseInt(cleaned, 16);

    return String.fromCodePoint(codePoint)
}