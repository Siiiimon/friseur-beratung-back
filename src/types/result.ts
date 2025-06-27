export type Result<T> = {
    ok?: T;
    error?: {
        status: number;
        message: string;
    };
};
