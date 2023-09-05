import {getBrowser} from './src/lib/browser.ts';
import {workPunch} from './src/handlers/handlers.ts';

const browser = await getBrowser();
const page = await browser.newPage();

await workPunch(page, 'shuji.okamura@beex-inc.com', 'Syuji6051');
