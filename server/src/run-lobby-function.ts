import { ParsedQs } from 'qs';
import { Matches } from './matches';

function requireString(param: unknown) : string {
  if(typeof param === "string") {
    return param;
  }
  throw new Error("Bad type when expecting string");
}

export function runLobbyFunction(matches: Matches, query: ParsedQs) {
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
    throw new Error("Parameters missing or invalid in call to lobby");
  }

  /* To do - find better way to do this */
  if (func === "listMatches") {
      return matches.listMatches(arg);
  }

  if(func === "createMatch") {
    return matches.createMatch(arg);
  }

  if(func === "getMatch") {
    return matches.getMatch(arg);
  }

  if(func === "joinMatch") {
    return matches.joinMatch(arg);
  }

  if(func === "updatePlayer") {
    return matches.updatePlayer(arg);
  }

  throw new Error('Lobby function not implemented.');
}
