export type Answer = {
    id: string;
    label: string;
    tags: string[];
};

export type Question = {
    id: string;
    label: string;
    answers: Answer[];
};

export type Questionnaire = Question[];
