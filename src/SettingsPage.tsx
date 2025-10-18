import { IconButton, ButtonState, StateButton } from './components/Button.tsx';
import { TopBanner } from './TopBanner.tsx';
import { CellStyle, DebugLevel, type GlobalState } from './App.tsx';
import { IoCloseCircleSharp } from "react-icons/io5";
import { Column } from './components/Column.tsx';

export interface SettingsPageRef {
    onSettingsClosed: () => void;
    cookies: GlobalState,
    setGlobalState: (newState: GlobalState) => void
}


export const SettingsPage: React.FC<SettingsPageRef> = (props: SettingsPageRef) => {

    return <>
        <TopBanner title="Settings"
            following={<IconButton
                onClick={props.onSettingsClosed}
                style={{ marginLeft: 'auto', paddingRight: "12px" }}><IoCloseCircleSharp size="50px" /></IconButton>} />

        <Column expanded={true}>
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
                initialValue={props.cookies.condenseShapes}
                onClick={(v) => {
                    props.cookies.condenseShapes = v;
                    props.setGlobalState(props.cookies)
                }} buttonStates={[
                    new ButtonState('Condense Shapes: On', true),
                    new ButtonState('Condense Shapes: Off', false)
                ]} style={{ width: "300px", margin: "10px auto", }} />
            <StateButton
                initialValue={props.cookies.cellStyle}
                onClick={(v) => {
                    props.cookies.cellStyle = v;
                    props.setGlobalState(props.cookies)
                }} buttonStates={[
                    new ButtonState('Cell Style: Classic', CellStyle.Classic),
                    new ButtonState('Cell Style: Simple', CellStyle.Simple),
                    new ButtonState('Cell Style: 3D', CellStyle.Fake3D),
                    new ButtonState('Cell Style: Diamond', CellStyle.Diamond)

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
                    new ButtonState('Engine move delay: 0.1s', 100),
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

            <p>Version 0.1.2</p>
            <a onClick={() => window.open("https://github.com/pdrabik223", "_blank")}>Github</a>
        </Column>
    </>;

};
