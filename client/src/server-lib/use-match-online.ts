import { GameDefinition, GameDefintionMove } from "../shared/game-definition";
import { MatchID, Player, WsMoveData } from "../shared/types";
import {Match, MatchMove } from "./match";
import useWebSocket from 'react-use-websocket';
import { ServerMoveResponse } from "../shared/server-move-response";
import { ActiveMatch } from "./active-match";

export function useOnlineMatch(
    server: string,
    gameDefinition: GameDefinition,
    {matchID, player}: {matchID: MatchID, player: Player},
) : ActiveMatch {
    
    const url = new URL(server);
    url.protocol = "ws";
    url.searchParams.append("matchID", matchID.mid);
    url.searchParams.append("playerID", player.id);
    url.searchParams.append("credentials", player.credentials);

    //console.log(url.toString());

    const { sendJsonMessage, lastJsonMessage, readyState } = useWebSocket(url.toString());
    if ( !lastJsonMessage ) {
        return { readyState };
    }

    const { error, matchData } = lastJsonMessage as ServerMoveResponse;
    if ( !matchData ) {
        return { readyState, error };
    }

    // Inefficient, but simple. (Functions are recreated on every call.)
    const matchMoves: Record<string, MatchMove> = {};
    for (const moveName in gameDefinition.moves) {
        const givenMove = gameDefinition.moves[moveName];
        matchMoves[moveName] = makeMatchMove(moveName, givenMove, sendJsonMessage);
    };

    const match : Match = {
        ...matchData,
        moves: matchMoves,
    };
    
    return { readyState, error, match };
}

function makeMatchMove(
    moveName: string,
    givenMove: GameDefintionMove<unknown, unknown>, 
    sendJsonMessage: (message: unknown) => void,
) : MatchMove {
    return ({ arg, activePlayer }) => {

        const data : WsMoveData = {
            move: moveName,
            activePlayer,
            arg,
        };

        sendJsonMessage(data);
    };
}

