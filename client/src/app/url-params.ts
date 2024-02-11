import { GameDefinition } from "../shared/game-definition";

export function gamePath(game: GameDefinition): string {
    return "/" + game.name;
}

