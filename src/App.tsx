import { MainMenu } from './pages/MainMenu.tsx';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './App.css'
import "./pages/MainMenu.css"

export enum DebugLevel {
  Off,
  Engine,
  AllLogs,
  Error
}

export class GlobalState {
  public debugLevel = DebugLevel.Off
  public showPositionEvaluation = false
  public showMovesCount = false
  public condenseShapes = true
  public moveDelayMS: number = 100

}

export var globalSettingsState = new GlobalState();

export function setGlobalState(newGlobalState: GlobalState) {
  globalSettingsState = newGlobalState;
}

import { Tutorial } from './pages/Tutorial.tsx';
import { NavBar } from './components/NavBar.tsx';

function App() {

  return <>
    <Router>
      <NavBar />
      <Routes>
        <Route path="*" element={<MainMenu />} />
        <Route path="/tutorial" element={<Tutorial />} />
      </Routes>
    </Router></>

}

export default App;
