import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
	state: () => ({
		user: {
			id: ''
		}
	}),

	actions: {
		async getUser() {
			this.user =  {
				id: '',
			};
		}
	},
})