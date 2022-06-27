import { useStorage } from '@vueuse/core';
import { computed, reactive, ref } from 'vue';
import { defineStore, acceptHMRUpdate } from 'pinia';
import { useUserStorage } from '~/composables/useUserStorage'

export const useUserStore = defineStore('user', () => {
  const userStorage = useUserStorage()

  const isAuth = ref(userStorage.value.isAuth)
  const pending = computed(() => !isAuth.value ? true : false)
  const data = reactive({})

  return {
    isAuth,
    pending,
    data
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot))
}