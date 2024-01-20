import { useState } from "react";
import { GameDefinition } from "./game-definition";
import { GameData } from "./game-data";
import { TGameContext, UntypedMoves } from "./game-context";

export function useGame<TGameState>(
    gameDefinition: GameDefinition<TGameState>,
    nPlayers: number
) : TGameContext {
    const [gameData, setGameData] = useState<GameData>(new GameData(nPlayers));
    const [state, setState] = useState<TGameState>(gameDefinition.initialState(gameData));

    if(nPlayers < gameDefinition.minPlayers || nPlayers > gameDefinition.maxPlayers) {
        throw new Error(`Invalid number of players: ${nPlayers}`);
    }
    
    const clientMoves: UntypedMoves = {};
    for (const moveName in gameDefinition.moves) {
        const moveFn = gameDefinition.moves[moveName];

        clientMoves[moveName] = (arg: any) => {
            const newState = moveFn(state, gameData, arg);
            setState(newState);
            setGameData({
                players: gameData.players, 
                currentPlayer: (gameData.currentPlayer + 1) % nPlayers,
            });
        };
    }

    return {
        state,
        gameData,
        moves: clientMoves,
    };
}