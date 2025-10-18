import type React from "react";

import type { JSX } from "react";
import type { Board } from "../engine/Board.tsx";
import type { Shape } from "../engine/Shape.tsx";
import { Button } from "../components/Button.tsx";
import { BoardWidget } from "../components/BoardWidget.tsx";
import { type Cell } from "../engine/enum_definitions.tsx";
import { TitleGroup } from "./TitleGroup.tsx";
import { EvaluationBar } from "./EvaluationBar.tsx";

export interface PlayerGameUIProps {
    title: JSX.Element,
    onGameAbandonButton: () => void
    onSkipTurnButton: () => void
    onMoveMade: () => void
    onShapeCancel?: () => void
    onEndGame: () => void
    board: Board
    highlightedShape?: Shape
    shapeWidgets: JSX.Element
    gameStatistics?: [color: Cell, noShapes: number, noPoints: number][]
    gameEvaluation?: [color: Cell, estimation: number][]
}

export const PlayerGameUI: React.FC<PlayerGameUIProps> = (props: PlayerGameUIProps) => {
    function getButtons() {

        return <div className="abandon_game_button">
            <Button onClick={props.onSkipTurnButton} style={{ margin: "1%" }}> Skip turn </Button>
            <Button style={{ margin: "1%" }} onClick={props.onGameAbandonButton}> Abandon Game </Button>
            <Button onClick={props.onEndGame} style={{ margin: "1%" }}> End Game </Button>
        </div>;
    }

    return <>
        <TitleGroup gameStatistics={props.gameStatistics} title={props.title} buttons={getButtons()}></TitleGroup>
        <EvaluationBar gameStatistics={props.gameEvaluation}></EvaluationBar>
        <BoardWidget onShapeCancel={props.onShapeCancel} onMoveMade={props.onMoveMade} board={props.board} highlightShape={props.highlightedShape} />
        {props.shapeWidgets}
    </>;
};
