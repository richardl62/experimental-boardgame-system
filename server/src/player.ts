import { WebSocket  } from 'ws'; // Import the ws library

export class Player {
    constructor(name: string, ws: WebSocket) {
        this.name = name;
        this.ws_ = null;  
    }
    readonly name: string;
    private ws_: WebSocket | null; // Null if disconnected

    get ws() {return this.ws_;}

    recordDisconnect() {this.ws_ = null;}
    
    get connected() {return this.ws_ !== null}

    send(obj: unknown) {
        const text = JSON.stringify(obj);
        if(!this.ws) {
            throw new Error("Attempt to send message to disconnected player");
        }
        this.ws.send(text);
    }
}