import React from "react";
import { ReadyState } from "react-use-websocket";
import { ActiveMatch } from "../server-lib/active-match";
import { GameDefinition } from "../shared/game-definition";
import { MatchPlayWithContext } from "./match-play-with-context";
import { ShowPlayerData } from "./show-player-data";

function readyStatus( state: ReadyState) {
    const status = {
        [ReadyState.CONNECTING]: "connecting",
        [ReadyState.OPEN]: "open",
        [ReadyState.CLOSING]: "closing",
        [ReadyState.CLOSED]: "closed",
        [ReadyState.UNINSTANTIATED]: "uninstantiated",
    }[state];

    return status || "unknown";
}

export function MatchPlay({ game, matchResult, activePlayer }  : {
    game: GameDefinition,
    matchResult: ActiveMatch,
    activePlayer: number,
}) : JSX.Element {
    const { readyState, error, match } = matchResult;

    if (readyState !== ReadyState.OPEN) {
        <div>Server Status: {readyStatus(readyState)}</div>;
    }


    return <div>
        {error && <div>Error reported: {error} </div>}

        {/* match can be null immediately after connection or after an certain errors
        have been detected on the server. */}
        {match ?
            <>
                {/* Kludge: Showing player data should be up to the individual games*/}
                <ShowPlayerData match={match} />
                <MatchPlayWithContext game={game} match={match} activePlayer={activePlayer} />
            </> 
            :
            <div>Match data not received from server</div>

        }

    </div>;       
}
