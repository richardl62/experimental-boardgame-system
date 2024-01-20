import { useState } from "react";
import { GameDefinition } from "./game-definition";
import { BasicGameData, ClientGameData } from "./game-data";
import { makePlayerData } from "./player-data";


export function useGameDataAndMoves(
    gameDefinition: GameDefinition,
    {nPlayers}: {nPlayers: number}
) : ClientGameData {
    const [gameData, setGameData] = useState<BasicGameData>({
        playerData: makePlayerData(nPlayers),
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