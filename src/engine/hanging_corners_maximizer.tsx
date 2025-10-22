import { Board, type Move } from "./Board.tsx";
import type { Shape } from "./Shape.tsx";


function calculateHangingCorners(board: Board, move: Move): number {
    let temp_board = new Board(board)
    temp_board.makeMove(move)
    return temp_board.getHangingCorners(move.shape.cellColor).length

}

export default function pointer_coroner(board: Board, shapes: Shape[]): Move | null {
    if (shapes.length == 0)
        return null

    let moves = board.getAllPossibleMovesForShapes(shapes)

    if (moves.length == 0)
        return null

    let movesWithEstimation: [estimation: number, move: Move][] = []


    let noHangingCorners = board.getHangingCorners(moves[0].shape.cellColor).length
    for (let move of moves) {

        let haningAfterMove = calculateHangingCorners(board, move);
        let estimation = haningAfterMove - noHangingCorners;
        estimation += (move.shape.points() / 10)
        movesWithEstimation.push([estimation, move])
    }
    estimatedMovesSort(movesWithEstimation)

    let bestMoveEstimation = movesWithEstimation[0][0]
    let bestMoveCutOff = 0

    for (let i = 0; i < movesWithEstimation.length; i++) {
        if (movesWithEstimation[i][0] != bestMoveEstimation) {
            bestMoveCutOff = i; break;
        }

    }

    return movesWithEstimation[Math.floor(Math.random() * bestMoveCutOff)][1]
}

function estimatedMovesSort(data: [number, Move][]) {

    for (let i = 0; i < data.length; i++) {
        for (let j = i; j < data.length; j++) {
            if (data[j][0] > data[i][0]) {
                let temp = data[j]
                data[j] = data[i]
                data[i] = temp
            }
        }
    }
}

export function coroner(board: Board, shapes: Shape[]): Move | null {
    if (shapes.length == 0)
        return null

    let moves = board.getAllPossibleMovesForShapes(shapes)

    if (moves.length == 0)
        return null

    let movesWithEstimation: [estimation: number, move: Move][] = []

    let noHangingCorners = board.getHangingCorners(moves[0].shape.cellColor).length
    for (let move of moves) {

        let haningAfterMove = calculateHangingCorners(board, move);
        let estimation = haningAfterMove - noHangingCorners;
        movesWithEstimation.push([estimation, move])
    }
    estimatedMovesSort(movesWithEstimation)

    let bestMoveEstimation = movesWithEstimation[0][0]
    let bestMoveCutOff = 0

    for (let i = 0; i < movesWithEstimation.length; i++) {
        if (movesWithEstimation[i][0] != bestMoveEstimation) {
            bestMoveCutOff = i; break;
        }

    }

    return movesWithEstimation[Math.floor(Math.random() * bestMoveCutOff)][1]
}