import { WebSocket  } from 'ws'; // Import the ws library
import { PublicPlayerMetadata } from './shared/lobby';

// Put loosely, a Player represents a seat at the table at which
// a match is being played. Initially, seats are unallocated. But when someone
// takes a seat, it remains allocated to that person
// even if they (temporarily, we hope) leave the table.
//
// An allocated Player is indcated by the name being set or, equivalently, by isAllocated().
// (The name of a player can change after allocation, but it will always remain set.) 
//
// A connected Player (i.e. one who is at their seat in the analogy above), is indicated by
// the websocket being set or, equivalently, by isConnected.  
//
// If an allocated Player is not connected, this could indicate a network problem, or that
// the browser running the relevant client was shut. In general, it should be possible for a
// client to re-establish a lost connection.   
export class Player {
    // KLUDGE? seed is used to help generate id and credentials.  A different seed should be
    // use for each Player.
    constructor(seed: number) {
        this.id = seed.toString(); // for now
        this.credentials = 'c' + this.id; // for now
        
        this.name = null;
        this.data = null;
        this._ws = null;
    }

    readonly id: string;
    readonly credentials: string;

    private name: string | null;
    private data: any; // Is this needed?

    private _ws: WebSocket | null;
    get ws() {return this._ws;}
    private set ws(ws_) {this._ws = ws_;}

    /** Permanently allocate this player (see class comment) */
    allocate(name: string) { this.name = name; }
    get isAllocated() { return this.name !== null; }

    recordConnection(ws: WebSocket) { this.ws = ws;}
    recordDisconnect() {this.ws = null;}
    get isConnected() {return this.ws !== null; } 

    setName(name: string) {
        this.name = name;
    }

    publicMetada(): PublicPlayerMetadata {
        const { name, isConnected } = this;
        return  { 
            name: name || undefined, 
            isConnected 
        };
    }

    send(obj: unknown) {
        const text = JSON.stringify(obj);
        if(!this.ws) {
            throw new Error("Attempt to send message to disconnected player");
        }
        this.ws.send(text);
    }
}
