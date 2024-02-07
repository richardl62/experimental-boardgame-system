import { games } from '../shared/games';
import tictactoe from './tictactoe/board';
import plusminus from './plusminus/board';

export const boards : Record<keyof typeof games, () => JSX.Element> = {
  tictactoe,
  plusminus,
} as const;
