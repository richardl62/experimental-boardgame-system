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

// To do: Add generic tool to derive this from moves.
export interface ClientMoves {
    add:  (arg: number) => void;
}
