import { useImperativeHandle, useRef, useState } from 'react';

import { GameLoop } from './components/BoardEditWidget.tsx';
import { CellWidget } from './components/CellWidget.tsx';
import { Cell } from './engine/engine.tsx';
import { v4 as uuidv4 } from 'uuid';

export interface MainMenuProps { }

export const enum GameModes {
    Game2player,
    Game4player
}

export const usernames = [
    "Tony Stark",
    "Bruce Wayne",
    "Harry Potter",
    "Hermione Granger",
    "Walter White",
    "Luke Skywalker",
    "Darth Vader",
    "Frodo Baggins",
    "Indiana Jones",
    "Lara Croft",
    "Peter Parker",
    "Clark Kent",
    "Diana Prince",
    "James Bond",
    "Ellen Ripley",
    "Marty McFly",
    "Rick Sanchez",
    "Geralt of Rivia"
];


interface PlayerInfoRef {
    getState: () => [boolean, string];
}

export const MainMenu: React.FC<MainMenuProps> = (props: MainMenuProps) => {

    const [gameMode, setGameMode] = useState<GameModes | null>(null);
    const [isPlaying, setIsPlaying] = useState<boolean>(false);

    const [playerNames, setPlayerNames] = useState<Array<string>>(["X", "Y", "Z", "A"]);
    const [isEngine, setIsEngine] = useState<Array<boolean>>([false, false, false, false]);

    const inputRefs = [
        useRef<PlayerInfoRef>(null),
        useRef<PlayerInfoRef>(null),
        useRef<PlayerInfoRef>(null),
        useRef<PlayerInfoRef>(null),
    ]

    if (isPlaying) {
        return <GameLoop returnToMainMenu={() => { setGameMode(null); setIsPlaying(false); }} playerNames={playerNames} />;
    }

    const handleClick = () => {


        for (let i = 0; i < inputRefs.length; i++) {
            let [isPlayer, name] = inputRefs[i].current!.getState()
            playerNames[i] = name;
            isEngine[i] = !isPlayer;

        }
    };

    if (gameMode == null) return <>
        <div className='column'>
            <h1>Block it</h1>
            <button style={{ margin: "4px" }}>Tutorial</button>
            <button style={{ margin: "4px" }} onClick={() => setGameMode(GameModes.Game2player)}>2 Player Game</button>
            <button style={{ margin: "4px" }} onClick={() => setGameMode(GameModes.Game4player)}>4 Player Game</button>
        </div>
    </>;

    if (gameMode == GameModes.Game4player) return <>
        <div className='column'>
            <h1>Settings </h1>
            <PlayerInfoBlock ref={inputRefs[0]} cell={Cell.Red} />
            <PlayerInfoBlock ref={inputRefs[1]} cell={Cell.Blue} />
            <PlayerInfoBlock ref={inputRefs[2]} cell={Cell.Green} />
            <PlayerInfoBlock ref={inputRefs[3]} cell={Cell.Orange} />
            <button style={{ margin: "4px" }} onClick={() => { handleClick(); setIsPlaying(true) }}>Start</button>
            <button style={{ margin: "4px" }} onClick={() => { setGameMode(null); setIsPlaying(false); }}>Back</button>
        </div>
    </>;

    if (gameMode == GameModes.Game2player) return <>
        <div className='column'>
            <h1>Settings </h1>
            <PlayerInfoBlock ref={inputRefs[0]} cell={Cell.Red} />
            <PlayerInfoBlock ref={inputRefs[1]} cell={Cell.Blue} />

            <button style={{ margin: "4px" }} onClick={() => setIsPlaying(true)}>Start</button>
            <button style={{ margin: "4px" }} onClick={() => { setGameMode(null); setIsPlaying(false); }}>Back</button>
        </div>
    </>;
};

interface PlayerInfoBlockProps { ref: React.RefObject<PlayerInfoRef | null>; cell: Cell }

export const PlayerInfoBlock: React.FC<PlayerInfoBlockProps> = (props: PlayerInfoBlockProps) => {
    let engines = new Array<string>("Randy", "Martin")

    const [isPlayer, setIsPlayer] = useState(true);
    const [username, setUsername] = useState<string>(usernames[Math.floor(Math.random() * usernames.length)]);
    const [engine, setEngine] = useState<string>(engines[0]);


    useImperativeHandle(props.ref, () => ({
        getState: () => [isPlayer, isPlayer ? username : engine],
    }));

    let EngineOptions = [];
    for (let value of engines)
        EngineOptions.push(<option key={uuidv4()} onChange={(e) => setEngine(e.currentTarget.value)}>{value}</option>)


    return <div key={uuidv4()} className='row' style={{ margin: "4px" }}>
        <button style={{ margin: "4px", width: "42%" }} onClick={() => setIsPlayer(!isPlayer)}>{isPlayer ? "Player" : "Engine"}</button>
        {isPlayer ? <input onChange={(v) => setUsername(v.currentTarget.value)} minLength={1} style={{ margin: "4px" }} value={username}></input> : <select style={{ margin: "4px", width: "100%" }}>
            {EngineOptions}
        </select>}

        <div className='column'>
            <CellWidget value={props.cell} size={40} />
        </div>
    </div>;
}