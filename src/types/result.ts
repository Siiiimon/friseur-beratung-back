export type Result<T> =
    | { ok: T; error?: never }
    | { ok?: never; error: ResultError };

export type ResultError = {
    status: number;
    message: string;
};
