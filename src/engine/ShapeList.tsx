import { Cell } from "./enum_definitions.tsx"
import { Shape } from "./Shape.tsx"
import { shapeList } from "./shapeDefinitions.tsx";

export class ShapeList {
    private data: Shape[]
    private count: number[]
    public color: Cell;

    constructor(other?: ShapeList) {
        if (other != undefined) {
            this.data = other.data.slice()
            this.count = other.count.slice()
            this.color = other.color

        }
        else {
            this.data = []
            this.count = []

            this.color = Cell.None
        }
    }

    static GenerateShapes(color: Cell, noRepeats?: number) {

        noRepeats = noRepeats != undefined ? noRepeats : 1
        if (noRepeats <= 0) noRepeats = 1

        let result = new ShapeList()

        result.color = color
        result.data = []
        result.count = []

        for (let shape of shapeList()) {
            result.count.push(noRepeats)
            result.data.push(new Shape(shape, color))
        }
        return result
    }

    isEmpty(): boolean {

        return this.data.length == 0
    }

    noShapes(): number {
        let sum = 0;

        for (let i = 0; i < this.data.length; i++) {
            sum += this.count[i]
        }

        return sum

    }

    noDuplicates(id: number): number {
        return this.count[id]

    }
    uniqueElementsLength(): number {
        return this.data.length
    }

    get(id: number) {
        return this.data[id];
    }

    remove(id: number) {
        if (this.count[id] == 1) {
            this.data.splice(id, 1);
            this.count.splice(id, 1);
        } else {
            --this.count[id]
        }
    }

    getAllShapes() {
        return this.data
    }

    getPoints(): number {

        let sum = 0;
        for (let i = 0; i < this.data.length; i++) {
            sum += this.data[i].points() * this.count[i]
        }
        return sum
    }

}
