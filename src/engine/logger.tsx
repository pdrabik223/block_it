import { DebugLevel, globalSettingsState } from "../App.tsx"

export function logInfo(...data: any[]) {

    if (globalSettingsState.debugLevel == DebugLevel.AllLogs ||
        globalSettingsState.debugLevel == DebugLevel.Engine)
        console.log(data)
}

export function logWarning(...data: any[]) {
    if (globalSettingsState.debugLevel == DebugLevel.AllLogs ||
        globalSettingsState.debugLevel == DebugLevel.Engine)
        console.warn(data)

}

export function logError(...data: any[]) {
    if (globalSettingsState.debugLevel == DebugLevel.AllLogs ||
        globalSettingsState.debugLevel == DebugLevel.Engine ||
        globalSettingsState.debugLevel == DebugLevel.Error)
        console.error(data)
}
