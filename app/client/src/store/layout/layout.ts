import { defineStore } from 'pinia'

export const enum SnackbarColor {
    Success = 'success',
    Warning = 'warning',
    Danger = 'danger'
}

export const useLayoutStore = defineStore('layout', {
    state: () => ({
        showSnackbar: false,
        snackbarMessage: '',
        snackbarType: 'success',
    }),

    actions: {
        showAlert(type: SnackbarColor, message: string) {
            this.showSnackbar = true;
            this.snackbarType = type;
            this.snackbarMessage = message;
        }
    }


})