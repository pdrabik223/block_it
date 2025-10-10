# Block it game engine

## Task Board

1. Create ui for playing the game yourself
   1. Engine widget makes 2 actions at the beginning DONE
   2. Game does not end when engine other than Red ends it
   3. Add exit game all together button
   4. Publish to GH pages

2. Make a engine that calculates the best move in position:
    algos planned:
    1. Randy -> randomly picks one move from list of possible
    2. Pointer -> places pieces in random places from biggest to smallest
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