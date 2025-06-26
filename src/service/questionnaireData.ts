import fs from "fs";
import { join } from "path";
import { Questionnaire } from "../types/questionnaire";

const readQuestionnaire = () => {
    const path = join(__dirname, "../data/questions.json");
    return fs.readFileSync(path, "utf-8");
};

export const getQuestionnaireData = (): Questionnaire => {
    const data = readQuestionnaire();
    const parsed = JSON.parse(data);

    return parsed as Questionnaire;
};
