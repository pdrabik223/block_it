import type { Shape } from "./Shape";

export const enum Cell {
    Red = 1,
    Orange = 2,
    Green = 3,
    Blue = 4,
    Empty = 5,
    Border = 6,
    None = 7,
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

}
