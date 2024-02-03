export type SquareData = "X" | "O" | null;
type RowData = [SquareData, SquareData, SquareData];
export type GameState = {
    board: [RowData, RowData, RowData];
};

export function initialState() : GameState {
    return {
        board: [
            [null, null, null],
            [null, null, null],
            [null, null, null],
        ]
    };  
}   
