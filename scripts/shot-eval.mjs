import { chromium } from 'playwright';
const OUT = process.env.OUT || '.';
const BASE = 'https://creativelynanda.co.za';
const browser = await chromium.launch();
const page = await browser.newContext({ viewport: { width: 1440, height: 900 } }).then(c => c.newPage());
const shots = [
  { path: '/', at: 0, name: 'eval-home-cover' },
  { path: '/', at: 0.30, name: 'eval-home-mid' },
  { path: '/engineer', at: 0, name: 'eval-engineer' },
  { path: '/about', at: 0.10, name: 'eval-about' },
];
for (const s of shots) {
  await page.goto(BASE + s.path + '?cb=' + Date.now(), { waitUntil: 'domcontentloaded', timeout: 45000 }).catch(()=>{});
  await page.waitForTimeout(4000);
  if (s.at) { await page.evaluate((a) => window.scrollTo(0, document.body.scrollHeight * a), s.at); await page.waitForTimeout(1800); }
  await page.screenshot({ path: `${OUT}/${s.name}.png` });
}
await browser.close();
console.log('done');
