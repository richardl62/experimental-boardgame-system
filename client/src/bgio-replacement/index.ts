import { LobbyAPI } from "../shared/lobby-api";
import { CallServer } from "./call-server";

export class LobbyClient {
    private server: CallServer;
    constructor({ server }: {
        server: string;
    }) {
        this.server = new CallServer(server);
    }
      
    async createMatch(
        game: string, // The name of the game, e.g. "scrabble".
        body: {
            numPlayers: number;
        }, 
    ): Promise<LobbyAPI.CreatedMatch> {
        const numPlayers = body.numPlayers.toString();
        return await this.server.call("createMatch", {game, numPlayers}) as LobbyAPI.CreatedMatch;
    }

    async getMatch(
        game: string, 
        matchID: string, 
    ): Promise<LobbyAPI.Match> {
        return await this.server.call("getMatch", {game, matchID}) as LobbyAPI.Match;
    }

    async joinMatch(
        game: string, 
        matchID: string,
        body: {
            playerName: string;
        }, 
    ): Promise<LobbyAPI.JoinedMatch> {
        const params = {game, matchID, ...body};
        return await this.server.call("joinMatch", params) as LobbyAPI.JoinedMatch;
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
        return await this.server.call("updatePlayer", params) as void;
    }

    async listMatches(game: string): Promise<LobbyAPI.MatchList> {
        return await this.server.call("listMatches", {game}) as LobbyAPI.MatchList;
    }
}