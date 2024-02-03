import React from 'react';
import { OnlineGame } from './online-game';
import { OfflineGame } from './offline-game';

const isOnline = false;
function App() {
  return isOnline ? <OnlineGame/> : <OfflineGame/>;
}

export default App;
