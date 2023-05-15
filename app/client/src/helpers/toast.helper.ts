import {MESSAGE_TYPES, ToastType} from "../config/config.js";
declare var bootstrap: any;

export function useToast(type: ToastType, title: string, body: string) {
    if (!type || !title || !body) {
        console.warn('Необходимо указать поля: тип, заголовок, тело сообщения')
        return
    }

    const toastLive = document.getElementById('liveToast');
    const toastTitle = document.getElementById('toast_title');
    const toastBody = document.getElementById('toast_body');

    if (toastTitle) {
        toastTitle.style.color = MESSAGE_TYPES[type].color;
    }

    if (toastLive) {
        if (toastTitle && toastBody) {
            toastTitle.innerHTML = title;
            toastBody.innerHTML = body;
            const toast = new bootstrap.Toast(toastLive);
            toast.show();
        }
    }
}