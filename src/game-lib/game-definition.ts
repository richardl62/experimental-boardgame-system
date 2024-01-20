import { BasicGameData } from "./game-data";

export interface GameDefinition<GameState = any> {
    name: string;
    minPlayers: number;
    maxPlayers: number;

    initialState: () => GameState;
    moves: Record<string, (gameData: BasicGameData<GameState>, arg: any) => GameState>;
}