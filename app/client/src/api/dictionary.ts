import {Api} from "./api";
import { Process, Subprocess, ReferenceOperation } from './../../../shared/tnk';
import { Filters } from '../config/config';

export class DictionaryService {
	private baseUrl = 'dictionary';
	private instance: Api;

	constructor() {
		this.instance = new Api()
	}

	async getProcessList(filters: Filters<Process>): Promise<Array<Process>> {
		const filtersQuery = this.instance.formatFilterQuery<Process>(filters);
		return this.instance.get(this.baseUrl + '/process', filtersQuery)
	}

	async getSubprocessList(filters: Filters<Subprocess>): Promise<Array<Subprocess>> {
		const filtersQuery = this.instance.formatFilterQuery<Subprocess>(filters);
		const data = await this.instance.get<Subprocess>(this.baseUrl + '/subprocess', filtersQuery);
		return data
	}

	async getOperationList(filters: Filters<ReferenceOperation>): Promise<Array<ReferenceOperation>> {
		const filtersQuery = this.instance.formatFilterQuery<ReferenceOperation>(filters);
		return this.instance.get(this.baseUrl + '/operation', filtersQuery)
	}

	async getItsmProcess() {
		return this.instance.get(this.baseUrl + '/itsmProcess')
	}

	async saveSubprocess(subprocess: Subprocess): Promise<number | Error> {
		let data: any;
		if (subprocess.id) {
			data = await this.instance.put(this.baseUrl + '/subprocess', subprocess.id, subprocess)
		} else {
			data = await this.instance.post(this.baseUrl + '/subprocess', subprocess)
		}
		return data.id;
	}
}