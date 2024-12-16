import { Ctx } from "./ctx";
import { EventsAPI } from "./events";
import { PlayerID } from "./types";

export interface MatchDataElem {
    id: number
    
    name: string;
    isConnected: boolean;
}

type Moves = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [x: string]: (...args: any[]) => void;
}

export interface BoardProps<TypeG=unknown> {
    playerID: PlayerID;
    credentials: string;

    matchID: string;

    matchData: Array<MatchDataElem>;
    ctx: Ctx;

    moves: Moves;
    events: EventsAPI;

    isConnected: boolean;
    G: TypeG;
}