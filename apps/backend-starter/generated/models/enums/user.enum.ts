
export const UserGender = {
 MALE: 'MALE',
 FEMALE: 'FEMALE',
};

export type UserGender = (typeof UserGender)[keyof typeof UserGender];

export const UserInclude = {
        answerAsUser: 'answerAsUser',
};

export type UserInclude = (typeof UserInclude)[keyof typeof UserInclude];
