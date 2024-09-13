
interface PlayerData {
    name: string;
}

export interface MatchData<GameState = unknown> {
    /** The players who have joined the game */
    playerData: PlayerData[];

    /** The play whose turn it is. */
    currentPlayer: number;

    /** The current state of the game, changed using moves. */
    state: GameState;
}
