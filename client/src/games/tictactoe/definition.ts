

import { GameCategory, GameDefinition } from "../../game-definition";
import serverGameDefinition from "../../shared/server-games/tictactoe/definition";
import { GameState } from "../../shared/server-games/tictactoe/game-state";


const gameDefinition : GameDefinition<GameState> = { 
    ...serverGameDefinition,

    displayName: "Tic Tac Toe",
    category: GameCategory.development,

    minPlayers: 2,
    maxPlayers: 2,
} as const;

export default gameDefinition;
