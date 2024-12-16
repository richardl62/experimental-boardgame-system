/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unnecessary-type-constraint */
import { Ctx } from "./ctx";
import { EventsAPI } from "./events";
import { RandomAPI } from "./random";
import { PlayerID } from "./types";


declare const INVALID_MOVE = "INVALID_MOVE";
export interface DefaultPluginAPIs {
    random: RandomAPI;
    events: EventsAPI;
}

export declare type FnContext<G extends any = any, PluginAPIs extends Record<string, unknown> = Record<string, unknown>> 
    = PluginAPIs & DefaultPluginAPIs & {
    G: G;
    ctx: Ctx;
};
export declare type MoveFn<G extends any = any, PluginAPIs extends Record<string, unknown> = Record<string, unknown>> = (context: FnContext<G, PluginAPIs> & {
    playerID: PlayerID;
}, ...args: any[]) => void | G | typeof INVALID_MOVE;
export interface LongFormMove<G extends any = any, PluginAPIs extends Record<string, unknown> = Record<string, unknown>> {
    move: MoveFn<G, PluginAPIs>;
    redact?: boolean | ((context: {
        G: G;
        ctx: Ctx;
    }) => boolean);
    noLimit?: boolean;
    client?: boolean;
    undoable?: boolean | ((context: {
        G: G;
        ctx: Ctx;
    }) => boolean);
    ignoreStaleStateID?: boolean;
}
export declare type Move<G extends any = any, PluginAPIs extends Record<string, unknown> = Record<string, unknown>> = MoveFn<G, PluginAPIs> | LongFormMove<G, PluginAPIs>;
export interface MoveMap<G extends any = any, PluginAPIs extends Record<string, unknown> = Record<string, unknown>> {
    [moveName: string]: Move<G, PluginAPIs>;
}

export interface Game<G extends any = any, PluginAPIs extends Record<string, unknown> = Record<string, unknown>, SetupData extends any = any> {
    name?: string;
    minPlayers?: number;
    maxPlayers?: number;
    deltaState?: boolean;
    disableUndo?: boolean;
    seed?: string | number;
    setup?: (context: PluginAPIs & DefaultPluginAPIs & {
        ctx: Ctx;
    }, setupData?: SetupData) => G;
    validateSetupData?: (setupData: SetupData | undefined, numPlayers: number) => string | undefined;
    moves?: MoveMap<G, PluginAPIs>;
    // phases?: PhaseMap<G, PluginAPIs>;
    // turn?: TurnConfig<G, PluginAPIs>;
    events?: EventsAPI;
    // endIf?: (context: FnContext<G, PluginAPIs>) => any;
    // onEnd?: (context: FnContext<G, PluginAPIs>) => void | G;
    // playerView?: (context: {
    //     G: G;
    //     ctx: Ctx;
    //     playerID: PlayerID | null;
    // }) => any;
    // plugins?: Array<Plugin<any, any, G>>;
    // ai?: {
    //     enumerate: (G: G, ctx: Ctx, playerID: PlayerID) => AiEnumerate;
    // };
    // processMove?: (state: State<G>, action: ActionPayload.MakeMove) => State<G> | typeof INVALID_MOVE;
    // flow?: ReturnType<typeof Flow>;
}