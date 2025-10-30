// import type { Shape } from "./Shape";

import { NoRotations, Shape } from "./Shape.tsx";
import { ShapeList } from "./ShapeList.tsx";
import { Cell, PlacementState, CellCorner, reverseCellCorner } from "./enum_definitions.tsx"

export class Move {

    // placement position on board
    position: number
    // cell corner of placement cell
    orientation: CellCorner
    shapeId: number
    shape: Shape
    shapePositionX: number
    shapePositionY: number
    idsToReplace: number[]
    constructor(position: number,
        shapeId: number,
        shape: Shape,
        orientation: CellCorner,
        shapePositionX: number,
        shapePositionY: number, idsToReplace: number[]
    ) {
        this.position = position
        this.shape = shape
        this.shapeId = shapeId
        this.orientation = orientation
        this.shapePositionX = shapePositionX
        this.shapePositionY = shapePositionY
        this.idsToReplace = idsToReplace
    }
}


export class Board {

    public data: Cell[] = [];
    public cornerCells: Cell[] = [Cell.Red, Cell.Blue, Cell.Green, Cell.Orange]

    public static height = 20; // no columns
    public static width = 20;

    constructor();
    constructor(other: Board);



    constructor(other?: Board) {
        if (other != null) {
            this.data = other.data.slice();
            this.cornerCells = other.cornerCells
        } else {
            this.data = new Array(Board.height * Board.width).fill(Cell.Empty);
        }

    }

    makeMove(move: Move) {
        let x = Math.floor(move.position / Board.width);
        let y = move.position % Board.width;

        x -= move.shapePositionX;
        y -= move.shapePositionY;

        for (let sx = 0; sx < move.shape.size; sx++) {
            for (let sy = 0; sy < move.shape.size; sy++) {
                if (move.shape.get(sx, sy) != move.shape.none)
                    this.set(x + sx, y + sy, move.shape.get(sx, sy))
            }
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
        for (let i = 0; i < this.cornerCells.length; i++) {

            if (color == this.cornerCells[i]) {
                switch (i) {
                    case 0:
                        if (this.data[0] == Cell.Empty)
                            hangingCorners.push([0, CellCorner.TopLeft])
                        break;
                    case 1:
                        if (this.data[Board.width - 1] == Cell.Empty)
                            hangingCorners.push([Board.width - 1, CellCorner.TopRight])
                        break;
                    case 2:
                        if (this.data[(Board.height - 1) * Board.width + Board.width - 1] == Cell.Empty)
                            hangingCorners.push([(Board.height - 1) * Board.width + Board.width - 1, CellCorner.BottomRight])
                        break;
                    case 3:
                        if (this.data[(Board.height - 1) * Board.width] == Cell.Empty)
                            hangingCorners.push([(Board.height - 1) * Board.width, CellCorner.BottomLeft])
                        break;
                }
            }
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
                        hangingCorners.push([result, reverseCellCorner(offset)])
                }
            }
        }


        return hangingCorners;
    }

    getShapePermutations(shape: Shape): Shape[] {


        let permutations: Shape[] = [];
        switch (shape.numberOfRotations) {
            case NoRotations.Zero:
                permutations.push(shape.copy());
                break;

            case NoRotations.Two:
                permutations.push(shape.copy());
                permutations.push(shape.copy().rotate90deg());
                break;

            case NoRotations.Four:
                let temp = shape.copy()
                permutations.push(temp.copy());
                temp.rotate90deg()
                permutations.push(temp.copy());
                temp.rotate90deg()
                permutations.push(temp.copy());
                temp.rotate90deg()
                permutations.push(temp.copy());
                break;
        }
        let currentPermutations = permutations.length;
        if (shape.canBeFlipped) {
            for (let i = 0; i < currentPermutations; i++) {
                permutations.push(permutations[i].flipLR().copy());
            }
        }
        // remove duplicates  
        return permutations;
    }

    getAllPossibleMovesForShapes(shapes: ShapeList): Move[] {


        if (shapes.length() == 0) return []

        let color = shapes.color

        let possibleMoves: Move[] = []

        for (let [position, hangingCorner] of this.getHangingCorners(color))
            for (let i = 0; i < shapes.length(); i++) {
                for (let permutation of this.getShapePermutations(shapes.get(i))) {
                    for (let [[x, y], cellCorner] of permutation.getHangingCorners())
                        if (cellCorner == hangingCorner) {
                            let positionX = Math.floor(position / Board.width);
                            let positionY = position % Board.width;
                            let result = this.combineShapeInternal(positionX - x, positionY - y, permutation)
                            let ids_to_replace = result[0]
                            let errors = result[2]
                            if (this.isValidPlacement(errors)) {

                                possibleMoves.push(new Move(
                                    position,
                                    i,
                                    permutation,
                                    cellCorner,
                                    x,
                                    y,
                                    ids_to_replace
                                ))
                            }

                        }
                }
            }

        return possibleMoves
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
                for (let i = 0; i < this.cornerCells.length; i++) {
                    if (cell == this.cornerCells[i]) {
                        switch (i) {
                            case 0:
                                if (x == -1 && y == -1)
                                    return PlacementState.TouchingSameColorCorner;
                                break;
                            case 1:
                                if (x == -1 && y == Board.width)
                                    return PlacementState.TouchingSameColorCorner;
                                break;
                            case 2:
                                if (x == Board.height && y == Board.width)
                                    return PlacementState.TouchingSameColorCorner;
                                break;
                            case 3:
                                if (x == Board.height && y == -1)
                                    return PlacementState.TouchingSameColorCorner;
                                break;
                        }
                    }
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


        let x: number;
        let y: number;

        [x, y] = this.correctForCursorPLacement(shapePlacement, shape)

        return this.combineShapeInternal(x, y, shape)
    }
    combineShapeInternal(x: number, y: number, shape: Shape) {
        var ids_to_replace: number[] = []
        var cells: Cell[] = []
        var errors: PlacementState[] = []

        for (let sx = 0; sx < shape.size; sx++) {
            for (let sy = 0; sy < shape.size; sy++) {
                if (shape.get(sx, sy) != shape.none) {
                    let cellPlacementX = (x + sx);
                    let cellPlacementY = (y + sy);
                    let cellPlacement = cellPlacementX * Board.width + cellPlacementY;

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

                    ids_to_replace.push(cellPlacementX * Board.width + cellPlacementY)
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
