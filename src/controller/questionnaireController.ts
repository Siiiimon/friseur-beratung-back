import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import { Recommendation } from "../types/recommendation";
import { getQuestionnaireData } from "../service/questionnaireData";
import { Responses } from "../types/questionnaire";
import { evaluate } from "../service/questionnaireEvaluation";
import { getTopTags, queryProductCatalog } from "../service/productCatalog";

export const newQuestionnaire = async (_: Request, res: Response) => {
    const questions = await getQuestionnaireData();
    res.json({ id: uuidv4(), questions });
};

export const submitQuestionnaire = async (
    req: Request,
    res: Response,
): Promise<void> => {
    const { id, responses } = req.body as { id: string; responses: Responses };

    const { ok: tallies, error } = await evaluate(responses);
    if (error) {
        res.status(error.status).json({ error: error.message });
        return;
    }

    const topTags = getTopTags(tallies!, 2);

    const shampoo = await queryProductCatalog(
        req.app.locals.pg,
        topTags[0],
        "shampoo",
    );
    const conditioner = await queryProductCatalog(
        req.app.locals.pg,
        topTags[1],
        "conditioner",
    );
    if (shampoo.error || conditioner.error) {
        const err = shampoo.error ?? conditioner.error!;
        res.status(err.status).json({ error: err.message });
        return;
    }

    const recommendations: Recommendation = [];
    recommendations.push(shampoo.ok!);
    recommendations.push(conditioner.ok!);

    res.json({ id, tallies, recommendations });
};
