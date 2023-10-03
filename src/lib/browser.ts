import {chromium} from 'playwright';
import logger from './logger.ts';
import {getEnvironments} from '../lib/environments.ts';

const {headlessMode} = getEnvironments();	

export const getBrowser = async () => {
	logger.debug(`puppeteer browser is docker? = ${String(headlessMode)}`);

	return chromium.launch(headlessMode ? {
		args: [
			'--no-sandbox',
			'--disable-setuid-sandbox',
			'--disable-dev-shm-usage',
			'--disable-gpu',
			'--no-first-run',
			'--no-zygote',
			'--single-process',
		],
	} : {
		headless: false,
	});
};
