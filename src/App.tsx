import './App.css'
import { Board, Cell } from './engine/engine'
import { BoardWidget } from './components/BoardWidget';
import { ShapeWidget } from './components/ShapeWidget';
import { Shape, Shapes } from './engine/Shape';


function App() {
  return (
    <>
      <BoardWidget board={new Board()} highlightShape={new Shape(Shapes.OffsetCross, Cell.Blue)} />
      <div className='row' style={{ flexWrap: 'wrap' }}>

        <ShapeWidget shape={new Shape(Shapes.Dot, Cell.Orange)} />
        <ShapeWidget shape={new Shape(Shapes.Tuple, Cell.Blue)} />
        <ShapeWidget shape={new Shape(Shapes.Triple, Cell.Red)} />
        <ShapeWidget shape={new Shape(Shapes.Square, Cell.Green)} />
        <ShapeWidget shape={new Shape(Shapes.TripleLine, Cell.Orange)} />
        <ShapeWidget shape={new Shape(Shapes.Cross, Cell.Blue)} />
        <ShapeWidget shape={new Shape(Shapes.TripleT, Cell.Red)} />
        <ShapeWidget shape={new Shape(Shapes.BigTripleT, Cell.Green)} />
        <ShapeWidget shape={new Shape(Shapes.TripleC, Cell.Orange)} />
        <ShapeWidget shape={new Shape(Shapes.Bolt, Cell.Blue)} />
        <ShapeWidget shape={new Shape(Shapes.TripleL, Cell.Red)} />
        <ShapeWidget shape={new Shape(Shapes.BigTripleL, Cell.Green)} />
        <ShapeWidget shape={new Shape(Shapes.TripleP, Cell.Orange)} />
        <ShapeWidget shape={new Shape(Shapes.OffsetCross, Cell.Blue)} />
        <ShapeWidget shape={new Shape(Shapes.Snake, Cell.Red)} />
        <ShapeWidget shape={new Shape(Shapes.TripleW, Cell.Green)} />
        <ShapeWidget shape={new Shape(Shapes.QuadrupleLine, Cell.Orange)} />
        <ShapeWidget shape={new Shape(Shapes.QuadrupleL, Cell.Blue)} />
        <ShapeWidget shape={new Shape(Shapes.QuadrupleOffsetL, Cell.Red)} />
        <ShapeWidget shape={new Shape(Shapes.QuadrupleBolt, Cell.Green)} />
        <ShapeWidget shape={new Shape(Shapes.PentaLine, Cell.Orange)} />

      </div>
    </>
  )
}

export default App;
