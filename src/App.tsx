import { Game2Player, Game4Player, MainMenu } from './pages/MainMenu.tsx';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './App.css'

import { Tutorial } from './pages/Tutorial.tsx';
import { NavBar } from './components/NavBar.tsx';
import { Painter } from './pages/Painter.tsx';
import { GlobalState } from './GlobalSettings.tsx';
import { useState } from 'react';
import { BackGround } from './BackGround.tsx';
import { AllShapePermutationsProps } from './pages/AllShapePermutations.tsx';

export var globalSettingsState = new GlobalState();

export function setGlobalState(newGlobalState: GlobalState) {
  globalSettingsState = newGlobalState;
  globalSettingsState.updateCookies();
}

function App() {
  const [showBackground, setShowBackground] = useState(true)
  return <>
    <Router>
      <NavBar />
      <BackGround show={showBackground} />
      <Routes>
        <Route path="*" element={<MainMenu setShowBackground={setShowBackground} />} />
        <Route path="/game_2_player" element={<Game2Player setShowBackground={setShowBackground} />} />
        <Route path="/game_4_player" element={<Game4Player setShowBackground={setShowBackground} />} />
        <Route path="/tutorial" element={<Tutorial />} />
        <Route path="/painter" element={<Painter setShowBackground={setShowBackground} />} />
        <Route path="/shapes" element={<AllShapePermutationsProps />} />
      
      </Routes>
    </Router>

  </>
}

export default App;

