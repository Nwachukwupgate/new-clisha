import translation from '../json/Translation.json';

const { en } = translation;
// const { en, de } = translation;

export const translate = (data) => en?.[data];
