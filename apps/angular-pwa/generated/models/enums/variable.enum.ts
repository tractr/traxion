

export const VariableInclude = [
    'openQuestion',
    'answer',
] as const;

export type VariableInclude = typeof VariableInclude[number];
