export interface PlayerData {
    name: string;
}

// Data relating to a specifc game instance. This is available to the server
// and clients.
export interface GenericMatchData {
    /** The players who have joined the game */
    playerData: PlayerData[];
    
    /** The play whose turn it is. */
    currentPlayer: number;
}

// A move function as run on a client.
export type ClientMoveFunction = (
    {activePlayer} : {activePlayer: number},
    arg: unknown
) => void;

// Data and functions relating to a specifc game instance on the server
// or pseudo-server.  This is the level at which the online and offline
// implementations differ.  
export interface Match<GameState = unknown> extends GenericMatchData {
    /** The current state of the game, changed using moves. */
    state: GameState;

    moves: Record<string, ClientMoveFunction>;
}
