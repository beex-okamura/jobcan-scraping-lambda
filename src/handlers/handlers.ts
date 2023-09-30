import {type SQSEvent} from 'aws-lambda';
import logger from '../lib/logger.ts';
import {getBrowser} from '../lib/browser.ts';
import {JobCanClient} from '../playwright/jobcan.ts';
import {type Browser, type Page} from 'playwright';
import {type UserInfo} from '../entities/user.ts';

export const handler = async (event: SQSEvent) => {
	const messages = event.Records.map(e => JSON.parse(e.body) as UserInfo);

	logger.info('start jobcan scraping');
	const browser = await getBrowser();

	try {
		for (const message of messages) {
			const {userId, password} = message;

			// eslint-disable-next-line no-await-in-loop
			await workPunch(browser, userId, password);
		}
	} finally {
		await browser.close();
	}

	logger.info('end jobcan scraping');
};

export const workPunch = async (browser: Browser, userId: string, password: string, dryRun = false) => {
	const page = await browser.newPage();

	const jobcan = new JobCanClient(page);
	await jobcan.login(userId, password);

	if (dryRun) return;
	await jobcan.workPunch();
};
