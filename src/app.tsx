import React from 'react';
import { useGameDataAndMoves } from './game-lib/use-client-game-data';
import { gameDefinition } from './games/tic-tac-toe/definition';
import { Board } from './games/tic-tac-toe/board';
import { ClientGameContext } from './game-lib/client-game-data-context';

function App() {
  const game = useGameDataAndMoves(gameDefinition, {nPlayers: 2});

  return <ClientGameContext.Provider value={game}>
    <Board />
  </ClientGameContext.Provider>;
}

export default App;
