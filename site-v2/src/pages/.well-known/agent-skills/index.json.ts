import { skills } from '../../../content/machine';
import { SITE } from '../../../content/data';
export const GET = () => Response.json({
  skills: skills.map((s) => ({ name: s.name, description: s.description, url: `${SITE}/.well-known/agent-skills/${s.name}/SKILL.md` })),
});
