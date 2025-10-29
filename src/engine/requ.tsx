import type { Board, Move } from "./Board.tsx";
import { Cell } from "./enum_definitions.tsx";
import type { Shape } from "./Shape.tsx";


const MovesCountWeight = 0.4;
const ShapesCountWeight = -1;


function getShapeWeight(shapes: Shape[]) {
    let sum = 0;
    for (let s of shapes) {
        sum += s.points()
    }
    return sum
}


export function Estimation(board: Board, redShapes: Shape[], blueShapes: Shape[], greenShapes: Shape[], orangeShapes: Shape[]): [Cell, number][] {

    // TODO cache allPossibleMovesForShapes for given color
    let redMovesCount = board.getAllPossibleMovesForShapes(redShapes).length * MovesCountWeight
    let blueMovesCount = board.getAllPossibleMovesForShapes(blueShapes).length * MovesCountWeight
    let greenMovesCount = board.getAllPossibleMovesForShapes(greenShapes).length * MovesCountWeight
    let orangeMovesCount = board.getAllPossibleMovesForShapes(orangeShapes).length * MovesCountWeight

    // sub value of every cell 
    let redPoints = getShapeWeight(redShapes) * ShapesCountWeight
    let bluePoints = getShapeWeight(blueShapes) * ShapesCountWeight
    let greenPoints = getShapeWeight(greenShapes) * ShapesCountWeight
    let orangePoints = getShapeWeight(orangeShapes) * ShapesCountWeight


    return [[Cell.Red, redMovesCount + redPoints],
    [Cell.Blue, blueMovesCount + bluePoints],
    [Cell.Green, greenMovesCount + greenPoints],
    [Cell.Orange, orangeMovesCount + orangePoints]]

}

