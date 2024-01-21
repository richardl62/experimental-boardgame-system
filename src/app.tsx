import React from 'react';
import { gameDefinition } from './games/tic-tac-toe/actions/definition';
import { Board } from './games/tic-tac-toe/board/board';
import { ClientGame, ClientGameContext } from './game-lib/client-game';
import { useOfflineGameInstance } from './game-lib/use-offline-game-instance';

const nPlayers = 2; // KLUDGE: hard-coded for now

function BoardView({gameData} : {gameData: ClientGame}) {
  return <ClientGameContext.Provider value={gameData}>
    <Board />
  </ClientGameContext.Provider>;
}

function App() {
  const gameAndMoves = useOfflineGameInstance(gameDefinition, {nPlayers});

  return <>
    <BoardView gameData={{...gameAndMoves, viewingPlayer: 0}} />
    <BoardView gameData={{...gameAndMoves, viewingPlayer: 1}} />
  </>;
}

export default App;
