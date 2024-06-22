import { ParsedQs } from 'qs';
import { Matches } from './matches';

export function runLobbyFunction(matches: Matches, query: ParsedQs) : unknown {
  console.log("Lobby function called:", query);
  
  const func = query.func;
  if(typeof func !== "string") {
    throw new Error("Function name not function in call to lobby");
  }

  let arg = null;
  if(typeof query.arg === "string") {
    arg = JSON.parse(query.arg);
  }
  if (typeof arg !== "object") {
    throw new Error("Parameter missing or invalid in call to lobby");
  }

  if(typeof (matches as any)[func] === "function") {
    return (matches as any)[func](arg);
  }

  throw new Error('Lobby function not implemented.');
}
