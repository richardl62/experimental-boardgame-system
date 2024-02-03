import styled from "styled-components";
import { useGameContext } from "./use-game-context";

const NamesDiv = styled.div`
    display: flex;
`;

const Name = styled.div<{active: boolean}>`
    font-size: 14px;
    font-family: sans-serif;
    font-weight: bold;
    margin: 0 8px;

    text-decoration: ${(props) => (props.active ? "underline" : "none")};
    text-decoration-thickness: 2px;
`;

export function Names() {
    const {playerData, currentPlayer, activePlayer} = useGameContext();

    return <NamesDiv>
        {playerData.map((playerData, id) => {
            let name = playerData.name;
            if (activePlayer === id) {
                name += " (you)";
            }

            return <Name key={id} active={id === currentPlayer}>{name}</Name>;
        })}
    </NamesDiv>;
}