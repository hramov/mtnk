import {Api} from "./api";

export class UserService {
	private baseUrl = 'user';
	private instance: Api;

	constructor() {
		this.instance = new Api()
	}

	async signIn(user: any): Promise<any> {
		return this.instance.post(this.baseUrl + '/login', user);
	}
}