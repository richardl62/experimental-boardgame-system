export interface WsMoveData {
    move: string,
    activePlayer: number, // Does this need to be sent?
    arg: unknown
};

export type MatchID = string;