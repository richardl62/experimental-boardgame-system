import { createContext } from 'react';
import { Match } from "../server-lib/match";

// Data and functions relating to a specific game instance. This is available
// to the client via React context.
export interface ClientGame<GameState = unknown> extends Match<GameState> {
    /** The player who is viewing the game - potentially making moves*/
    viewingPlayer: number;
}

export const ClientGameContext = createContext<ClientGame | null>(null);



