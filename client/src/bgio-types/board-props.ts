import { Ctx } from "./ctx";
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

type Events =  {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    endGame?: (gameover?: any) => void;
    // endPhase?: () => void;
    endTurn?: (arg?: {
        next: PlayerID;
    }) => void;
    // setPhase?: (newPhase: string) => void;
    // endStage?: () => void;
    // setStage?: (newStage: string) => void;
    //setActivePlayers?: (arg: ActivePlayersArg) => void;
}

export interface BoardProps<TypeG=unknown> {
    playerID: PlayerID;
    credentials: string;

    matchID: string;

    matchData: Array<MatchDataElem>;
    ctx: Ctx;

    moves: Moves;
    events: Events;

    isConnected: boolean;
    G: TypeG;
}