import {getBrowser} from './src/lib/browser.ts';
import {workPunch} from './src/handlers/handlers.ts';

const browser = await getBrowser();

await workPunch(browser, 'shuji.okamura@beex-inc.com', 'fjX6X6vmd78buq');
