import express, { Express, Request, Response , Application } from 'express';
import { welcomeMessage } from './welcomeMessage';
import { Server, WebSocket as WSWebSocket  } from 'ws'; // Import the ws library

import { games } from './shared/games';
import { GameDefinition } from './shared/game-definition';
import { WsMoveData } from './shared/types';
import { Match } from './shared/match';

const app: Application = express();
const port = process.env.PORT || 8000;


app.get('/', (req: Request, res: Response) => {
  res.send(`${welcomeMessage()}`);
});

// Start the HTTP server
const server = app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});


// Create a WebSocket server
const wss = new Server({ server });
const selectedGame = 'tictactoe'; // For now
const match = new Match(games[selectedGame])

wss.on('connection', ws => {
  // Add the new client to the set
  match.addPlayer(ws);

  ws.on('message', message => {
    try {
      const str = message.toString();
      console.log('Received message:', str);
      const moveData: WsMoveData = JSON.parse(str);
      match.move(moveData.move, moveData.arg);
    } catch (error) {
      console.error('Error parsing JSON message:', error);
    }
  });

  ws.on('close', () => {
    match.removePlayer(ws);
  });
});

