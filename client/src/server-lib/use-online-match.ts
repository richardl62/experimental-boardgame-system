
import { GameDefinition, GameDefintionMove, PlayerData } from "../shared/game-definition";
import { MatchID, Player, WsMoveData } from "../shared/types";
import { sAssert } from "../utils/assert";
import {Match, MatchMove } from "./match";
import useWebSocket, { ReadyState } from 'react-use-websocket';


type OnlineMatchResult = {
    match: Match,
    message?: undefined,
} | {
    match?: undefined,
    message: string,
};

export function useOnlineMatch(
    server: string,
    gameDefinition: GameDefinition,
    {matchID, player}: {matchID: MatchID, player: Player},
) : OnlineMatchResult {
    
    const url = new URL(server);
    url.protocol = "ws";
    url.searchParams.append("matchID", matchID.mid);
    url.searchParams.append("playerID", player.id);
    url.searchParams.append("credentials", player.credentials);

    console.log(url.toString());

    const { sendJsonMessage, lastJsonMessage, readyState } = useWebSocket(url.toString());


    if (readyState !== ReadyState.OPEN) {
        const message = {
            [ReadyState.CONNECTING]: 'Connecting',
            [ReadyState.CLOSING]: 'Closing',
            [ReadyState.CLOSED]: 'Closed',
            [ReadyState.UNINSTANTIATED]: 'Uninstantiated',
        }[readyState];

        sAssert(message, "Unrecoginsed WebSocket connect state");
        
        return { message };
    }
    
    if (lastJsonMessage === null) {
        return {message: "Null message recieved (unexpected error)"};
    }

    // Inefficient, but simple. (Functions are recreated on every call.)
    const matchMoves: Record<string, MatchMove> = {};
    for (const moveName in gameDefinition.moves) {
        const givenMove = gameDefinition.moves[moveName];
        matchMoves[moveName] = makeMatchMove(moveName, givenMove, sendJsonMessage);
    };

    const match: Match = {
        playerData: playerDataHACK(),
        currentPlayer: 0,
        moves: matchMoves, 
        state: lastJsonMessage,
    };

    return {match};
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

function playerDataHACK() : PlayerData[]{
    const playerData : PlayerData[] = [];
    for (let i = 0; i < 2; i++) {
        playerData.push({ name: `Player ${i + 1}` });
    }

    return playerData;
}
