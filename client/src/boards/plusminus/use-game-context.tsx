import React from "react";
import { ClientMatchContext } from '../../app/match-play';
import { GameState } from "../../shared/games/plusminus/game-state";
import { moves } from "../../shared/games/plusminus/moves";
import { ClientMoves } from "../client-moves";

export function useGameContext() {
    const game = React.useContext(ClientMatchContext);
    if (!game) throw new Error("GameContext not found");
    return {
        ...game,
        state: game.state as GameState,
        moves: game.moves as ClientMoves<typeof moves>,
    };
}
