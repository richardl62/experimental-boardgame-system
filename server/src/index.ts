import express, { Express, Request, Response , Application } from 'express';
import { welcomeMessage } from './welcomeMessage';
import { Server, WebSocket as WSWebSocket  } from 'ws'; // Import the ws library

import { gameDefinition as ticTacToe } from './games/tic-tac-toe/actions/definition';

const app: Application = express();
const port = process.env.PORT || 8000;

const gameState = ticTacToe.initialState();

app.get('/', (req: Request, res: Response) => {
  res.send(`${welcomeMessage()}`);
});

// Start the HTTP server
const server = app.listen(port, () => {
  console.log(`Server is Fire at http://localhost:${port}`);
});

const clients = new Set<WSWebSocket>();

// Create a WebSocket server
const wss = new Server({ server });

wss.on('connection', ws => {
  // Add the new client to the set
  clients.add(ws);
  ws.send(JSON.stringify(gameState));
  console.log('Client connected - now: ', clients.size);

  ws.on('message', message => {
    try {
      const receivedObject = JSON.parse(JSON.parse(message.toString()));
      console.log('Received object:', receivedObject);
    } catch (error) {
      console.error('Error parsing JSON message:', error);
    }
  });

  ws.on('close', () => {
    // Remove the client from the set
    clients.delete(ws);
    console.log('Client disconnected - now: ', clients.size);
  });

});

// Function to send a message to all connected clients
function broadcast(data: string) {
  for (const client of clients) {
    client.send(data);
  }
}
