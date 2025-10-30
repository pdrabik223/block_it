import React, { type JSX } from "react";
import { Button } from "./Button.tsx";
import { Column } from "./Column.tsx";
import { Row } from "./Row.tsx";
import { cellBlue, cellGreen, cellOrange, cellRed } from "../engine/enum_definitions.tsx";
import type { ShapeList } from "../engine/ShapeList.tsx";

export interface ScoreBoardProps {
    shapes: ShapeList[];
    playerNames: string[];
    returnToMainMenu: () => void
    tryAgain: () => void
}

export class PlayerResultInfo {
    name: string
    points: number
    color: string
    constructor(name: string,
        points: number,
        color: string) {

        this.name = name
        this.points = points
        this.color = color
    }
}
export function sortPlayerResultInfo(data: PlayerResultInfo[]) {

    for (let i = 0; i < data.length; i++) {
        for (let j = i; j < data.length; j++) {
            if (data[j].points < data[i].points) {
                let temp = data[j]
                data[j] = data[i]
                data[i] = temp
            }
        }
    }
}

export const ScoreBoard: React.FC<ScoreBoardProps> = (props: ScoreBoardProps) => {

    let scoreBoard = new Array<PlayerResultInfo>();
    let textColors = [cellRed, cellBlue, cellGreen, cellOrange];

    let points_placed = 0

    for (let playerID = 0; playerID < props.playerNames.length; playerID++) {

        var total = 0;

        for (let i = 0; i < props.shapes[playerID].length(); i++) {
            total += props.shapes[playerID].get(i).points();
        }
        points_placed += total
        scoreBoard.push(new PlayerResultInfo(props.playerNames[playerID], total, textColors[playerID]));
    }
    sortPlayerResultInfo(scoreBoard);

    let column: JSX.Element[] = [];

    for (let player of scoreBoard) {

        column.push(
            <Row>
                <h2 style={{ backgroundColor: "transparent", color: player.color }}>{player.name}</h2>
                <h2 style={{ width: "4rem", backgroundColor: "transparent", color: player.color }} >{player.points}</h2>
            </Row>
        );

    }

    function getBoardFillPercentage() {
        return Math.floor((((89 * 4) - points_placed) / 400) * 100)
    }
    return <Column expanded={true} >
        <div>
            <h1>Game Over!</h1>
            <Column>
                {column}
            </Column>
            <h2> Total board fill: {getBoardFillPercentage()} %</h2>
            <Button style={{ margin: "4px" }} onClick={props.returnToMainMenu}>Main menu</Button>
            <Button style={{ margin: "4px" }} onClick={props.tryAgain}>Try Again</Button>
        </div>
    </Column>

};
