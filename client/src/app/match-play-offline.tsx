import React from "react";
import { OfflineOptions } from "./offline-options";
import { GameDefinition } from "../shared/game-definition";
import { useOfflineMatch } from "../server-lib/use-match-offline";
import { sAssert } from "../utils/assert";
import { MatchPlay } from "./match-play";


export function MatchPlayOffline({game, options}: {
    game:GameDefinition,
    options: OfflineOptions,
}): JSX.Element {

    const {numPlayers, passAndPlay }  = options;

    const activeMatch = useOfflineMatch(game, {nPlayers: numPlayers});
    const { match } = activeMatch;
    sAssert( match, "match data not supplied in offline match"); // KLUDGE

    const matches : JSX.Element[] = [];
    for(let id = 0; id < numPlayers; ++id) {
        const showBoard = !passAndPlay || id === match.currentPlayer;
        if (showBoard) {
            matches.push(
                <MatchPlay key={id} game={game} matchResult={activeMatch} activePlayer={id} />
            );
        }
    }
    
    return (
        <div>{matches}</div> 
    );
}



