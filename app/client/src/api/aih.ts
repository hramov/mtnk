import {Api} from "./api";
import { Filters } from '../config/config';
import { ConfigItem, WorkGroup} from './../../../shared/tnk';

export class AihService {
	private baseUrl = 'aih';
	private instance: Api;

	constructor() {
		this.instance = new Api()
	}

	async getConfigItemList(filters: Filters<ConfigItem>): Promise<Array<ConfigItem>> {
		const filtersQuery = this.instance.formatFilterQuery<ConfigItem>(filters);
		return this.instance.get(this.baseUrl + '/ci', filtersQuery);
	}

	async getWorkgroupList(filters: Filters<WorkGroup>): Promise<Array<ConfigItem>> {
		const filtersQuery = this.instance.formatFilterQuery<ConfigItem>(filters);
		return this.instance.get(this.baseUrl + '/wg', filtersQuery)
	}
}