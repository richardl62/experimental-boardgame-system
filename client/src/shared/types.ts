export interface WsMoveData {
    move: string,
    activePlayer: number, // Does this need to be sent?
    arg: unknown
};

export interface Player {
    id: string;
    credentials: string;
  }
  
export interface MatchID {
    mid: string
} 
  