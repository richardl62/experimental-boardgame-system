import { LobbyAPI } from "../shared/lobby-api";

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
    ): Promise<LobbyAPI.CreatedMatch> {
        const numPlayers = body.numPlayers.toString();
        return await this.lobbyFunction("createMatch", {game, numPlayers}) as LobbyAPI.CreatedMatch;
    }

    async getMatch(
        game: string, 
        matchID: string, 
    ): Promise<LobbyAPI.Match> {
        return await this.lobbyFunction("getMatch", {game, matchID}) as LobbyAPI.Match;
    }

    async joinMatch(
        game: string, 
        matchID: string,
        body: {
            playerName: string;
        }, 
    ): Promise<LobbyAPI.JoinedMatch> {
        const params = {game, matchID, ...body};
        return await this.lobbyFunction("joinMatch", params) as LobbyAPI.JoinedMatch;
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
        return await this.lobbyFunction("updatePlayer", params) as void;
    }

    async listMatches(game: string): Promise<LobbyAPI.MatchList> {
        return await this.lobbyFunction("listMatches", {game}) as LobbyAPI.MatchList;
    }

    async lobbyFunction(func: string, params: Record<string,string>) : Promise<unknown> {
        const searchParams = new URLSearchParams({func, ...params});

        // Build the full URL including query string
        const fullUrl = `${this.server}/lobby?${searchParams.toString()}`;
        //console.log(fullUrl);

        return fetch(fullUrl)
            .then(response => response.json())
            .then(data => {
                // The response should be an object of the form
                //    {data: any}
                // or
                //    {error: string}

                //console.log("callServer", data);
                const { result, error } = data;

                if (error) {
                    throw Error(data.error);
                }

                if (result === undefined) {
                    throw Error("Internal error: Cannot interpret server response");
                }

                return result;
            })
    }
}