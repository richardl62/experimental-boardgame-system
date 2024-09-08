import { ParsedQs } from 'qs';
import { Matches } from './matches';
import { ServerLobby } from './server-lobby';

export function runLobbyFunction(matches: Matches, query: ParsedQs) : unknown {
  console.log("Lobby function called:", query);
  
  const func = query.func;
  if(typeof func !== "string") {
    throw new Error("Function name missing or invalid in call to lobby");
  }

  let arg = null;
  if(typeof query.arg === "string") {
    arg = JSON.parse(query.arg);
  }
  if (typeof arg !== "object") {
    throw new Error("Parameter missing or invalid in call to lobby");
  }

  const lobby = new ServerLobby(matches);
  if(typeof (lobby as any)[func] === "function") {
    return (lobby as any)[func](arg);
  }

  throw new Error('Lobby function not implemented.');
}
