
import {  ServerGameDefinition } from "../../server-game-definition";
import { GameState, initialState } from "./game-state";
import { moves } from "./moves";

const gameDefinition : ServerGameDefinition<GameState> = {  
    name: "tictactoe",

    initialState,

    moves,
} as const;

export default gameDefinition;
