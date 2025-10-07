import React, { useState, type JSX } from "react";
import { v4 as uuidv4 } from 'uuid';
import { Board, Cell } from "../engine/Board.tsx";
import { Shape, Shapes } from "../engine/Shape.tsx";
import { ShapeWidget } from "./ShapeWidget.tsx";
import { BoardWidget } from "./BoardWidget.tsx";

import './BoardEditWidget.css'
import { FullScreenOverlay } from "./FullScreenOverlay.tsx";


interface SelectableShapeProps {
    children: React.ReactNode,
    onPress: (v: number) => void,
    isSelected: boolean,
    shapeId: number
}

export const SelectableShape: React.FC<SelectableShapeProps> = (props: SelectableShapeProps) => {

    let class_name: string = props.isSelected ? "brightness(1)" : "brightness(0.6)"

    return <div
        style={{ filter: class_name }}
        className='selectable_shape'
        key={uuidv4()}
        onClick={() => {
            props.onPress(props.shapeId);
        }}>
        {props.children}
    </div>
}

interface BoardEditWidgetProps {
    board: Board;
    shapes: Shape[];
    onMoveMade: (id: number) => void;
}

export const BoardEditWidget: React.FC<BoardEditWidgetProps> = (props: BoardEditWidgetProps) => {
    const [selected, setSelected] = useState(-1)
    const [reDrawWidget, setReDrawWidget] = useState(false)

    return <>
        <BoardWidget onMoveMade={() => props.onMoveMade(selected)} refreshShapes={() => setReDrawWidget(!reDrawWidget)} board={props.board} highlightShape={(selected != -1) ? props.shapes[selected] : undefined} />
        <div className='row' style={{ flexWrap: 'wrap' }}>
            {props.shapes.map((object, i) =>
                <SelectableShape onPress={(id) => { setSelected(id) }} shapeId={i} isSelected={(selected == i)}>
                    <ShapeWidget shape={object} />
                </SelectableShape>)}
        </div>
    </>
}

interface GameLoopProps {
    // must be the same length as colors
    playerNames: string[]
    returnToMainMenu: () => void
    // Assuming colors are ordered correctly Cell.Red, Cell.Blue, Cell.Green, Cell.Yellow
    // colors: Cell[]
}

function initShapeList(cell: Cell) {
    return [
        new Shape(Shapes.Dot, cell),
        new Shape(Shapes.Tuple, cell),
        new Shape(Shapes.Triple, cell),
        new Shape(Shapes.Square, cell),
        new Shape(Shapes.TripleLine, cell),
        new Shape(Shapes.Cross, cell),
        new Shape(Shapes.TripleT, cell),
        new Shape(Shapes.BigTripleT, cell),
        new Shape(Shapes.TripleC, cell),
        new Shape(Shapes.Bolt, cell),
        new Shape(Shapes.TripleL, cell),
        new Shape(Shapes.BigTripleL, cell),
        new Shape(Shapes.TripleP, cell),
        new Shape(Shapes.OffsetCross, cell),
        new Shape(Shapes.Snake, cell),
        new Shape(Shapes.TripleW, cell),
        new Shape(Shapes.QuadrupleLine, cell),
        new Shape(Shapes.QuadrupleL, cell),
        new Shape(Shapes.QuadrupleOffsetL, cell),
        new Shape(Shapes.QuadrupleBolt, cell),
        new Shape(Shapes.PentaLine, cell)


    ]
}

function checkIfPLayerWon(shapes: Shape[][]) {
    for (var color = 0; color < shapes.length; color++) {
        if (shapes[color].length == 0) return color;
    }
    return null;
}

export const GameLoop: React.FC<GameLoopProps> = (props: GameLoopProps) => {


    const [gameIteration, setGameIteration] = useState(0);
    const [board, setBoard] = useState(new Board());
    const [shapes, setShapes] = useState(() => {
        return [(initShapeList(Cell.Red)),
        (initShapeList(Cell.Blue)),
        (initShapeList(Cell.Green)),
        (initShapeList(Cell.Orange))]
    });

    let noPlayers = 4;


    let playerWon = checkIfPLayerWon(shapes)



    return <>
        {(playerWon != null && gameIteration % noPlayers == 0) ? null : <h2>{props.playerNames[gameIteration % noPlayers]}</h2>}
        <BoardEditWidget onMoveMade={(id: number) => { shapes[gameIteration % noPlayers].splice(id, 1); setGameIteration(gameIteration + 1); }} board={board} shapes={shapes[gameIteration % noPlayers]}></BoardEditWidget>
        <FullScreenOverlay show={playerWon != null && gameIteration % noPlayers == 0}>

            <ScoreBoard returnToMainMenu={props.returnToMainMenu} shapes={shapes} playerNames={props.playerNames}></ScoreBoard>
        </FullScreenOverlay>
    </>
}


export interface ScoreBoardProps {
    shapes: Shape[][];
    playerNames: string[];
    returnToMainMenu: () => void
}

export const ScoreBoard: React.FC<ScoreBoardProps> = (props: ScoreBoardProps) => {

    let scoreBoard = new Map<string, number>()
    for (let shapeId = 0; shapeId < props.playerNames.length; shapeId++) {
        let total = 0;
        for (let shape of props.shapes[shapeId]) {
            total += shape.points();
        }
        scoreBoard.set(props.playerNames[shapeId], total)
    }
    scoreBoard = new Map([...scoreBoard.entries()].sort());


    let column: JSX.Element[] = []



    for (let player of scoreBoard) {

        column.push(
            <div className='row'>
                <h2>{player[0]}</h2>
                <h2>{player[1]}</h2>
            </div>
        )

    }

    return <div>
        <h1>Game Over!</h1>
        <div className="column" style={{ justifyContent: 'center' }}>
            {column}
        </div>
        <button onClick={props.returnToMainMenu}>Main menu</button>
    </div>;
};

