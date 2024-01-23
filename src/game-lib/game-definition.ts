import { GameData } from "./game-instance";

// A move function as run on a server (or pseudo-server).
// Must be a pure function, i.e. no side effects.
export type ServerMoveFunction<GameState> = (
    state: GameState, 
    data: GameData,
    active: {activePlayer: number}, 
    arg: any
) => GameState;

// Information about a game, used when creating a new game instance.
export interface GameDefinition<GameState = any> {
    name: string;
    minPlayers: number;
    maxPlayers: number;

    initialState: () => GameState;
    moves: Record<string, ServerMoveFunction<GameState>>;
}