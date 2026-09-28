import { chromium } from 'playwright';
const OUT = process.env.OUT || '.';
const BASE = process.env.BASE || 'https://creativelynanda.co.za';
const jobs = [
  { path: '/roots', at: 1.0, name: 'roots-close' },
  { path: '/contact', at: 0.0, name: 'contact-open' },
  { path: '/education', at: 1.0, name: 'education-close' },
];
const browser = await chromium.launch();
const page = await browser.newContext({ viewport: { width: 1366, height: 1000 } }).then(c => c.newPage());
const allErrs = {};
for (const j of jobs) {
  const errs = [];
  const onE = e => errs.push(e.message.slice(0,120));
  page.on('pageerror', onE);
  await page.goto(BASE + j.path + '?cb=' + Date.now(), { waitUntil: 'domcontentloaded', timeout: 45000 }).catch(()=>{});
  await page.waitForTimeout(3500);
  await page.evaluate((at) => window.scrollTo(0, document.body.scrollHeight * at), j.at);
  await page.waitForTimeout(1800);
  await page.screenshot({ path: `${OUT}/${j.name}.png` });
  page.off('pageerror', onE);
  allErrs[j.path] = errs.length ? errs : 'ok';
}
console.log('errors:', JSON.stringify(allErrs));
await browser.close();
