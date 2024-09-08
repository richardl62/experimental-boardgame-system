import { Match } from "./match";
import { GameDefinition } from "./shared/game-definition";
import { WebSocket  } from 'ws';
import { WsMoveData } from "./shared/types";
import { games } from "./shared/games";
import { Players } from "./players";
import { Player } from "./player";

// The Match interface is intended to be convenient for internal use.
// (ServerLobby uses Match to help respond to client request.)
export class Matches {
    constructor() {
        this.players = new Players;
        this.matches = [];
    }

    private players: Players;
    private matches: Match[];

    /** Create a new match and return it's ID */
    addMatch(name: string, numPlayer: number) : Match
    {
        // Base the id on the number of recorded matches.  This feels like
        // a bit of a kludge, but should ensure a unique id.
        const id = (this.matches.length+1).toString(); 

        const playersForMatch: Player[] = [];
        for(let i = 0; i < numPlayer; ++i) {
            playersForMatch.push(this.players.addPlayer());
        }

        const match = new Match(getGameDefinition(name), id, playersForMatch);
        this.matches.push(match);

        return match;
    }
    
    getMatch(matchID: string) : Match
    {
        for( const match of this.matches) {
            if (match.id === matchID) {
                return match;
            }
        }

        throw new Error("Invalid Match ID");
    }

    /** Get all the matchs of a particular game (e.g. Scrabble) */
    getMatches(game: string) : Match[]
    {
        const matches: Match[] = [];
        for( const match of this.matches) {
            if ( match.game === game ) {
                matches.push(match);
            }
        }

        return matches;
    }

    makeMove(ws: WebSocket, parameterStr: string) : void {
        const match = this.getMatchByWebSocket(ws);
        if (!match) {
            throw new Error('Player not in a match');
        }
        const moveData: WsMoveData = JSON.parse(parameterStr);
        match.move(moveData.move, moveData.arg);
    }

    playerDisconnected(ws: WebSocket) : void {
        const match = this.getMatchByWebSocket(ws);
        if (!match) {
           throw new Error('Player not in a match');
        } else {
            match.playerDisconnected(ws);
        }
    }

    // Get the match that a player is in
    private getMatchByWebSocket(ws: WebSocket) : Match | null {
        for (const match of this.matches) {
            if (match.getPlayerByWebSocket(ws)) {
                return match;
            }
        }
        
        return null;
    }
} 

function getGameDefinition(name: string): GameDefinition {
    for(const gameDefinition of games) {
      if(gameDefinition.name === name) {
        return gameDefinition;
      }
    } 
    
    throw new Error(`Unrecognised game "${name}"`)
}