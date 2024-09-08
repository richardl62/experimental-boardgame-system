import { Match } from "./match";
import { GameDefinition } from "./shared/game-definition";
import { WebSocket  } from 'ws';
import { WsMoveData } from "./shared/types";
import { games } from "./shared/games";

// The Match interface is intended to be convenient for internal use.
// (ServerLobby uses Match to help respond to client request.)
export class Matches {
    constructor() {
        this.matches = [];
    }
    private matches: Match[];

    getMatchIDs() : number[] {
        const ids = [];
        for (let id = 0; id < this.matches.length; id++) {
            ids.push(id);
            
        }
        return ids;
    }

    /** Create a new match and return it's ID */
    addMatch(name: string, numPlayer: number) : number {
        const match = new Match(getGameDefinition(name), numPlayer) 
        return this.matches.push(match) - 1;
    }
    
    getMatch(matchID: number) : Match {
        const match = this.matches[matchID];
        if(!match) {
            throw new Error("Invalid Match ID");
        }
        return match;
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