import { ParsedQs } from 'qs';
import { LobbyAPI } from './shared/lobby-api';

export function runLobbyFunction(query: ParsedQs) {
  console.log("Lobby function called:", query);
  const { func }  = query;
  if (func === "listMatches") {
    const result: LobbyAPI.MatchList = {
      matches: [
        {
          matchID: "dummy",
          players: [{id: 0}, {id: 1}],
        }
      ]
    }

    return result;
  }
  throw new Error(`Lobby function '${query.func}' not implemented`);
}
