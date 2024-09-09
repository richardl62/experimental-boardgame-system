import { WebSocket  } from 'ws'; // Import the ws library
import { PublicPlayerMetadata } from './shared/lobby';

export class Player {
    constructor(id: number) {
        this.id = id;
        this._ws = null;
    }

    readonly id: number;
    readonly credentials?: string;

    private name?: string;
    private data?: any;

    private _ws: WebSocket | null;
    get ws() {return this._ws;}
    private set ws(ws_) {this._ws = ws_;}

    recordDisconnect() {this.ws = null;}
    
    get isConnected() {return this.ws !== null}

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