import {getBrowser} from '../lib/browser.js';
import {workPunch} from '../handlers/handlers.js';

const browser = await getBrowser();
const { TEST_USER_ID, TEST_USER_PASSWORD } = process.env;

if (!TEST_USER_ID || !TEST_USER_PASSWORD) {
  throw new Error('TEST_USER_ID or TEST_USER_PASSWORD is not set');
}

await workPunch(browser, TEST_USER_ID, TEST_USER_PASSWORD);
