import { Client } from "pg";
import { Product } from "../types/recommendation";
import { Result } from "../types/result";

export const queryProductCatalog = async (
    client: Client,
    tag: string,
    type: string,
): Promise<Result<Product>> => {
    let query: string;
    let values: string[];

    if (type === "conditioner" || type === "leave-in") {
        query = `SELECT * FROM conditioners WHERE tag = $1 AND type = $2 LIMIT 1;`;
        values = [tag, type];
    } else {
        query = `SELECT * FROM shampoos WHERE tag = $1 LIMIT 1;`;
        values = [tag];
    }

    const res = await client.query(query, values);

    if (res.rows.length > 0) {
        return { ok: res.rows[0] as Product };
    }

    return {
        error: { status: 404, message: "could not find a fitting product" },
    };
};

export const getTopTags = (
    tallies: Record<string, number>,
    amount: number,
): string[] => {
    return Object.entries(tallies ?? {})
        .sort(([, a], [, b]) => b - a)
        .slice(0, amount)
        .map(([tag]) => tag);
};
