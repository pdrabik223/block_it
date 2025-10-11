# Block it game engine

## Task Board

1. Create ui for playing the game yourself
   1. ~~Add exit game all together button~~
   2. ~~Make config overlay less darkening~~
   3. Add Play Again button with the same player config
   4. 2 player mode
   5. Better engine move visualizer -> simply change the delay length after engine move
   6. Light version of the app  
   7. Flip vertically in piece settings
   8. Screen jumps up and down if players have different number of pieces
   9. Favicon
   10. Better dropdown and input box styling
   11. ~~hide overflow cell~~
   12. rotate shape to face mouse cursor when it's held down
   13. on mobile, cell selection does not work
   14. add theme change button
   15. add better background
   16. add piece color selector
   17. add variable delay after move for engines 
   18. add "show additional information in settings" that will show Board coverage percentage 
   19. ~~hide github svg at the bottom of settings drawer~~
   20. ~~add Info about version at the bottom of settings~~

2. Make a engine that calculates the best move in position:
    algos planned:
    1. Randy -> randomly picks one move from list of possible DONE
    2. Pointer -> places pieces in random places from biggest to smallest DONE
    3. Aggressive -> places pieces as far from the starting point as possible IN PROGRESS
    4. Aggressive Pointer
    5. Dead cells minimizer -> all cells adresant to piece are dead to the color, so minimizing those will lead to better groupings of cells + Pointer + Aggresive

3. Optymisation:
   1. move generator generates duplicates
   2. Also we do a lot of unnecessary redrawing since all cells in board are repainted every user action

# Framework
We can go full react mode, no backend all frontend app -> react + typescript 


# Run prod version
1. Install serve
``` bash
npm install -g serve
```
2. Flip isInitialMount value in file Engine Game UI
``` tsx

 // on prod this needs to be flipped
    const isInitialMount = useRef(false);

    useEffect(() => {
        if (isInitialMount.current) {
            isInitialMount.current = true;
        } else {
            engineFunction();
        }

    }, [props.iteration]);

```

3. Build project in prod mode
``` bash
npm run build
```
4. Serve project locally 
``` bash
serve -s dist
```

# Deploy to GH pages

1. Flip isInitialMount value in file Engine Game UI
``` tsx

 // on prod this needs to be flipped
    const isInitialMount = useRef(false);

    useEffect(() => {
        if (isInitialMount.current) {
            isInitialMount.current = true;
        } else {
            engineFunction();
        }

    }, [props.iteration]);

```

2. Build app locally 
``` bash
npm run build
```

2. Publish change using 
``` bash
npm run deploy
```

3. Change path to js and css files in dist/index.html
   from:
   ``` html
   <script type="module" crossorigin src="/assets/index-HvKn5xYP.js"></script>
   <link rel="stylesheet" crossorigin href="/assets/index-CtzYGyey.css">
   ```  
   to: 
   ``` html
   <script type="module" crossorigin src="https://pdrabik223.github.io/block_it/assets/index-HvKn5xYP.js"></script>
   <link rel="stylesheet" crossorigin href="https://pdrabik223.github.io/block_it/assets/index-CtzYGyey.css">
   ```
   This probably can be configured somewhere, but right now I don't want to bother with it   
