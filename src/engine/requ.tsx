import { Board, type Move } from "./Board.tsx";
import { Cell } from "./enum_definitions.tsx";
import { logInfo } from "./logger.tsx";
import { shapeList, type Shape } from "./Shape.tsx";
import { ShapeList } from "./ShapeList.tsx";


const MovesCountWeight = 0.4;
const ShapesCountWeight = -1;


function getShapeWeight(shapes: ShapeList) {
    if (shapes.isEmpty()) return 10000

    return shapes.getPoints()
}


export function Estimation2Player(board: Board, redShapes: ShapeList, blueShapes: ShapeList): [Cell, number][] {




    // TODO cache allPossibleMovesForShapes for given color
    let redMovesCount = 0 // board.getAllPossibleMovesForShapes(redShapes).length * MovesCountWeight
    let blueMovesCount = 0 // board.getAllPossibleMovesForShapes(blueShapes).length * MovesCountWeight

    // sub value of every cell 
    let redPoints = getShapeWeight(redShapes) * ShapesCountWeight
    let bluePoints = getShapeWeight(blueShapes) * ShapesCountWeight


    return [
        [Cell.Red, redMovesCount + redPoints],
        [Cell.Blue, blueMovesCount + bluePoints],
    ]
}



export function Estimation4Player(board: Board, redShapes: ShapeList, blueShapes: ShapeList, greenShapes: ShapeList, orangeShapes: ShapeList): [Cell, number][] {




    // TODO cache allPossibleMovesForShapes for given color
    let redMovesCount = 0 // board.getAllPossibleMovesForShapes(redShapes).length * MovesCountWeight
    let blueMovesCount = 0 // board.getAllPossibleMovesForShapes(blueShapes).length * MovesCountWeight
    let greenMovesCount = 0 // board.getAllPossibleMovesForShapes(greenShapes).length * MovesCountWeight
    let orangeMovesCount = 0 // board.getAllPossibleMovesForShapes(orangeShapes).length * MovesCountWeight

    // sub value of every cell 
    let redPoints = getShapeWeight(redShapes) * ShapesCountWeight
    let bluePoints = getShapeWeight(blueShapes) * ShapesCountWeight
    let greenPoints = getShapeWeight(greenShapes) * ShapesCountWeight
    let orangePoints = getShapeWeight(orangeShapes) * ShapesCountWeight


    return [
        [Cell.Red, redMovesCount + redPoints],
        [Cell.Blue, blueMovesCount + bluePoints],
        [Cell.Green, greenMovesCount + greenPoints],
        [Cell.Orange, orangeMovesCount + orangePoints]]

}

function getEstimationForPlayer(playerMove: Cell, estimations: [Cell, number][]) {
    for (let e of estimations) {
        if (e[0] == playerMove) return e[1]
    }
    throw Error("not implemented")

}

function getNextPlayerColor2Player(playerColor: Cell): Cell {
    switch (playerColor) {
        case Cell.Red:
            return Cell.Blue
        case Cell.Blue:
            return Cell.Red
    }
    throw Error("not implemented")

}

export default function minMax2Player(playerColor: Cell, requDepth: number, board: Board, redShapes: ShapeList, blueShapes: ShapeList): Move | null {

    logInfo(`Depth:${requDepth}`)

    let moves = getMovesForPlayer(playerColor, board, redShapes, blueShapes)
    if (moves.length == 0) return null

    let estimations: number[] = []

    logInfo(`noMoves:${moves.length}`)

    for (let move of moves) {
        let local_board = new Board(board)
        local_board.makeMove(move)
        removeShapeForPlayer(playerColor, move, redShapes, blueShapes)
        estimations.push(reQu2player(requDepth - 1, playerColor, getNextPlayerColor2Player(playerColor), local_board, redShapes, blueShapes))
    }

    return moves[estimations.indexOf(Math.max.apply(null, estimations))]
}

function reQu2player(reQuDepth: number, estimationForPLayer: Cell, playerMove: Cell, board: Board, redShapes: ShapeList, blueShapes: ShapeList): number {

    let estimation = Estimation2Player(board, redShapes, blueShapes)

    if (reQuDepth == 0) return getEstimationForPlayer(playerMove, estimation)

    let moves = getMovesForPlayer(playerMove, board, redShapes, blueShapes)
    if (moves.length == 0) return getEstimationForPlayer(playerMove, estimation)

    let estimations: number[] = []

    logInfo(`depth: ${reQuDepth}, noMoves:${moves.length}`)

    for (let move of moves) {
        let local_board = new Board(board)
        local_board.makeMove(move)
        let shapes = removeShapeForPlayer(playerMove, move, redShapes, blueShapes)
        estimations.push(reQu2player(reQuDepth - 1, estimationForPLayer, getNextPlayerColor2Player(playerMove), local_board, shapes[0], shapes[1]))
    }

    if (estimationForPLayer == playerMove)
        return Math.max.apply(null, estimations)
    else
        return Math.min.apply(null, estimations)
}

function removeShapeForPlayer(playerMove: Cell, move: Move, redShapes: ShapeList, blueShapes: ShapeList): ShapeList[] {


    switch (playerMove) {
        case Cell.Red:
            let playerShapes = new ShapeList(redShapes)
            playerShapes.remove(move.shapeId);
            return [playerShapes, blueShapes]
        case Cell.Blue:
            playerShapes = new ShapeList(blueShapes);
            playerShapes.remove(move.shapeId);
            return [redShapes, playerShapes]
    }
    throw Error("not implemented")

}

function getMovesForPlayer(playerMove: Cell, board: Board, redShapes: ShapeList, blueShapes: ShapeList): Move[] {
    switch (playerMove) {
        case Cell.Red:
            return board.getAllPossibleMovesForShapes(redShapes)

        case Cell.Blue:
            return board.getAllPossibleMovesForShapes(blueShapes)

    }
    return []

}