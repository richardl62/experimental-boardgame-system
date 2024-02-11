
import { GameCategory, GameDefinition } from "../../game-definition";
import { GameState, initialState } from "./game-state";
import { moves } from "./moves";

const gameDefinition : GameDefinition<GameState> = {  
    displayName: "Tic Tac Toe",
    category: GameCategory.development,
    
    name: "tictactoe",
    
    minPlayers: 2,
    maxPlayers: 2,

    initialState,

    moves,
} as const;

export default gameDefinition;
