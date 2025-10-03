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

    constructor() {
        for (let i = 0; i < Board.height * Board.width; i++) {
            this.data.push(Cell.Empty);
        }
    }
    get(x: number, y: number): Cell {

        if (x >= Board.height) throw EvalError('x (${x}) is grater than Board.height');
        if (y >= Board.width) throw EvalError('y (${y}) is grater than Board.width');

        return this.data[x * Board.width + y];
    }

}
