import { GameContext } from "../../game-lib/game-context";
import { GameDefinition } from "../../game-lib/game-definition";

type SquareData = "X" | "O" | null;
type RowData = [SquareData, SquareData, SquareData];
export type GameState = {
    board: [RowData, RowData, RowData];
}

export const gameDefinition : GameDefinition<GameState> = {  
    name: "Tic Tac Toe",
    minPlayers: 2,
    maxPlayers: 2,

    initialState: (context: GameContext) => {
        return {
            board: [
                [null, null, null],
                [null, null, null],
                [null, null, null],
            ]
        };  
    },

    moves: {
        setSquare: (
            state: GameState, 
            context: GameContext, 
            arg: unknown
        ) => {
            const { row, col, value } = arg as { row: number, col: number, value: SquareData };

            const newBoard : GameState["board"] = [...state.board];
            newBoard[row] = [...newBoard[row]];
            newBoard[row][col] = value;        
            return { ...state, board: newBoard };   
        },
    },
} as const;