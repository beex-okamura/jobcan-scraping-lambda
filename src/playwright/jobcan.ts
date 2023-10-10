import {type Page} from 'playwright';
import {format} from 'date-fns';
import logger from '../lib/logger.js';
import path from 'path';
import {getEnvironments} from '../lib/environments.js';
import { addPrefixToS3Path, uploadToS3 } from '../lib/s3.js';

const nowDate = new Date();
const {uploadBucket,downloadDir} = getEnvironments();

export class JobCanClient {
	constructor(private readonly page: Page) { }

	async login(userId: string, password: string) {
		await this.page.goto('https://id.jobcan.jp/users/sign_in');
		logger.debug('login page opened');

		await this.page.fill('#user_email', userId);
		await this.page.fill('#user_password', password);
		await this.page.click('input[type="submit"]');
		logger.debug('login button clicked');

		await this.page.waitForResponse(
			resp => resp.url()
				.includes('/account/profile/atd_admin_link_disp') && resp.status() === 200
		);
		logger.debug('login finished');
	}

	async workPunch() {
		await this.page.goto('https://ssl.jobcan.jp/jbcoauth/login');
		logger.debug('work punch page opened');

		await this.page.innerText('#working_status');
	}

	async saveSnapshotAndThrowError(err: Error) {
		logger.error(err.stack);
		const snapshotName = `${format(nowDate, 'yyyyMMdd_hhmmss')}.png`;
		const body = await this.page.screenshot({
			path: path.join(downloadDir, snapshotName),
			type: 'png',
		});
		if (uploadBucket !== undefined) {
			await uploadToS3(uploadBucket, addPrefixToS3Path('Snapshot', snapshotName), body);
		}

		throw err;
	}
}
