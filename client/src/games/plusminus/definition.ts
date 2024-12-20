import { GameCategory, GameDefinition } from "../../game-definition";
import serverGameDefinition from "../../shared/server-games/plusminus/definition";
import { GameState } from "../../shared/server-games/plusminus/game-state";


const gameDefinition : GameDefinition<GameState> = { 
    ...serverGameDefinition,

    displayName: "Plus Minus",
    category: GameCategory.test,

    minPlayers: 1,
    maxPlayers: 10,
} as const;

export default gameDefinition;

