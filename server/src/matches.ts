import { Match } from "./match";
import { GameDefinition } from "./shared/game-definition";
import { WebSocket  } from 'ws'; // Import the ws library
import { WsMoveData } from "./shared/types";
import { games } from "./shared/games";
import { Lobby, LobbyTypes } from "./shared/lobby";

interface OptionalError {
    error?: string;
} 

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
    
    addPlayerToMatch(matchID: number, player: WebSocket) : OptionalError {
        if(!this.matches[matchID]){
            return { error: 'Invalid Match ID' };
        }
        
        this.matches[matchID].addPlayer(player);
        return {};
    }

    makeMove(player: WebSocket, parameterStr: string) : OptionalError {
        let error: string | undefined;
        try {
            const match = this.getMatchByPlayer(player);
            if (!match) {
                throw new Error('Player not in a match');
            }
            const moveData: WsMoveData = JSON.parse(parameterStr);
            match.move(moveData.move, moveData.arg);
        } catch (error) {
            error =  (error instanceof Error) ? error.message : "unknown error";
        }

        return {error};
    }

    removePlayer(player: WebSocket) : OptionalError {
        let error: string | undefined;
        
        const match = this.getMatchByPlayer(player);
        if (!match) {
            error = 'Player not in a match';
        } else {
            match.removePlayer(player);

        }
        
        return {error}
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