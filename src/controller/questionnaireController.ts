import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";

export const newQuestionnaire = (_: Request, res: Response) => {
    res.json({ id: uuidv4() });
};
