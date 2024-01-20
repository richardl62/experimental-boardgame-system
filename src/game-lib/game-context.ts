import { createContext } from 'react';
import { GameData } from './game-data';

export interface TGameContext<TGameState = unknown> {
    state: TGameState,
    gameData: GameData,
    moves: (moveName: string, args: unknown) => void
}
export const GameContext = createContext<TGameContext | null>(null);