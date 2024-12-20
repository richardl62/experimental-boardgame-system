import { GameDefinition } from "../../game-definition";
import { defaultPlayerName } from "../../app-game-support/player-names";
import { MatchID, Player } from "../../shared/types";
import { LobbyClient } from "../../bgio-replacement/lobby-client";

export function makeLobbyClient() : LobbyClient {
    return new LobbyClient();
}

export async function createMatch(
    game: GameDefinition,
    options: { numPlayers: number, /*setupData: unknown*/ },
): Promise<MatchID> {
    const p = makeLobbyClient().createMatch({
        game: game.name, 
        numPlayers: options.numPlayers,
    });
    const m = await p;
    return { mid: m.matchID };
}

export async function joinMatch(game: GameDefinition, matchID: MatchID, name: string | null = null): Promise<Player> {
    const lobbyClient = makeLobbyClient();
    const match = await lobbyClient.getMatch({
        game: game.name, 
        matchID: matchID.mid
    });

    const players = match.players;
    let index = 0;
    while (players[index].name) {
        ++index;
        if (index === players.length) {
            throw new Error("Match full - cannot join");
        }
    }

    const joinMatchResult = await lobbyClient.joinMatch({
        game: game.name, 
        matchID: matchID.mid,
        playerName: name || "unnamed"
    });

    const credentials = joinMatchResult.playerCredentials;
    const playerID = joinMatchResult.playerID;

    if(!name) {
        await lobbyClient.updatePlayer({
            game: game.name, 
            matchID: matchID.mid, 
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
