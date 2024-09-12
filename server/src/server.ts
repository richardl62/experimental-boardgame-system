import express, { Express, Request, Response , Application } from 'express';
import { Server  } from 'ws';
import url from 'url';
import { Matches } from './matches';
import { runLobbyFunction } from './run-lobby-function';
import { Player } from './player';

const port = process.env.PORT || 8000;
const app: Application = express();

const matches = new Matches();

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
  err: unknown // The parameter from a catch statement 
)
{
  const message = err instanceof Error ? err.message : "unknown error";
  return JSON.stringify({ error: message });
}

wss.on('connection', (ws, req)  => {
  console.log('New client connected', req.url);
  
  if (req.url) {
    try {
      const parsedUrl = url.parse(req.url, true); // Does the 2nd parameter matter?

      const urlParam = (name: string) => {
        const param = parsedUrl.query[name];

        if (typeof param !== 'string') {
          throw new Error(`URL parameter "${name}" missing or invalid`);
        }
        console.log(name, param);
        return param;
      }

      const matchID = urlParam("matchID");
      const playerID = urlParam("playerID");
      const credentials = urlParam("credentials");
      console.log(matchID, playerID, credentials);

      const match = matches.getMatch(matchID);

      throw new Error("wss.on('connection', ...) not fully implemented")
      //match.addPlayer(new Player(name, ws));
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
      matches.playerDisconnected(ws);
    } catch  (err) {
      ws.send(errorResponse(err)); // Does it makes sense to report an eror here?
    }
  })
});

