

export const QuestionInclude = {
    parentQuestion: 'parentQuestion',
    tags: 'tags',
        answerAsQuestion: 'answerAsQuestion',
        messageAsQuestions: 'messageAsQuestions',
        openQuestionAsQuestion: 'openQuestionAsQuestion',
        questionAsParentQuestion: 'questionAsParentQuestion',
};

export type QuestionInclude = (typeof QuestionInclude)[keyof typeof QuestionInclude];
