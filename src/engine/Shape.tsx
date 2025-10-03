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
    constructor(shape: Shapes, cell: Cell) {
        this.shapeName = shape;
        let none = Cell.None;
        switch (shape) {
            case Shapes.Dot:
                this.data = [[cell]];
                this.size = 1;
                return;
            case Shapes.Tuple:
                this.data = [[cell, cell], [none, none]];
                this.size = 2;
                return;
            case Shapes.Triple:
                this.data = [[cell, cell], [cell, none]];
                this.size = 2;
                return;
            case Shapes.Square:
                this.data = [[cell, cell], [cell, cell]];
                this.size = 2;
                return;
            case Shapes.Cross:
                this.data = [
                    [none, cell, none],
                    [cell, cell, cell],
                    [none, cell, none],];
                this.size = 3;
                return;
            case Shapes.TripleLine:
                this.data = [
                    [none, none, none],
                    [cell, cell, cell],
                    [none, none, none],];
                this.size = 3;
                return;
            case Shapes.TripleT:
                this.data = [
                    [none, none, none],
                    [cell, cell, cell],
                    [none, cell, none],];
                this.size = 3;
                return;
            case Shapes.BigTripleT:
                this.data = [
                    [cell, cell, cell],
                    [none, cell, none],
                    [none, cell, none],];
                this.size = 3;
                return;
            case Shapes.TripleC:
                this.data = [
                    [cell, cell, none],
                    [cell, none, none],
                    [cell, cell, none],];
                this.size = 3;
                return;
            case Shapes.Bolt:
                this.data = [
                    [cell, none, none],
                    [cell, cell, none],
                    [none, cell, cell,],];
                this.size = 3;
                return;
            case Shapes.TripleL:
                this.data = [
                    [cell, none, none],
                    [cell, none, none],
                    [cell, cell, none]];
                this.size = 3;
                return;
            case Shapes.BigTripleL:
                this.data = [
                    [cell, none, none],
                    [cell, none, none],
                    [cell, cell, cell]];
                this.size = 3;
                return;
            case Shapes.TripleP:
                this.data = [
                    [cell, cell, none],
                    [cell, cell, none],
                    [cell, none, none]];
                this.size = 3;
                return;
            case Shapes.OffsetCross:
                this.data = [
                    [none, none, cell],
                    [cell, cell, cell],
                    [none, cell, none]];
                this.size = 3;
                return;
            case Shapes.Snake:
                this.data = [
                    [none, cell, cell],
                    [none, cell, none],
                    [cell, cell, none]];
                this.size = 3;
                return;
            case Shapes.TripleW:
                this.data = [
                    [none, cell, cell],
                    [cell, cell, none],
                    [cell, none, none]];
                this.size = 3;
                return;
            case Shapes.QuadrupleLine:
                this.data = [
                    [none, cell, none, none],
                    [none, cell, none, none],
                    [none, cell, none, none],
                    [none, cell, none, none]];

                this.size = 4;
                return;
            case Shapes.QuadrupleL:
                this.data = [
                    [none, cell, none, none],
                    [none, cell, none, none],
                    [none, cell, none, none],
                    [none, cell, cell, none]];

                this.size = 4;
                return;
            case Shapes.QuadrupleOffsetL:
                this.data = [
                    [none, cell, none, none],
                    [none, cell, none, none],
                    [none, cell, cell, none],
                    [none, cell, none, none]];

                this.size = 4;
                return;
            case Shapes.QuadrupleBolt:
                this.data = [
                    [none, none, cell, none],
                    [none, cell, cell, none],
                    [none, cell, none, none],
                    [none, cell, none, none]];

                this.size = 4;
                return;
            case Shapes.PentaLine:
                this.data = [
                    [none, none, cell, none, none],
                    [none, none, cell, none, none],
                    [none, none, cell, none, none],
                    [none, none, cell, none, none],
                    [none, none, cell, none, none]];

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