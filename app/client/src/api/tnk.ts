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

    async getTnk(id: number): Promise<Array<Tnk>> {
        console.log(id);
        return this.instance.get(this.baseUrl)
    }
}