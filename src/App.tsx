import './App.css'
import { Board, Cell } from './engine/engine.tsx'
import { Shape, Shapes } from './engine/Shape.tsx';
import { BoardEditWidget, GameLoop } from './components/BoardEditWidget.tsx';

function App() {

  return (
    <GameLoop playerNames={["X", "Y", "Z", "A"]} />
  )
}

export default App;
