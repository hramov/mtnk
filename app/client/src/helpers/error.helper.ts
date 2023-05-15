import {HttpStatusCode} from "axios";

export function errorFactory(code: number | undefined): string {
    switch(code) {
        case HttpStatusCode.NotFound:
            return 'Сервер не обрабатывает запрошенный адрес';
        default:
            return 'Внутренняя ошибка сервера'
    }
}