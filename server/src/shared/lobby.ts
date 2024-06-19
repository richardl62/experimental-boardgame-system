type PlayerMetadata = {
    id: number;
    name?: string;
    credentials?: string;
    data?: any;
    isConnected?: boolean;
};
type PublicPlayerMetadata = Omit<PlayerMetadata, "credentials">;

// This namespace is a legally of BGIO (there is was called LobbyAPI)
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
