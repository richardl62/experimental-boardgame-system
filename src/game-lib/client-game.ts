import { createContext } from 'react';
import { GameInstance } from "./game-instance";

// Data and functions relating to a specific game instance. This is available
// to the client via React context.
export interface ClientGame extends GameInstance {
    /** The player who is viewing the game - potentially making moves*/
    viewingPlayer: number;
}

export const ClientGameContext = createContext<ClientGame | null>(null);


