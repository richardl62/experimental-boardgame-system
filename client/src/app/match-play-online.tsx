import React from "react";

import * as UrlParams from "./url-params";
import { MatchID, Player } from "../shared/types";
import { GameDefinition } from "../shared/game-definition";
import { useOnlineMatch } from "../server-lib/use-online-match";
import { ReadyState } from "react-use-websocket";
import { Match } from "../server-lib/match";

interface MatchPlayOnlineProps {
  game: GameDefinition;
  matchID: MatchID;
  player: Player;
}

function readyStatus( state: ReadyState) {
    const status = {
        [ReadyState.CONNECTING]: 'connecting',
        [ReadyState.OPEN]: 'open',
        [ReadyState.CLOSING]: 'closing',
        [ReadyState.CLOSED]: 'closed',
        [ReadyState.UNINSTANTIATED]: 'uninstantiated',
      }[state];

    return status || "unknown";
}

export function MatchPlayOnline({ game, matchID, player }: MatchPlayOnlineProps): JSX.Element {
    const server = UrlParams.lobbyServer();
    const { readyState, error, match } = useOnlineMatch(server, game, {matchID, player});

    return <div>
        {readyState !== ReadyState.OPEN &&
            <div>Server Status: {readyStatus(readyState)}</div>
        }
        
        {error && <div>Server error: {error} </div>}
        
        {match?  
            <MatchDummy match={match} playerID={player.id}/> :
            <div>Awaiting match data from server</div>
        } 
    </div>
}

function MatchDummy( {match, playerID} :
    {match: Match, playerID: string}
 ) {
    return <div>Match started - player:{playerID}</div>;
}