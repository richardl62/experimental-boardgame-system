import { GameData } from "../../game-lib/game-data";
import { GameState, initialState } from "./game-state";

function setSquare (
    state: GameState, 
    context: GameData, 
    arg: {row: number, col: number}
) : GameState {
    const { row, col } = arg;

    const newBoard : GameState["board"] = [...state.board];
    newBoard[row] = [...newBoard[row]];
    newBoard[row][col] = context.currentPlayer === 0 ? "X" : "O";        
    
    return { 
        ...state, 
        board: newBoard 
    };   
}

function restart (
    _state: GameState, 
    _context: GameData, 
    _arg: void
) : GameState {
    return initialState();
}

export const moves = {
    setSquare,
    restart,
} as const;

// type of system moves, but without the first two arguments
// export type SystemMoves = {
//     [K in keyof typeof systemMoves]: (
//         arg: Parameters<typeof systemMoves[K]>[2]
//     ) => ReturnType<typeof systemMoves[K]>
// };
export interface ClientMoves {
    setSquare: (arg: {row: number, col: number}) => void;
    restart: () => void;
}
