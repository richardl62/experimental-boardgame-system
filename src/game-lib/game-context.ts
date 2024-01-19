interface PlayerData {
    name: string;
}

export class GameContext {
    constructor(nPlayers: number) {
        this.players = [];
        for (let i = 0; i < nPlayers; i++) {
            this.players.push({ name: `Player ${i + 1}` });
        }
        
        this.currentPlayer = 0;
    }
    players: PlayerData[];
    currentPlayer: number;
}