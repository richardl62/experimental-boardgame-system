type ClientMove<Move extends (...args: any) => void> = (arg: Parameters<Move>[0]["arg"]) => void;
export type ClientMoves<Moves extends Record<string, (...args: any) => void>> = {
    [K in keyof Moves]: ClientMove<Moves[K]>;
};