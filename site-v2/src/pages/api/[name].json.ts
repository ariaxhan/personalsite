import { pages, record } from '../../content/ld';
import { SITE } from '../../content/data';

const docs: Record<string, unknown> = {
  projects: { caseStudies: record.caseStudies, projects: record.projects },
  hackathons: { summary: '5 wins, plus 1 finalist', hackathons: record.hackathons },
  writing: record.writing,
  stats: record.stats,
  'work-with-me': { availability: record.availability, ...record.workWithMe },
  'site-index': { person: record.person, languages: { en: SITE, ko: `${SITE}/ko/` }, pages: pages.map((p) => ({ ...p, url: `${SITE}${p.path}`, ko: `${SITE}/ko${p.path}` })) },
};
export const getStaticPaths = () => Object.keys(docs).map((name) => ({ params: { name } }));
export const GET = ({ params }: { params: { name: string } }) => Response.json(docs[params.name]);
