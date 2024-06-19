type PlayerMetadata = {
    id: number;
    name?: string;
    credentials?: string;
    data?: any;
    isConnected?: boolean;
};
type PublicPlayerMetadata = Omit<PlayerMetadata, "credentials">;

// This namespace is a legacy of BGIO (there is was called LobbyAPI)
export declare namespace LobbyTypes {
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

export interface Lobby {
    createMatch: (
        game: string,  
        options: {
            numPlayers: number;
        }
    ) => LobbyTypes.CreatedMatch;
    listMatches: (game: string) => LobbyTypes.Match[];
}

// Must to kept in sync with Lobby
// To do: Derive from Lobby
export interface LobbyPromises {
    createMatch: (
        game: string,  
        options: {
            numPlayers: number;
        }
    ) => Promise<LobbyTypes.CreatedMatch>;
    listMatches: (game: string) => Promise<LobbyTypes.MatchList>;
}