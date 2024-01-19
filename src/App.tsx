import React from 'react';
import { useGamePlay } from './game-lib/use-game-play';
import { GameState, gameDefinition } from './games/tic-tac-toe/definition';
import { Board } from './games/tic-tac-toe/board';

function App() {
  const { state, context, moves } = useGamePlay<GameState>(gameDefinition, 2);
  return <Board state={state} context={context} moves={moves} />;
}

export default App;
