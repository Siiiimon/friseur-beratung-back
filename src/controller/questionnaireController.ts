import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import { getQuestionnaireData } from "../service/questionnaireData";

export const newQuestionnaire = (_: Request, res: Response) => {
    const questions = getQuestionnaireData();
    res.json({ id: uuidv4(), questions });
};
