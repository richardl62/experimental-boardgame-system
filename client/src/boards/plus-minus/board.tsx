import React from "react";
import styled from "styled-components";

import { useGameContext } from "./use-game-context";

const standardOuterMargin = "10px";
const OuterDiv = styled.div`
    margin: ${standardOuterMargin};
`;

function Board() : JSX.Element {
    const context = useGameContext();
    const {state: {count}, moves } = context;

    return <OuterDiv>
        <button 
            onClick={()=>moves.add(1)} 
        >
            +1
        </button>

        <button 
            onClick={()=>moves.add(-1)} 
        >
            -1
        </button>
        
        <div>{count}</div>
    </OuterDiv>;
}

export default Board;

