export type Result<T> = {
    ok?: T;
    error?: Error;
};

export type Error = {
    status: number;
    message: string;
};
