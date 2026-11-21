import { chromium } from 'playwright';
import assert from 'node:assert/strict';
import { mkdir, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';

const [url, directory] = process.argv.slice(2);
assert(url && directory, 'Usage: npm run shot -- <live URL> <output directory>');
const output = resolve(directory);
await mkdir(output, { recursive: true });
const browser = await chromium.launch({ channel: 'chrome' });
const receipt = [];
try {
  for (const locale of ['en', 'ko']) for (const width of [375, 768, 1440]) {
    const page = await browser.newPage({ viewport: { width, height: 1000 }, reducedMotion: 'reduce' });
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    page.on('console', message => { if (message.type() === 'error') errors.push(message.text()); });
    const target = new URL(locale === 'en' ? '/' : '/ko/', url).href;
    assert.equal((await page.goto(target, { waitUntil: 'networkidle' })).status(), 200);
    await page.evaluate(() => document.fonts.ready);
    assert.equal(await page.locator('#work li').count(), 4);
    for (const name of ['Thinking Brain School', 'Matra', 'Blink Build Studios', 'FunJoin'])
      assert((await page.locator('#work').innerText()).includes(name), name);
    assert((await page.locator('#work').innerText()).includes('116'));
    assert(await page.locator('#work').evaluate(el => !!(el.compareDocumentPosition(document.querySelector('#projects')) & Node.DOCUMENT_POSITION_FOLLOWING)));
    assert.equal(await page.locator('#projects li').count(), 8);
    assert.equal(await page.locator('.star-scene .star').count(), 1);
    assert(!/[\u2014]/u.test(await page.locator('body').innerText()), 'No em dashes');
    assert(!/education|학력/i.test((await page.locator('h1,h2,h3').allTextContents()).join(' ')), 'No education section');
    assert(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), 'Horizontal overflow');
    const links = await page.locator('a:visible').count();
    // Tab through the site navigation; the third-party calendar owns its own tab order.
    for (let i = 0; i < 10; i++) {
      await page.keyboard.press('Tab');
      assert.equal(await page.evaluate(() => document.activeElement.tagName), 'A');
    }
    // Every site link must receive visible focus, including links after the calendar.
    for (const link of await page.locator('a:visible').all()) {
      await link.focus();
      assert(await link.evaluate(el => {
        const rect = el.getBoundingClientRect();
        return rect.width > 0 && rect.height > 0 && rect.top < innerHeight && rect.bottom > 0;
      }), `Visible link focus: ${await link.getAttribute('href')} ${await link.evaluate(el => el.getBoundingClientRect().toJSON()).then(JSON.stringify)}`);
    }
    await page.evaluate(() => scrollTo(0, 0));
    const path = resolve(output, `${locale}-${width}.png`);
    await page.screenshot({ path, fullPage: true, animations: 'disabled' });
    assert.deepEqual(errors, [], 'Browser errors');
    receipt.push({ target, width, path, errors, links });
    await page.close();
  }
} finally { await browser.close(); }
await writeFile(resolve(output, 'receipt.json'), JSON.stringify(receipt, null, 2));
console.log(JSON.stringify(receipt, null, 2));
