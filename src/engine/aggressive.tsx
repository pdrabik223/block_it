import { Board, type Move } from "./Board.tsx";
import { Cell } from "./enum_definitions.tsx";
import type { Shape } from "./Shape.tsx";

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
export default function Aggressive(board: Board, shapes: Shape[]): Move | null {
    if (shapes.length == 0)
        return null

    let moves = board.getAllPossibleMovesForShapes(shapes)

    if (moves.length == 0)
        return null


    let color = moves[0].shape.getColor()

    let originPosition = 0;
    switch (color) {
        case Cell.Red:
            originPosition = 0;
            break;
        case Cell.Orange:
            originPosition = (Board.height - 1) * Board.width;
            break;
        case Cell.Green:
            originPosition = (Board.height - 1) * Board.width + (Board.width - 1);
            break;
        case Cell.Blue:
            originPosition = Board.width - 1;
            break;

    }

    let maxDistance = 0;
    
    for (let move of moves) {
        
        let distance = distanceBetweenPoints(originPosition, move.position)
        if (distance >= maxDistance) maxDistance = distance;
    }
    
    let maxDistanceMoves: Move[] = []
    for (let move of moves) {
        let distance = distanceBetweenPoints(originPosition, move.position)
        if (distance == maxDistance) maxDistanceMoves.push(move)
    }

    return maxDistanceMoves[Math.floor(Math.random() * maxDistanceMoves.length)]
}