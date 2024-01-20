import { createContext } from 'react';
import { GameData } from './game-data';

export type UntypedMoves = {[moveName: string]: (arg: unknown) => void}

export interface TGameContext<TGameState = unknown> {
    state: TGameState,
    gameData: GameData,
    moves: UntypedMoves;
}
export const GameContext = createContext<TGameContext | null>(null);