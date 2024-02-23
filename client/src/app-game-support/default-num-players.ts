import { GameDefinition } from "../shared/game-definition";

export function defaultNumPlayers(game: GameDefinition): number {
    let num = 2; //Arbitrary

    if (num < game.minPlayers) {
        num = game.minPlayers;
    }

    if (num > game.maxPlayers) {
        num = game.maxPlayers;
    }
    
    return num;
}
