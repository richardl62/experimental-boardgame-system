import React from "react";
import { ClientGameContext } from "../../../app/client-game";
import { GameState } from "./game-state";
import { ClientMoves } from "./moves";

export function useGameContext() {
    const game = React.useContext(ClientGameContext);
    if (!game) throw new Error("GameContext not found");
    return {
        ...game,
        state: game.state as GameState,
        moves: game.moves as unknown as ClientMoves, // To do: fix this
    };
}
