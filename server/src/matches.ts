import { Match } from "./match";
import { GameDefinition } from "./shared/game-definition";
import { WebSocket  } from 'ws'; // Import the ws library
import { WsMoveData } from "./shared/types";
import { games } from "./shared/games";

interface OptionalError {
    error?: string;
} 

export class Matches {
    constructor() {
        this.matches = [];
    }
    matches: Match[];

    add(game: string) {
        const gameDefinition = getGameDefinition(game)
        this.matches.push(new Match(gameDefinition));
        return this.matches.length - 1;
    }
    
    addPlayerToMatch(matchID: string, player: WebSocket) : OptionalError {
        const matchIDNum = parseInt(matchID);
        if(!this.matches[matchIDNum]){
            return { error: 'Invalid Match ID' };
        }
        
        this.matches[matchIDNum].addPlayer(player);
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