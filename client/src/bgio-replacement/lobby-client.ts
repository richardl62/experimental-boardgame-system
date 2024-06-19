import { LobbyTypes } from "../shared/lobby";
import { callLobby } from "./call-lobby";

export class LobbyClient {
    private server: string;
    constructor({ server }: {
        server: string;
    }) {
        this.server = server;
    }
      
    async createMatch(
        game: string, // The name of the game, e.g. "scrabble".
        body: {
            numPlayers: number;
        }, 
    ): Promise<LobbyTypes.CreatedMatch> {
        const numPlayers = body.numPlayers.toString();
        return await this.lobby("createMatch", {game, numPlayers}) as LobbyTypes.CreatedMatch;
    }

    async getMatch(
        game: string, 
        matchID: string, 
    ): Promise<LobbyTypes.Match> {
        return await this.lobby("getMatch", {game, matchID}) as LobbyTypes.Match;
    }

    async joinMatch(
        game: string, 
        matchID: string,
        body: {
            playerName: string;
        }, 
    ): Promise<LobbyTypes.JoinedMatch> {
        const params = {game, matchID, ...body};
        return await this.lobby("joinMatch", params) as LobbyTypes.JoinedMatch;
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
        return await this.lobby("updatePlayer", params) as void;
    }

    async listMatches(game: string): Promise<LobbyTypes.MatchList> {
        return await this.lobby("listMatches", {game}) as LobbyTypes.MatchList;
    }

    async lobby(func: string, params: Record<string,string>) : Promise<unknown> {
        return callLobby(this.server, func, params);
    }
}