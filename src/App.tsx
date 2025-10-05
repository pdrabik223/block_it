import './App.css'
import { Board, Cell } from './engine/engine.tsx'
import { Shape, Shapes } from './engine/Shape.tsx';
import { BoardEditWidget } from './components/BoardEditWidget.tsx';

function App() {
  return (
    <BoardEditWidget board={new Board()} shapes={[
      new Shape(Shapes.Dot, Cell.Orange),
      new Shape(Shapes.Tuple, Cell.Blue),
      new Shape(Shapes.Triple, Cell.Red),
      new Shape(Shapes.Square, Cell.Green),
      new Shape(Shapes.TripleLine, Cell.Orange),
      new Shape(Shapes.Cross, Cell.Blue),
      new Shape(Shapes.TripleT, Cell.Red),
      new Shape(Shapes.BigTripleT, Cell.Green),
      new Shape(Shapes.TripleC, Cell.Orange),
      new Shape(Shapes.Bolt, Cell.Blue),
      new Shape(Shapes.TripleL, Cell.Red),
      new Shape(Shapes.BigTripleL, Cell.Green),
      new Shape(Shapes.TripleP, Cell.Orange),
      new Shape(Shapes.OffsetCross, Cell.Blue),
      new Shape(Shapes.Snake, Cell.Red),
      new Shape(Shapes.TripleW, Cell.Green),
      new Shape(Shapes.QuadrupleLine, Cell.Orange),
      new Shape(Shapes.QuadrupleL, Cell.Blue),
      new Shape(Shapes.QuadrupleOffsetL, Cell.Red),
      new Shape(Shapes.QuadrupleBolt, Cell.Green),
      new Shape(Shapes.PentaLine, Cell.Orange)
    ]} />


  )
}

export default App;
