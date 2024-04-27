import express, { Express, Request, Response , Application } from 'express';
import { Server, WebSocket as WSWebSocket  } from 'ws'; // Import the ws library

import { games } from './shared/games';
import { GameDefinition } from './shared/game-definition';
import { WsMoveData } from './shared/types';
import { Match } from './match';
import url from 'url';
import { Matches } from './matches';

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

app.get('/creatematch', (req: Request, res: Response) => {
  try {
    const game = requireString(req.query.game);
    const nPlayers = requireInteger(req.query.nplayers)
    const matchID = matches.create(game, {nPlayers});
    res.send(JSON.stringify({ matchID }));
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
