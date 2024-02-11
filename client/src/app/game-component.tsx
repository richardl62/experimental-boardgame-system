import { boards } from "../boards";
import { playOnline } from "../config";
import { GameDefinition } from "../shared/game-definition";
import { sAssert } from "../utils/assert";
import { OfflineGame } from "./offline-game";
import { OnlineGame } from "./online-game";

export function GameComponent({game} : {game: GameDefinition}) {
    const board = boards[game.name as keyof typeof boards];
    sAssert(board, "board not found");
    if(playOnline) {
        return <OnlineGame gameDefinition={game} Board={board} />;
    } else {
        return <OfflineGame gameDefinition={game} Board={board} />;
    }
}