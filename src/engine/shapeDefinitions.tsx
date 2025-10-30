import { Cell } from "./enum_definitions.tsx"

export const enum NoRotations {
    Zero,
    Two,
    Four,
}


export const enum Shapes {
    // one width
    Dot,
    // two width
    Tuple,
    Triple,
    Square,
    // three width
    Cross,
    TripleLine,
    TripleT,
    BigTripleT,
    TripleC,
    Bolt,
    TripleL,
    BigTripleL,
    TripleP,
    OffsetCross,
    Snake,
    TripleW,
    // four width
    QuadrupleLine,
    QuadrupleL,
    QuadrupleOffsetL,
    QuadrupleBolt,
    // five width
    PentaLine
}

export function getShapeSize(shape: Shapes): number {
    switch (shape) {
        case Shapes.Dot:
            return 1
        case Shapes.Tuple:
        case Shapes.Triple:
        case Shapes.Square:
            return 2
        case Shapes.Cross:
        case Shapes.TripleLine:
        case Shapes.TripleT:
        case Shapes.BigTripleT:
        case Shapes.TripleC:
        case Shapes.Bolt:
        case Shapes.TripleL:
        case Shapes.BigTripleL:
        case Shapes.TripleP:
        case Shapes.OffsetCross:
        case Shapes.Snake:
        case Shapes.TripleW:
            return 3
        case Shapes.QuadrupleLine:
        case Shapes.QuadrupleL:
        case Shapes.QuadrupleOffsetL:
        case Shapes.QuadrupleBolt:
            return 4
        case Shapes.PentaLine:
            return 5
    }
}

export const shapeDefinitions: ((cell: Cell) => Cell[][])[] = [
    // one width
    (cell: Cell) => [[cell]],
    // two width
    (cell: Cell) => [[cell, cell], [Cell.None, Cell.None]],
    (cell: Cell) => [[cell, cell], [cell, Cell.None]],
    (cell: Cell) => [[cell, cell], [cell, cell]],

    // three width
    // Cross
    (cell: Cell) => [
        [Cell.None, cell, Cell.None],
        [cell, cell, cell],
        [Cell.None, cell, Cell.None],
    ],
    // TripleLine
    (cell: Cell) => [
        [Cell.None, Cell.None, Cell.None],
        [cell, cell, cell],
        [Cell.None, Cell.None, Cell.None],
    ],
    // TripleT
    (cell: Cell) => [
        [Cell.None, Cell.None, Cell.None],
        [cell, cell, cell],
        [Cell.None, cell, Cell.None],
    ],
    // BigTripleT
    (cell: Cell) => [
        [cell, cell, cell],
        [Cell.None, cell, Cell.None],
        [Cell.None, cell, Cell.None],
    ],
    // TripleC
    (cell: Cell) => [
        [cell, cell, Cell.None],
        [cell, Cell.None, Cell.None],
        [cell, cell, Cell.None],
    ],
    // Bolt
    (cell: Cell) => [
        [Cell.None, Cell.None, Cell.None],
        [cell, cell, Cell.None],
        [Cell.None, cell, cell],
    ],
    // TripleL
    (cell: Cell) => [
        [cell, Cell.None, Cell.None],
        [cell, Cell.None, Cell.None],
        [cell, cell, Cell.None],
    ],
    // BigTripleL
    (cell: Cell) => [
        [cell, Cell.None, Cell.None],
        [cell, Cell.None, Cell.None],
        [cell, cell, cell],
    ],
    // TripleP
    (cell: Cell) => [
        [cell, cell, Cell.None],
        [cell, cell, Cell.None],
        [cell, Cell.None, Cell.None],
    ],
    // OffsetCross
    (cell: Cell) => [
        [Cell.None, Cell.None, cell],
        [cell, cell, cell],
        [Cell.None, cell, Cell.None],
    ],
    // Snake
    (cell: Cell) => [
        [Cell.None, cell, cell],
        [Cell.None, cell, Cell.None],
        [cell, cell, Cell.None],
    ],
    // TripleW
    (cell: Cell) => [
        [Cell.None, cell, cell],
        [cell, cell, Cell.None],
        [cell, Cell.None, Cell.None],
    ],

    // four width
    // QuadrupleLine
    (cell: Cell) => [
        [Cell.None, cell, Cell.None, Cell.None],
        [Cell.None, cell, Cell.None, Cell.None],
        [Cell.None, cell, Cell.None, Cell.None],
        [Cell.None, cell, Cell.None, Cell.None],
    ],
    // QuadrupleL
    (cell: Cell) => [
        [Cell.None, cell, Cell.None, Cell.None],
        [Cell.None, cell, Cell.None, Cell.None],
        [Cell.None, cell, Cell.None, Cell.None],
        [Cell.None, cell, cell, Cell.None],
    ],
    // QuadrupleOffsetL
    (cell: Cell) => [
        [Cell.None, Cell.None, Cell.None, Cell.None],
        [Cell.None, cell, Cell.None, Cell.None],
        [cell, cell, cell, cell],
        [Cell.None, Cell.None, Cell.None, Cell.None],
    ],
    // QuadrupleBolt
    (cell: Cell) => [
        [Cell.None, Cell.None, Cell.None, Cell.None],
        [cell, cell, cell, Cell.None],
        [Cell.None, Cell.None, cell, cell],
        [Cell.None, Cell.None, Cell.None, Cell.None],
    ],

    // five width
    // PentaLine
    (cell: Cell) => [
        [Cell.None, Cell.None, Cell.None, Cell.None, Cell.None],
        [Cell.None, Cell.None, Cell.None, Cell.None, Cell.None],
        [cell, cell, cell, cell, cell],
        [Cell.None, Cell.None, Cell.None, Cell.None, Cell.None],
        [Cell.None, Cell.None, Cell.None, Cell.None, Cell.None],
    ],
]

