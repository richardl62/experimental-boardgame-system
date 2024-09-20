import React from "react";
import { OfflineOptions } from "./offline-options";
import { GameDefinition } from "../shared/game-definition";
import { useOfflineMatch } from "../server-lib/use-offline-match";
import { MatchPlay } from "./match-play";


export function MatchPlayOffline({game, options}: {
    game:GameDefinition,
    options: OfflineOptions,
}): JSX.Element {

    const {numPlayers, passAndPlay }  = options;

    const match = useOfflineMatch(game, {nPlayers: numPlayers});

    const matches : JSX.Element[] = [];
    for(let id = 0; id < numPlayers; ++id) {
        const showBoard = passAndPlay || id === match.currentPlayer;
        if (showBoard) {
            matches.push(
                <MatchPlay game={game} match={match} activePlayer={id} />
            )
        };
    }
    return (
        <div>{matches}</div> 
    );
}



