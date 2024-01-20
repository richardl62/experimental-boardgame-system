import { PlayerData } from "./player-data";

// Data for a specific game, serialisation so it can be sent to a server.
export interface BasicGameData<GameState = unknown> {
    playerData: PlayerData[];
    currentPlayer: number;
    
    state: GameState;
}

export interface ClientGameData extends BasicGameData {
    moves: Record<string, (arg: unknown) => void>;
}