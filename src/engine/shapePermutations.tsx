import { Cell } from "./enum_definitions.tsx"
import type { Shapes } from "./shapeDefinitions.tsx"



export const shapePermutations: ((cell: Cell) => Cell[][][])[] = [
    (val: Cell) => [[[val]]],
    (val: Cell) => [[[val, val], [7, 7]], [[7, val], [7, val]], [[7, 7], [val, val]], [[val, 7], [val, 7]]],
    (val: Cell) => [[[val, val], [val, 7]], [[val, val], [7, val]], [[7, val], [val, val]], [[val, 7], [val, val]]],
    (val: Cell) => [[[val, val], [val, val]]],
    (val: Cell) => [[[7, val, 7], [val, val, val], [7, val, 7]]],
    (val: Cell) => [[[7, 7, 7], [val, val, val], [7, 7, 7]], [[7, val, 7], [7, val, 7], [7, val, 7]]],
    (val: Cell) => [[[7, 7, 7], [val, val, val], [7, val, 7]], [[7, val, 7], [val, val, 7], [7, val, 7]], [[7, val, 7], [val, val, val], [7, 7, 7]], [[7, val, 7], [7, val, val], [7, val, 7]]],
    (val: Cell) => [[[val, val, val], [7, val, 7], [7, val, 7]], [[7, 7, val], [val, val, val], [7, 7, val]], [[7, val, 7], [7, val, 7], [val, val, val]], [[val, 7, 7], [val, val, val], [val, 7, 7]]],
    (val: Cell) => [[[val, val, 7], [val, 7, 7], [val, val, 7]], [[val, val, val], [val, 7, val], [7, 7, 7]], [[7, val, val], [7, 7, val], [7, val, val]], [[7, 7, 7], [val, 7, val], [val, val, val]]],
    (val: Cell) => [[[7, 7, 7], [7, val, val], [val, val, 7]], [[7, val, 7], [7, val, val], [7, 7, val]]],
    (val: Cell) => [[[7, 7, val], [7, 7, val], [7, val, val]], [[val, val, val], [7, 7, val], [7, 7, 7]], [[val, val, 7], [val, 7, 7], [val, 7, 7]], [[7, 7, 7], [val, 7, 7], [val, val, val]]],
    (val: Cell) => [[[val, 7, 7], [val, 7, 7], [val, val, val]], [[val, val, val], [val, 7, 7], [val, 7, 7]], [[val, val, val], [7, 7, val], [7, 7, val]], [[7, 7, val], [7, 7, val], [val, val, val]]],
    (val: Cell) => [[[7, val, val], [7, val, val], [7, 7, val]], [[val, val, val], [val, val, 7], [7, 7, 7]], [[val, 7, 7], [val, val, 7], [val, val, 7]], [[7, 7, 7], [7, val, val], [val, val, val]]],
    (val: Cell) => [[[val, 7, 7], [val, val, val], [7, val, 7]], [[7, val, 7], [7, val, val], [val, val, 7]], [[7, val, 7], [val, val, val], [7, 7, val]], [[7, val, val], [val, val, 7], [7, val, 7]]],
    (val: Cell) => [[[val, val, 7], [7, val, 7], [7, val, val]], [[7, 7, val], [val, val, val], [val, 7, 7]], [[val, val, 7], [7, val, 7], [7, val, val]]],
    (val: Cell) => [[[val, val, 7], [7, val, val], [7, 7, val]], [[7, val, val], [val, val, 7], [val, 7, 7]], [[val, 7, 7], [val, val, 7], [7, val, val]], [[7, 7, val], [7, val, val], [val, val, 7]]],
    (val: Cell) => [[[7, val, 7, 7], [7, val, 7, 7], [7, val, 7, 7], [7, val, 7, 7]], [[7, 7, 7, 7], [val, val, val, val], [7, 7, 7, 7], [7, 7, 7, 7]]],
    (val: Cell) => [[[7, 7, val, 7], [7, 7, val, 7], [7, 7, val, 7], [7, val, val, 7]], [[7, 7, 7, 7], [val, val, val, val], [7, 7, 7, val], [7, 7, 7, 7]], [[7, val, val, 7], [7, val, 7, 7], [7, val, 7, 7], [7, val, 7, 7]], [[7, 7, 7, 7], [val, 7, 7, 7], [val, val, val, val], [7, 7, 7, 7]]],
    (val: Cell) => [[[7, 7, 7, 7], [7, 7, val, 7], [val, val, val, val], [7, 7, 7, 7]], [[7, 7, val, 7], [7, val, val, 7], [7, 7, val, 7], [7, 7, val, 7]], [[7, 7, 7, 7], [val, val, val, val], [7, val, 7, 7], [7, 7, 7, 7]], [[7, val, 7, 7], [7, val, 7, 7], [7, val, val, 7], [7, val, 7, 7]]],
    (val: Cell) => [[[7, 7, 7, 7], [7, val, val, val], [val, val, 7, 7], [7, 7, 7, 7]], [[7, val, 7, 7], [7, val, 7, 7], [7, val, val, 7], [7, 7, val, 7]], [[7, 7, 7, 7], [7, 7, val, val], [val, val, val, 7], [7, 7, 7, 7]], [[7, val, 7, 7], [7, val, val, 7], [7, 7, val, 7], [7, 7, val, 7]]],
    (val: Cell) => [[[7, 7, 7, 7, 7], [7, 7, 7, 7, 7], [val, val, val, val, val], [7, 7, 7, 7, 7], [7, 7, 7, 7, 7]], [[7, 7, val, 7, 7], [7, 7, val, 7, 7], [7, 7, val, 7, 7], [7, 7, val, 7, 7], [7, 7, val, 7, 7]]]

]
