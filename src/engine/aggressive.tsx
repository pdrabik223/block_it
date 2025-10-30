import { Board, type Move } from "./Board.tsx";
import type { ShapeList } from "./ShapeList.tsx";

function coord2d(val: number): [x: number, y: number] {

    let x = Math.floor(val / Board.width);
    let y = val % Board.width;
    return [x, y]
}

function distanceBetweenPoints(pos: number, pos2: number): number {
    let [posX, posY] = coord2d(pos)
    let [pos2X, pos2Y] = coord2d(pos2)

    let distance = Math.pow(posX - pos2X, 2) + Math.pow(posY - pos2Y, 2)
    return distance;
}

export default function Aggressive(board: Board, shapes: ShapeList): Move | null {
    if (shapes.isEmpty())
        return null

    let moves = board.getAllPossibleMovesForShapes(shapes)

    if (moves.length == 0)
        return null


    let centerPosition = Math.floor(Board.width / 2) * Board.width + Math.floor(Board.width / 2)


    let maxDistance = 9999999;

    for (let move of moves) {

        let distance = distanceBetweenPoints(centerPosition, move.position)
        if ((distance - move.shape.points()) <= maxDistance) maxDistance = distance - move.shape.points();
    }

    let maxDistanceMoves: Move[] = []

    for (let move of moves) {
        let distance = distanceBetweenPoints(centerPosition, move.position)
        if ((distance - move.shape.points()) == maxDistance) maxDistanceMoves.push(move)
    }

    return maxDistanceMoves[Math.floor(Math.random() * maxDistanceMoves.length)]
}