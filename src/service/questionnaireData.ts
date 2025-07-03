import fs from "fs";
import { join } from "path";
import { Questionnaire } from "../types/questionnaire";

const readQuestionnaire = () => {
    const path = join(__dirname, "../data/questions.json");
    return fs.readFileSync(path, "utf-8");
};

export const getQuestionnaireData = async (): Promise<Questionnaire> => {
    try {
        const data = readQuestionnaire();
        const parsed = JSON.parse(data);

        // TODO: runtime type validation

        return parsed as Questionnaire;
    } catch (e) {
        throw new Error(`failed to get questionnaire data: ${e}`);
    }
};
