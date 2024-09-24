export interface WsMoveData {
    move: string,
    activePlayer: number,
    arg: unknown
};

export interface Player {
    id: string;
    credentials: string;
  }
  
export interface MatchID {
    mid: string
} 
  