import React, { createContext } from 'react';
import { Match } from '../server-lib/match';

// Data and functions relating to a specific game instance. This is available
// to the client via React context.
export interface ClientMatch extends Omit<Match,"moves"> {
  /** The player who is viewing the game - potentially making moves*/
  activePlayer: number;
  moves: Record<string, (arg: any) => void>;
}

export const ClientMatchContext = createContext<ClientMatch | null>(null);

export function BoardWrapper({ match, activePlayer, children }: {
  match: Match;
  activePlayer: number;
  children: React.ReactNode;
}) {

  const wrappedMoves: Record<string, (arg: any) => void> = {};
  for (const moveName in match.moves) {
    const givenMove = match.moves[moveName];
    wrappedMoves[moveName] = (arg: any) => givenMove({arg, activePlayer});  
  }

  return <ClientMatchContext.Provider value={{ 
    ...match, 
    activePlayer,
    moves: wrappedMoves, 
  }}>
    {children}
  </ClientMatchContext.Provider>;
}



