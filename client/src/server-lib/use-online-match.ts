import { GameDefinition, GameDefintionMove } from "../shared/game-definition";
import { MatchID, Player, WsMoveData } from "../shared/types";
import {Match, MatchMove } from "./match";
import useWebSocket, { ReadyState } from 'react-use-websocket';
import { ServerMoveResponse } from "../shared/server-move-response";
import { sAssert } from "../utils/assert";

type UseOnlineMatchResult = {
    readyState: ReadyState; // Use if the connection is not open
    error?: undefined,
    match?: undefined,
} | {
    readyState?: undefined;
    error: string | null,
    match?: undefined,
} | {
    readyState?: undefined;
    error?: undefined,
    match: Match | null,
};

export function useOnlineMatch(
    server: string,
    gameDefinition: GameDefinition,
    {matchID, player}: {matchID: MatchID, player: Player},
) : UseOnlineMatchResult {
    
    const url = new URL(server);
    url.protocol = "ws";
    url.searchParams.append("matchID", matchID.mid);
    url.searchParams.append("playerID", player.id);
    url.searchParams.append("credentials", player.credentials);

    console.log(url.toString());

    const { sendJsonMessage, lastJsonMessage, readyState } = useWebSocket(url.toString());
    if (readyState !== ReadyState.OPEN) {
        return { readyState };
    }
    
    if (!lastJsonMessage) {
        return { 
            error: "No data recieved from server (unexpected error)",
        };
    }

    const {error, matchData} = lastJsonMessage as ServerMoveResponse;
    if (error) {
        return { error };
    }

    // Inefficient, but simple. (Functions are recreated on every call.)
    const matchMoves: Record<string, MatchMove> = {};
    for (const moveName in gameDefinition.moves) {
        const givenMove = gameDefinition.moves[moveName];
        matchMoves[moveName] = makeMatchMove(moveName, givenMove, sendJsonMessage);
    };
    sAssert(matchData);
    
    const match: Match = {
        ...matchData,
        moves: matchMoves, 
    };

    return { match };
}

function makeMatchMove(
    moveName: string,
    givenMove: GameDefintionMove<unknown, unknown>, 
    sendJsonMessage: (message: unknown) => void,
) : MatchMove {
    return ({ arg, activePlayer }) => {

        const data : WsMoveData = {
            move: moveName,
            activePlayer, // Does this need to be sent?
            arg,
        };

        sendJsonMessage(data);
    };
}

