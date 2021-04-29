

export const MessageInclude = [
    'tags',
    'questions',
] as const;

export type MessageInclude = typeof MessageInclude[number];
