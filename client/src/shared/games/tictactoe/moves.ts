import { GameDefintionMove } from "../../game-definition";
import { GameState, initialState } from "./game-state";

const setSquare: GameDefintionMove<GameState, {row: number, col: number}> = (
    { state, activePlayer,  currentPlayer, arg: { row, col } } 
) => {
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

