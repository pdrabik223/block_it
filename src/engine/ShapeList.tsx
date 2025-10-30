import { Cell } from "./enum_definitions.tsx"
import { Shape, shapeList } from "./Shape.tsx"

export class ShapeList {
    public data: Shape[]
    public color: Cell;

    // constructor();
    constructor(other?: ShapeList) {
        if (other != undefined) {
            this.data = other.data.slice()
            this.color = other.color
        }
        else {
            this.data = []
            this.color = Cell.None
        }
    }

    static GenerateShapes(color: Cell, noRepeats?: number) {

        noRepeats = noRepeats != undefined ? noRepeats : 1
        let result = new ShapeList()
        result.color = color
        result.data = []
        for (let shape of shapeList())
            for (let x = 0; x < noRepeats; x++)
                result.data.push(new Shape(shape, color!))

        return result
    }
    
    length(): number {
        return this.data.length

    }

    get(id: number) {
        return this.data[id];
    }

    remove(id: number) {
        this.data.splice(id, 1);
    }
    
    getPoints() {

        let sum = 0;
        for (let s of this.data) {
            sum += s.points()
        }
        return sum
    }

}
