// High-level game data, i.e. data that is not specific to a particular game.
export interface PlayerData {
    name: string;
}

export function makePlayerData(nPlayers: number) {
    const playerData = [];
    for (let i = 0; i < nPlayers; i++) {
        playerData.push({ name: `Player ${i + 1}` });
    }

    return playerData;
}
