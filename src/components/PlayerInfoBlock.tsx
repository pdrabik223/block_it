import { useImperativeHandle, useState } from "react";
import { engineMap } from "../pages/EngineGameUI.tsx";
import type { Cell } from "../engine/enum_definitions.tsx";
import { Button } from "./Button.tsx";
import { CellWidget } from "./CellWidget.tsx";
import { v4 as uuidv4 } from 'uuid';
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

export interface PlayerInfoRef {
    getState: () => [boolean, string];
}

interface PlayerInfoBlockProps { ref: React.RefObject<PlayerInfoRef | null>; cell: Cell }

export const PlayerInfoBlock: React.FC<PlayerInfoBlockProps> = (props: PlayerInfoBlockProps) => {

    let engines = Array.from(engineMap.keys());

    const [isPlayer, setIsPlayer] = useState(false);
    const [username, setUsername] = useState<string>(usernames[Math.floor(Math.random() * usernames.length)]);
    const [engine, setEngine] = useState<string>(engines[0]);

    useImperativeHandle(props.ref, () => ({
        getState: () => [!isPlayer, isPlayer ? username : engine],
    }));

    let EngineOptions = [];

    for (let value of engines) {
        EngineOptions.push(<option style={{ margin: "4px", minWidth: "100%" }} key={uuidv4()} value={value}>{value}</option>)

    }


    return <div key={uuidv4()} className='row' style={{ margin: "4px" }}>
        <Button style={{ margin: "4px", width: "42%" }} onClick={() => setIsPlayer(!isPlayer)}>{isPlayer ? "Player" : "Engine"}</Button>
        {isPlayer ? <input onChange={(v) => setUsername(v.currentTarget.value)} minLength={1} style={{ margin: "4px" }} value={username}></input> :

            <select style={{ margin: "4px", width: "200px" }} value={engine} onChange={(e) => setEngine(e.currentTarget.value)}>
                {EngineOptions}
            </select>}

        <div className='column'>
            <CellWidget value={props.cell} size={40} />
        </div>
    </div>;
}