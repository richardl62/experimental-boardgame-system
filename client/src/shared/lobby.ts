// export type PlayerMetadata = {
//     id: number;
//     name?: string;
//     credentials?: string;
//     data?: any;
//     isConnected?: boolean;
// };

// export type PublicPlayerMetadata = Omit<PlayerMetadata, "credentials">;

export type PublicPlayerMetadata = {
    name?: string;
    isConnected?: boolean;
};

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
        arg: {
            game: string,  
            numPlayers: number;
        }
    ) => LobbyTypes.CreatedMatch;
    
    listMatches: (
        arg: {
            game: string
        }
    ) => LobbyTypes.MatchList;
    
    getMatch: (
        arg: {
            game: string,
            matchID: string,
        }
    ) => LobbyTypes.Match;

    joinMatch(
        arg: {
            game: string,
            matchID: string,
            playerName: string;
        }
    ): LobbyTypes.JoinedMatch;

    updatePlayer( 
        arg: {
            game: string,
            matchID: string,

            playerID: string;
            credentials: string;
            newName: string;
        }
    ): void;
}
