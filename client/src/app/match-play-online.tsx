import React from "react";

import * as UrlParams from "./url-params";
import { MatchID, Player } from "../shared/types";
import { GameDefinition } from "../shared/game-definition";
import { useOnlineMatch } from "../server-lib/use-online-match";

interface MatchPlayOnlineProps {
  game: GameDefinition;
  matchID: MatchID;
  player: Player;
}

export function MatchPlayOnline({ game, matchID, player }: MatchPlayOnlineProps): JSX.Element {
    const server = UrlParams.lobbyServer();

    const { /*match,*/ message } = useOnlineMatch(server, game, {matchID, player});
    if ( message ) {
        return <div>Server: {message}</div>
    }
    return (
        <div>
            <div>Connected to server</div>
            <div>{game.displayName} - matchID:{matchID.mid} player:{player.id}</div>
        </div>
    );
}
