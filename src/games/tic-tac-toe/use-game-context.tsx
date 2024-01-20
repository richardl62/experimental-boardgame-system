import { GameState } from "./game-state";
import React from "react";
import { GameContext } from "../../game-lib/game-context";
import { ClientMoves } from "./moves";

export function useGameContext() {
    const game = React.useContext(GameContext);
    if (!game) throw new Error("GameContext not found");
    return {
        ...game,
        state: game.state as GameState,
        moves: game.moves as unknown as ClientMoves, // To do: fix this
    };
}
