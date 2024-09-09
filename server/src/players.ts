import { Player } from "./player";

export class Players {
    constructor() {
        this.lastSeed = 0;
    }

    lastSeed: number;

    addPlayer() : Player {
        this.lastSeed++;
        return new Player(this.lastSeed);
    }
}