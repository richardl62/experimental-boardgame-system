import React from 'react';
import { games } from '../shared/games';
import { boards } from '../boards';
import { useOnlineMatch } from '../server-lib/use-online-match';
import { BoardWrapper } from './board-wrapper';
import { selectedGame } from '../config';

const gameDefinition = games[selectedGame];  // for now
const Board = boards[selectedGame];  // for now

export function OnlineGame() {
  const onlineMatchResult = useOnlineMatch(gameDefinition, {nPlayers: 2 /* for now */});

  if (onlineMatchResult.message) {
    return <div>{onlineMatchResult.message}</div>;
  }
  return <>
    <BoardWrapper match={onlineMatchResult.match!} activePlayer={0} > 
      <Board/>
    </BoardWrapper>
  </>;
}
