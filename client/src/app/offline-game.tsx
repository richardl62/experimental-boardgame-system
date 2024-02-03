import React from 'react';
import { gameDefinition } from '../games/tic-tac-toe/actions/definition';
import { Board } from '../games/tic-tac-toe/board/board';
import { useOfflineMatch } from '../server-lib/use-offline-match';
import { BoardWrapper } from './board-wrapper';

export function OfflineGame() {
  const match = useOfflineMatch(gameDefinition, {nPlayers: 2 /* for now */});

  return <>
    <BoardWrapper match={match} activePlayer={0} > 
      <Board/>
    </BoardWrapper>

    <BoardWrapper match={match} activePlayer={1} > 
      <Board/>
    </BoardWrapper>
  </>;
}
