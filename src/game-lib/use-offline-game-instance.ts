import { useState } from "react";
import { GameDefinition } from "./game-definition";
import { makeSimplePlayerData } from "./player-data";
import { GameData, GameInstance } from "./game-instance";

// Create and offilne game instance.
export function useOfflineGameInstance(
    gameDefinition: GameDefinition,
    {nPlayers}: {nPlayers: number}
) : GameInstance {
    const [gameData, setGameData] = useState<Omit<GameData,"moves">>({
        playerData: makeSimplePlayerData(nPlayers),
        currentPlayer: 0,

        state: gameDefinition.initialState(),
    });

    // Inefficient, but simple. (Functions are recreated on every call.)
    const clientMoves: Record<string, (arg: unknown) => void> = {};
    for (const moveName in gameDefinition.moves) {
        const moveFn = gameDefinition.moves[moveName];

        clientMoves[moveName] = (arg) => {
            const newGameState = moveFn(gameData, arg);
            setGameData({
                ...gameData, 
                state: newGameState,
                currentPlayer: (gameData.currentPlayer + 1) % nPlayers,
            });
        };
    }

    return {
        ...gameData,
        moves: clientMoves,
    };
}