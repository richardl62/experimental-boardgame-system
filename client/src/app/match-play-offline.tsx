import React from "react";
import { OfflineOptions } from "./offline-options";
import { GameDefinition } from "../shared/game-definition";
import { useOfflineMatch } from "../server-lib/use-offline-match";
import { BoardWrapper } from "./board-wrapper";


export function MatchPlayOffline({game, Board, options}: {
    game:GameDefinition,
    Board: () => JSX.Element,
    options: OfflineOptions,
}): JSX.Element {

    const {numPlayers, passAndPlay }  = options;

    const match = useOfflineMatch(game, {nPlayers: numPlayers});

    const matches : JSX.Element[] = [];
    for(let id = 0; id < numPlayers; ++id) {
        const showBoard = passAndPlay || id === match.currentPlayer;
        if (showBoard) {
            matches.push(
                <BoardWrapper match={match} activePlayer={id} >
                    <Board />
                </BoardWrapper>
            )
        };
    }
    return (
        <div>{matches}</div> 
    );
}



