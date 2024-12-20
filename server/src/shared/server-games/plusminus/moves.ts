import { ServerMove } from "../../server-game-definition";
import { GameState } from "./game-state";

const add: ServerMove<GameState, number> = (
    { state,  arg: value } 
) => {
    return  { count: state.count + value }; 
};

export const moves = {
    add,
} as const;