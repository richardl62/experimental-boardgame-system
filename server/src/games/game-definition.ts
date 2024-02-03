export interface PlayerData {
    name: string;
}

// A move function to run on a server (or pseudo-server).
// Must be a pure function, i.e. no side effects.
export type GameDefintionMove<GameState, Arg> = (arg0: {
    state: GameState, 
    playerData: PlayerData[],
    currentPlayer: number, // The play whose turn it is.
    activePlayer: number,  // The player who is making the move.
    arg: Arg
}) => GameState;

// Information about a game, used when creating a new game instance.
export interface GameDefinition<GameState = any> {
    name: string;
    minPlayers: number;
    maxPlayers: number;

    initialState: () => GameState;
    
    moves: Record<string, GameDefintionMove<GameState, any>>;
}