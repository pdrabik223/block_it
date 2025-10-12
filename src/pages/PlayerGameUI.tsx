import type React from "react";

import type { JSX } from "react";
import type { Board } from "../engine/Board.tsx";
import type { Shape } from "../engine/Shape.tsx";
import { Button } from "../components/Button.tsx";
import { BoardWidget } from "../components/BoardWidget.tsx";

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
        {props.title}
        {getButtons()}
        <BoardWidget onShapeCancel={props.onShapeCancel} onMoveMade={props.onMoveMade} board={props.board} highlightShape={props.highlightedShape} />
        {props.shapeWidgets}
    </>;
};


