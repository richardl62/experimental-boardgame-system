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
    listMatches: (game: string) => LobbyTypes.MatchList;
}

// As Lobby but functions return promises
export type LobbyPromises = {
    [P in keyof Lobby]: 
        (...args: Parameters<Lobby[P]>) => Promise<ReturnType<Lobby[P]>>;
};
