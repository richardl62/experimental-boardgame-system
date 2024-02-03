import express, { Express, Request, Response , Application } from 'express';
import { welcomeMessage } from './welcomeMessage';
import { Server, WebSocket as WSWebSocket  } from 'ws'; // Import the ws library

import { gameDefinition } from './games/tic-tac-toe/actions/definition';
import { GameDefinition } from './games/game-definition';
import { GameState } from './games/tic-tac-toe/actions/game-state';

const app: Application = express();
const port = process.env.PORT || 8000;

let gameState = gameDefinition.initialState();

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
      const receivedObject = JSON.parse(message.toString());
      gameState = applyMove(gameState, gameDefinition, receivedObject);
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
function broadcast(data: unknown) {
  for (const client of clients) {
    client.send(JSON.stringify(data));
  }
}

function applyMove(gameState: GameState, gameDefinition: GameDefinition, receivedObject: any): any {
  const { move, activePlayer, arg } = receivedObject;
  if(typeof move !== 'string' || typeof activePlayer !== "number") {
    throw new Error('Unexpected parameter to appplyMove');
  }
  const gameMove = gameDefinition.moves[move];
  if(!gameMove) {
    throw new Error(`Unknown move: ${move}`);
  }

  const newGameState = gameMove({
    state: gameState, 
    activePlayer,
    currentPlayer: 0, // For now. 
    arg});

}

