import React from 'react';
import { gameDefinition } from '../games/tic-tac-toe/actions/definition';
import { Board } from '../games/tic-tac-toe/board/board';
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
