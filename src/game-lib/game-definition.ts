import { GameData } from "./game-data";

export interface GameDefinition<TGameState> {
    name: string;
    minPlayers: number;
    maxPlayers: number;

    initialState: (context: GameData) => TGameState;
    moves: {
        [moveName: string]: (state: TGameState, context: GameData, arg: any) => TGameState;
    };
}