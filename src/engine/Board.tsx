// import type { Shape } from "./Shape";

import type { Shape } from "./Shape.tsx";

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
    OutOfBunds,
    OverlappingExisting,
    TouchingEdge,
    TouchingSameColorCorner,
    None
}
const enum CellCorner {
    TopLeft,
    TopRight,
    BottomRight,
    BottomLeft,
}

class Move {
    position: number
    orientation: CellCorner
    shapeId: number
    shape: Shape
    constructor(position: number,
        shapeId: number,
        shape: Shape,
        orientation: CellCorner,

    ) {
        this.position = position
        this.shape = shape
        this.shapeId = shapeId
        this.orientation = orientation
    }
}


export class Board {

    public data: Cell[] = [];

    public static height = 20; // no columns
    public static width = 20;

    constructor();
    constructor(other: Board);

    constructor(other?: Board) {
        if (other != null) {
            this.data = other.data.slice();
        } else {
            this.data = new Array(Board.height * Board.width).fill(Cell.Empty);
        }
    }

    addShape(shapePlacement: number, shape: Shape) {

        let [x, y] = this.correctForCursorPLacement(shapePlacement, shape)
        try {
            for (let sx = 0; sx < shape.size; sx++) {
                for (let sy = 0; sy < shape.size; sy++) {
                    if (shape.get(sx, sy) != shape.none)
                        this.set(x + sx, y + sy, shape.get(sx, sy))
                }
            }
        } catch (err) {

        }
    }


    getCellPlacementWithOffset(cellPLacement: number, offset: CellCorner): number | null {

        let x = Math.floor(cellPLacement / Board.width);
        let y = cellPLacement % Board.width;


        switch (offset) {
            case CellCorner.TopLeft:
                --x
                --y
                break;
            case CellCorner.TopRight:
                --x
                ++y
                break;
            case CellCorner.BottomRight:
                ++x
                ++y
                break;
            case CellCorner.BottomLeft:
                ++x
                --y
                break;
        }

        if (x < 0 || x >= Board.width) return null;
        if (y < 0 || y >= Board.height) return null;
        return x * Board.width + y;
    }

    getHangingCorners(color: Cell): [number, CellCorner][] {
        let hangingCorners: [number, CellCorner][] = []

        // corner cases but check if they are covered by something
        switch (color) {
            case Cell.Red:
                if (this.data[0] == Cell.Empty)
                    hangingCorners.push([0, CellCorner.BottomRight])
                break;
            case Cell.Blue:
                if (this.data[Board.width - 1] == Cell.Empty)
                    hangingCorners.push([Board.width - 1, CellCorner.BottomLeft])
                break
            case Cell.Green:
                if (this.data[(Board.height - 1) * Board.width + Board.width - 1] == Cell.Empty)
                    hangingCorners.push([(Board.height - 1) * Board.width + Board.width - 1, CellCorner.TopLeft])
                break
            case Cell.Orange:
                if (this.data[(Board.height - 1) * Board.width] == Cell.Empty)
                    hangingCorners.push([(Board.height - 1) * Board.width, CellCorner.TopRight])
                break;
        }



        // user placed cells
        let listOfSameColorCells: number[] = []

        for (let i = 0; i < this.data.length; i++) {
            if (this.data[i] == color) listOfSameColorCells.push(i)
        }

        const offsets = [CellCorner.BottomRight, CellCorner.BottomLeft, CellCorner.TopLeft, CellCorner.TopRight]

        for (let position of listOfSameColorCells) {
            for (let offset of offsets) {
                let result = this.getCellPlacementWithOffset(position, offset)
                if (result !== null) {
                    if (this.data[result] == Cell.Empty)
                        hangingCorners.push([result, offset])
                }
            }
        }


        return hangingCorners;
    }

    getAllPossibleMovesForShapes(shapes: Shape[], color: Cell): Move[] {

        console.log(this.getHangingCorners(color))
        // let possibleMoves = []

        // for (let shape in shapes) {


        // }

        return []
    }
    checkBoundingBoxError(x: number, y: number) {
        if (x < 0) return true;
        if (y < 0) return true;

        if (x >= Board.width) return true;
        if (y >= Board.width) return true;

        return false
    }

