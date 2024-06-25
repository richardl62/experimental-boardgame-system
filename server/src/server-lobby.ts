import { Match } from "./match";
import { Matches } from "./matches";
import { Lobby, LobbyTypes } from "./shared/lobby";

export class ServerLobby implements Lobby {
    constructor(matches: Matches) {
        this.matches = matches;
    }
    matches: Matches;

    createMatch(
        options: {
            game: string,
            numPlayers: number;
        }
    ): LobbyTypes.CreatedMatch {   
        const id = this.matches.addMatch(options.game);

        return {
            matchID: id.toString(),
        }
    }

    listMatches(
        options: {
            game: string,
        }
    ): LobbyTypes.MatchList {
        return {
            matches: [
                {
                    matchID: "dummy",
                    players: [],
                }
            ]
        }
    }

    getMatch(
        arg: {
            game: string,
            matchID: string,
        }
    ): LobbyTypes.Match {
        throw new Error("Not yet implemented");
    }

    joinMatch(
        arg: {
            game: string,
            matchID: string,
            playerName: string;
        }
    ): LobbyTypes.JoinedMatch {
        throw new Error("Not yet implemented");
    }

    updatePlayer( 
        arg: {
            game: string,
            matchID: string,

            playerID: string;
            credentials: string;
            newName: string;
        }
    ): void {
        throw new Error("Not yet implemented");
    }
} 
