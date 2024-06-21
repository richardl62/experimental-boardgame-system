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

export interface LobbyPromises {
    createMatch: (
        arg: {
            game: string,  
            numPlayers: number;
        }
    ) => Promise<LobbyTypes.CreatedMatch>;
    
    listMatches: (
        arg: {
            game: string
        }
    ) => Promise<LobbyTypes.MatchList>;
    
    getMatch: (
        arg: {
            game: string,
            matchID: string,
        }
    ) => Promise<LobbyTypes.Match>;

    joinMatch(
        arg: {
            game: string,
            matchID: string,
            playerName: string;
        }
    ): Promise<LobbyTypes.JoinedMatch>;

    updatePlayer( 
        arg: {
            game: string,
            matchID: string,

            playerID: string;
            credentials: string;
            newName: string;
        }
    ): Promise<void>;
}
