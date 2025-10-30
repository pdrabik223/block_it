import { Board, type Move } from "./Board.tsx";
import { Cell } from "./enum_definitions.tsx";
import { logInfo } from "./logger.tsx";
import { shapeList, type Shape } from "./Shape.tsx";


const MovesCountWeight = 0.4;
const ShapesCountWeight = -1;


function getShapeWeight(shapes: Shape[]) {
    if (shapes.length == 0) return 10000

    let sum = 0;
    for (let s of shapes) {
        sum += s.points()
    }
    return sum
}


export function Estimation2Player(board: Board, redShapes: Shape[], blueShapes: Shape[]): [Cell, number][] {




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



export function Estimation4Player(board: Board, redShapes: Shape[], blueShapes: Shape[], greenShapes: Shape[], orangeShapes: Shape[]): [Cell, number][] {




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

export default function minMax2Player(playerColor: Cell, requDepth: number, board: Board, redShapes: Shape[], blueShapes: Shape[]): Move | null {

    logInfo(`Depth:${requDepth}`)

    let moves = getMovesForPlayer(playerColor, board, redShapes, blueShapes)
    if (moves.length == 0) return null

    let estimations: number[] = []

    logInfo(`noMoves:${moves.length}`)

    for (let move of moves) {
        let local_board = new Board(board)
        local_board.makeMove(move)
        removeShapeForPlayer(playerColor, move, redShapes, blueShapes)
        estimations.push(requ2player(requDepth - 1, playerColor, getNextPlayerColor2Player(playerColor), local_board, redShapes, blueShapes))
    }

    return moves[estimations.indexOf(Math.max.apply(null, estimations))]
}

function requ2player(requDepth: number, estimationForPLayer: Cell, playerMove: Cell, board: Board, redShapes: Shape[], blueShapes: Shape[]): number {
    logInfo(`Depth:${requDepth} color: ${playerMove}`)


    let estimation = Estimation2Player(board, redShapes, blueShapes)

    if (requDepth == 0) return getEstimationForPlayer(playerMove, estimation)

    let moves = getMovesForPlayer(playerMove, board, redShapes, blueShapes)
    if (moves.length == 0) return getEstimationForPlayer(playerMove, estimation)

    let estimations: number[] = []

    logInfo(`noMoves:${moves.length}`)

    for (let move of moves) {
        let local_board = new Board(board)
        local_board.makeMove(move)
        let shapes = removeShapeForPlayer(playerMove, move, redShapes, blueShapes)
        estimations.push(requ2player(requDepth - 1, estimationForPLayer, getNextPlayerColor2Player(playerMove), local_board, shapes[0], shapes[1]))
    }

    if (estimationForPLayer == playerMove)
        return Math.max.apply(null, estimations)
    else
        return Math.min.apply(null, estimations)
}

function removeShapeForPlayer(playerMove: Cell, move: Move, redShapes: Shape[], blueShapes: Shape[]): Shape[][] {
    let playerShapes: Shape[] = []

    switch (playerMove) {
        case Cell.Red:
            playerShapes = redShapes.slice();
            playerShapes.splice(move.shapeId, 1);
            return [playerShapes, blueShapes]
        case Cell.Blue:
            playerShapes = blueShapes.slice();
            playerShapes.splice(move.shapeId, 1);
            return [redShapes, playerShapes]
    }
    throw Error("not implemented")

}

function getMovesForPlayer(playerMove: Cell, board: Board, redShapes: Shape[], blueShapes: Shape[]): Move[] {
    switch (playerMove) {
        case Cell.Red:
            return board.getAllPossibleMovesForShapes(redShapes)

        case Cell.Blue:
            return board.getAllPossibleMovesForShapes(blueShapes)

    }
    return []

}