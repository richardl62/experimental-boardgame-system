export interface GameState  {
    count: number;
};

export function initialState() : GameState {
    return {
        count: 0,
    };  
}   
