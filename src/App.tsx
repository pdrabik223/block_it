import './App.css'
import { MainMenu } from './pages/MainMenu.tsx';
import reactLogo from './assets/github-mark-white.svg';
import { IconButton, TitleButton } from './components/Button.tsx';

function App() {

  return <>

    <div style={{ position: "absolute", height: "80px", width: "100%", backgroundColor: 'transparent', left: "0px", top: "0px", display: 'flex', alignItems: 'center' }}>

      <TitleButton text={'Block it'} onClick={() => window.location.reload()} style={{ zIndex: 1200, paddingLeft: "12px" }}></TitleButton>
      <IconButton src={reactLogo} onClick={() => window.open("https://github.com/pdrabik223", "_blank")} style={{ height: '36px', marginLeft: 'auto', paddingRight: "12px" }}></IconButton>
    </div>
    <MainMenu />
  </>
}

export default App;


