import { GameDefintionMove } from "../game-definition";
import { GameState, initialState } from "./game-state";

const setSquare: GameDefintionMove<GameState, {row: number, col: number}> = (
    { state, activePlayer,  currentPlayer, arg: { row, col } } 
) => {
    if (currentPlayer !== activePlayer) {
        throw new Error("Not your turn!");
    }
    const newBoard : GameState["board"] = [...state.board];
    newBoard[row] = [...newBoard[row]];
    newBoard[row][col] = currentPlayer === 0 ? "X" : "O";        
    
    return { 
        ...state, 
        board: newBoard 
    };   
}

const reset: GameDefintionMove<GameState, void> = (
    _arg
) => {
    return initialState();
}

export const moves = {
    setSquare,
    reset,
} as const;

// To do: Add generic tool to derive this from moves.
export interface ClientMoves {
    setSquare: (arg: {row: number, col: number}) => void;
    reset:  (arg: void) => void;
}
