// Text renderings of the shared record for llms.txt, llms-full.txt and agent skills.
import { SITE } from './data';
import { pages, record } from './ld';

const r = record;
export const llms = () => [
  '# Aria Han',
  '',
  `> ${r.person.role}. Founder of three AI products (HeyContext, HeyContent, Brink Mind). Works across AI product strategy, research, team leadership, and agent systems. ${r.person.location}. Open to full-time roles and client work.`,
  '',
  '## Pages',
  ...pages.map((p) => `- [${p.name}](${SITE}${p.path}): ${p.purpose}`),
  `- [Korean site](${SITE}/ko/): 한국어 사이트, every page above under /ko/`,
  '',
  '## Machine-readable',
  `- [Full text](${SITE}/llms-full.txt)`,
  `- [Agent skills](${SITE}/.well-known/agent-skills/index.json)`,
  `- [Site index JSON](${SITE}/api/site-index.json)`,
  `- [Projects JSON](${SITE}/api/projects.json)`,
  `- [Hackathons JSON](${SITE}/api/hackathons.json)`,
  `- [Writing JSON](${SITE}/api/writing.json)`,
  `- [Stats JSON](${SITE}/api/stats.json)`,
  `- [Work with me JSON](${SITE}/api/work-with-me.json)`,
  '',
  '## Contact',
  `- Email: ${r.person.email}`,
  `- Booking: ${r.person.booking}`,
  ...r.person.links.map((l) => `- [${l.label}](${l.href})`),
  '',
].join('\n');

export const bio = () => [
  '# Aria Han: bio',
  '',
  `${r.person.role}. ${r.person.location}.`,
  r.availability,
  '',
  '## Experience',
  ...r.experience.map((e) => `- ${e.when}: ${e.title}. ${e.summary}`),
  '',
  '## Proof',
  `- ${r.stats.commits} commits across ${r.stats.repositories} public repositories (GitHub, updated ${r.stats.commitsUpdated})`,
  `- ${r.stats.liveProjects} live projects`,
  '- 5 hackathon wins, plus 1 finalist',
  '- 3 AI products founded; largest cross-functional team led: 9',
  '- HeyContext: hundreds of users in its first month, no paid advertising',
].join('\n');

export const projectsText = () => [
  '# Aria Han: projects',
  '',
  '## Case studies',
  ...r.caseStudies.map((c) => `- [${c.name}](${c.url}): ${c.summary}`),
  '',
  '## All projects',
  ...r.projects.map((p) => `- ${p.name} (${p.group}, ${p.status}): ${p.line} ${p.proof}${p.links.length ? ' ' + p.links.map((l) => `[${l.label}](${l.href})`).join(' ') : ''}`),
  '',
  '## Hackathons: 5 wins, plus 1 finalist',
  ...r.hackathons.map((h) => `- ${h.name} (${h.year}), ${h.event}: ${h.result}${h.award ? `, ${h.award}` : ''}. ${h.description} Tech: ${h.technologies.join(', ')}. ${h.link}`),
].join('\n');

export const writingText = () => [
  '# Aria Han: writing',
  '',
  ...r.writing.highlights.map((w) => `- [${w.title}](${w.href}) (${w.topic})`),
  `- Novel: [${r.writing.novel.title}](${r.writing.novel.href})`,
  `- Poetry: [${r.writing.poetry.title}](${r.writing.poetry.href})`,
  `- All writing: ${r.writing.all}`,
].join('\n');

export const workText = () => [
  '# Aria Han: work with me',
  '',
  r.availability,
  '',
  ...r.workWithMe.engagements.map((e) => `- ${e.title}: ${e.detail}`),
  '',
  `Good fit: ${r.workWithMe.goodFit.join('; ')}.`,
  `Not a fit: ${r.workWithMe.notAFit.join('; ')}.`,
  `Booking: ${r.workWithMe.booking}. Project review: ${r.workWithMe.projectReview}.`,
].join('\n');

export const llmsFull = () => [llms(), bio(), projectsText(), writingText(), workText()].join('\n\n');

export const skills = [
  { name: 'aria-han-bio', description: 'Who Aria Han is, her experience, availability, and proof numbers.', body: bio },
  { name: 'aria-han-projects', description: 'Aria Han case studies, every project, and hackathon results with links.', body: projectsText },
  { name: 'aria-han-writing', description: 'Aria Han essays, novel, and poetry.', body: writingText },
  { name: 'aria-han-work-with-me', description: 'How to hire or engage Aria Han: roles, engagements, fit, booking, project review.', body: workText },
];
