import React from 'react';
import { gameDefinition } from '../shared/tic-tac-toe/definition';
import { Board } from '../board/tic-tac-toe/board';
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
