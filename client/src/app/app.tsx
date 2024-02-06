import React from 'react';
import { OnlineGame } from './online-game';
import { OfflineGame } from './offline-game';
import { playOnline } from '../config';

function App() {
  return playOnline ? <OnlineGame/> : <OfflineGame/>;
}

export default App;
