import { PlayerData } from "./player-data";

// Data for a specific game, serialisation so it can be sent to a server.
export interface BasicGameData<GameState = unknown> {
    /** Data about players - currently just the names */
    playerData: PlayerData[];
    
    /** The play whose turn it is. */
    currentPlayer: number;
    
    /** The current state of the game - determined by the specific name. */
    state: GameState;
}

export interface ClientGameData extends BasicGameData {
    /** The player who is viewing the game - potentially making moves*/
    viewingPlayer: number;

    moves: Record<string, (arg: unknown) => void>;
}