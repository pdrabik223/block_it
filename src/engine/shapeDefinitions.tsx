import { Cell } from "./enum_definitions.tsx"


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

export function getRandomShape() {
    return shapeList()[Math.floor(Math.random() * shapeList().length)]
}
