import React from "react";
import styled from "styled-components";
import { useGameContext } from "../utils/use-game-context";
import { Names } from "./names";
import { Squares } from "./squares";

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