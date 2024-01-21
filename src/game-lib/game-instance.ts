import { PlayerData } from "./player-data";

// Data relating to a specifc game instance. This is available to the server
// and clients.
export interface GameData {
    /** The players who have joined the game */
    playerData: PlayerData[];
    
    /** The play whose turn it is. */
    currentPlayer: number;
}

export type GameInstanceMoveFunction = (arg: unknown) => void;

// Data and functions relating to a specifc game instance on the server
// or pseudo-server.  This is the level at which the online and offline
// implementations differ.  
export interface GameInstance<GameState = unknown> extends GameData {
    /** The current state of the game, changed using moves. */
    state: GameState;

    moves: Record<string, GameInstanceMoveFunction>;
}
