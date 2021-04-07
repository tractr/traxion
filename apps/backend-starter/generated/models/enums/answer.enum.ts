

export const AnswerInclude = {
    user: 'user',
    question: 'question',
    tags: 'tags',
        variableAsAnswer: 'variableAsAnswer',
};

export type AnswerInclude = (typeof AnswerInclude)[keyof typeof AnswerInclude];
