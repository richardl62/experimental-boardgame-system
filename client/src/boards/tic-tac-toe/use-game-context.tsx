import React from "react";
import { ClientMatchContext } from '../../app/board-wrapper';
import { GameState } from "../../shared/games/tic-tac-toe/game-state";
import { ClientMoves } from "../../shared/games/tic-tac-toe/moves";

export function useGameContext() {
    const game = React.useContext(ClientMatchContext);
    if (!game) throw new Error("GameContext not found");
    return {
        ...game,
        state: game.state as GameState,
        moves: game.moves as unknown as ClientMoves, // To do: fix this
    };
}