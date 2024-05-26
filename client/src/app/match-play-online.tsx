import React from "react";

import * as UrlParams from "./url-params";
import { MatchID, Player } from "../shared/types";
import { GameDefinition } from "../shared/game-definition";

interface MatchPlayOnlineProps {
  game: GameDefinition;
  matchID: MatchID;
  player: Player;
}

export function MatchPlayOnline({ game, matchID, player }: MatchPlayOnlineProps): JSX.Element {
    const server = UrlParams.lobbyServer();

    return (
        <div>
            {`Online ${game.displayName} matchID:${matchID} player:${player} ${server}`}
        </div>
    );

}
