import './App.css'
import { Board, Cell, Shape, Shapes } from './engine/engine'
import { BoardWidget } from './components/BoardWidget';
import { CellWidget } from './components/CellWidget';
import type { JSX } from 'react';

interface ShapeWidgetProps { shape: Shape }
const ShapeWidget: React.FC<ShapeWidgetProps> = (props: ShapeWidgetProps) => {

  let data: JSX.Element[] = []

  for (let x = 0; x < props.shape.size; x++) {

    let temp = [];
    for (let y = 0; y < props.shape.size; y++) {

      temp.push(
        <CellWidget value={props.shape.get(x, y)} />
      );
    }
    data.push(<div className='row'>{temp}</div>);
  }

  return <div>
    <div className='column'> {data} </div>
  </div>
}

function App() {
  return (
    <>
      <BoardWidget board={new Board()} />
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
