import Markdown from 'react-markdown'
import textFile from '../assets/wiki/game_rules.md?raw'

export function Tutorial() {

    return <>

        <Markdown>
            {textFile}
        </Markdown>
    </>
}

