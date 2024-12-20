import React from "react";
import { ClientMatchContext } from "../../../app/match-play-with-context";
import { GameState } from "../../../shared/server-games/tictactoe/game-state";
import { moves } from "../../../shared/server-games/tictactoe/moves";
import { ClientMoves } from "../../client-moves";

export function useGameContext() {
    const game = React.useContext(ClientMatchContext);
    if (!game) throw new Error("GameContext not found");
    return {
        ...game,
        state: game.state as GameState,
        moves: game.moves as ClientMoves<typeof moves>,
    };
}
