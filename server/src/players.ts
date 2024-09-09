import { Player } from "./player";

export class Players {
    constructor() {
        this.players = [];
    }

    players: Player [];

    addPlayer() : Player {
        const seed = this.players.length + 1;
        const player = new Player(seed);

        this.players.push(player);

        return player;
    }
}