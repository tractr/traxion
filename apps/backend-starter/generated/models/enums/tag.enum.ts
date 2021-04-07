

export const TagInclude = {
        answerAsTags: 'answerAsTags',
        messageAsTags: 'messageAsTags',
        questionAsTags: 'questionAsTags',
};

export type TagInclude = (typeof TagInclude)[keyof typeof TagInclude];
