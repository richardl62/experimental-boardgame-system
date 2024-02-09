import { GameDefintionMove } from "../../game-definition";
import { GameState } from "./game-state";

const add: GameDefintionMove<GameState, number> = (
    { state,  arg: value } 
) => {
    return  { count: state.count + value }; 
}

export const moves = {
    add,
} as const;