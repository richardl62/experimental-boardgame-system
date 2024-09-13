import React from "react";

import * as UrlParams from "./url-params";
import { MatchID, Player } from "../shared/types";
import { GameDefinition } from "../shared/game-definition";
import { useOnlineMatch } from "../server-lib/use-online-match";
import { ReadyState } from "react-use-websocket";

interface MatchPlayOnlineProps {
  game: GameDefinition;
  matchID: MatchID;
  player: Player;
}

function ShowReadyState( {state} : { state: ReadyState}) {

    const status = {
        [ReadyState.CONNECTING]: 'connecting',
        [ReadyState.OPEN]: 'open',
        [ReadyState.CLOSING]: 'closing',
        [ReadyState.CLOSED]: 'closed',
        [ReadyState.UNINSTANTIATED]: 'uninstantiated',
      }[state];

    return <div>Server {status} </div>
}

export function MatchPlayOnline({ game, matchID, player }: MatchPlayOnlineProps): JSX.Element {
    const server = UrlParams.lobbyServer();

    const { readyState, error, match } = useOnlineMatch(server, game, {matchID, player});
    if ( readyState ) {
        return <ShowReadyState state={readyState} />
    }

    if ( error ) {
        return <div>Server error: {error} </div>
    }

    if ( !match ) { // For now
        return <div>No match information available (internal error ) </div>
    }

    return <div>{game.displayName} - matchID:{matchID.mid} player:{player.id}</div>;
}
