import express, { Express, Request, Response , Application } from 'express';
import { Server, WebSocket as WSWebSocket  } from 'ws'; // Import the ws library

import url from 'url';
import { Matches } from './matches';
import { runLobbyFunction } from './run-lobby-function';

const port = process.env.PORT || 8000;
const matches = new Matches();

const app: Application = express();

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
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
    const message = err instanceof Error ? err.message : "unknown error";
    res.status(400).send(`Lobby error: ${message}`);
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

