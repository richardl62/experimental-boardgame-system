
import { ReadyState } from "react-use-websocket";
import { nonJoinedPlayerName } from "../app-game-support/player-names";
import { Match } from "../server-lib/match";
import { ActiveMatch } from "../server-lib/active-match";
import { GameDefinition } from "../shared/game-definition";
import { PlayerData } from "../shared/match-data";
import { MatchPlay } from "./match-play";

function readyStatus( state: ReadyState) {
    const status = {
        [ReadyState.CONNECTING]: 'connecting',
        [ReadyState.OPEN]: 'open',
        [ReadyState.CLOSING]: 'closing',
        [ReadyState.CLOSED]: 'closed',
        [ReadyState.UNINSTANTIATED]: 'uninstantiated',
      }[state];

    return status || "unknown";
}

export function MatchPlayNew({ game, matchResult, activePlayer }  : {
    game: GameDefinition,
    matchResult: ActiveMatch,
    activePlayer: number,
}) : JSX.Element {
    const { readyState, error, match } = matchResult;

    return <div>
        {readyState !== ReadyState.OPEN &&
            <div>Server Status: {readyStatus(readyState)}</div>
        }
        
        {error && <div>Server error: {error} </div>}
        
        {match?  
            <MatchPlayWrapper game={game} match={match} activePlayer={activePlayer}/> :
            <div>Awaiting match data from server</div>
        } 
    </div>
}

function PlayerDataShow( {playerData} : {playerData: PlayerData}) {
    const { name, isConnected } = playerData;
    if (!name) {
        return <div>{nonJoinedPlayerName}</div>
    }
    return <div>
        {name} {isConnected? "connected" : "not connected"}
    </div>
}

function MatchPlayWrapper( {game, match, activePlayer} :
    {game: GameDefinition, match: Match, activePlayer: number}
 ) {
    return <div>
        {/* KLUDGE/TEMPORARY show names and connection data here where it will
        be shared by all games. It should really be up to the individual games to show
        this */}
        {match.playerData.map(
            (data, index) => <PlayerDataShow key={index} playerData={data} />
        )}

        <div></div>
        
        <MatchPlay game={game} match={match} activePlayer={activePlayer} />
    </div>; 
}