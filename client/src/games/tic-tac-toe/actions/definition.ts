
import { GameDefinition } from "../../../game-definition";
import { GameState, initialState } from "./game-state";
import { moves } from "./moves";

export const gameDefinition : GameDefinition<GameState> = {  
    name: "Tic Tac Toe",
    minPlayers: 2,
    maxPlayers: 2,

    initialState,

    moves,
} as const;
