import {Filters} from "../ui/components/layout/Filters.vue";
import {Api} from "./api";
import { Tnk } from './../../../shared/tnk'

export class TnkService {
    private baseUrl = 'tnk';
    private instance: Api;

    constructor() {
        this.instance = new Api()
    }

    async getTnkList(filters: Filters): Promise<Array<Tnk>> {
        const filtersQuery = this.instance.formatFilterQuery(filters);
        return this.instance.get(this.baseUrl, filtersQuery)
    }

    async getTnk(id: number): Promise<Array<Tnk>> {
        console.log(id);
        return this.instance.get(this.baseUrl)
    }
}