export function shapeList() {
    return [
        Shapes.Dot,
        Shapes.Tuple,
        Shapes.Triple,
        Shapes.Square,
        Shapes.Cross,
        Shapes.TripleLine,
        Shapes.TripleT,
        Shapes.BigTripleT,
        Shapes.TripleC,
        Shapes.Bolt,
        Shapes.TripleL,
        Shapes.BigTripleL,
        Shapes.TripleP,
        Shapes.OffsetCross,
        Shapes.Snake,
        Shapes.TripleW,
        Shapes.QuadrupleLine,
        Shapes.QuadrupleL,
        Shapes.QuadrupleOffsetL,
        Shapes.QuadrupleBolt,
        Shapes.PentaLine

    ]
}

export function getCellValue(shape: Shapes): number {
    switch (shape) {
        case Shapes.Dot:
            return 1
        case Shapes.Tuple:
            return 2
        case Shapes.Triple:
            return 3
        case Shapes.Square:
            return 4
        case Shapes.Cross:
        case Shapes.BigTripleT:
        case Shapes.TripleC:
        case Shapes.BigTripleL:
        case Shapes.TripleP:
        case Shapes.OffsetCross:
        case Shapes.Snake:
        case Shapes.TripleW:
        case Shapes.QuadrupleL:
        case Shapes.QuadrupleOffsetL:
        case Shapes.QuadrupleBolt:
        case Shapes.PentaLine:
            return 5
        case Shapes.TripleLine:
            return 3
        case Shapes.TripleT:
        case Shapes.Bolt:
        case Shapes.TripleL:
        case Shapes.QuadrupleLine:
            return 4
    }
}

export function getNumberOfRotations(shape: Shapes): NoRotations {
    switch (shape) {
        case Shapes.Dot:
        case Shapes.Square:
        case Shapes.Cross:
            return NoRotations.Zero
        case Shapes.TripleLine:
        case Shapes.QuadrupleLine:
        case Shapes.PentaLine:
            return NoRotations.Two
        default:
            return NoRotations.Four
    }
}

export function getRandomShape() {
    return shapeList()[Math.floor(Math.random() * shapeList().length)]
}
