import { GameDefinition } from "./shared/game-definition";
import { WebSocket as WSWebSocket  } from 'ws'; // Import the ws library

// A match is an instance of a game.
export class Match {
    constructor(definition: GameDefinition) {
        this.definition = definition;
        this.state = definition.initialState();
        this.players = new Set<WSWebSocket>();  
    }

    readonly definition: GameDefinition;
    readonly players: Set<WSWebSocket>;
    private state: any;

    addPlayer(player: WSWebSocket) {
        this.players.add(player);
        player.send(JSON.stringify(this.state));
    }

    removePlayer(player: WSWebSocket) {
        this.players.delete(player);
    }   
    
    // Simplified move function
    move(name: string, parameter: any) {
        const move = this.definition.moves[name];
        if (!move) {
            throw new Error(`Unknown move: ${name}`);
        }
        this.state = move({ state: this.state, currentPlayer: 0, activePlayer: 0, arg: parameter });
        this.broadcast();   
    }

    // Function to send a message to all connected players
    broadcast() {
        for (const player of this.players) {
            const str = JSON.stringify(this.state);
            player.send(str);
        }
    }
};  