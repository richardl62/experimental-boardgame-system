import express, { Express, Request, Response , Application } from 'express';
import dotenv from 'dotenv';
import { welcomeMessage } from './welcomeMessage';
import { Server, WebSocket as WSWebSocket  } from 'ws'; // Import the ws library

//For env File 
dotenv.config();

const app: Application = express();
const port = process.env.PORT || 8000;

let count = 0;
app.get('/', (req: Request, res: Response) => {
  ++count
  res.send(`${welcomeMessage()} - ${count}`);
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
  console.log('Client connected - now: ', clients.size);
  broadcast(`Number of clients: ${clients.size}`);

  ws.on('message', message => {
    console.log(`Received: ${message}`);
    broadcast(`Message: ${message}`+"!");
  });

  ws.on('close', () => {
    // Remove the client from the set
    clients.delete(ws);
    console.log('Client disconnected - now: ', clients.size);
    broadcast(`Number of clients: ${clients.size}`);
  });

});

// Function to send a message to all connected clients
function broadcast(data: string) {
  for (const client of clients) {
    client.send(data);
  }
}
