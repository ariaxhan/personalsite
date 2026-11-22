import { chromium } from 'playwright';
import assert from 'node:assert/strict';
import { mkdir, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
const [url, directory] = process.argv.slice(2);
assert(url && directory, 'Usage: npm run shot:content -- <live URL> <output directory>');
await mkdir(directory, { recursive: true });
const browser = await chromium.launch({ channel: 'chrome' });
const receipt = [];
try {
  for (const locale of ['en', 'ko']) for (const width of [375, 768, 1440]) {
    const page = await browser.newPage({ viewport: { width, height: 1000 }, reducedMotion: 'reduce' });
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    page.on('console', message => { if (message.type() === 'error') errors.push(message.text()); });
    const prefix = locale === 'en' ? '' : '/ko';
    for (const route of ['/about', '/projects', '/']) {
      const target = new URL(`${prefix}${route}`, url).href;
      assert.equal((await page.goto(target, { waitUntil: 'networkidle' })).status(), 200);
      await page.evaluate(() => document.fonts.ready);
      if (route === '/about') {
        assert.equal(await page.locator('.win-list li').count(), 5);
        const fifth = page.locator('.win-list li').last();
        assert.equal(await fifth.locator('a').count(), 0);
        const text = await fifth.innerText();
        for (const expected of ['Best Use of Wordware', 'GPT-4o vs. Gemini 1.5 Hackathon, 2024', locale === 'en' ? 'Trigger agents with hotkeys.' : '단축키로 에이전트를 실행합니다.']) assert(text.includes(expected), expected);
      }
      if (route === '/projects') {
        const text = await page.locator('main').innerText();
        assert(text.includes(locale === 'en' ? '42 tests, graded by programmatic verifiers.' : '테스트 42개'));
        assert(text.includes(locale === 'en' ? '41 skills (40 active, 1 draft)' : '스킬 41개(활성 40개, 초안 1개)'));
      }
      if (route === '/') {
        const text = await page.locator('main').innerText();
        assert(text.includes(locale === 'en' ? 'Taught non-technical founders Claude Code hands-on; reviewed their AI-generated applications.' : '비개발자 창업자에게 Claude Code를 직접 가르치고, AI로 생성한 애플리케이션을 검토했습니다.'));
      }
      assert(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), 'Horizontal overflow');
      for (const link of await page.locator('a:visible').all()) {
        await link.focus();
        assert(await link.evaluate(el => document.activeElement === el), 'Keyboard focus');
      }
      await page.evaluate(() => scrollTo(0, 0));
      const path = resolve(directory, `${locale}-${width}-${route.slice(1) || 'home'}.png`);
      await page.screenshot({ path, fullPage: true, animations: 'disabled' });
      receipt.push({ target, width, path });
    }
    assert.deepEqual(errors, [], 'Browser errors');
    await page.close();
  }
} finally { await browser.close(); }
await writeFile(resolve(directory, 'receipt.json'), JSON.stringify(receipt, null, 2));
console.log(JSON.stringify(receipt, null, 2));
