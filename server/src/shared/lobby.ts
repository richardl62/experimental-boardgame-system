import * as LobbyTypes from "./lobby-types";

export interface Lobby {
    createMatch: (
        arg: {
            game: string,  
            numPlayers: number;
        }
    ) => LobbyTypes.CreatedMatch;
    
    listMatches: (
        arg: {
            game: string
        }
    ) => LobbyTypes.MatchList;
    
    getMatch: (
        arg: {
            game: string,
            matchID: string,
        }
    ) => LobbyTypes.Match;

    joinMatch(
        arg: {
            game: string,
            matchID: string,
            playerName: string;
        }
    ): LobbyTypes.JoinedMatch;

    updatePlayer( 
        arg: {
            game: string,
            matchID: string,

            playerID: string;
            credentials: string;
            newName: string;
        }
        // Returning something allows response.json() to be used in
        // the client, which helps with writting generic lobby code.
    ): null;
}
