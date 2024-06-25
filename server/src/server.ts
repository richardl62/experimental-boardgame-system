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
    const result = runLobbyFunction(matches, req.query);
    res.send(JSON.stringify(result));
  } catch (err) {
    const message = err instanceof Error ? err.message : "unknown error";
    console.log("Lobby error:", message);
    res.status(400).send(`Lobby error: ${message}`);
  }
});

// Start the HTTP server
const server = app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

// Create a WebSocket server
const wss = new Server({ server });

function errorResponse(
  // err should be the parameter from a catch statement 
  err: unknown
)
{
  const message = err instanceof Error ? err.message : "unknown error";
  return JSON.stringify({ error: message });
}

wss.on('connection', (ws, req)  => {
  console.log('New client connected', req.url);
  
  if (req.url) {
    try {
      const parsedUrl = url.parse(req.url, true); // Set second argument to true for query object
      const matchID = parsedUrl.query.matchID;
      if (typeof matchID !== 'string') {
        throw new Error("Bad match ID");
      }
      matches.addPlayerToMatch(parseInt(matchID), ws);
    }
    catch (err) {
      console.error('Error during connection:', err);
      ws.send(errorResponse(err)); // Does it makes sense to report an eror here?
    }
  }

  ws.on('error', (error) => {
    console.error('WebSocket error:', error);
  });

  ws.on('message', message => {
    try {
      const str = message.toString();
      matches.makeMove(ws, str);
    } catch  (err) {
      ws.send(errorResponse(err));
    }
  });

  ws.on('close', () => {
    try {
      matches.removePlayer(ws);
    } catch  (err) {
      ws.send(errorResponse(err)); // Does it makes sense to report an eror here?
    }
  })
});

