import { GameData } from "./game-instance";

export type MoveFunction<GameState> = (state: GameState, data: GameData, arg: any) => GameState;

// Information about a game, used when creating a new game instance.
export interface GameDefinition<GameState = any> {
    name: string;
    minPlayers: number;
    maxPlayers: number;

    initialState: () => GameState;
    moves: Record<string, MoveFunction<GameState>>;
}