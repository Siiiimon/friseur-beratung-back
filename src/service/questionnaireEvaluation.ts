import { Choice, Responses } from "../types/questionnaire";
import { getQuestionnaireData } from "./questionnaireData";
import { Result } from "../types/result";

export const evaluate = async (
    responses: Responses,
): Promise<Result<Record<string, number>>> => {
    if (!responses || responses.length === 0) {
        return { error: { status: 400, message: "empty answer sheet" } };
    }

    const tallies: Record<string, number> = {};
    const questionnaire = await getQuestionnaireData();

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

    return { ok: tallies };
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
