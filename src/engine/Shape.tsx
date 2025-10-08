import { Cell } from "./Board.tsx";

export const enum Shapes {
    // one width
    Dot,
    // two width
    Tuple,
    Triple,
    Square,
    // three width
    TripleLine,
    Cross,
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
export const enum NoRotations {
    Zero,
    Two,
    Four,

}
export class Shape {
    public data: Cell[][] = [[]];
    public shapeName: Shapes;
    public size: number;
    public none: Cell = Cell.None;
    public canBeFlipped: boolean = false;
    public numberOfRotations: NoRotations = NoRotations.Four;

    points(): number {
        let sum = 0;
        for (let x of this.data)
            for (let y of x)
                if (y != this.none)
                    sum++;
        return sum;
    }

    constructor(shape: Shapes, cell: Cell) {
        this.shapeName = shape;

        switch (shape) {
            case Shapes.Dot:
                this.data = [[cell]];
                this.size = 1;
                this.numberOfRotations = NoRotations.Zero
                return;
            case Shapes.Tuple:
                this.data = [[cell, cell], [this.none, this.none]];
                this.size = 2;
                this.numberOfRotations = NoRotations.Four
                return;
            case Shapes.Triple:
                this.data = [[cell, cell], [cell, this.none]];
                this.size = 2;
                this.numberOfRotations = NoRotations.Four
                return;
            case Shapes.Square:
                this.data = [[cell, cell], [cell, cell]];
                this.size = 2;
                this.numberOfRotations = NoRotations.Zero
                return;

            case Shapes.Cross:
                this.data = [
                    [this.none, cell, this.none],
                    [cell, cell, cell],
                    [this.none, cell, this.none],];
                this.size = 3;
                this.numberOfRotations = NoRotations.Zero
                return;

            case Shapes.TripleLine:
                this.data = [
                    [this.none, this.none, this.none],
                    [cell, cell, cell],
                    [this.none, this.none, this.none],];
                this.size = 3;
                this.numberOfRotations = NoRotations.Two
                return;

            case Shapes.TripleT:
                this.data = [
                    [this.none, this.none, this.none],
                    [cell, cell, cell],
                    [this.none, cell, this.none],];
                this.size = 3;
                this.numberOfRotations = NoRotations.Four
                return;

            case Shapes.BigTripleT:
                this.data = [
                    [cell, cell, cell],
                    [this.none, cell, this.none],
                    [this.none, cell, this.none],];
                this.size = 3;
                this.numberOfRotations = NoRotations.Four
                return;

            case Shapes.TripleC:
                this.data = [
                    [cell, cell, this.none],
                    [cell, this.none, this.none],
                    [cell, cell, this.none],];
                this.size = 3;
                this.numberOfRotations = NoRotations.Four
                return;

            case Shapes.Bolt:
                this.data = [
                    [this.none, this.none, this.none],
                    [cell, cell, this.none],
                    [this.none, cell, cell,],];
                this.size = 3;
                this.numberOfRotations = NoRotations.Four
                return;

            case Shapes.TripleL:
                this.data = [
                    [cell, this.none, this.none],
                    [cell, this.none, this.none],
                    [cell, cell, this.none]];
                this.size = 3;
                this.numberOfRotations = NoRotations.Four
                this.canBeFlipped = true
                return;

            case Shapes.BigTripleL:
                this.data = [
                    [cell, this.none, this.none],
                    [cell, this.none, this.none],
                    [cell, cell, cell]];
                this.size = 3;
                this.numberOfRotations = NoRotations.Four
                return;

            case Shapes.TripleP:
                this.data = [
                    [cell, cell, this.none],
                    [cell, cell, this.none],
                    [cell, this.none, this.none]];
                this.size = 3;
                this.numberOfRotations = NoRotations.Four
                this.canBeFlipped = true
                return;

            case Shapes.OffsetCross:
                this.data = [
                    [this.none, this.none, cell],
                    [cell, cell, cell],
                    [this.none, cell, this.none]];
                this.size = 3;
                this.numberOfRotations = NoRotations.Four
                this.canBeFlipped = true
                return;

            case Shapes.Snake:
                this.data = [
                    [this.none, cell, cell],
                    [this.none, cell, this.none],
                    [cell, cell, this.none]];
                this.size = 3;
                this.numberOfRotations = NoRotations.Four
                this.canBeFlipped = true
                return;

            case Shapes.TripleW:
                this.data = [
                    [this.none, cell, cell],
                    [cell, cell, this.none],
                    [cell, this.none, this.none]];
                this.size = 3;
                this.numberOfRotations = NoRotations.Four
                this.canBeFlipped = true
                return;

            case Shapes.QuadrupleLine:
                this.data = [
                    [this.none, cell, this.none, this.none],
                    [this.none, cell, this.none, this.none],
                    [this.none, cell, this.none, this.none],
                    [this.none, cell, this.none, this.none]];
                this.numberOfRotations = NoRotations.Two
                this.size = 4;
                return;

            case Shapes.QuadrupleL:
                this.data = [
                    [this.none, cell, this.none, this.none],
                    [this.none, cell, this.none, this.none],
                    [this.none, cell, this.none, this.none],
                    [this.none, cell, cell, this.none]];
                this.numberOfRotations = NoRotations.Four
                this.canBeFlipped = true
                this.size = 4;
                return;

            case Shapes.QuadrupleOffsetL:
                this.data = [
                    [this.none, cell, this.none, this.none],
                    [this.none, cell, this.none, this.none],
                    [this.none, cell, cell, this.none],
                    [this.none, cell, this.none, this.none]];
                this.numberOfRotations = NoRotations.Four
                this.canBeFlipped = true
                this.size = 4;
                return;

            case Shapes.QuadrupleBolt:
                this.data = [
                    [this.none, this.none, cell, this.none],
                    [this.none, cell, cell, this.none],
                    [this.none, cell, this.none, this.none],
                    [this.none, cell, this.none, this.none]];
                this.numberOfRotations = NoRotations.Four
                this.canBeFlipped = true
                this.size = 4;
                return;

            case Shapes.PentaLine:
                this.data = [
                    [this.none, this.none, cell, this.none, this.none],
                    [this.none, this.none, cell, this.none, this.none],
                    [this.none, this.none, cell, this.none, this.none],
                    [this.none, this.none, cell, this.none, this.none],
                    [this.none, this.none, cell, this.none, this.none]];
                this.numberOfRotations = NoRotations.Two
                this.size = 5;
                return;
        }
    }

    get(x: number, y: number): Cell {

        if (x >= this.size) throw EvalError('x (${x}) is grater than Shape.size');
        if (y >= this.size) throw EvalError('y (${y}) is grater than Shape.size');

        return this.data[x][y];
    }

    rotate(rotateClockwise: boolean) {
        if (rotateClockwise)
            return this.rotate90deg();
        // rotate 3 times because I'm lazy
        this.rotate90deg();
        this.rotate90deg();
        this.rotate90deg();

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

    }
}

export function shapeList() {
    return [
        Shapes.Dot,
        Shapes.Tuple,
        Shapes.Triple,
        Shapes.Square,
        Shapes.TripleLine,
        Shapes.Cross,
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