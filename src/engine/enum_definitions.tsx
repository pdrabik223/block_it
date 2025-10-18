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

export const cellRed: string = "rgba(209, 94, 94, 1)"
export const cellBlue: string = "rgba(82, 82, 247, 1)"
export const cellGreen: string = "rgba(90, 176, 90, 1)"
export const cellOrange: string = "rgba(238, 197, 122, 1)"

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
