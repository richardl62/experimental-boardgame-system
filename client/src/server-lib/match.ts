import { PlayerData } from "../games/game-definition";

// A move function as run on a client.
export type MatchMove = (arg0: {
    activePlayer: number,
    arg: unknown,
}) => void;

// Data and functions relating to a specifc game instance on the server
// or pseudo-server.  This is the level at which the online and offline
// implementations differ.  
export interface Match<GameState = unknown>  {
    /** The players who have joined the game */
    playerData: PlayerData[];
    
    /** The play whose turn it is. */
    currentPlayer: number;

    /** The current state of the game, changed using moves. */
    state: GameState;

    moves: Record<string, MatchMove>;
}
