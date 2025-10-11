import './App.css'
import { MainMenu } from './pages/MainMenu.tsx';
import { IconButton, TitleButton } from './components/Button.tsx';
import { SettingsOverlay } from './components/FullScreenOverlay.tsx';
import { useState } from 'react';
import "./pages/MainMenu.css"

let settingsPath = <path d="M47.16,21.221l-5.91-0.966c-0.346-1.186-0.819-2.326-1.411-3.405l3.45-4.917c0.279-0.397,0.231-0.938-0.112-1.282 l-3.889-3.887c-0.347-0.346-0.893-0.391-1.291-0.104l-4.843,3.481c-1.089-0.602-2.239-1.08-3.432-1.427l-1.031-5.886 C28.607,2.35,28.192,2,27.706,2h-5.5c-0.49,0-0.908,0.355-0.987,0.839l-0.956,5.854c-1.2,0.345-2.352,0.818-3.437,1.412l-4.83-3.45 c-0.399-0.285-0.942-0.239-1.289,0.106L6.82,10.648c-0.343,0.343-0.391,0.883-0.112,1.28l3.399,4.863 c-0.605,1.095-1.087,2.254-1.438,3.46l-5.831,0.971c-0.482,0.08-0.836,0.498-0.836,0.986v5.5c0,0.485,0.348,0.9,0.825,0.985 l5.831,1.034c0.349,1.203,0.831,2.362,1.438,3.46l-3.441,4.813c-0.284,0.397-0.239,0.942,0.106,1.289l3.888,3.891 c0.343,0.343,0.884,0.391,1.281,0.112l4.87-3.411c1.093,0.601,2.248,1.078,3.445,1.424l0.976,5.861C21.3,47.647,21.717,48,22.206,48 h5.5c0.485,0,0.9-0.348,0.984-0.825l1.045-5.89c1.199-0.353,2.348-0.833,3.43-1.435l4.905,3.441 c0.398,0.281,0.938,0.232,1.282-0.111l3.888-3.891c0.346-0.347,0.391-0.894,0.104-1.292l-3.498-4.857 c0.593-1.08,1.064-2.222,1.407-3.408l5.918-1.039c0.479-0.084,0.827-0.5,0.827-0.985v-5.5C47.999,21.718,47.644,21.3,47.16,21.221z M25,32c-3.866,0-7-3.134-7-7c0-3.866,3.134-7,7-7s7,3.134,7,7C32,28.866,28.866,32,25,32z" />
let closeSettings = <path d="M50.385,50.385c-10.153,10.153-26.616,10.153-36.77,0s-10.153-26.616,0-36.77s26.616-10.153,36.77,0	S60.538,40.231,50.385,50.385z M43.314,40.485L36.243,32l7.071-8.485l-2.828-2.828L32,27.757l-8.485-7.071l-2.828,2.828L27.757,32	l-7.071,8.485l2.828,2.828L32,36.243l8.485,7.071L43.314,40.485z" />

export interface SettingsPageRef {
  onSettingsClosed: () => void;
}

export const SettingsPage: React.FC<SettingsPageRef> = (props: SettingsPageRef) => {

  return <>
    <TopBanner title="Settings"
      following={<IconButton
        width={30}
        height={30}
        svg={closeSettings}
        onClick={props.onSettingsClosed}
        style={{ marginLeft: 'auto', paddingRight: "12px" }} />} />

    <div className="column" style={{ height: "100%" }}>
      <p>Version 3.14</p>
      <a onClick={() => window.open("https://github.com/pdrabik223", "_blank")}>Github</a>
    </div>
  </>

}

export interface TopBannerRef {
  leading?: React.ReactNode
  title: string,
  following?: React.ReactNode
}

export const TopBanner: React.FC<TopBannerRef> = (props: TopBannerRef) => {

  return <div style={{ position: "absolute", height: "80px", width: "100%", maxWidth: "1600px", backgroundColor: 'transparent', left: "0px", top: "0px", display: 'flex', alignItems: 'center' }}>
    {props.leading}
    <div className='row' >
      <h2>{props.title}</h2>
    </div>
    {props.following}
  </div>
}

function App() {
  const [showSettings, setShowSettings] = useState(false)
  return <>
    <TopBanner title="Title"
      leading={<TitleButton text={'Block it'} onClick={() => window.location.reload()}
        style={{ zIndex: 20, paddingLeft: "12px", width: "8%" }} />}
      following={<IconButton
        width={30}
        height={30}
        svg={settingsPath}
        onClick={() => { setShowSettings(true) }}
        style={{ height: '34px', marginLeft: 'auto', paddingRight: "12px" }}></IconButton>} />

    <SettingsOverlay style={{ zIndex: 21, backgroundColor: '#242424' }} show={showSettings}>
      <SettingsPage onSettingsClosed={() => setShowSettings(false)} />
    </SettingsOverlay >
    <MainMenu />
  </>
}

export default App;


