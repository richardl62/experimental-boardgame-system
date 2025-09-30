export type PublicPlayerMetadata = {
    name?: string;
    isConnected?: boolean;
};

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

