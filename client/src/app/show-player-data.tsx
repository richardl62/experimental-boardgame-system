import { nonJoinedPlayerName } from "../app-game-support/player-names";
import { Match } from "../server-lib/match";
import { PlayerData } from "../shared/match-data";

function PD( {playerData} : {playerData: PlayerData}) {
    const { name, isConnected } = playerData;
    if (!name) {
        return <div>{nonJoinedPlayerName}</div>
    }
    return <div>
        {name} {isConnected? "connected" : "not connected"}
    </div>
}

export function ShowPlayerData( { match } : { match: Match }) {

    return <div>
        {match.playerData.map(
            (data, index) => <PD key={index} playerData={data} />
        )}
    </div>; 
}