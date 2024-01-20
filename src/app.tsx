import React from 'react';
import { useGameDataAndMoves } from './game-lib/use-client-game-data';
import { gameDefinition } from './games/tic-tac-toe/actions/definition';
import { Board } from './games/tic-tac-toe/board/board';
import { ClientGameContext } from './game-lib/client-game-data-context';
import { ClientGameData } from './game-lib/game-data';

const nPlayers = 2; // KLUDGE: hard-coded for now

function BoardView({gameData} : {gameData: ClientGameData}) {
  return <ClientGameContext.Provider value={gameData}>
    <Board />
  </ClientGameContext.Provider>;
}

function App() {
  const gameAndMoves = useGameDataAndMoves(gameDefinition, {nPlayers});

  return <>
    <BoardView gameData={{...gameAndMoves, viewingPlayer: 0}} />
    <BoardView gameData={{...gameAndMoves, viewingPlayer: 1}} />
  </>;
}

export default App;
