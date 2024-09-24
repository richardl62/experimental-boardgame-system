import { useState } from "react";
import { GameDefinition, GameDefintionMove } from "../shared/game-definition";
import {Match, MatchMove } from "./match";
import { MatchData, PlayerData } from "../shared/match-data";
import { ReadyState } from 'react-use-websocket';
import { ActiveMatch } from "./active-match";

// Create and offilne game instance.
export function useOfflineMatch(
    gameDefinition: GameDefinition,
    {nPlayers}: {nPlayers: number}
) : ActiveMatch {
    const [matchData, setMatchData] = useState<MatchData>(matchOmittingMoves(gameDefinition, nPlayers));

    // Inefficient, but simple. (Functions are recreated on every call.)
    const matchMoves: Record<string, MatchMove> = {};
    for (const moveName in gameDefinition.moves) {
        const givenMove = gameDefinition.moves[moveName];
        matchMoves[moveName] = makeMatchMove(givenMove, matchData, setMatchData);
    };

    const readyState = ReadyState.OPEN; // KLUDGE?

    const match : Match = {
        ...matchData,
        moves: matchMoves,
    };

    return { readyState, match };
}

// Create player data for an offline game.
function matchOmittingMoves(gameDefinition: GameDefinition, nPlayers: number) : Omit<Match, "moves">{
    const playerData : PlayerData [] = [];
    for (let i = 0; i < nPlayers; i++) {
        playerData.push({ 
            name: `Player ${i + 1}`,
            isConnected: true, 
        });
    }

    return {
        playerData,
        currentPlayer: 0,
        state: gameDefinition.initialState(),
    };
}


function makeMatchMove(
    givenMove: GameDefintionMove<unknown, unknown>, 
    gameState: MatchData,
    setMatch: (match: MatchData) => void
) : MatchMove {
    const { state, currentPlayer } = gameState;
    return ({ activePlayer, arg }) => {

        const newState = givenMove({state, currentPlayer, activePlayer, arg});
        setMatch({
            ...gameState,
            state: newState,
            currentPlayer: (currentPlayer + 1) % gameState.playerData.length,
        });
    };
}