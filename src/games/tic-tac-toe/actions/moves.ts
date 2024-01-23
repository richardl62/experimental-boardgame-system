import { ServerMoveFunction } from "../../../game-definition";
import { GameState, initialState } from "./game-state";

const setSquare: ServerMoveFunction<GameState> = (
    state, 
    gameData,
    {activePlayer},
    arg: {row: number, col: number}
) => {
    const { row, col } = arg;
    const { currentPlayer } = gameData;
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

const reset: ServerMoveFunction<GameState> = (
    _state,
    _gameData,
    _active, 
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
    setSquare: ({activePlayer} : {activePlayer: number}, arg: {row: number, col: number}) => void;
    reset: ({activePlayer} : {activePlayer: number}) => void;
}
