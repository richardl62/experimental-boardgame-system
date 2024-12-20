import { OptionSpecifications } from "./option-specification/types";
import { ServerGameDefinition } from "./shared/server-game-definition";

// The string values are uses as section headers when displaying the list of
// games.
export enum GameCategory {
    standard = "Standard",
    development = "Under Development",
    test = "Test/Debug",
  }

// Information about a game, used when creating a new game instance.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface GameDefinition<GameState = any>  extends ServerGameDefinition<GameState> {
    displayName: string;
    category: GameCategory;

    minPlayers: number;
    maxPlayers: number;

    options?: OptionSpecifications;
}
