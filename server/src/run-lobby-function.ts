import { ParsedQs } from 'qs';

export function runLobbyFunction(query: ParsedQs) {
  console.log("Lobby function called:", query, query.func);
  throw new Error('Function not implemented.');
}
