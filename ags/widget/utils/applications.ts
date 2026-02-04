import AstalApps from "gi://AstalApps";
import GioUnix from "gi://GioUnix";
import {nerdFontFuzzyQuery} from "./nerdFontFuzzyQuery";
import {variableConfig} from "../../config/config";
import {Accessor} from "ags";

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

export type AppGlyph = { glyph: string; offset: number };

const glyphCache: Map<string, AppGlyph> = new Map()

export function getAppGlyph(
    app: AstalApps.Application | null,
): Accessor<AppGlyph> {
    return variableConfig.applicationIcons.glyphOverride.asAccessor().as((overrideList) => {
        if (app === null) {
            return {
                glyph: "󰘔",
                offset: 0,
            }
        }
        for (const override of overrideList) {
            if (app.name.toLowerCase().includes(override.appName.toLowerCase())) {
                return {
                    glyph: override.glyph,
                    offset: override.offset
                }
            }
        }

        const cachedValue = glyphCache.get(app.name)
        if (cachedValue !== undefined) {
            return cachedValue
        }

        return loadGlyph(app)
    })
}

function loadGlyph(
    app: AstalApps.Application
): AppGlyph {
    let appName: string = ""
    let appDescription: string = ""
    let appCategories: string = ""
    let appKeywords: string[] = []
    let appIcon: string = ""
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
        if (app.iconName !== null) {
            appIcon = app.iconName
        }
    }

    const result = nerdFontFuzzyQuery(
        {
            primary: [appName],
            secondary: [appDescription, appCategories, ...appKeywords, appIcon],
        }
    )

    // console.log("=================\n"
    //     + `appName: ${appName}\n`
    //     + `appDescription: ${appDescription}\n`
    //     + `appCategories: ${appCategories}\n`
    //     + `appKeywords: ${appKeywords}\n`
    //     + `appIcon: ${appIcon}\n`
    //     + `results: \n${result.slice(0, 10).map((it) => `${it.key}\n`)}`
    // )

    if (result.length === 0) {
        const appGlyph = {
            glyph: "󰘔",
            offset: 0,
        }
        glyphCache.set(
            app.name,
            appGlyph,
        )
        return appGlyph
    }
    const cleaned = result[0].value.trim().replace(/^0x/i, "").replace(/^u\+/i, "");
    const codePoint = Number.parseInt(cleaned, 16);

    const appGlyph = {
        glyph: String.fromCodePoint(codePoint),
        offset: 0,
    }
    glyphCache.set(
        app.name,
        appGlyph,
    )
    return appGlyph
}

export function populateGlyphCache() {
    new AstalApps.Apps().list.forEach((app) => {
        loadGlyph(app)
    })
}
