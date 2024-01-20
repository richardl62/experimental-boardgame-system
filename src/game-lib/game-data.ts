// High-level game data, i.e. data that is not specific to a particular game.
interface PlayerData {
    name: string;
}

export class GameData {
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