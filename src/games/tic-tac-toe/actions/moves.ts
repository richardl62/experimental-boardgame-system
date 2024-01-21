import { MoveFunction } from "../../../game-lib/game-definition";
import { GameState, initialState } from "./game-state";

const setSquare: MoveFunction<GameState> = (
    state, 
    gameData,
    arg: {row: number, col: number}
) => {
    const { row, col } = arg;
    const { currentPlayer } = gameData;

    const newBoard : GameState["board"] = [...state.board];
    newBoard[row] = [...newBoard[row]];
    newBoard[row][col] = currentPlayer === 0 ? "X" : "O";        
    
    return { 
        ...state, 
        board: newBoard 
    };   
}

const reset: MoveFunction<GameState> = (
    _state,
    _gameData, 
    _arg: void
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
    reset: () => void;
}
