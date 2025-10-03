import { Cell } from "./engine";

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

export class Shape {
    public data: Cell[][] = [[]];
    public shapeName: Shapes;
    public size: number;
    public none: Cell = Cell.None;

    constructor(shape: Shapes, cell: Cell) {
        this.shapeName = shape;

        switch (shape) {
            case Shapes.Dot:
                this.data = [[cell]];
                this.size = 1;
                return;
            case Shapes.Tuple:
                this.data = [[cell, cell], [this.none, this.none]];
                this.size = 2;
                return;
            case Shapes.Triple:
                this.data = [[cell, cell], [cell, this.none]];
                this.size = 2;
                return;
            case Shapes.Square:
                this.data = [[cell, cell], [cell, cell]];
                this.size = 2;
                return;
            case Shapes.Cross:
                this.data = [
                    [this.none, cell, this.none],
                    [cell, cell, cell],
                    [this.none, cell, this.none],];
                this.size = 3;
                return;
            case Shapes.TripleLine:
                this.data = [
                    [this.none, this.none, this.none],
                    [cell, cell, cell],
                    [this.none, this.none, this.none],];
                this.size = 3;
                return;
            case Shapes.TripleT:
                this.data = [
                    [this.none, this.none, this.none],
                    [cell, cell, cell],
                    [this.none, cell, this.none],];
                this.size = 3;
                return;
            case Shapes.BigTripleT:
                this.data = [
                    [cell, cell, cell],
                    [this.none, cell, this.none],
                    [this.none, cell, this.none],];
                this.size = 3;
                return;
            case Shapes.TripleC:
                this.data = [
                    [cell, cell, this.none],
                    [cell, this.none, this.none],
                    [cell, cell, this.none],];
                this.size = 3;
                return;
            case Shapes.Bolt:
                this.data = [
                    [cell, this.none, this.none],
                    [cell, cell, this.none],
                    [this.none, cell, cell,],];
                this.size = 3;
                return;
            case Shapes.TripleL:
                this.data = [
                    [cell, this.none, this.none],
                    [cell, this.none, this.none],
                    [cell, cell, this.none]];
                this.size = 3;
                return;
            case Shapes.BigTripleL:
                this.data = [
                    [cell, this.none, this.none],
                    [cell, this.none, this.none],
                    [cell, cell, cell]];
                this.size = 3;
                return;
            case Shapes.TripleP:
                this.data = [
                    [cell, cell, this.none],
                    [cell, cell, this.none],
                    [cell, this.none, this.none]];
                this.size = 3;
                return;
            case Shapes.OffsetCross:
                this.data = [
                    [this.none, this.none, cell],
                    [cell, cell, cell],
                    [this.none, cell, this.none]];
                this.size = 3;
                return;
            case Shapes.Snake:
                this.data = [
                    [this.none, cell, cell],
                    [this.none, cell, this.none],
                    [cell, cell, this.none]];
                this.size = 3;
                return;
            case Shapes.TripleW:
                this.data = [
                    [this.none, cell, cell],
                    [cell, cell, this.none],
                    [cell, this.none, this.none]];
                this.size = 3;
                return;
            case Shapes.QuadrupleLine:
                this.data = [
                    [this.none, cell, this.none, this.none],
                    [this.none, cell, this.none, this.none],
                    [this.none, cell, this.none, this.none],
                    [this.none, cell, this.none, this.none]];

                this.size = 4;
                return;
            case Shapes.QuadrupleL:
                this.data = [
                    [this.none, cell, this.none, this.none],
                    [this.none, cell, this.none, this.none],
                    [this.none, cell, this.none, this.none],
                    [this.none, cell, cell, this.none]];

                this.size = 4;
                return;
            case Shapes.QuadrupleOffsetL:
                this.data = [
                    [this.none, cell, this.none, this.none],
                    [this.none, cell, this.none, this.none],
                    [this.none, cell, cell, this.none],
                    [this.none, cell, this.none, this.none]];

                this.size = 4;
                return;
            case Shapes.QuadrupleBolt:
                this.data = [
                    [this.none, this.none, cell, this.none],
                    [this.none, cell, cell, this.none],
                    [this.none, cell, this.none, this.none],
                    [this.none, cell, this.none, this.none]];

                this.size = 4;
                return;
            case Shapes.PentaLine:
                this.data = [
                    [this.none, this.none, cell, this.none, this.none],
                    [this.none, this.none, cell, this.none, this.none],
                    [this.none, this.none, cell, this.none, this.none],
                    [this.none, this.none, cell, this.none, this.none],
                    [this.none, this.none, cell, this.none, this.none]];

                this.size = 5;
                return;
        }
    }

    get(x: number, y: number): Cell {

        if (x >= this.size) throw EvalError('x (${x}) is grater than Shape.size');
        if (y >= this.size) throw EvalError('y (${y}) is grater than Shape.size');

        return this.data[x][y];
    }
}