import { useStorage } from '@vueuse/core'

export const useUserStorage = () => {
  const user = useStorage('user', {
    isAuth: false,
    lang: 'en'
  })

  return user
}