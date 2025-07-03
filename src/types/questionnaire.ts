export type Choice = {
    id: string;
    label: string;
    tags: string[];
};

export type Question = {
    id: string;
    label: string;
    choices: Choice[];
};

export type Questionnaire = Question[];

export type UserAnswer = {
    id: string;
    selectedChoices: string[];
};

export type Responses = UserAnswer[];
