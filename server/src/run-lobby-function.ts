import { ParsedQs } from 'qs';
import { Matches } from './matches';

function requireString(param: unknown) : string {
  if(typeof param === "string") {
    return param;
  }
  throw new Error("Bad type when expecting string");
}

function requireInteger(param: unknown) : number {
  const str = requireString(param);
  const num = parseInt(str);
  if(isNaN(num)) {
    throw new Error(`"${str}" is not an integer`);
  }

  return num;
}

export function runLobbyFunction(matches: Matches, query: ParsedQs) {
  const func = query.func;
  console.log("Lobby function called:", query, query.func);

  if (func === "listMatches") {
      const game = requireString(query.game);
      return matches.listMatches(game)
  }

  if(func === "createMatch") {
    const numPlayers = 2; // Short term Kludge
    const game = requireString(query.game);
    return matches.createMatch(game, {numPlayers})
  }

 console.log("Lobby function not recognised");
  throw new Error('Function not implemented.');
}
