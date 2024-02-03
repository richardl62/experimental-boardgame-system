
import { GameDefinition, GameDefintionMove, PlayerData } from "../games/game-definition";
import {Match, MatchMove } from "./match";
import useWebSocket from 'react-use-websocket';

const socketUrl = "ws://localhost:8000";

type OnlineMatchResult = {
    match: Match,
    message?: undefined,
} | {
    match?: undefined,
    message: string,
};

// Create and offilne game instance.
export function useOnlineMatch(
    gameDefinition: GameDefinition,
    {nPlayers}: {nPlayers: number}
) : OnlineMatchResult {
    const { sendJsonMessage, lastJsonMessage } = useWebSocket(socketUrl);
    
    if (lastJsonMessage === null) {
        return {message: "Loading the server (well, maybe something has go wrong)..."};
    }

    // Inefficient, but simple. (Functions are recreated on every call.)
    const matchMoves: Record<string, MatchMove> = {};
    for (const moveName in gameDefinition.moves) {
        const givenMove = gameDefinition.moves[moveName];
        matchMoves[moveName] = makeMatchMove(moveName, givenMove, sendJsonMessage);
    };

    const match: Match = {
        playerData: playerDataHACK(nPlayers),
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

        const message = {
            move: moveName,
            activePlayer, // Does this need to be sent?
            arg,
        };

        sendJsonMessage(message);
    };
}

function playerDataHACK(nPlayers: number) : PlayerData[]{
    const playerData : PlayerData[] = [];
    for (let i = 0; i < nPlayers; i++) {
        playerData.push({ name: `Player ${i + 1}` });
    }

    return playerData;
}
