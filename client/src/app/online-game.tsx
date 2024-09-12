import React from 'react';
import { useOnlineMatch } from '../server-lib/use-online-match';
import { BoardWrapper } from './board-wrapper';
import { GameDefinition } from '../shared/game-definition';

export function OnlineGameXXX({gameDefinition, Board} :
  {gameDefinition: GameDefinition, Board: () => JSX.Element}
) {
  // const nPlayers = 2;  // for now
  // const matchID = "123";  // for now
  // const onlineMatchResult = useOnlineMatch(gameDefinition, {nPlayers, matchID});

  // if (onlineMatchResult.message) {
  //   return <div>{onlineMatchResult.message}</div>;
  // }
  // return <>
  //   <BoardWrapper match={onlineMatchResult.match!} activePlayer={0} > 
  //     <Board/>
  //   </BoardWrapper>
  // </>;
}
