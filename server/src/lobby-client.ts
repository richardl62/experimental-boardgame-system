import { LobbyAPI } from "./shared/lobby-api";

export class LobbyClient {

    async createMatch(
        game: string, // The name of the game, e.g. "scrabble".
        body: {
            numPlayers: number;
        }, 
    ): Promise<LobbyAPI.CreatedMatch> {
        throw Error("createMatch not implemented");
    }

    async getMatch(
        game: string, 
        matchID: string, 
    ): Promise<LobbyAPI.Match> {
        throw Error("getMatch not implemented");
    }

    async joinMatch(
        game: string, 
        matchID: string,
        body: {
            playerName: string;
        }, 
    ): Promise<LobbyAPI.JoinedMatch> {
        throw Error("joinMatch not implemented");
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
        throw Error("updatePlayer not implemented");
    }

    async listMatches(game: string): Promise<LobbyAPI.MatchList> {
        throw Error("listMatches not implemented");
    }
}