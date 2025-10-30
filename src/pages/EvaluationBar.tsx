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
    const floorToTwo = (num: number) => Math.floor(num * 100) / 100;
    function getEstimation(color: Cell, coverage: number) {
        if (coverage == 0) return null
        for (let val of props.gameStatistics!) {
            if (val[0] == color) return <p style={{
                textAlign: 'center',
                verticalAlign: 'middle',
                display: 'table-cell',
                fontWeight: "bold"
            }}>{floorToTwo(val[1])}</p>
        }
        return null
    }
    function getStats() {

        let states: number[] = [0, 0, 0, 0]
        let sum = 0;
        let minValue = props.gameStatistics![0][1]

        for (let val of props.gameStatistics!) {
            if (val[1] < minValue) minValue = val[1]
        }
        if (minValue < 0)
            minValue = Math.abs(minValue) + 1
        else
            minValue = 0
        for (let val of props.gameStatistics!) {
            sum += val[1] + minValue

            switch (val[0]) {
                case Cell.Red:
                    states[0] = val[1] + minValue
                    break;
                case Cell.Orange:
                    states[3] = val[1] + minValue
                    break;
                case Cell.Green:
                    states[2] = val[1] + minValue
                    break;
                case Cell.Blue:
                    states[1] = val[1] + minValue
                    break;
            }
        }

        for (let i = 0; i < states.length; i++) {
            if (states[i] != 0)
                states[i] = ((states[i] / sum) * 100);
        }

        return states;
    }

    let parsedState = getStats()
    return <Row
        style={{
            marginTop: "2%",
            marginBottom: "2%",
            marginLeft: "5%",
            width: `90%`,
            borderRadius: "4px"
        }}>

        <div style={{
            width: `${parsedState[0]}%`,
            height: "10px",
            backgroundColor: cellRed,
            display: 'table'
        }} >{getEstimation(Cell.Red, parsedState[0])}</div>

        <div style={{
            width: `${parsedState[1]}%`,
            height: "10px",
            backgroundColor: cellBlue,
            display: 'table'
        }} >{getEstimation(Cell.Blue, parsedState[1])}</div>

        <div style={{
            width: `${parsedState[2]}%`,
            height: "10px",
            backgroundColor: cellGreen,
            display: 'table'
        }} >{getEstimation(Cell.Green, parsedState[2])}</div>

        <div style={{
            width: `${parsedState[3]}%`,
            height: "10px",
            backgroundColor: cellOrange,
            display: 'table'
        }} >{getEstimation(Cell.Orange, parsedState[3])}</div>
    </Row>

};
