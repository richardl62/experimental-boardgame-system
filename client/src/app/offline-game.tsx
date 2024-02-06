import React from 'react';
import { games } from '../shared/games';
import { useOfflineMatch } from '../server-lib/use-offline-match';
import { BoardWrapper } from './board-wrapper';
import { boards } from '../boards';
import { selectedGame } from '../config';

const gameDefinition = games[selectedGame];  // for now
const Board = boards[selectedGame];  // for now

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
