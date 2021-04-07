

export const OpenQuestionInclude = {
    question: 'question',
        variableAsOpenQuestion: 'variableAsOpenQuestion',
};

export type OpenQuestionInclude = (typeof OpenQuestionInclude)[keyof typeof OpenQuestionInclude];
