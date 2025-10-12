import { MainMenu } from './pages/MainMenu.tsx';
import { IconButton, TitleButton } from './components/Button.tsx';
import { SettingsOverlay } from './components/FullScreenOverlay.tsx';
import { useReducer, useState } from 'react';
import { TopBanner } from './TopBanner.tsx';
import { SettingsPage } from './SettingsPage.tsx';
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
  public moveDelayMS: number = 250
}

export var globalSettingsState = new GlobalState();

function setGlobalState(newGlobalState: GlobalState) {
  globalSettingsState = newGlobalState;
}

import { IoMdSettings } from "react-icons/io";
import { Tutorial } from './pages/Tutorial.tsx';
import { useNavigate } from "react-router";

function App() {

  return <>
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<MainMenu />} />
        <Route path="/tutorial" element={<Tutorial />} />
      </Routes>
    </Router></>

}

export default App;

interface NavBarProps {

}

export const NavBar: React.FC<NavBarProps> = (props: NavBarProps) => {
  const [showSettings, setShowSettings] = useState(false)


  let navigate = useNavigate();
  return <>
    <TopBanner
      leading={<TitleButton style={{ fontSize: 'xx-large' }} text={'Block it'} onClick={() => { navigate("/"); }} />}
      following={<IconButton
        onClick={() => { setShowSettings(true) }}>
        <IoMdSettings size={'50px'} />
      </IconButton>} />

    <SettingsOverlay style={{ zIndex: 21, backgroundColor: '#242424' }} show={showSettings}>
      <SettingsPage cookies={globalSettingsState} setGlobalState={setGlobalState} onSettingsClosed={() => setShowSettings(false)} />
    </SettingsOverlay>
  </>

}