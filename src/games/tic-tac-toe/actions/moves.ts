import { BasicGameData } from "../../../game-lib/game-data";
import { GameState, initialState } from "./game-state";

function setSquare (
    gameData: BasicGameData<GameState>, 
    arg: {row: number, col: number}
) : GameState {
    const { row, col } = arg;
    const { state, currentPlayer } = gameData;

    const newBoard : GameState["board"] = [...state.board];
    newBoard[row] = [...newBoard[row]];
    newBoard[row][col] = currentPlayer === 0 ? "X" : "O";        
    
    return { 
        ...state, 
        board: newBoard 
    };   
}

function reset (
    _gameData: BasicGameData<GameState>, 
    _arg: void
) : GameState {
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
