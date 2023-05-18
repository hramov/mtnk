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

    async getTnk(_: number): Promise<Array<Tnk>> {
        return this.instance.get(this.baseUrl)
    }

    async saveTnk(tnk: Tnk): Promise<string> {
        if (tnk.id) {
            return this.instance.put(this.baseUrl, tnk.id, tnk);
        }
        return this.instance.post(this.baseUrl, tnk);
    }
}