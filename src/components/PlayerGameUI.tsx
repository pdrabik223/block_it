import type React from "react";

import { BoardWidget } from "./BoardWidget.tsx";
import { Button } from "./Button.tsx";
import type { JSX } from "react";
import type { Board } from "../engine/Board.tsx";
import type { Shape } from "../engine/Shape.tsx";

export interface PlayerGameUIProps {
    title: JSX.Element,
    onGameAbandonButton: () => void
    onSkipTurnButton: () => void
    onMoveMade: () => void
    board: Board
    highlightedShape?: Shape
    shapeWidgets: JSX.Element
}

export const PlayerGameUI: React.FC<PlayerGameUIProps> = (props: PlayerGameUIProps) => {
    function getButtons() {

        return <div className="abandon_game_button">
            <Button style={{ margin: "1%" }} onClick={props.onGameAbandonButton}> Abandon Game </Button>
            <Button onClick={props.onSkipTurnButton} style={{ margin: "1%" }}> Skip turn </Button>
        </div>;
    }

    return <>
        {props.title}
        {getButtons()}
        <BoardWidget onMoveMade={props.onMoveMade} board={props.board} highlightShape={props.highlightedShape} />
        {props.shapeWidgets}
    </>;
};
