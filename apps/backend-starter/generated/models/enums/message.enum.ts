

export const MessageInclude = {
    tags: 'tags',
    questions: 'questions',
};

export type MessageInclude = (typeof MessageInclude)[keyof typeof MessageInclude];
