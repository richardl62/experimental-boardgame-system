// A move function to run on a server (or pseudo-server).
// Must be a pure function, i.e. no side effects.
export type ServerMove<GameState, Arg> = (arg0: {
    state: GameState, 
    currentPlayer: number, // The play whose turn it is.
    activePlayer: number,  // The player who is making the move.
    arg: Arg
}) => GameState;

// Information about a game, used when creating a new game instance.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface ServerGameDefinition<GameState = any> {    // Space-free name used (for example) in file paths.
    name: string;    // Used when telling the server to create a new game.
                     // Also used in file paths so should be space-free.
    
    initialState: () => GameState;
    
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    moves: Record<string, ServerMove<GameState, any>>;
}
