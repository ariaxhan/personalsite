// Checks a deployed site the way a visitor sees it and writes full-page PNGs plus a receipt.
import { chromium } from 'playwright';
import assert from 'node:assert/strict';
import { mkdir, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';

const [url, directory, ...only] = process.argv.slice(2);
assert(url && directory, 'Usage: npm run shot -- <live URL> <output directory> [route...]');
const output = resolve(directory);
await mkdir(output, { recursive: true });
const routes = only.length ? only : ['/', '/work/', '/experience/', '/writing/', '/about/', '/hackathons/', '/projects/', '/work-with-me/', '/projects/kernel/', '/projects/thinking-brain-school/', '/projects/heycontext/'];
const banned = [/—/u, /Vector Native/i, /3,268/, /289-lesson/i, /I conducted usability/i, /conducted usability interviews/i, /Anthropic marketplace/i, /Claude plugin marketplace/i, /\d+\s+lessons\b/i];
const browser = await chromium.launch({ channel: 'chrome' });
const receipt = [];
try {
  for (const locale of ['en', 'ko']) for (const route of routes) for (const width of [375, 768, 1440]) {
    const page = await browser.newPage({ viewport: { width, height: 1000 }, reducedMotion: 'reduce' });
    const errors = [];
    page.on('pageerror', (error) => errors.push(error.message));
    page.on('console', (message) => { if (message.type() === 'error') errors.push(message.text()); });
    const target = new URL(locale === 'en' ? route : `/ko${route}`, url).href;
    assert.equal((await page.goto(target, { waitUntil: 'networkidle' })).status(), 200, target);
    await page.evaluate(() => document.fonts.ready);
    const text = await page.locator('body').innerText();
    for (const pattern of banned) assert(!pattern.test(text), `${target}: ${pattern}`);
    if (route === '/hackathons/') {
      assert.equal(await page.locator('.hack').count(), 6);
      if (locale === 'en') assert(text.includes('5 wins, plus 1 finalist.'));
      for (const name of ['Darwin', 'Armature', 'Content Creator Connector', 'TheraVoice', 'HotAgents', 'Freetime']) assert(text.includes(name), name);
    }
    if (route === '/') assert.equal(await page.locator('.star-scene .star').count(), 1);
    assert.equal(await page.locator('script[type="application/ld+json"]').count(), 1, 'JSON-LD');
    assert(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), `${target} ${width}: horizontal overflow`);
    await page.keyboard.press('Tab');
    assert.equal(await page.evaluate(() => document.activeElement?.className), 'skip');
    await page.evaluate(() => document.activeElement?.blur());
    const name = `${locale}${route.replaceAll('/', '_') || '_'}${width}.png`.replace('__', '_');
    const path = resolve(output, name);
    await page.screenshot({ path, fullPage: true, animations: 'disabled' });
    assert.deepEqual(errors, [], `${target}: browser errors`);
    receipt.push({ target, width, path });
    await page.close();
  }
  for (const machine of ['/llms.txt', '/llms-full.txt', '/sitemap.xml', '/api/projects.json', '/api/hackathons.json', '/api/site-index.json', '/.well-known/agent-skills/index.json', '/.well-known/agent-skills/aria-han-bio/SKILL.md']) {
    const response = await fetch(new URL(machine, url));
    assert.equal(response.status, 200, machine);
    receipt.push({ target: machine, status: response.status, bytes: (await response.text()).length });
  }
} finally { await browser.close(); }
await writeFile(resolve(output, 'receipt.json'), JSON.stringify(receipt, null, 2));
console.log(`${receipt.length} checks passed; PNGs in ${output}`);
