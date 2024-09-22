import React from "react";

import * as UrlParams from "./url-params";
import { MatchID, Player } from "../shared/types";
import { GameDefinition } from "../shared/game-definition";
import { useOnlineMatch } from "../server-lib/use-match-online";
import { ReadyState } from "react-use-websocket";
import { Match } from "../server-lib/match";
import { PlayerData } from "../shared/match-data";
import { MatchPlay } from "./match-play";
import { sAssert } from "../utils/assert";
import { nonJoinedPlayerName } from "../app-game-support/player-names";

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
            <MatchPlayWrapper game={game} match={match} playerID={player.id}/> :
            <div>Awaiting match data from server</div>
        } 
    </div>
}

function PlayerDataShow( {playerData} : {playerData: PlayerData}) {
    const { name, isConnected } = playerData;
    if (!name) {
        return <div>{nonJoinedPlayerName}</div>
    }
    return <div>
        {name} {isConnected? "connected" : "not connected"}
    </div>
}

function MatchPlayWrapper( {game, match, playerID} :
    {game: GameDefinition, match: Match, playerID: string}
 ) {
    // KLUDGE: This convertion should not be needed.
    const activePlayer = parseInt(playerID); // TEMPORARY
    sAssert(!isNaN(activePlayer), "Unexpected player ID")

    return <div>
        {/* KLUDGE/TEMPORARY show names and connection data here where it will
        be shared by all games. It should really be up to the individual games to show
        this */}
        {match.playerData.map(
            (data, index) => <PlayerDataShow key={index} playerData={data} />
        )}

        <div></div>
        
        <MatchPlay game={game} match={match} activePlayer={activePlayer} />
    </div>; 
}