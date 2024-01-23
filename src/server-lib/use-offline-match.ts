import { useState } from "react";
import { GameDefinition } from "../game-definition";
import { GenericMatchData, Match, ClientMoveFunction } from "./match";

// Create and offilne game instance.
export function useOfflineMatch(
    gameDefinition: GameDefinition,
    {nPlayers}: {nPlayers: number}
) : Match {
    const [gameData, setGameData] = useState<GenericMatchData>({
        playerData: makeSimplePlayerData(nPlayers),
        currentPlayer: 0,
    });
    const [state, setState] = useState(gameDefinition.initialState());

    // Inefficient, but simple. (Functions are recreated on every call.)
    const wrappedMoves: Record<string, ClientMoveFunction> = {};
    for (const moveName in gameDefinition.moves) {
        const givenMove = gameDefinition.moves[moveName];

        const wrappedMove : ClientMoveFunction = (activePlayer, arg) => {
   
            const newGameState = givenMove(state, gameData, activePlayer, arg);
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

// Create player data for an offline game.
function makeSimplePlayerData(nPlayers: number) {
    const playerData = [];
    for (let i = 0; i < nPlayers; i++) {
        playerData.push({ name: `Player ${i + 1}` });
    }

    return playerData;
}
