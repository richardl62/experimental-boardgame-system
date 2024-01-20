import React from 'react';
import { useGame } from './game-lib/use-game';
import { gameDefinition } from './games/tic-tac-toe/definition';
import { GameState } from "./games/tic-tac-toe/game-state";
import { Board } from './games/tic-tac-toe/board';
import { GameContext } from './game-lib/game-context';

function App() {
  const game = useGame<GameState>(gameDefinition, 2);

  return <GameContext.Provider value={game}>
    <Board />
  </GameContext.Provider>;
}

export default App;
