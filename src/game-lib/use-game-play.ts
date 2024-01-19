import { useState } from "react";
import { GameDefinition } from "./game-definition";
import { GameContext } from "./game-context";


export function useGamePlay<TGameState>(
    gameDefinition: GameDefinition<TGameState>,
    nPlayers: number
) {
    const [context, setContext] = useState<GameContext>(new GameContext(nPlayers));
    const [state, setState] = useState<TGameState>(gameDefinition.initialState(context));

    if(nPlayers < gameDefinition.minPlayers || nPlayers > gameDefinition.maxPlayers) {
        throw new Error(`Invalid number of players: ${nPlayers}`);
    }
    
    const moves = (moveName: string, args: unknown) => {
        const moveFn = gameDefinition.moves[moveName];
        if (!moveFn) {
            throw new Error(`Move ${moveName} not found`);
        }

        const newState = moveFn(state, context, args);
        setState(newState);
        setContext({
            players: context.players, 
            currentPlayer: (context.currentPlayer + 1) % nPlayers,
         });
    };

    return {
        state,
        context,
        moves,
    };
}