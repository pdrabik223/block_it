import type { Board, Move } from "./Board.tsx";
import type { Shape } from "./Shape.tsx";


export default function Pointer(board: Board, shapes: Shape[]): Move | null {
    if (shapes.length == 0)
        return null

    let moves = board.getAllPossibleMovesForShapes(shapes)

    if (moves.length == 0)
        return null

    let maxPointers: Move[] = []

    let maxVal = 0;
    for (let move of moves) {

        if (move.shape.points() >= maxVal) maxVal = move.shape.points();
    }

    for (let move of moves) {

        if (move.shape.points() == maxVal)
            maxPointers.push(move)
    }

    return maxPointers[Math.floor(Math.random() * maxPointers.length)]

}