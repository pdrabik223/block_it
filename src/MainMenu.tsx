import { useRef, useState } from 'react';
import { Button } from './components/Button.tsx';
import { Cell } from './engine/enum_definitions.tsx';
import { GameLoop, PlayerInfo } from './pages/BoardEditWidget.tsx';
import { PlayerInfoBlock, type PlayerInfoRef } from './components/PlayerInfoBlock.tsx';


export const enum GameModes {
    Game2player,
    Game4player
}


export const MainMenu: React.FC<{}> = () => {

    const [gameMode, setGameMode] = useState<GameModes | null>(null);
    const [isPlaying, setIsPlaying] = useState<boolean>(false);

    const [playerInfo] = useState<Array<PlayerInfo>>([
        new PlayerInfo("X", false),
        new PlayerInfo("X", false),
        new PlayerInfo("X", false),
        new PlayerInfo("X", false)]);

    const inputRefs = [
        useRef<PlayerInfoRef>(null),
        useRef<PlayerInfoRef>(null),
        useRef<PlayerInfoRef>(null),
        useRef<PlayerInfoRef>(null),
    ]

    if (isPlaying) {
        return <GameLoop returnToMainMenu={() => { setGameMode(null); setIsPlaying(false); }} playerNames={playerInfo} />;
    }

    const handleClick = () => {
        for (let i = 0; i < inputRefs.length; i++) {
            let [isEngine, name] = inputRefs[i].current!.getState()
            playerInfo[i] = new PlayerInfo(name, isEngine);
        }
    };

    if (gameMode == null) return <>
        <div className='column'>
            <h1>Block it</h1>
            <Button style={{ margin: "4px" }}>Tutorial</Button>
            <Button style={{ margin: "4px" }} onClick={() => setGameMode(GameModes.Game2player)}>2 Player Game</Button>
            <Button style={{ margin: "4px" }} onClick={() => setGameMode(GameModes.Game4player)}>4 Player Game</Button>
        </div>
    </>;

    if (gameMode == GameModes.Game4player) return <>
        <div className='column'>
            <h1>Settings </h1>
            <PlayerInfoBlock ref={inputRefs[0]} cell={Cell.Red} />
            <PlayerInfoBlock ref={inputRefs[1]} cell={Cell.Blue} />
            <PlayerInfoBlock ref={inputRefs[2]} cell={Cell.Green} />
            <PlayerInfoBlock ref={inputRefs[3]} cell={Cell.Orange} />
            <Button style={{ margin: "4px" }} onClick={() => { handleClick(); setIsPlaying(true) }}>Start</Button>
            <Button style={{ margin: "4px" }} onClick={() => { setGameMode(null); setIsPlaying(false); }}>Back</Button>
        </div>
    </>;

    if (gameMode == GameModes.Game2player) return <>
        <div className='column'>
            <h1>Settings </h1>
            <PlayerInfoBlock ref={inputRefs[0]} cell={Cell.Red} />
            <PlayerInfoBlock ref={inputRefs[1]} cell={Cell.Blue} />

            <Button style={{ margin: "4px" }} onClick={() => setIsPlaying(true)}>Start</Button>
            <Button style={{ margin: "4px" }} onClick={() => { setGameMode(null); setIsPlaying(false); }}>Back</Button>
        </div>
    </>;
};
