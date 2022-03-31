import { defineStore } from 'pinia';

export const useUIStore = defineStore('ui', {
  state: () => ({
    isDataLoading: false,
  }),

  getters: {},

  actions: {
    setIsDataLoading(loading: boolean) {
      this.isDataLoading = loading;
    },
  },
});
