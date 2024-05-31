import express, { Express, Request, Response , Application } from 'express';
import { Server, WebSocket as WSWebSocket  } from 'ws'; // Import the ws library

import { games } from './shared/games';
import { GameDefinition } from './shared/game-definition';
import { WsMoveData } from './shared/types';
import { Match } from './match';
import url from 'url';
import { Matches } from './matches';
import { runLobbyFunction } from './run-lobby-function';

const app: Application = express();
const port = process.env.PORT || 8000;

const matches = new Matches();

function requireString(param: unknown) : string {
  if(typeof param === "string") {
    return param;
  }
  throw new Error("Bad type when expecting string");
}

function requireInteger(param: unknown) : number {
  const str = requireString(param);
  const num = parseInt(str);
  if(isNaN(num)) {
    throw new Error(`"${str}" is not an integer`);
  }

  return num;
}

function sendError(operation: string, res: Response, err: unknown) {
  const message = err instanceof Error ? err.message : "unknown error";
  res.status(400).send(`${operation}: ${message}`);
}

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // or "*" to cover all domains
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// Run all the functions provided by the LobbyClient
// The name of the function to run (createMatch, joinMatch etc)
// is provided as a query parameter.
app.get('/lobby', (req: Request, res: Response) => {
  try {
    const result = runLobbyFunction(req.query);
    res.send(JSON.stringify(result));
  } catch (err) {
      sendError("startmatch", res, err);
  }
});

// Start the HTTP server
const server = app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

// Create a WebSocket server
const wss = new Server({ server });

wss.on('connection', (ws, req)  => {
  console.log('New client connected', req.url);
  
  let error : string | undefined = "Match ID not found";
  if (req.url) {
    const parsedUrl = url.parse(req.url, true); // Set second argument to true for query object
    const matchID = parsedUrl.query.matchID;
    if(typeof matchID === 'string') {
        error = matches.addPlayerToMatch(matchID, ws).error;
    }
  }

  if (error) {
    console.error('Error during connection:', error);
    ws.send(JSON.stringify({ error }));
  }

  ws.on('error', (error) => {
    console.error('WebSocket error:', error);
  });

  ws.on('message', message => {
    const str = message.toString();
    const { error } = matches.makeMove(ws, str);
    if (error) {
      console.error('Error during move:', error);
      ws.send(JSON.stringify({ error }));
    }
  });

  ws.on('close', () => {
    const { error } = matches.removePlayer(ws);
    if (error) {
      console.error('Error during close:', error);
      ws.send(JSON.stringify({ error }));
    }
  })
});

