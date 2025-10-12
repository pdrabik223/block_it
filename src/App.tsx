import { MainMenu } from './pages/MainMenu.tsx';
import { IconButton, TitleButton } from './components/Button.tsx';
import { SettingsOverlay } from './components/FullScreenOverlay.tsx';
import { useState } from 'react';
import { TopBanner } from './TopBanner.tsx';
import { SettingsPage } from './SettingsPage.tsx';

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

function App() {
  const [showSettings, setShowSettings] = useState(false)

  return <>
    <TopBanner
      leading={<TitleButton style={{fontSize: 'xx-large'}} text={'Block it'} onClick={() => window.location.reload()} />}
      following={<IconButton
        onClick={() => { setShowSettings(true) }}>
        <IoMdSettings size={'50px'} />
      </IconButton>} />

    <SettingsOverlay style={{ zIndex: 21, backgroundColor: '#242424' }} show={showSettings}>
      <SettingsPage cookies={globalSettingsState} setGlobalState={setGlobalState} onSettingsClosed={() => setShowSettings(false)} />
    </SettingsOverlay >
    <MainMenu />
  </>
}

export default App;


