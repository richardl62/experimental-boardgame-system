
import { GameDefinition } from "../../game-definition";
import { GameState, initialState } from "./game-state";
import { moves } from "./moves";

const gameDefinition : GameDefinition<GameState> = {  
    name: "Plus Minus",
    minPlayers: 1,
    maxPlayers: 10,

    initialState,

    moves,
} as const;

export default gameDefinition;