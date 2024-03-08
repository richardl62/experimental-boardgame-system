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
      
    async createMatch(gameName: string, body: {
        numPlayers: number;
        setupData?: any;
        unlisted?: boolean;
        [key: string]: any;
    }, init?: RequestInit): Promise<LobbyAPI.CreatedMatch> {
        const searchParams = new URLSearchParams({name: gameName});
      
        // Build the full URL including query string
        const fullUrl = `${this.server}?/createMatch/${searchParams.toString()}`;

        try {
            const response = await fetch(fullUrl);
            // Check response status code for errors
            if (!response.ok) {
                console.log("createMatch failed", response.status)
                throw new Error(`Error fetching data: ${response.status}`);
            } else {
                console.log("createMatch suceeded", response.json)
            }

            const data = await response.json() as LobbyAPI.CreatedMatch;
            return data;
        } catch (error) {
            throw error; // Re-throw the error for handling
        }
    }

    async getMatch(gameName: string, matchID: string, init?: RequestInit): Promise<LobbyAPI.Match> {
        throw new Error("Not implemented");
    }

    async joinMatch(gameName: string, matchID: string, body: {
        playerID?: string;
        playerName: string;
        data?: any;
        [key: string]: any;
    }, init?: RequestInit): Promise<LobbyAPI.JoinedMatch> {
        throw new Error("Not implemented");
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
        const searchParams = new URLSearchParams({name: gameName});
      
        // Build the full URL including query string
        const fullUrl = `${this.server}?/listMatches/${searchParams.toString()}`;

        try {
            const response = await fetch(fullUrl);
            // Check response status code for errors
            if (!response.ok) {
                console.log("listMatches failed", response.status)
                throw new Error(`Error fetching data: ${response.status}`);
            } else {
                console.log("listMatches suceeded", response.json)
            }

            const data = await response.json() as LobbyAPI.MatchList;
            return data;
        } catch (error) {
            throw error; // Re-throw the error for handling
        }
    }
}