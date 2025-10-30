import type { Board, Move } from "./Board.tsx";
import type { Shape } from "./Shape.tsx";
import type { ShapeList } from "./ShapeList.tsx";

export default function Randy(board: Board, shapes: ShapeList): Move | null {
    if (shapes.length() == 0)
        return null

    let moves = board.getAllPossibleMovesForShapes(shapes)

    if (moves.length == 0) return null;
    return moves[Math.floor(Math.random() * moves.length)]

}