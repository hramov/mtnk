import axios, {AxiosInstance} from "axios";
import {SnackbarColor, useLayoutStore} from "../store/layout/layout";

export class ApiError extends Error {
    constructor() {
        super('Cannot fetch data from server');
    }
}

const layoutStore = useLayoutStore();

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
        }, function (error) {
            layoutStore.showAlert(SnackbarColor.Danger, error.message)
            return Promise.resolve(error);
        });
    }

    async get<T>(url: string): Promise<T[]> {
        try {
            const response = await this.instance.get(url);
            return response.data;
        } catch(_err: unknown) {
            return [];
        }
    }

    async post() {

    }

    async put() {

    }

    async delete() {

    }
}