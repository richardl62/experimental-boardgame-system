import { LobbyClient } from "boardgame.io/client";
import { GameDefinition } from "../../shared/game-definition";
import { lobbyServer } from "../url-params";
import { defaultPlayerName } from "../../app-game-support/player-names";
import { MatchID, Player } from "../../shared/types";

export function makeLobbyClient() : LobbyClient {
    return new LobbyClient({ server: lobbyServer() });
}

export async function createMatch(
    game: GameDefinition,
    options: { numPlayers: number, setupData: unknown },
): Promise<MatchID> {
    const p = makeLobbyClient().createMatch(game.name, options);
    const m = await p;
    return { mid: m.matchID };
}

export async function joinMatch(game: GameDefinition, matchID: MatchID, name: string | null = null): Promise<Player> {
    const lobbyClient = makeLobbyClient();
    const match = await lobbyClient.getMatch(game.name, matchID.mid);

    const players = match.players;
    let index = 0;
    while (players[index].name) {
        ++index;
        if (index === players.length) {
            throw new Error("Match full - cannot join");
        }
    }

    const joinMatchResult = await lobbyClient.joinMatch(game.name, matchID.mid,
        {playerName: name || "unnamed"} );

    const credentials = joinMatchResult.playerCredentials;
    const playerID = joinMatchResult.playerID;

    if(!name) {
        await lobbyClient.updatePlayer(game.name, matchID.mid, {
            playerID: playerID,
            credentials: credentials,
            newName: defaultPlayerName(playerID),
        });
    }

    return {
        id: playerID,
        credentials: credentials,
    };
}
