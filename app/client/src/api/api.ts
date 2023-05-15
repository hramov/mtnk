import axios, {AxiosInstance} from "axios";
import {Filters} from "../ui/components/layout/Filters.vue";
import {useToast} from "../helpers/toast.helper";
import {errorFactory} from "../helpers/error.helper";

export class NotFoundError extends Error {
    constructor() {
        super('Cannot fetch data from server');
    }
}

export class Api {
    private readonly instance: AxiosInstance;
    constructor() {
        this.instance = axios.create({
            baseURL: import.meta.env.VITE_APP_BASE_URL,
            timeout: 5000,
        });

        this.instance.interceptors.request.use(function (config) {
            // TODO add jwt token;
            return config;
        }, function (error) {
            return Promise.reject(error);
        });

        this.instance.interceptors.response.use(function (response) {
            return response;
        }, function (error: any) {
            const statusCode = error.response && error.response.data ? error.response.data.statusCode : undefined;
            useToast('error', 'Ошибка сети', errorFactory(statusCode))
            return Promise.resolve(error);
        });
    }

    public  async get<T>(url: string, filters?: string): Promise<T[]> {
        try {
            const response = await this.instance.get(url + '/' + (filters ? filters : ''));
            return response.data;
        } catch(_err: unknown) {
            return [];
        }
    }

    public async post() {

    }

    public async put() {

    }

    public async delete() {

    }

    public formatFilterQuery(filters: Filters): string {
        console.log(filters)
        return ""
    }
}