import { computed, reactive, ref, watch } from 'vue';
import { defineStore, acceptHMRUpdate } from 'pinia';
import { useUserStorage } from '~/composables/useUserStorage'
import { Maybe, User } from '~/graphqlTypes';



export const useUserStore = defineStore('user', () => {
  const userStorage = useUserStorage()

  const isAuth = ref(userStorage.value.isAuth)
  const pending = computed(() => !isAuth.value)
  const data: Maybe<User> = reactive({})

  return {
    isAuth,
    pending,
    data
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot))
}