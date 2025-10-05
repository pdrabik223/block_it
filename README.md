# Block it game engine

## Task Board

1. Create ui for playing the game yourself
    - Make the board editor more responsive, currently in prod env it works ok, but with dev struggles. Also we do a lot of unnecessary calculations and redrawings -> this could be optimized
    - 
2. Implement engine checking for correct moves
3. Make a engine that calculates the best move in position


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