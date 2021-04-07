

export const VariableInclude = {
    openQuestion: 'openQuestion',
    answer: 'answer',
};

export type VariableInclude = (typeof VariableInclude)[keyof typeof VariableInclude];
