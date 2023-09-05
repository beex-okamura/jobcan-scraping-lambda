import {type SQSEvent} from 'aws-lambda';
import logger from '../lib/logger.ts';
import {getBrowser} from '../lib/browser.ts';
import {JobCanClient} from '../playwright/jobcan.ts';
import {type Page} from 'playwright';

export const handler = async (event: SQSEvent) => {
	const messages = event.Records.map(e => JSON.parse(e.body));

	logger.info('start jobcan scraping');
	const browser = await getBrowser();
	const page = await browser.newPage();
};

export const workPunch = async (page: Page, userId: string, password: string) => {
	const jobcan = new JobCanClient(page);
	await jobcan.login(userId, password);
};
