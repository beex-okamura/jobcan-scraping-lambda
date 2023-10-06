import {type SQSEvent} from 'aws-lambda';
import {type Browser} from 'playwright';
import logger from '../lib/logger.js';
import {getBrowser} from '../lib/browser.js';
import {getEnvironments} from '../lib/environments.js';
import {JobCanClient} from '../playwright/jobcan.js';
import {type UserInfo} from '../entities/user.js';

const {dryRun} = getEnvironments();

export const handler = async (event: SQSEvent) => {
	const messages = event.Records.map(e => JSON.parse(e.body) as UserInfo);

	logger.info('start jobcan scraping');
	const browser = await getBrowser();

	try {
		for (const message of messages) {
			const {userId, password} = message;

			// eslint-disable-next-line no-await-in-loop
			await workPunch(browser, userId, password, dryRun);
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
