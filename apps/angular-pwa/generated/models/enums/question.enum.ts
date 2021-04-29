

export const QuestionInclude = [
    'parentQuestion',
    'tags',
        'answerAsQuestion',
        'messageAsQuestions',
        'openQuestionAsQuestion',
        'questionAsParentQuestion',
] as const;

export type QuestionInclude = typeof QuestionInclude[number];
