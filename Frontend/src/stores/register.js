import { defineStore } from "pinia";

export const useRegisterStore = defineStore("register", {
  state: () => ({
    subscription: null, 
  }),
  actions: {
    setSubscription(plan) {
      this.subscription = plan;
    },
    clear() {
      this.subscription = null;
    },
  },
});