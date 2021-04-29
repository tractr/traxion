

export const OpenQuestionInclude = [
    'question',
        'variableAsOpenQuestion',
] as const;

export type OpenQuestionInclude = typeof OpenQuestionInclude[number];
