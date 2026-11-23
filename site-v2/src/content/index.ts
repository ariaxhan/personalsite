import { en, type Copy } from './en';
import { ko } from './ko';
import { enCases, type Cases } from './en-cases';
import { koCases } from './ko-cases';

export type Locale = 'en' | 'ko';
export const locales: Locale[] = ['en', 'ko'];
const copies: Record<Locale, Copy> = { en, ko };
const cases: Record<Locale, Cases> = { en: enCases, ko: koCases };

export const getCopy = (locale: Locale) => copies[locale];
export const getCases = (locale: Locale) => cases[locale];
export const format = (text: string, values: Record<string, string | number>) =>
  text.replace(/\{(\w+)\}/g, (_, key) => String(values[key]));
/** Prefixes an English site path for the given locale. */
export const localePath = (locale: Locale, path: string) => (locale === 'ko' ? `/ko${path}` : path);
