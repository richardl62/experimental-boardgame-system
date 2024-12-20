import React, { createContext } from "react";
import { Match } from "../server-lib/match";
import { GameDefinition } from "../game-definition";
import { boards } from "../games";
import { sAssert } from "../utils/assert";

// Data and functions relating to a specific game instance. This is available
// to the client via React context.
export interface ClientMatch extends Omit<Match,"moves"> {
  /** The player who is viewing the game - potentially making moves*/
  activePlayer: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  moves: Record<string, (arg: any) => void>;
}

export const ClientMatchContext = createContext<ClientMatch | null>(null);

export function MatchPlayWithContext({ game, match, activePlayer }: {
  game:GameDefinition,
  match: Match;
  activePlayer: number;
}) {
    const Board = boards[game.name as keyof typeof boards];
    sAssert(Board, "board not found");

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const wrappedMoves: Record<string, (arg: any) => void> = {};
    for (const moveName in match.moves) {
        const givenMove = match.moves[moveName];
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        wrappedMoves[moveName] = (arg: any) => givenMove({ arg, activePlayer });
    }

    return <ClientMatchContext.Provider value={{
        ...match,
        activePlayer,
        moves: wrappedMoves,
    }}>
        <Board />
    </ClientMatchContext.Provider>;
}



