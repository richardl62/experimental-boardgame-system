Terminology

(The code should adhere to this terminology. If not it is a bug.)

Game: A 'abstract' game, e.g. Scrabble or Tic-Tac-Toe .  Games have rules, a board design etc, but no  players (cf Match)

Match: An instance of a game.  Matches have either players or a waiting for players.  There can be multiple matches of the same (e.g. multiple groups of people playing Scrabble at the same time).

Active player: The play who is viewing the board and potentially making moves.

Current player: They play whose turn it is. 