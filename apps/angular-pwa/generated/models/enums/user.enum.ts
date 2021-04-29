
export const UserGender = {
 male: 'male',
 female: 'female',
} as const;

export type UserGender = (typeof UserGender)[keyof typeof UserGender];

export const UserInclude = [
        'answerAsUser',
] as const;

export type UserInclude = typeof UserInclude[number];
