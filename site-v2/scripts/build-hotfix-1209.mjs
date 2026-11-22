// Build only the approved hotfix while #1199's redesign remains held.
import { execFileSync } from 'node:child_process';
import { mkdtempSync, readFileSync, writeFileSync, copyFileSync, symlinkSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { resolve, join } from 'node:path';
import { fileURLToPath } from 'node:url';
const site = fileURLToPath(new URL('../', import.meta.url));
const repo = resolve(site, '..');
const output = mkdtempSync(join(tmpdir(), 'site-1209-'));
const archive = execFileSync('git', ['archive', '13724d9', 'site-v2', 'app/utils/motionData.json'], { cwd: repo });
execFileSync('tar', ['-x', '-C', output], { input: archive });
const target = join(output, 'site-v2');
for (const locale of ['en', 'ko']) {
  const relative = `src/i18n/${locale}.json`;
  const current = JSON.parse(readFileSync(join(site, relative)));
  const production = JSON.parse(readFileSync(join(target, relative)));
  production.about.wins = current.about.wins;
  for (const project of ['llm-bench', 'the-agent-library'])
    production.projects[project] = current.projects[project];
  production.timeline[2].line = locale === 'en'
    ? 'Taught non-technical founders Claude Code hands-on; reviewed their AI-generated applications.'
    : '비개발자 창업자에게 Claude Code를 직접 가르치고, AI로 생성한 애플리케이션을 검토했습니다.';
  writeFileSync(join(target, relative), JSON.stringify(production, null, 2) + '\n');
}
for (const relative of ['src/views/About.astro', 'src/data/projects.ts'])
  copyFileSync(join(site, relative), join(target, relative));
const css = join(target, 'src/styles/global.css');
writeFileSync(css, readFileSync(css, 'utf8').replaceAll('.win-list a {', '.win-list a, .win-list .win-card {'));
symlinkSync(join(site, 'node_modules'), join(target, 'node_modules'));
execFileSync('npm', ['run', 'build'], { cwd: target, stdio: 'inherit' });
console.log(`HOTFIX_DIR=${target}`);
