import React from 'react';
import { gameDefinition } from '../shared/tic-tac-toe/definition';
import { Board } from '../board/tic-tac-toe/board';
import { useOnlineMatch } from '../server-lib/use-online-match';
import { BoardWrapper } from './board-wrapper';

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
