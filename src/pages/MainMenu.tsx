import { useRef, useState } from 'react';
import { Button } from '../components/Button.tsx';
import { Cell } from '../engine/enum_definitions.tsx';
import { GameLoop, PlayerInfo } from './GameLoop.tsx';
import { PlayerInfoBlock, type PlayerInfoRef } from '../components/PlayerInfoBlock.tsx';

import { useNavigate } from 'react-router-dom';
import { Column } from '../components/Column.tsx';

export const Game2Player: React.FC<{}> = () => {

    const [playerInfo] = useState<Array<PlayerInfo>>([]);
    const [isPlaying, setIsPlaying] = useState<boolean>(false);
    let navigate = useNavigate();

    const inputRefs = [
        useRef<PlayerInfoRef>(null),
        useRef<PlayerInfoRef>(null),
    ]

    if (isPlaying) {
        return <GameLoop returnToMainMenu={() => { setIsPlaying(false); }} playerNames={playerInfo} />;
    }

    const handleClick = () => {
        playerInfo.splice(0, playerInfo.length)
        for (let i = 0; i < 2; i++) {
            let [isEngine, name] = inputRefs[i].current!.getState()
            playerInfo[i] = new PlayerInfo(name, isEngine);
        }
    };

    return <Column>
        <h1>Settings </h1>
        <PlayerInfoBlock ref={inputRefs[0]} cell={Cell.Red} />
        <PlayerInfoBlock ref={inputRefs[1]} cell={Cell.Blue} />

        <Button style={{ margin: "4px" }} onClick={() => { handleClick(); setIsPlaying(true) }}>Start</Button>
        <Button style={{ margin: "4px" }} onClick={() => navigate("/")}>Back</Button>
    </Column>
}

export const Game4Player: React.FC<{}> = () => {

    const [playerInfo] = useState<Array<PlayerInfo>>([]);
    const [isPlaying, setIsPlaying] = useState<boolean>(false);

    let navigate = useNavigate();

    const inputRefs = [
        useRef<PlayerInfoRef>(null),
        useRef<PlayerInfoRef>(null),
        useRef<PlayerInfoRef>(null),
        useRef<PlayerInfoRef>(null),
    ]

    if (isPlaying) {
        return <GameLoop returnToMainMenu={() => { setIsPlaying(false); }} playerNames={playerInfo} />;
    }

    const handleClick = () => {
        playerInfo.splice(0, playerInfo.length)
        for (let i = 0; i < 4; i++) {
            let [isEngine, name] = inputRefs[i].current!.getState()
            playerInfo[i] = new PlayerInfo(name, isEngine);
        }
    };

    return <Column>
        <h1>Settings </h1>

        <PlayerInfoBlock ref={inputRefs[0]} cell={Cell.Red} />
        <PlayerInfoBlock ref={inputRefs[1]} cell={Cell.Blue} />
        <PlayerInfoBlock ref={inputRefs[2]} cell={Cell.Green} />
        <PlayerInfoBlock ref={inputRefs[3]} cell={Cell.Orange} />

        <Button style={{ margin: "4px" }} onClick={() => { handleClick(); setIsPlaying(true) }}>Start</Button>
        <Button style={{ margin: "4px" }} onClick={() => navigate("/")}>Back</Button>
    </Column>
}

export const MainMenu: React.FC<{}> = () => {

    let navigate = useNavigate();

    return <div>
        <Column expanded={true} style={{ width: "200px" }}>
            <h1>Block it</h1>
            <Button style={{ margin: "4px" }} onClick={() => navigate("/tutorial")}>Tutorial</Button>

            <Button style={{ margin: "4px" }} onClick={() => navigate("/game_2_player")}>2 Player Mode</Button>
            <Button style={{ margin: "4px" }} onClick={() => navigate("/game_4_player")}>4 Player Mode</Button>

            <Button style={{ margin: "4px" }} onClick={() => navigate("/painter")}>Painter</Button>
        </Column>
    </div>

};
