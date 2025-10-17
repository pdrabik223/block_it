export const enum Cell {
    Red = 1,
    Orange = 2,
    Green = 3,
    Blue = 4,
    Empty = 5,
    Border = 6,
    None = 7,
}
export enum PlacementState {
    None = 0,
    OutOfBunds = 1,
    OverlappingExisting = 2,
    TouchingEdge = 3,
    TouchingSameColorCorner = 4,
}
export const enum CellCorner {
    TopLeft,
    TopRight,
    BottomRight,
    BottomLeft,

}
export function reverseCellCorner(value: CellCorner): CellCorner {
    switch (value) {
        case CellCorner.TopLeft:
            return CellCorner.BottomRight;
        case CellCorner.TopRight:
            return CellCorner.BottomLeft;
        case CellCorner.BottomRight:
            return CellCorner.TopLeft;
        case CellCorner.BottomLeft:
            return CellCorner.TopRight
    }
}

export const cellRed: string = "rgb(255, 86, 86)"
export const cellBlue: string = "rgb(59, 59, 253)"
export const cellGreen: string = "rgb(43, 129, 43)"
export const cellOrange: string = "rgb(249,195,96)"

export const cellBorder: string = "rgb(17, 17, 17)"
export const cellEmpty: string = "gray"
export const cellNone: string = "transparent"


export const cellColors = [cellRed,
    cellBlue,
    cellGreen,
    cellOrange]

export function getRandomActiveCellColor() {
    return cellColors[Math.floor(Math.random() * cellColors.length)]
}
