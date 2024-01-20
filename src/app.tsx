import React from 'react';
import { useGame } from './game-lib/use-game';
import { gameDefinition } from './games/tic-tac-toe/definition';
import { GameState } from "./games/tic-tac-toe/game-state";
import { Board } from './games/tic-tac-toe/board';

function App() {
  const { state, gameData, moves } = useGame<GameState>(gameDefinition, 2);
  return <Board state={state} gameData={gameData} moves={moves} />;
}

export default App;
