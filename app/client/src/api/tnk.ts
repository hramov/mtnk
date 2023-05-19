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

    async saveTnk(tnk: any): Promise<string> {
        if (tnk.id) {
            return this.instance.put(this.baseUrl, tnk.id, tnk);
        }
        return this.instance.post(this.baseUrl, tnk);
    }

    async moveToApproving(tnkId: string): Promise<{ id: string } | null> {
        return this.instance.getOne<{id: string}>(this.baseUrl + '/' + tnkId + '/moveToApproving');
    }

    async approve(tnkId: string): Promise<{ id: string } | null> {
        return this.instance.getOne<{id: string}>(this.baseUrl + '/' + tnkId + '/approve');
    }

    async decline(tnkId: string): Promise<{ id: string } | null> {
        return this.instance.getOne<{id: string}>(this.baseUrl + '/' + tnkId + '/decline');
    }

    async addWorkGroup(wg: any, tnkId: string) {
        return this.instance.post(this.baseUrl + '/' + tnkId + '/wg', wg);
    }

    async removeWorkGroup(wg: any, tnkId: string) {
        return this.instance.delete(this.baseUrl + '/' + tnkId + '/wg', wg.title);
    }

    async addConfigItem(ci: any, tnkId: string) {
        return this.instance.post(this.baseUrl + '/' + tnkId + '/ci', ci);
    }

    async removeConfigItem(ci: any, tnkId: string) {
        return this.instance.delete(this.baseUrl + '/' + tnkId + '/ci', ci.title);
    }
}