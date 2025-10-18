import type React from "react";
import { globalSettingsState } from "../App.tsx";
import { Column } from "../components/Column.tsx";
import { Row } from "../components/Row.tsx";
import { type Cell, getColor } from "../engine/enum_definitions.tsx";
import type { JSX } from "react";

export interface TitleGroupProps {
    title: JSX.Element,
    buttons: JSX.Element,
    gameStatistics?: [color: Cell, noShapes: number, noPoints: number][]
}


export const TitleGroup: React.FC<TitleGroupProps> = (props: TitleGroupProps) => {

    if (!globalSettingsState.showMovesCount || props.gameStatistics == undefined)
        return <div>
            {props.title}
            {props.buttons}
        </div>;

    function getText(color: Cell, noShapes: number, noPoints: number) {

        return <h2 style={{ color: getColor(color) }}>S:{noShapes} P:{noPoints}</h2>;
    }

    return <Row expanded={true}>
        <Column>
            <div style={{ paddingTop: "40px" }}></div>
            {getText(props.gameStatistics[0][0], props.gameStatistics[0][1], props.gameStatistics[0][2])}
            {props.gameStatistics.length == 4 ? getText(props.gameStatistics[3][0], props.gameStatistics[3][1], props.gameStatistics[3][2]) : null}
        </Column>

        <Column>
            {props.title}
            {props.buttons}
        </Column>
        <Column>
            <div style={{ paddingTop: "40px" }}></div>
            {getText(props.gameStatistics[1][0], props.gameStatistics[1][1], props.gameStatistics[1][2])}
            {props.gameStatistics.length == 4 ? getText(props.gameStatistics[2][0], props.gameStatistics[2][1], props.gameStatistics[2][2]) : null}
        </Column></Row>;
};
