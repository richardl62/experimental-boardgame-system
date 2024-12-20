import { useState } from "react";
import { GameDefinition } from "../game-definition";
import {Match, MatchMove } from "./match";
import { MatchData, PlayerData } from "../shared/match-data";
import { ReadyState } from "react-use-websocket";
import { ActiveMatch } from "./active-match";
import { ServerMove } from "../shared/server-game-definition";

// Create and offilne game instance.
export function useOfflineMatch(
    gameDefinition: GameDefinition,
    {nPlayers}: {nPlayers: number}
) : ActiveMatch {
    const [matchData, setMatchData] = useState<MatchData>(matchOmittingMoves(gameDefinition, nPlayers));
    const [error, setError] = useState<string|null>(null);

    // Inefficient, but simple. (Functions are recreated on every call.)
    const matchMoves: Record<string, MatchMove> = {};
    for (const moveName in gameDefinition.moves) {
        const givenMove = gameDefinition.moves[moveName];
        matchMoves[moveName] = makeMatchMove(givenMove, matchData, setMatchData, setError);
    }

    const readyState = ReadyState.OPEN; // KLUDGE?

    const match : Match = {
        ...matchData,
        moves: matchMoves,
    };

    return { match, readyState, error };
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
    givenMove: ServerMove<unknown, unknown>, 
    gameState: MatchData,
    setMatch: (match: MatchData) => void,
    setError: (error: string | null) => void
) : MatchMove {
    const { state, currentPlayer } = gameState;
    
    return ({ activePlayer, arg }) => {
        try {
            if (currentPlayer !== activePlayer) {
                throw new Error("Illegal move - wrong player");
            }

            const newState = givenMove({ state, currentPlayer, activePlayer, arg });
            setMatch({
                ...gameState,
                state: newState,
                currentPlayer: (currentPlayer + 1) % gameState.playerData.length,
            });
            setError(null);
        } catch (error) {
            const msg = error instanceof Error ? error.message : "unknown error";
            setError(msg);
        }
    };
}