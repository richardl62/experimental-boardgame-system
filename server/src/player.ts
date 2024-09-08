import { WebSocket  } from 'ws'; // Import the ws library
import { PublicPlayerMetadata } from './shared/lobby';

export class Player {
    constructor(id: number) {
        this.id = id;
        this.ws_ = null;
    }

    readonly id: number;
    name?: string;
    credentials?: string;
    data?: any;
    isConnected?: boolean;
    ws_?: WebSocket | null;

    get ws() {return this.ws_;}

    recordDisconnect() {this.ws_ = null;}
    
    get connected() {return this.ws_ !== null}

    publicMetada(): PublicPlayerMetadata {
        const { id, name, data, isConnected } = this;
        return  { id, name, data, isConnected };
    }

    send(obj: unknown) {
        const text = JSON.stringify(obj);
        if(!this.ws) {
            throw new Error("Attempt to send message to disconnected player");
        }
        this.ws.send(text);
    }
}