

export const AnswerInclude = [
    'user',
    'question',
    'tags',
        'variableAsAnswer',
] as const;

export type AnswerInclude = typeof AnswerInclude[number];
