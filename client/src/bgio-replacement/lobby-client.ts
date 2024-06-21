import { LobbyPromises, LobbyTypes } from "../shared/lobby";
import { callLobby } from "./call-lobby";

export class LobbyClient implements LobbyPromises {

    async createMatch(
        options: {
            game: string, // The name of the game, e.g. "scrabble".
            numPlayers: number;
        }, 
    ): Promise<LobbyTypes.CreatedMatch> {
        return callLobby("createMatch", options);
    }

    async listMatches(
        options: {
            game: string
        }
    ): Promise<LobbyTypes.MatchList> {
        return callLobby("listMatches", options);
    }

    async getMatch(
        options: {
            game: string, 
            matchID: string,
        } 
    ): Promise<LobbyTypes.Match> {
        return callLobby("getMatch", options);
    }

    async joinMatch(
        options: {
            game: string,
            matchID: string,
            playerName: string;
        }
    ): Promise<LobbyTypes.JoinedMatch> {
        return callLobby("joinMatch", options);
    }

    async updatePlayer(
        options: {
            game: string,
            matchID: string,
            playerID: string;
            credentials: string;
            newName: string;
        }
    ): Promise<void> {
        return await callLobby("updatePlayer", options);
    }
}