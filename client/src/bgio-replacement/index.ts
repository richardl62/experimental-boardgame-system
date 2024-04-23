import { CallServer } from "./call-server";

type PlayerMetadata = {
    id: number;
    name?: string;
    credentials?: string;
    data?: any;
    isConnected?: boolean;
};
type PublicPlayerMetadata = Omit<PlayerMetadata, "credentials">;

export declare namespace LobbyAPI {
    export type Match = {
        matchID: string;
        players: PublicPlayerMetadata[];
    };

    export interface CreatedMatch {
        matchID: string;
    }

    export interface JoinedMatch {
        playerID: string;
        playerCredentials: string;
    }

    export interface MatchList {
        matches: Match[];
    }
}

export class LobbyClient {
    private server: CallServer;
    constructor({ server }: {
        server: string;
    }) {
        this.server = new CallServer(server);
    }
      
    async createMatch(
        gameName: string, 
        body: {
            numPlayers: number;
            // setupData?: any;
            // unlisted?: boolean;
            // [key: string]: any;
        }, 
        //init?: RequestInit
    ): Promise<LobbyAPI.CreatedMatch> {
        const numPlayers = body.numPlayers.toString();
        return await this.server.call("createMatch", {name: gameName, numPlayers}) as LobbyAPI.CreatedMatch;
    }

    async getMatch(
        gameName: string, 
        matchID: string, 
        init?: RequestInit
    ): Promise<LobbyAPI.Match> {
        return await this.server.call("getMatch", {gameName, matchID}) as LobbyAPI.Match;
    }

    async joinMatch(gameName: string, matchID: string, body: {
        playerID?: string;
        playerName: string;
        data?: any;
        [key: string]: any;
    }, init?: RequestInit): Promise<LobbyAPI.JoinedMatch> {
        const playerID = body.playerID || "";
        return await this.server.call("joinMatch", {gameName, playerID}) as LobbyAPI.JoinedMatch;
    }

    async updatePlayer(gameName: string, matchID: string, body: {
        playerID: string;
        credentials: string;
        newName?: string;
        data?: any;
    }, init?: RequestInit): Promise<void> {
        throw new Error("Not implemented");
    }

    async listMatches(gameName: string): Promise<LobbyAPI.MatchList> {
        return await this.server.call("listMatches", {gameName}) as LobbyAPI.MatchList;
    }

}