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

  if (func === "listMatches") {
      const game = requireString(arg.game);
      return matches.listMatches(game)
  }

  if(func === "createMatch") {
    const numPlayers = 2; // Short term Kludge
    const game = requireString(arg.game);
    return matches.createMatch(game, {numPlayers})
  }

  throw new Error('Lobby function not implemented.');
}
