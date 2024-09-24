import { ReadyState } from 'react-use-websocket';
import { Match } from "./match";

export type ActiveMatch = {
    readyState: ReadyState; // Use if the connection is not open

    match?: Match;  // Should be undefined only while waiting for data after 
                    // initial connection to the server.

    error?: string; // Set if an exception occured during the last move, or if the
                    // last move was found to be illegal (e.g. the wrong player
                    // tried to move).  In this cases, the match state will not
                    // changed.
                    // If set, it shows there is a bug somewhere (or at least
                    // some less-than-ideal code). 
};
