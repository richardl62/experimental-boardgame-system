import { ReadyState } from 'react-use-websocket';
import { Match } from "./match";

export type UseMatchResult = {
    readyState: ReadyState; // Use if the connection is not open
    error?: string;
    match?: Match;
};
