import { defineStore } from 'pinia'
import { register } from '@/api/routes/user.js'

export const useRegisterStore = defineStore('register', {
  state: () => ({
    subscription: '',
    username: '',
    password: '',
    email: '',
  }),
  actions: {
    setSubscription(plan) {
      this.subscription = plan
    },
    setRegisterData(username, password, email) {
      this.username = username
      this.password = password
      this.email = email
    },
    async register() {
      const result = await register(this.username, this.email, this.password, this.subscription.id)
      if (result.success) this.clear()
      return result
    },
    clear() {
      this.subscription = ''
      this.username = ''
      this.password = ''
      this.email = ''
    },
  },
})
