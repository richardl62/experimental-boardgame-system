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
    private server: string;
    constructor({ server }: {
        server: string;
    }) {
        this.server = server;
    }

    createMatch(gameName: string, body: {
        numPlayers: number;
        setupData?: any;
        unlisted?: boolean;
        [key: string]: any;
    }, init?: RequestInit): Promise<LobbyAPI.CreatedMatch> {
        throw new Error("Not implemented");
    }

    getMatch(gameName: string, matchID: string, init?: RequestInit): Promise<LobbyAPI.Match> {
        throw new Error("Not implemented");
    }

    joinMatch(gameName: string, matchID: string, body: {
        playerID?: string;
        playerName: string;
        data?: any;
        [key: string]: any;
    }, init?: RequestInit): Promise<LobbyAPI.JoinedMatch> {
        throw new Error("Not implemented");
    }

    updatePlayer(gameName: string, matchID: string, body: {
        playerID: string;
        credentials: string;
        newName?: string;
        data?: any;
    }, init?: RequestInit): Promise<void> {
        throw new Error("Not implemented");
    }

    listMatches(gameName: string): Promise<LobbyAPI.MatchList> {
        throw new Error("Not implemented");
    }
}