import en from './en.json';
import ko from './ko.json';
import type { Project } from '../data/projects';

export type Locale = 'en' | 'ko';

const copies = { en, ko };

export const getCopy = (locale: Locale) => copies[locale];

export const format = (text: string, values: Record<string, string | number>) =>
  text.replace(/\{(\w+)\}/g, (_, key) => String(values[key]));

/** Prefixes an English site path for the given locale. */
export const localePath = (locale: Locale, path: string) => (locale === 'ko' ? `/ko${path}` : path);

export const localizeProject = (project: Project, locale: Locale): Project => {
  const copy = getCopy(locale);
  const labels: Record<string, string> = copy.linkLabels;
  const tags: Record<string, string> = copy.tags;
  const text = (copy.projects as Record<string, { line: string; proof: string; status: string }>)[project.name];
  return {
    ...project,
    ...text,
    links: project.links.map((link) => ({ ...link, label: labels[link.label] ?? link.label })),
    featured: project.featured && { ...project.featured, tag: tags[project.featured.tag] },
  };
};
