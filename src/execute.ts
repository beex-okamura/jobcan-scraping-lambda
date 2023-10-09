import {handler} from './handlers/handlers.js';
import logger from './lib/logger.js';

const { TEST_USER_ID, TEST_USER_PASSWORD } = process.env;

if (!TEST_USER_ID || !TEST_USER_PASSWORD) {
  throw new Error('TEST_USER_ID or TEST_USER_PASSWORD is not set');
}

await handler({
  Records: [{
    messageId: 'test',
    body: JSON.stringify({ userId: TEST_USER_ID, password: TEST_USER_PASSWORD }),
  }]
// eslint-disable-next-line @typescript-eslint/no-explicit-any
} as any);
logger.debug('work punch finished');
