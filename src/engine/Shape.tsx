import { Cell, CellCorner } from "./enum_definitions.tsx"
import { getShapeSize, shapeDefinitions, Shapes, getCellValue, getNumberOfRotations, NoRotations } from "./shapeDefinitions.tsx";

export class Shape {
    public data: Cell[][] = [[]];
    public shapeName: Shapes;
    public none: Cell = Cell.None;
    public size: number;
    public canBeFlipped: boolean = false;
    public numberOfRotations: NoRotations = NoRotations.Four;
    public cellValue: number = 1;
    public cellColor: Cell;

    points(): number {
        return this.cellValue;
    }

    rePaint(newColor: Cell) {
        this.cellColor = newColor

        for (let x = 0; x < this.data.length; x++)
            for (let y = 0; y < this.data[x].length; y++)
                if (this.data[x][y] != this.none)
                    this.data[x][y] = newColor

    }

    isequal(other: Shape): boolean {
        if (this.shapeName !== other.shapeName) return false;

        for (let x = 0; x < this.data.length; x++)
            for (let y = 0; y < this.data[x].length; y++)
                if (this.data[x][y] != other.data[x][y]) return false;

        return true;
    }

    getColor() { return this.cellColor }

    constructor(shape: Shapes, cell: Cell) {
        this.shapeName = shape;
        this.cellColor = cell;
        this.data = shapeDefinitions[shape](cell);
        this.size = getShapeSize(shape);
        this.cellValue = getCellValue(shape);
        this.numberOfRotations = getNumberOfRotations(shape);

        // Set canBeFlipped for specific shapes
        switch (shape) {
            case Shapes.Bolt:
            case Shapes.TripleL:
            case Shapes.TripleP:
            case Shapes.OffsetCross:
            case Shapes.Snake:
            case Shapes.TripleW:
            case Shapes.QuadrupleL:
            case Shapes.QuadrupleOffsetL:
            case Shapes.QuadrupleBolt:
                this.canBeFlipped = true;
                break;
        }
    }

    getPermutations(): Shape[] {
        // this can be made static, with simple lookup table
        let permutations: Shape[] = [];
        switch (this.numberOfRotations) {
            case NoRotations.Zero:
                permutations.push(this.copy());
                break;

            case NoRotations.Two:
                permutations.push(this.copy());
                permutations.push(this.copy().rotate90deg());
                break;

            case NoRotations.Four:
                let temp = this.copy()
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

        if (this.canBeFlipped) {
            for (let i = 0; i < currentPermutations; i++) {
                permutations.push(permutations[i].flipLR().copy());
            }
        }
        // remove duplicates  
        return permutations;
    }

    get(x: number, y: number): Cell {

        if (x >= this.size) throw EvalError(`x (${x}) is grater than Shape.size`);
        if (y >= this.size) throw EvalError(`y (${y}) is grater than Shape.size`);

        return this.data[x][y];
    }

    rotate(rotateClockwise: boolean) {
        if (rotateClockwise)
            return this.rotate90deg();
        // rotate 3 times because I'm lazy
        this.rotate90deg();
        this.rotate90deg();
        this.rotate90deg();
        return this;
    }

    rotate90deg() {
        const n = this.size;

        for (let i = 0; i < n / 2; i++) {

            for (let j = i; j < n - i - 1; j++) {

                // Swap elements in clockwise order
                let temp = this.data[i][j];
                this.data[i][j] = this.data[n - 1 - j][i];                  // Move P4 to P1
                this.data[n - 1 - j][i] = this.data[n - 1 - i][n - 1 - j];  // Move P3 to P4
                this.data[n - 1 - i][n - 1 - j] = this.data[j][n - 1 - i];  // Move P2 to P3
                this.data[j][n - 1 - i] = temp;                             // Move P1 to P2
            }
        }
        return this;
    }

    flipLR() {

        const n = this.size;

        for (let i = 0; i < n; i++) {
            for (let j = 0; j < Math.floor(n / 2); j++) {
                const k = n - 1 - j;
                const tmp = this.data[i][j];
                this.data[i][j] = this.data[i][k];
                this.data[i][k] = tmp;
            }
        }
        return this;
    }

    copy(): Shape {
        let copy = new Shape(this.shapeName, this.cellColor);
        for (let x = 0; x < this.size; x++)
            for (let y = 0; y < this.size; y++)
                copy.data[x][y] = this.data[x][y]
        return copy
    }

    checkIfEmpty(x: number, y: number): boolean {
        if (x < 0 || y < 0) return true;
        if (x >= this.size || y >= this.size) return true;
        return this.get(x, y) == this.none
    }

    checkCellCorners(x: number, y: number): CellCorner[] {

        let result: CellCorner[] = []
        const top = 0;
        const left = 1;
        const bottom = 2;
        const right = 3;

        let coordinates = [
            [x - 1, y], // top
            [x, y - 1], // left
            [x + 1, y], // bottom
            [x, y + 1]] // right

        if (this.checkIfEmpty(coordinates[left][0], coordinates[left][1]) &&
            this.checkIfEmpty(coordinates[top][0], coordinates[top][1])) {
            // if top and left are empty 
            result.push(CellCorner.TopLeft)
        }

        if (this.checkIfEmpty(coordinates[right][0], coordinates[right][1]) &&
            this.checkIfEmpty(coordinates[top][0], coordinates[top][1])) {
            // if top and right are empty 
            result.push(CellCorner.TopRight)
        }

        if (this.checkIfEmpty(coordinates[left][0], coordinates[left][1]) &&
            this.checkIfEmpty(coordinates[bottom][0], coordinates[bottom][1])) {
            // if bottom and left are empty 
            result.push(CellCorner.BottomLeft)
        }

        if (this.checkIfEmpty(coordinates[right][0], coordinates[right][1]) &&
            this.checkIfEmpty(coordinates[bottom][0], coordinates[bottom][1])) {
            // if bottom and right are empty 
            result.push(CellCorner.BottomRight)
        }

        return result
    }

    getHangingCorners(): [[number, number], CellCorner][] {
        let result: [[number, number], CellCorner][] = []
        for (let x = 0; x < this.size; x++)
            for (let y = 0; y < this.size; y++)
                if (this.data[x][y] != this.none) {
                    for (let fc of this.checkCellCorners(x, y))
                        result.push([[x, y], fc])
                }
        return result;
    }
}

