import { useState } from "react";
import { GameDefinition, GameDefintionMove } from "../games/game-definition";
import {Match, MatchMove } from "./match";

type MatchOmittingMoves = Omit<Match, "moves">;

// Create and offilne game instance.
export function useOfflineMatch(
    gameDefinition: GameDefinition,
    {nPlayers}: {nPlayers: number}
) : Match {
    const [match, setMatch] = useState<MatchOmittingMoves>(matchOmittingMoves(gameDefinition, nPlayers));


    // Inefficient, but simple. (Functions are recreated on every call.)
    const matchMoves: Record<string, MatchMove> = {};
    for (const moveName in gameDefinition.moves) {
        const givenMove = gameDefinition.moves[moveName];
        matchMoves[moveName] = makeMatchMove(givenMove, match, setMatch);
    };

    return {
        ...match,
        moves: matchMoves,
    };
}

// Create player data for an offline game.
function matchOmittingMoves(gameDefinition: GameDefinition, nPlayers: number) : Omit<Match, "moves">{
    const playerData = [];
    for (let i = 0; i < nPlayers; i++) {
        playerData.push({ name: `Player ${i + 1}` });
    }

    return {
        playerData,
        currentPlayer: 0,
        state: gameDefinition.initialState(),
    };
}


function makeMatchMove(
    givenMove: GameDefintionMove<unknown, unknown>, 
    gameState: MatchOmittingMoves,
    setMatch: (match: MatchOmittingMoves) => void
) : MatchMove {
    const { state, currentPlayer, playerData } = gameState;
    return ({ activePlayer, arg }) => {

        const newState = givenMove({state, currentPlayer, playerData, activePlayer, arg});
        setMatch({
            ...gameState,
            state: newState,
            currentPlayer: (currentPlayer + 1) % gameState.playerData.length,
        });
    };
}