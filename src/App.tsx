import { Game2Player, Game4Player, MainMenu } from './pages/MainMenu.tsx';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './App.css'

export enum DebugLevel {
  Off,
  Engine,
  AllLogs,
  Error
}

export enum CellStyle {
  Simple,
  Classic,
  Fake3D,
}

export class GlobalState {
  public debugLevel = DebugLevel.Off
  public showPositionEvaluation = false
  public showMovesCount = false
  public cellStyle = CellStyle.Fake3D
  public condenseShapes = true
  public moveDelayMS: number = 100

}

export var globalSettingsState = new GlobalState();

export function setGlobalState(newGlobalState: GlobalState) {
  globalSettingsState = newGlobalState;
}
import { Tutorial } from './pages/Tutorial.tsx';
import { NavBar } from './components/NavBar.tsx';
import { Painter } from './pages/Painter.tsx';


function App() {

  return <>
    <Router>
      <NavBar />
      <Routes>
        <Route path="*" element={<MainMenu />} />
        <Route path="/game_2_player" element={<Game2Player />} />
        <Route path="/game_4_player" element={<Game4Player />} />
        <Route path="/tutorial" element={<Tutorial />} />
        <Route path="/painter" element={<Painter />} />
      </Routes>
    </Router></>

}

export default App;
