import styled from "styled-components";
import { useGameContext } from "../actions/use-game-context";

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

const BoardDiv = styled.div`
    display: inline flex;
    flex-direction: column;
    align-items: center;
`;

// TicTacToe board
export function Board() {
    const {state, moves} = useGameContext();
    const squares : JSX.Element[] = [];
    for (let row = 0; row < 3; row++) {
        for (let col = 0; col < 3; col++){
            const index = `${row}-${col}`;
            const onClick= () => moves.setSquare({row, col});

            squares.push(<Square 
                key={index}
                onClick={onClick}
            >
                {state.board[row][col]}
            </Square>)
        }
    } 
    
    return (
        <BoardDiv>
            <Grid>{squares}</Grid>
            <button onClick={() => moves.reset()}>Reset</button>
        </BoardDiv>
    );
}