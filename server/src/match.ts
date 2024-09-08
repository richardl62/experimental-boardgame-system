import { GameDefinition } from "./shared/game-definition";
import { WebSocket } from 'ws';
import { Player } from "./player";
import { LobbyTypes } from "./shared/lobby";

// A match is an instance of a game.
export class Match {
    constructor(
        definition: GameDefinition, 
        id: string, // The caller must ensure that that ID is unique.
        players: Player[],
    ) {
        this.definition = definition;
        this.id = id;
        this.players = players;

        this.state = definition.initialState();
    }

    readonly definition: GameDefinition;
    readonly id: string;
    readonly players: Player[];
    private state: any;

    get game() {return this.definition.name}

    addPlayer(player: Player) {
        this.players.push(player);
        player.send(JSON.stringify(this.state));
    }

    getPlayerByWebSocket(ws: WebSocket) : Player | null {
        for (let player of this.players) {
            if ( player.ws === ws ) {
                return player;
            }
        }

        return null;
    }
    
    playerDisconnected(ws: WebSocket) : void {
        const player = this.getPlayerByWebSocket(ws);
        if (!player) {
            throw new Error("Disconnect report when player not connected");
        }
        player.recordDisconnect();
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

    lobbyMatch() : LobbyTypes.Match {
        return {
            matchID: this.id,
            players: this.players.map(p => p.publicMetada()),
        }
    }

    // Function to send a message to all connected players
    broadcast() {
        for (const player of this.players) {
            const str = JSON.stringify(this.state);
            player.send(str);
        }
    }
};  