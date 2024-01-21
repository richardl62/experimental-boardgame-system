import { GameData } from "./game-instance";

// Information about a game, used when creating a new game instance.
export interface GameDefinition<GameState = any> {
    name: string;
    minPlayers: number;
    maxPlayers: number;

    initialState: () => GameState;
    moves: Record<string, (data: GameData<GameState>, arg: any) => GameState>;
}