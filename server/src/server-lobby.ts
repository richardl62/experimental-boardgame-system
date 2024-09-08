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
        const id = this.matches.addMatch(game, numPlayers);

        return {
            matchID: id.toString(),
        }
    }

    listMatches(
        options: {
            game: string, // TO DO: Use this to filter the returned matches.
        }
    ): LobbyTypes.MatchList {
        const matchIds = this.matches.getMatchIDs();

        const matchInfo = (matchID: number) : LobbyTypes.Match => {
            return {
                matchID: matchID.toString(),
                players: [],
            }
        }
  
        return {
            matches: matchIds.map(matchInfo)
        }
    }

    getMatch(
        options : {
            game: string,
            matchID: string,
        }
    ): LobbyTypes.Match {
        const { game, matchID } = options;

        const match =  getMatchFromStringID(this.matches, matchID, game );

        return lobbyMatch(matchID, match);
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

function getMatchFromStringID(matches: Matches, id: string, game: string ) : Match {
        
    const processedID = parseInt(id);
    if ( isNaN(processedID) ) {
        throw new Error(`matchID "${id}" is not an integer`);
    }

    const match = matches.getMatch(processedID);
    if(match.game !== game ) {
        throw new Error('game is not of the expected type');
    }

    return match;
}

function lobbyMatch(matchID: string, match: Match) : LobbyTypes.Match {
    return {
        matchID,
        players: [] // Temporary kludge
    }
}