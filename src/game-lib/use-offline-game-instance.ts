import { useState } from "react";
import { GameDefinition } from "./game-definition";
import { makeSimplePlayerData } from "./player-data";
import { GameData, GameInstance, GameInstanceMoveFunction } from "./game-instance";

// Create and offilne game instance.
export function useOfflineGameInstance(
    gameDefinition: GameDefinition,
    {nPlayers}: {nPlayers: number}
) : GameInstance {
    const [gameData, setGameData] = useState<GameData>({
        playerData: makeSimplePlayerData(nPlayers),
        currentPlayer: 0,
    });
    const [state, setState] = useState(gameDefinition.initialState());

    // Inefficient, but simple. (Functions are recreated on every call.)
    const wrappedMoves: Record<string, GameInstanceMoveFunction> = {};
    for (const moveName in gameDefinition.moves) {
        const givenMove = gameDefinition.moves[moveName];

        const wrappedMove : GameInstanceMoveFunction = (arg) => {
   
            const newGameState = givenMove(state, gameData, arg);
            setState(newGameState);
            setGameData({
                ...gameData, 
                currentPlayer: (gameData.currentPlayer + 1) % nPlayers,
            });
        }

        wrappedMoves[moveName] = wrappedMove;
    };


    return {
        ...gameData,
        state,
        moves: wrappedMoves,
    };
}
