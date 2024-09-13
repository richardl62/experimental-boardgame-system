import WebSocket from "ws";
import url from 'url';
import { Matches } from "./matches";
import { ServerMoveResponse } from "./shared/server-move-response";
import { response } from "express";

function errorResponse(
    err: unknown // The parameter from a catch statement 
  )
  {
    const message = err instanceof Error ? err.message : "unknown error";
    return JSON.stringify({ error: message });
  }

export class Connections {
    constructor(matches: Matches) {
        this.matches = matches;
    }
    matches: Matches;

    connection(ws: WebSocket, requestUrl: string | undefined) {
        let response: ServerMoveResponse;

        if (requestUrl) {
          try {
            const parsedUrl = url.parse(requestUrl, true); // Does the 2nd parameter matter?
      
            const urlParam = (name: string) => {
              const param = parsedUrl.query[name];
      
              if (typeof param !== 'string') {
                throw new Error(`URL parameter "${name}" missing or invalid`);
              }
              return param;
            }
      
            const matchID = urlParam("matchID");
            const playerID = urlParam("playerID");
            const credentials = urlParam("credentials");

            const match = this.matches.getMatch(matchID);

            console.log(`Connection made - matchID:${matchID} playerID:${playerID}`);
      
            response = {
              matchData: {
                playerData: [],
                currentPlayer: 0, // TEMPORARY HACK
                state: "dummy game state", // TEMPORARY HACK
              }
            }
          }
          catch (err) {
            const message = err instanceof Error ? err.message : "unknown error";

            console.log('Error during connection:', message);

            response = {error: message};
          }

          ws.send(JSON.stringify(response));
        }
    }

    message(ws: WebSocket, str: string) {
        try {
            this.matches.makeMove(ws, str);
        } catch (err) {
            ws.send(errorResponse(err));
        }
    }

    close(ws: WebSocket) {
        try {
            this.matches.playerDisconnected(ws);
        } catch (err) {
            ws.send(errorResponse(err)); // Does it makes sense to report an eror here?
        }
    }

    error(ws: WebSocket, error: Error) {
        // What should be done here?
        console.error('WebSocket error:', error);
    }
}