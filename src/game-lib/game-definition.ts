import { GameContext } from "./game-context";

export interface GameDefinition<TGameState> {
    name: string;
    minPlayers: number;
    maxPlayers: number;

    initialState: (context: GameContext) => TGameState;
    moves: {
        [moveName: string]: (state: TGameState, context: GameContext, args: unknown) => TGameState;
    };
}