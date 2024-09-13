import { OptionSpecifications } from "./option-specification/types";

// The string values are uses as section headers when displaying the list of
// games.
export enum GameCategory {
    standard = "Standard",
    development = "Under Development",
    test = "Test/Debug",
  }

// A move function to run on a server (or pseudo-server).
// Must be a pure function, i.e. no side effects.
export type GameDefintionMove<GameState, Arg> = (arg0: {
    state: GameState, 
    currentPlayer: number, // The play whose turn it is.
    activePlayer: number,  // The player who is making the move.
    arg: Arg
}) => GameState;

// Information about a game, used when creating a new game instance.
export interface GameDefinition<GameState = any> {
    displayName: string;
    category: GameCategory;

    // Space-free name used (for example) in file paths.
    name: string;

    minPlayers: number;
    maxPlayers: number;

    initialState: () => GameState;
    
    moves: Record<string, GameDefintionMove<GameState, any>>;

    options?: OptionSpecifications;
}
