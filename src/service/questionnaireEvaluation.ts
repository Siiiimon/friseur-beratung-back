import { Choice, Responses } from "../types/questionnaire";
import { getQuestionnaireData } from "./questionnaireData";

export const evaluate = (responses: Responses): Record<string, number> => {
    const tallies: Record<string, number> = {};
    const questionnaire = getQuestionnaireData();

    responses.forEach((response) => {
        // find question by response id
        const question = questionnaire.find(
            (question) => response.id === question.id,
        );
        if (!question) return;

        const tags = getTagsOfMatchingChoices(
            question.choices,
            response.selectedChoices,
        );

        // add tags to tallies
        tags?.forEach((tag) => {
            tallies[tag] = (tallies[tag] ?? 0) + 1;
        });
    });

    return tallies;
};

const getTagsOfMatchingChoices = (
    questionChoices: Choice[],
    answerChoices: string[],
): string[] => {
    return (
        questionChoices
            // find matching answers
            .filter((questionChoice) =>
                answerChoices.includes(questionChoice.id),
            )
            // get their tags
            .flatMap((questionChoice) => questionChoice.tags)
    );
};