    checkForEdgeError(cellX: number, cellY: number, cell: Cell): PlacementState.TouchingEdge | null {

        if (this.checkBoundingBoxError(cellX, cellY)) return null;

        let cardinalPositions = [
            [cellX, cellY - 1],
            [cellX - 1, cellY],
            [cellX, cellY + 1],
            [cellX + 1, cellY]
        ]

        for (var [x, y] of cardinalPositions) {
            if (!this.checkBoundingBoxError(x, y)) {
                if (this.data[x * Board.width + y] == cell) return PlacementState.TouchingEdge;
            }
        }
        return null;
    }
    checkForSameCellCorner(cellX: number, cellY: number, cell: Cell): PlacementState.TouchingSameColorCorner | null {
        if (this.checkBoundingBoxError(cellX, cellY)) return null;
        let cardinalPositions = [
            [cellX - 1, cellY - 1],
            [cellX - 1, cellY + 1],
            [cellX + 1, cellY + 1],
            [cellX + 1, cellY - 1]
        ]
        for (var [x, y] of cardinalPositions) {
            if (!this.checkBoundingBoxError(x, y)) {
                if (this.data[x * Board.width + y] == cell) return PlacementState.TouchingSameColorCorner;
            } else {
                switch (cell) {
                    case Cell.Red:
                        if (x == -1 && y == -1) return PlacementState.TouchingSameColorCorner;
                        break;
                    case Cell.Blue:
                        if (x == -1 && y == Board.width) return PlacementState.TouchingSameColorCorner;
                        break;
                    case Cell.Orange:
                        if (x == Board.height && y == -1) return PlacementState.TouchingSameColorCorner;
                        break;
                    case Cell.Green:
                        if (x == Board.height && y == Board.width) return PlacementState.TouchingSameColorCorner;
                        break;
                }
            }
        }
        return null;

    }

    correctForCursorPLacement(shapePlacement: number, shape: Shape) {
        let x = Math.floor(shapePlacement / Board.width);
        let y = shapePlacement % Board.width;

        switch (shape.size) {
            case 3:
            case 4:
                x -= 1;
                y -= 1;
                break;
            case 5:
                x -= 2;
                y -= 2;
                break;
        }
        return [x, y]
    }
    combineShape(shapePlacement: number, shape: Shape) {

        var ids_to_replace: number[] = []
        var cells: Cell[] = []
        var errors: PlacementState[] = []

        let [x, y] = this.correctForCursorPLacement(shapePlacement, shape)

        for (let sx = 0; sx < shape.size; sx++) {
            for (let sy = 0; sy < shape.size; sy++) {
                if (shape.get(sx, sy) != shape.none) {
                    let cellPlacementX = (x + sx);
                    let cellPlacementY = (y + sy);
                    let cellPlacement = (x + sx) * Board.width + (sy + y);

                    if (this.checkBoundingBoxError(cellPlacementX, cellPlacementY))
                        errors.push(PlacementState.OutOfBunds);
                    else if (this.data[cellPlacement] != Cell.Empty)
                        errors.push(PlacementState.OverlappingExisting)
                    else if (this.checkForEdgeError(cellPlacementX, cellPlacementY, shape.get(sx, sy)) != null)
                        errors.push(PlacementState.TouchingEdge)
                    else if (this.checkForSameCellCorner(cellPlacementX, cellPlacementY, shape.get(sx, sy)) != null)
                        errors.push(PlacementState.TouchingSameColorCorner)
                    else
                        errors.push(PlacementState.None)


                    ids_to_replace.push((x + sx) * Board.width + (sy + y))
                    cells.push(shape.get(sx, sy))
                }
            }
        }
        return [ids_to_replace, cells, errors];
    }

    checkCollisions(shapePlacement: number, shape: Shape) {
        // assumes that shapePlacement points to top left corner of the shape
        let x = Math.floor(shapePlacement / Board.width);
        let y = shapePlacement % Board.width;

        try {
            for (let sx = 0; sx < shape.size; sx++) {
                for (let sy = 0; sy < shape.size; sy++) {
                    if (shape.get(sx, sy) != shape.none)
                        this.set(x + sx, y + sy, shape.get(sx, sy))
                }
            }
        } catch (err) {

        }
    }

    get(x: number, y: number): Cell {

        if (x >= Board.height) throw new Error(`x (${x}) is greater than or equal to Board.height (${Board.height})`);
        if (y >= Board.width) throw new Error(`y (${y}) is greater than or equal to Board.width (${Board.width})`);

        return this.data[x * Board.width + y];
    }
    set(x: number, y: number, value: Cell) {

        if (x >= Board.height) throw new Error(`x (${x}) is greater than or equal to Board.height (${Board.height})`);
        if (y >= Board.width) throw new Error(`y (${y}) is greater than or equal to Board.width (${Board.width})`);

        this.data[x * Board.width + y] = value;
    }
    isValidPlacement(shapePlacementState: PlacementState[]): boolean {
        for (let cell of shapePlacementState) {
            switch (cell) {
                case PlacementState.OutOfBunds:
                case PlacementState.OverlappingExisting:
                case PlacementState.TouchingEdge:
                    return false;
            }
        }
        if (-1 == shapePlacementState.indexOf(PlacementState.TouchingSameColorCorner))
            return false;
        return true;


    }

}
