import { ParsedQs } from 'qs';

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

export function runLobbyFunction(query: ParsedQs) {
  console.log("Lobby function called:", query, query.func);
  throw new Error('Function not implemented.');
}
