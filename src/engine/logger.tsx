import { globalSettingsState } from "../App.tsx"
import { DebugLevel } from "../GlobalSettings.tsx"

export function logInfo(...data: any[]) {
    if (globalSettingsState.debugLevel == DebugLevel.Error) return
    if (globalSettingsState.debugLevel == DebugLevel.Off) return
    console.log(data)
}

export function logWarning(...data: any[]) {
    if (globalSettingsState.debugLevel == DebugLevel.Error) return
    if (globalSettingsState.debugLevel == DebugLevel.Off) return
    console.warn(data)

}

export function logError(...data: any[]) {
    if (globalSettingsState.debugLevel == DebugLevel.Off) return
    console.error(data)

}
