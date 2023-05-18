import {Api} from "./api";
import { Tnk } from './../../../shared/tnk'
import { Filters } from '../config/config';

export class TnkService {
    private baseUrl = 'tnk';
    private instance: Api;

    constructor() {
        this.instance = new Api()
    }

    async getTnkList(filters: Filters<Tnk>): Promise<Array<Tnk>> {
        const filtersQuery = this.instance.formatFilterQuery<Tnk>(filters);
        return this.instance.get(this.baseUrl, filtersQuery)
    }

    async getTnk(tnkId: string): Promise<Tnk> {
        const data = await this.instance.get(this.baseUrl + '/' + tnkId);
        if (Array.isArray(data)) {
            return data[0];
        }
        return data;
    }

    async saveTnk(tnk: Tnk): Promise<string> {
        if (tnk.id) {
            return this.instance.put(this.baseUrl, tnk.id, tnk);
        }
        return this.instance.post(this.baseUrl, tnk);
    }

    async addWorkGroup(wg: any) {
        return this.instance.post(this.baseUrl + '/wg', wg);
    }

    async removeWorkGroup(wg: any) {
        return this.instance.delete(this.baseUrl + '/wg', wg);
    }

    async addConfigItem(ci: any) {
        return this.instance.post(this.baseUrl + '/ci', ci);
    }

    async removeConfigItem(ci: any) {
        return this.instance.delete(this.baseUrl + '/ci', ci);
    }
}