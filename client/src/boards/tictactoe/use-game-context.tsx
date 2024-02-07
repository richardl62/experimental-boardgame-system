import React from "react";
import { ClientMatchContext } from '../../app/board-wrapper';
import { GameState } from "../../shared/games/tictactoe/game-state";
import { moves } from "../../shared/games/tictactoe/moves";

type Moves = typeof moves;
export type ClientMoves = {
    [K in keyof Moves]: (arg1: Parameters<Moves[K]>[0]["arg"]) => void;
};

export function useGameContext() {
    const game = React.useContext(ClientMatchContext);
    if (!game) throw new Error("GameContext not found");
    return {
        ...game,
        state: game.state as GameState,
        moves: game.moves as ClientMoves,
    };
}
