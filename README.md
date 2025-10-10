# Block it game engine

## Task Board

1. Create ui for playing the game yourself
   1. Add exit game all together button
   2. Publish to GH pages

2. Make a engine that calculates the best move in position:
    algos planned:
    1. Randy -> randomly picks one move from list of possible DONE
    2. Pointer -> places pieces in random places from biggest to smallest DONE
    3. Aggressive -> places pieces as far from the starting point as possible
    4. Aggressive Pointer
    5. Dead cells minimizer -> all cells adresant to piece are dead to the color, so minimizing those will lead to better groupings of cells
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
2. Build project in prod mode
``` bash
npm run build
```
3. Serve project locally 
``` bash
serve -s dist
```


# Deploy to GH pages
1. Checkout to gh-page branch
2. Merge all changes from main
3. Flip isInitialMount value in file Engine Game UI
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
  
4. Push changes to remote 