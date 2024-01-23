import styled from "styled-components";
import { useGameContext } from "../actions/use-game-context";
import { Names } from "./names";
import { Squares } from "./sqaures";

const BoardDiv = styled.div`
    display: inline flex;
    flex-direction: column;
    align-items: center;

    margin: 10px;
`;

// TicTacToe board
export function Board() {
    const {moves, viewingPlayer} = useGameContext();

    return (
        <BoardDiv>
            <Names />
            <Squares/>
            <button onClick={() => moves.reset({activePlayer: viewingPlayer})}>Reset</button>
        </BoardDiv>
    );
}