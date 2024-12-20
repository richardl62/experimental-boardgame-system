import React from "react";

import { GameState } from "../../../shared/server-games/plusminus/game-state";
import { moves } from "../../../shared/server-games/plusminus/moves";
import { ClientMoves } from "../../client-moves";
import { ClientMatchContext } from "../../../app/match-play-with-context";

export function useGameContext() {
    const game = React.useContext(ClientMatchContext);
    if (!game) throw new Error("GameContext not found");
    return {
        ...game,
        state: game.state as GameState,
        moves: game.moves as ClientMoves<typeof moves>,
    };
}
