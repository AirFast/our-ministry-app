import { computed, ref } from 'vue';
import { defineStore, acceptHMRUpdate } from 'pinia';

export const useUserStore = defineStore('user', () => {
  const token = ref('')
  const isAuth = computed(() => token.value ? true : false)
  const pending = computed(() => !token.value ? true : false)

  return {
    isAuth,
    pending,
    token
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot))
}