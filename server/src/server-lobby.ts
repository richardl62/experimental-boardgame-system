import { Match } from "./match";
import { Matches } from "./matches";
import { Lobby, LobbyTypes } from "./shared/lobby";

export class ServerLobby implements Lobby {
    constructor(matches: Matches) {
        this.matches = matches;
    }
    matches: Matches;

    createMatch(
        {game, numPlayers}: {
            game: string,
            numPlayers: number;
        }
    ): LobbyTypes.CreatedMatch {   
        const match = this.matches.addMatch(game, numPlayers);
        return match.lobbyMatch();
    }

    listMatches(
        options: {
            game: string, // TO DO: Use this to filter the returned matches.
        }
    ): LobbyTypes.MatchList {
        const { game } = options;
        const matches = this.matches.getMatches(game);

        return {
            matches: matches.map(m => m.lobbyMatch())
        }
    }

    getMatch(
        options : {
            game: string, // Is this helpful?
            matchID: string,
        }
    ): LobbyTypes.Match {
        const { game, matchID } = options;

        const match = this.matches.getMatch(matchID);
        if ( match.game !== game ) {
            throw new Error("selected match is not of the expected game");
        }

        return match.lobbyMatch();
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