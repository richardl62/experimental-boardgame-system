import { LobbyPromises, LobbyTypes } from "../shared/lobby";
import { callLobby } from "./call-lobby";

export class LobbyClient implements LobbyPromises {

    async createMatch(
        game: string, // The name of the game, e.g. "scrabble".
        body: {
            numPlayers: number;
        }, 
    ): Promise<LobbyTypes.CreatedMatch> {
        const numPlayers = body.numPlayers.toString();
        return callLobby("createMatch", {game, numPlayers});
    }

    async listMatches(game: string): Promise<LobbyTypes.MatchList> {
        return callLobby("listMatches", {game});
    }

    async getMatch(
        game: string, 
        matchID: string, 
    ): Promise<LobbyTypes.Match> {
        return callLobby("getMatch", {game, matchID});
    }

    async joinMatch(
        game: string, 
        matchID: string,
        body: {
            playerName: string;
        }, 
    ): Promise<LobbyTypes.JoinedMatch> {
        const params = {game, matchID, ...body};
        return callLobby("joinMatch", params);
    }

    async updatePlayer(
        game: string, 
        matchID: string, 
        body: {
            playerID: string;
            credentials: string;
            newName: string;
        }
    ): Promise<void> {
        const params = {game, matchID, ...body}
        return await callLobby("updatePlayer", params);
    }
}