import { createContext } from 'react';
import { ClientGameData } from './game-data';

export const ClientGameContext = createContext<ClientGameData | null>(null);