import type React from "react";
import { globalSettingsState } from "../App.tsx";
import { Cell, cellBlue, cellGreen, cellOrange, cellRed } from "../engine/enum_definitions.tsx";
import { Row } from "../components/Row.tsx";


export interface EvaluationBarProps {
    gameStatistics?: [color: Cell, estimation: number][]
}

export const EvaluationBar: React.FC<EvaluationBarProps> = (props: EvaluationBarProps) => {
    if (!globalSettingsState.showPositionEvaluation || props.gameStatistics == undefined)
        return <></>;

    function getStats() {

        let states: number[] = [0, 0, 0, 0]
        let sum = 0;
        for (let val of props.gameStatistics!) {
            sum += val[1]
            switch (val[0]) {
                case Cell.Red:
                    states[0] = val[1]
                    break;
                case Cell.Orange:
                    states[3] = val[1]
                    break;
                case Cell.Green:
                    states[2] = val[1]
                    break;
                case Cell.Blue:
                    states[1] = val[1]
                    break;
            }
        }

        for (let i = 0; i < states.length; i++) {
            if (states[i] != 0)
                states[i] = 100 - ((states[i] / sum) * 100);
        }

        return states;
    }

    let parsedState = getStats()
    return <Row
        style={{
            marginTop: "2%",
            marginBottom: "2%",
            marginLeft: "5%",
            width: "90%",
            borderRadius: "4px"
        }}>

        <div style={{
            width: `${parsedState[0]}%`,
            height: "10px",
            backgroundColor: cellRed,
        }} />

        <div style={{
            width: `${parsedState[1]}%`,
            height: "10px",
            backgroundColor: cellBlue,
        }} />

        <div style={{
            width: `${parsedState[2]}%`,
            height: "10px",
            backgroundColor: cellGreen,
        }} />

        <div style={{
            width: `${parsedState[3]}%`,
            height: "10px",
            backgroundColor: cellOrange,
        }} />
    </Row>

};
