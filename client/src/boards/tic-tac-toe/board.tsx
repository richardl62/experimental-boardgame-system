import styled from "styled-components";
import { useGameContext } from "./use-game-context";
import { Names } from "./names";
import { Squares } from "./sqaures";

const BoardDiv = styled.div`
    display: inline flex;
    flex-direction: column;
    align-items: center;

    margin: 10px;
`;

// TicTacToe board
export default function Board() {
    const {moves} = useGameContext();

    return (
        <BoardDiv>
            <Names />
            <Squares/>
            <button onClick={() => moves.reset()}>Reset</button>
        </BoardDiv>
    );
}