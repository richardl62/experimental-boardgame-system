
import { useOnlineMatch } from "../server-lib/use-match-online";
import { GameDefinition } from "../shared/game-definition";
import { MatchID, Player } from "../shared/types";
import { sAssert } from "../utils/assert";
import { MatchPlay } from "./match-play";
import * as UrlParams from "./url-params";

export function MatchPlayOnline({ game, matchID, player }: {
    game: GameDefinition;
    matchID: MatchID;
    player: Player;
}
): JSX.Element {
    const server = UrlParams.lobbyServer();
    const matchResult = useOnlineMatch(server, game, {matchID, player});

    const activePlayer = parseInt(player.id); // KLUDGE - should not be necessary
    sAssert(!isNaN(activePlayer), "Unexpected player ID");

    return <MatchPlay game={game} matchResult={matchResult} activePlayer={activePlayer}/>
}