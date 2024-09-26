import { MatchData } from "./match-data";

// The data returned from the server after move.
// Also returned after a connection.
export type ServerMoveResponse = {
    /** Error typically related to the previous move, but could show other bugs.
     */
    error: string | null;

    /** Match data will be missing following certain errors */
    matchData: MatchData | null; 
};
