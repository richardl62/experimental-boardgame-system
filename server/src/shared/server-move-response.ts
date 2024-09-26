import { MatchData } from "./match-data";

// The data returned from the server after move.
// Also returned after a connection.
export type ServerMoveResponse = {
    error?: string;

    
    matchData?: MatchData; 
};
