import styled from "styled-components";
import { GameState } from "./definition";
import { GameContext } from "../../game-lib/game-context";

const squareSize = "50px";

const Square = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;

    font-family: sans-serif;

    height: ${squareSize};
    width: ${squareSize};
    font-size: 40px;

    background-color: white;
    border: 2px solid black;
`

const Grid = styled.div`
    display: grid;
    grid-template-columns: repeat(3, ${squareSize});
    grid-template-rows: repeat(3, ${squareSize});

    margin: calc(${squareSize} / 4);
`

// TicTacToe board
export function Board({state, context, moves} : {
    state: GameState,
    context: GameContext,
    moves: (moveName: string, args: unknown) => void
}) {
    const squares : JSX.Element[] = [];
    for (let row = 0; row < 3; row++) {
        for (let col = 0; col < 3; col++){
            const index = `${row}-${col}`;
            const onClick= () => moves("setSquare", 
                {
                    row, 
                    col, 
                    value: context.currentPlayer === 0 ? "0" : "X",
                }
            );

            squares.push(<Square 
                key={index}
                onClick={onClick}
            >
                {state.board[row][col]}
            </Square>)
        }
    } 
    
    return <Grid>{squares}</Grid>;
}