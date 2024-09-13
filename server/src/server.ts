import express, { Application, Request, Response } from 'express';
import { Server } from 'ws';
import { Connections } from './connections';
import { Matches } from './matches';
import { runLobbyFunction } from './run-lobby-function';

const matches = new Matches();
const connections = new Connections(matches);

const port = process.env.PORT || 8000;
const app: Application = express();

const server = app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

const wss = new Server({ server });

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

wss.on('connection', (ws, req)  => {

  connections.connection(ws, req.url);

  ws.on('close', () => {
    connections.close(ws);
  })

  ws.on('error', (error) => {
    connections.error(ws, error);
  });

  ws.on('message', message => { 
    connections.message(ws, message.toString());
  });
});
