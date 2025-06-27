import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import { getQuestionnaireData } from "../service/questionnaireData";
import { Responses } from "../types/questionnaire";
import { evaluate } from "../service/questionnaireEvaluation";

export const newQuestionnaire = (_: Request, res: Response) => {
    const questions = getQuestionnaireData();
    res.json({ id: uuidv4(), questions });
};

export const submitQuestionnaire = (req: Request, res: Response) => {
    const { id, responses } = req.body as { id: string; responses: Responses };

    const tallies = evaluate(responses);

    res.json({ id, tallies });
};
