import { useState } from "react";
import { GameDefinition } from "./game-definition";
import { GameData } from "./game-data";


export function useGame<TGameState>(
    gameDefinition: GameDefinition<TGameState>,
    nPlayers: number
) {
    const [gameData, setGameData] = useState<GameData>(new GameData(nPlayers));
    const [state, setState] = useState<TGameState>(gameDefinition.initialState(gameData));

    if(nPlayers < gameDefinition.minPlayers || nPlayers > gameDefinition.maxPlayers) {
        throw new Error(`Invalid number of players: ${nPlayers}`);
    }
    
    const moves = (moveName: string, args: unknown) => {
        const moveFn = gameDefinition.moves[moveName];
        if (!moveFn) {
            throw new Error(`Move ${moveName} not found`);
        }

        const newState = moveFn(state, gameData, args);
        setState(newState);
        setGameData({
            players: gameData.players, 
            currentPlayer: (gameData.currentPlayer + 1) % nPlayers,
         });
    };

    return {
        state,
        gameData,
        moves,
    };
}