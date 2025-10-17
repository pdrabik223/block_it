import { useRef, useState } from 'react';
import { Button } from '../components/Button.tsx';
import { Cell } from '../engine/enum_definitions.tsx';
import { GameLoop, PlayerInfo } from './GameLoop.tsx';
import { PlayerInfoBlock, type PlayerInfoRef } from '../components/PlayerInfoBlock.tsx';

import { useNavigate } from 'react-router-dom';
import { Column } from '../components/Column.tsx';


export const enum GameModes {
    Game2player,
    Game4player
}

export const MainMenu: React.FC<{}> = () => {

    const [gameMode, setGameMode] = useState<GameModes | null>(null);
    const [isPlaying, setIsPlaying] = useState<boolean>(false);

    const [playerInfo] = useState<Array<PlayerInfo>>([]);

    const inputRefs = [
        useRef<PlayerInfoRef>(null),
        useRef<PlayerInfoRef>(null),
        useRef<PlayerInfoRef>(null),
        useRef<PlayerInfoRef>(null),
    ]

    let navigate = useNavigate();

    const handleClick = (noPlayers: number) => {
        playerInfo.splice(0, playerInfo.length)
        for (let i = 0; i < noPlayers; i++) {
            let [isEngine, name] = inputRefs[i].current!.getState()
            playerInfo[i] = new PlayerInfo(name, isEngine);
        }
    };

    if (isPlaying) {
        return <GameLoop returnToMainMenu={() => { setGameMode(null); setIsPlaying(false); }} playerNames={playerInfo} />;
    }

    if (gameMode == null) return <>
        <Column >
            <h1>Block it</h1>
            <Button style={{ margin: "4px" }} onClick={() => navigate("/tutorial")}>Tutorial</Button>

            <Button style={{ margin: "4px" }} onClick={() => setGameMode(GameModes.Game2player)}>2 Player Mode</Button>
            <Button style={{ margin: "4px" }} onClick={() => setGameMode(GameModes.Game4player)}>4 Player Mode</Button>

            <Button style={{ margin: "4px" }} onClick={() => navigate("/painter")}>Painter</Button>
        </Column>
    </>;

    if (gameMode == GameModes.Game4player) return <>
        <Column>
            <h1>Settings </h1>
            <PlayerInfoBlock ref={inputRefs[0]} cell={Cell.Red} />
            <PlayerInfoBlock ref={inputRefs[1]} cell={Cell.Blue} />
            <PlayerInfoBlock ref={inputRefs[2]} cell={Cell.Green} />
            <PlayerInfoBlock ref={inputRefs[3]} cell={Cell.Orange} />

            <Button style={{ margin: "4px" }} onClick={() => { handleClick(4); setIsPlaying(true) }}>Start</Button>
            <Button style={{ margin: "4px" }} onClick={() => { setGameMode(null); setIsPlaying(false); }}>Back</Button>
        </Column>
    </>;

    if (gameMode == GameModes.Game2player) return <>
        <Column>
            <h1>Settings </h1>
            <PlayerInfoBlock ref={inputRefs[0]} cell={Cell.Red} />
            <PlayerInfoBlock ref={inputRefs[1]} cell={Cell.Blue} />

            <Button style={{ margin: "4px" }} onClick={() => { handleClick(2); setIsPlaying(true) }}>Start</Button>
            <Button style={{ margin: "4px" }} onClick={() => { setGameMode(null); setIsPlaying(false); }}>Back</Button>
        </Column>
    </>;
};
