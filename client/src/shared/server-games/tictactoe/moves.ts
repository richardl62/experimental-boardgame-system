import { ServerMove } from "../../server-game-definition";
import { GameState, initialState } from "./game-state";

const setSquare: ServerMove<GameState, {row: number, col: number}> = (
    { state, currentPlayer, arg: { row, col } } 
) => {
    const newBoard : GameState["board"] = [...state.board];
    newBoard[row] = [...newBoard[row]];
    newBoard[row][col] = currentPlayer === 0 ? "X" : "O";        
    
    return { 
        ...state, 
        board: newBoard 
    };   
};

const reset: ServerMove<GameState, void> = (
    _arg
) => {
    return initialState();
};

export const moves = {
    setSquare,
    reset,
} as const;

