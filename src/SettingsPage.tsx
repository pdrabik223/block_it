import { IconButton, ButtonState, StateButton } from './components/Button.tsx';
import { TopBanner } from './TopBanner.tsx';
import { DebugLevel, type GlobalState } from './App.tsx';

export interface SettingsPageRef {
    onSettingsClosed: () => void;
    cookies: GlobalState,
    setGlobalState: (newState: GlobalState) => void
}

let closeSettings = <path d="M50.385,50.385c-10.153,10.153-26.616,10.153-36.77,0s-10.153-26.616,0-36.77s26.616-10.153,36.77,0	S60.538,40.231,50.385,50.385z M43.314,40.485L36.243,32l7.071-8.485l-2.828-2.828L32,27.757l-8.485-7.071l-2.828,2.828L27.757,32	l-7.071,8.485l2.828,2.828L32,36.243l8.485,7.071L43.314,40.485z" />


export const SettingsPage: React.FC<SettingsPageRef> = (props: SettingsPageRef) => {

    return <>
        <TopBanner title="Settings"
            following={<IconButton
                width={30}
                height={30}
                svg={closeSettings}
                onClick={props.onSettingsClosed}
                style={{ marginLeft: 'auto', paddingRight: "12px" }} />} />

        <div className="column" style={{ height: "100%" }}>
            <StateButton 
            initialValue={props.cookies.showPositionEvaluation}
            onClick={(v) => {
                props.cookies.showPositionEvaluation = v;
                props.setGlobalState(props.cookies)
            }} buttonStates={[
                new ButtonState('Position evaluation: On', true),
                new ButtonState('Position evaluation: Off', false)
            ]} style={{ width: "300px", margin: "10px auto", }} />
            <StateButton 
                initialValue={props.cookies.showMovesCount}
            onClick={(v) => {
                props.cookies.showMovesCount = v;
                props.setGlobalState(props.cookies)
            }} buttonStates={[
                new ButtonState('Moves count: On', true),
                new ButtonState('Moves count: Off', false)
            ]} style={{ width: "300px", margin: "10px auto", }} />
            <StateButton 
            initialValue={props.cookies.moveDelayMS}
            onClick={(v) => {
                props.cookies.moveDelayMS = v;
                props.setGlobalState(props.cookies)
            }} buttonStates={[
                new ButtonState('Engine move delay: 0.25s', 250),
                new ButtonState('Engine move delay: 0.5s', 500),
                new ButtonState('Engine move delay: 2s', 2000),
                new ButtonState('Engine move delay: 4s', 4000),
            ]} style={{ width: "300px", margin: "10px auto", }} />

            <StateButton 
            initialValue={props.cookies.debugLevel}
            onClick={(v) => {
                props.cookies.debugLevel = v;
                props.setGlobalState(props.cookies)
            }} buttonStates={[
                new ButtonState('Debug level: Off', DebugLevel.Off),
                new ButtonState('Debug level: Engine only', DebugLevel.Engine),
                new ButtonState('Debug level: Full Info', DebugLevel.AllLogs),
                new ButtonState('Debug level: Error only', DebugLevel.Error)
            ]} style={{ width: "300px", margin: "10px auto", }} />

            <p>Version 3.14</p>
            <a onClick={() => window.open("https://github.com/pdrabik223", "_blank")}>Github</a>
        </div>
    </>;

};
