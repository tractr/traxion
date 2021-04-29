

export const TagInclude = [
        'answerAsTags',
        'messageAsTags',
        'questionAsTags',
] as const;

export type TagInclude = typeof TagInclude[number];
