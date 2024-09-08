import { Player } from "./player";

export class Players {
    constructor() {
        this.players = [];
    }

    players: Player [];

    addPlayer() : Player {
        const id = this.players.length + 1;
        const player = new Player(id);

        this.players.push(player);

        return player;
    }
}