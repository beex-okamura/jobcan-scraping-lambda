import {type Page} from 'playwright';

const BASE_URL = 'https://id.jobcan.jp/users/sign_in';

export class JobCanClient {
	constructor(private readonly page: Page) { }

	async login(userId: string, password: string) {
		await this.page.goto(BASE_URL);
	}
}
