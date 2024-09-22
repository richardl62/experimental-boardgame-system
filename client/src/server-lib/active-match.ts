import { ReadyState } from 'react-use-websocket';
import { Match } from "./match";

export type ActiveMatch = {
    readyState: ReadyState; // Use if the connection is not open
    match?: Match;  // Should be undefined only while waiting for data after 
                    // initial connection to the server.

    error?: string;
};
