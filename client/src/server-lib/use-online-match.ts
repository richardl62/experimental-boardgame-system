
import { GameDefinition, PlayerData } from "../games/game-definition";
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
    const { lastJsonMessage } = useWebSocket(socketUrl);
    
    if (lastJsonMessage === null) {
        return {message: "Loading the server (well, maybe something has go wrong)..."};
    }

    // Inefficient, but simple. (Functions are recreated on every call.)
    const matchMoves: Record<string, MatchMove> = {};
    for (const moveName in gameDefinition.moves) {
        matchMoves[moveName] = () =>{throw new Error("Online moves not implemented")};
    };

    const match: Match = {
        playerData: playerDataHACK(nPlayers),
        currentPlayer: 0,
        moves: matchMoves, 
        state: lastJsonMessage,
    };

    return {match};
}


function playerDataHACK(nPlayers: number) : PlayerData[]{
    const playerData : PlayerData[] = [];
    for (let i = 0; i < nPlayers; i++) {
        playerData.push({ name: `Player ${i + 1}` });
    }

    return playerData;
}
