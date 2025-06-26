import { Request, Response } from "express";

export const getHealth = (_: Request, res: Response) => {
    res.json({ status: "ok" });
};
