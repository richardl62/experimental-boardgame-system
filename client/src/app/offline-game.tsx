import React from 'react';
import { useOfflineMatch } from '../server-lib/use-offline-match';
import { BoardWrapper } from './board-wrapper';
import { GameDefinition } from '../shared/game-definition';

export function OfflineGame({gameDefinition, Board} :
  {gameDefinition: GameDefinition, Board: () => JSX.Element}
) {
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
