// schema.org nodes and the machine-readable record shared by JSON-LD, /api/*.json, llms.txt and agent skills.
import { en } from './en';
import { enCases } from './en-cases';
import { BOOKING, EMAIL, MEDIUM, NOVEL, SITE, caseSlugs, hackathons, liveCount, motionStats, projects, social, writing } from './data';

export const personLd = {
  '@type': 'Person',
  '@id': `${SITE}/#person`,
  name: 'Aria Han',
  url: `${SITE}/`,
  email: `mailto:${EMAIL}`,
  jobTitle: 'Chief Technology Officer',
  worksFor: { '@type': 'Organization', name: 'Thinking Brain School' },
  description: en.meta.homeDescription,
  knowsLanguage: ['en', 'ko'],
  knowsAbout: ['AI product strategy', 'Agent systems', 'Agent memory', 'LLM evaluation', 'Model Context Protocol', 'UX research leadership'],
  award: hackathons.filter((h) => h.win).map((h) => `${en.hackathonsPage.entries[h.name].award}, ${en.hackathonsPage.entries[h.name].event} (${h.year})`),
  sameAs: social.map((s) => s.href).concat('https://devpost.com/ariaxhan'),
};

export const serviceLd = {
  '@type': 'ProfessionalService',
  '@id': `${SITE}/work-with-me/#service`,
  name: 'Aria Han, AI architecture and product work',
  url: `${SITE}/work-with-me/`,
  provider: { '@id': `${SITE}/#person` },
  areaServed: ['US', 'KR'],
  availableLanguage: ['en', 'ko'],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Engagements',
    itemListElement: en.workWithMe.engagements.map((e) => ({ '@type': 'Offer', itemOffered: { '@type': 'Service', name: e.title, description: e.detail } })),
  },
};

const url = (path: string) => `${SITE}${path}`;

export const record = {
  person: { name: 'Aria Han', role: 'CTO, Thinking Brain School', location: 'California, relocating to New York City', email: EMAIL, booking: BOOKING, links: social },
  availability: en.workWithMe.jobsBody,
  stats: {
    commits: motionStats.commits,
    repositories: motionStats.repos,
    liveProjects: liveCount,
    hackathonWins: 5,
    hackathonFinalists: 1,
    aiProductsFounded: 3,
    largestTeamLed: 9,
    heyContextFirstMonthUsers: 'hundreds',
    commitsUpdated: motionStats.generated,
  },
  experience: en.experience.rows.map((r) => ({ when: r.when, title: r.title.join(', '), summary: r.body })),
  caseStudies: caseSlugs.map((slug) => ({ slug, name: enCases[slug].name, url: url(`/projects/${slug}/`), summary: enCases[slug].intro })),
  projects: projects.map((p) => ({ name: p.name, group: p.group, ...en.projects[p.name], url: p.caseSlug ? url(`/projects/${p.caseSlug}/`) : undefined, links: p.links })),
  hackathons: hackathons.map((h) => ({ name: h.name, year: h.year, result: h.win ? 'Winner' : 'Finalist', ...en.hackathonsPage.entries[h.name], technologies: h.tech, link: h.link.href })),
  writing: { highlights: writing.map((w, i) => ({ ...w, topic: en.writingPage.topics[i] })), novel: NOVEL, poetry: en.writingPage.poetryTitle, all: MEDIUM },
  workWithMe: { engagements: en.workWithMe.engagements, goodFit: en.workWithMe.goodFitItems, notAFit: en.workWithMe.notFitItems, booking: BOOKING, projectReview: url('/work-with-me/#review') },
};

export const pages = [
  { path: '/', name: 'Home', purpose: 'Selected work, approach, timeline, proof, background.' },
  { path: '/work/', name: 'Work', purpose: 'Eight case studies.' },
  { path: '/projects/', name: 'All projects', purpose: 'Systems and open source, products, founder companies in one index.' },
  { path: '/experience/', name: 'Experience', purpose: 'Roles and clients, most recent first.' },
  { path: '/hackathons/', name: 'Hackathons', purpose: '5 wins, plus 1 finalist, with events, awards, tech, and links.' },
  { path: '/writing/', name: 'Writing', purpose: 'Essay highlights, the novel, poetry, Medium.' },
  { path: '/about/', name: 'About', purpose: 'Background, bookshelf, current obsessions, curiosity map.' },
  { path: '/work-with-me/', name: 'Work with me', purpose: 'Full-time roles and client engagements, fit, booking, project review.' },
  ...caseSlugs.map((slug) => ({ path: `/projects/${slug}/`, name: enCases[slug].name, purpose: enCases[slug].intro })),
];
