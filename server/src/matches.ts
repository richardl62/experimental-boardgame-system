import { Match } from "./match";
import { GameDefinition } from "./shared/game-definition";
import { WebSocket  } from 'ws'; // Import the ws library
import { WsMoveData } from "./shared/types";
import { games } from "./shared/games";
import { Lobby, LobbyTypes } from "./shared/lobby";

// The Match interface is intended to be convenient for internal use.
// (ServerLobby uses Match to help respond to client request.)
export class Matches {
    constructor() {
        this.matches = [];
    }
    private matches: Match[];

    /** Create a new match and return it's ID */
    addMatch(name: string) : number {
        const match = new Match(getGameDefinition(name)) 
        return this.matches.push(match) - 1;
    }
    
    addPlayerToMatch(matchID: number, player: WebSocket) : void {
        if(!this.matches[matchID]){
            throw new Error("Invalid Match ID");
        }
        
        this.matches[matchID].addPlayer(player);
    }

    makeMove(player: WebSocket, parameterStr: string) : void {
        const match = this.getMatchByPlayer(player);
        if (!match) {
            throw new Error('Player not in a match');
        }
        const moveData: WsMoveData = JSON.parse(parameterStr);
        match.move(moveData.move, moveData.arg);
    }

    removePlayer(player: WebSocket) : void {
        const match = this.getMatchByPlayer(player);
        if (!match) {
           throw new Error('Player not in a match');
        } else {
            match.removePlayer(player);

        }
    }
    
    // Get the match that a player is in
    private getMatchByPlayer(player: WebSocket) {
        for (const match of this.matches) {
            if (match.players.has(player)) {
                return match;
            }
        }
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