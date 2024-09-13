import { MatchData } from "../shared/match-data";

// A move function as run on a client.
export type MatchMove = (arg0: {
    activePlayer: number, // Is this needed?
    arg: unknown,
}) => void;


// Data and functions relating to a specifc game instance on the server
// or pseudo-server.  The code that creates a Match differs in online and 
// offline play.  But the code that used the Match is the same in both cases.
export interface Match<GameState = unknown>  extends MatchData<GameState> {
    moves: Record<string, MatchMove>;
}
