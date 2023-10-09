import {type SQSEvent} from 'aws-lambda';
import {type Browser} from 'playwright';
import logger from '../lib/logger.js';
import {getBrowser} from '../lib/browser.js';
import {getEnvironments} from '../lib/environments.js';
import {JobCanClient} from '../playwright/jobcan.js';
import {type Message} from '../entities/message.js';

const {dryRun} = getEnvironments();
logger.debug('dryRun: ', dryRun);

export const handler = async (event: SQSEvent) => {
	const messages = event.Records.map(e => ({
		messageId: e.messageId,
		...JSON.parse(e.body)
	}) as Message);

	logger.info('start jobcan scraping');
	const failedMessageIds = [];

	for (const message of messages) {
		const browser = await getBrowser();
		const {userId, password, messageId} = message;

		try {
			// eslint-disable-next-line no-await-in-loop
			await workPunch(browser, userId, password, dryRun);
			logger.debug('work punch finished');
		} catch (err) {
			failedMessageIds.push(messageId);
		} finally {
			await browser.close();
			logger.debug('browser closed');	
		}
	}

	logger.info('end jobcan scraping');
  return {
    batchItemFailures: failedMessageIds.map(itemIdentifier => ({ itemIdentifier })),
  };
};

export const workPunch = async (browser: Browser, userId: string, password: string, dryRun = false) => {
	const page = await browser.newPage();
	logger.debug('new page created');

	const jobcan = new JobCanClient(page);
	logger.debug('jobcan client created');
	
	try {
		await jobcan.login(userId, password);

		if (dryRun === false) {
			await jobcan.workPunch();
		}
		logger.debug('work punch finished');	
	} catch (err) {
		logger.error(err);
		if (err instanceof Error) {
			await jobcan.saveSnapshotAndThrowError(err);
		}
		throw err;
	} finally {
		await page.close();
		logger.debug('page closed');
	}
}
	
