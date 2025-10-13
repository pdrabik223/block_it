import { Board, type Move } from "./Board.tsx";
import { Cell } from "./enum_definitions.tsx";
import type { Shape } from "./Shape.tsx";


export default function AntiKiller(board: Board, shapes: Shape[]): Move | null {
    if (shapes.length == 0)
        return null

    let moves = board.getAllPossibleMovesForShapes(shapes)

    if (moves.length == 0)
        return null

    let movesWithEstimation: [estimation: number, move: Move][] = []



    for (let move of moves) {

        let noDeadCells = countDeadCells(board, move);
        let estimation = noDeadCells * -1;
        estimation += (move.shape.points() /10)

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

function countDeadCells(board: Board, move: Move): number {
    let temp_board = new Board(board)
    temp_board.makeMove(move)
    let deadCellsCount = 0;
    let color = move.shape.getColor()

    for (let x = 0; x < Board.height; x++) {
        for (let y = 0; y < Board.width; y++) {
            if (board.get(x, y) == color) {
                let cardinalPositions = [
                    [x, y - 1],
                    [x - 1, y],
                    [x, y + 1],
                    [x + 1, y]
                ]
                for (let pos of cardinalPositions) {
                    if (!board.checkBoundingBoxError(pos[0], pos[1])) {
                        if (board.get(pos[0], pos[1]) == Cell.Empty) deadCellsCount++;
                    }
                }
            }
        }
    }
    return deadCellsCount;
}