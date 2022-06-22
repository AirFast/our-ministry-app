import { useStorage } from '@vueuse/core'

export const useUserStorage = () => {
  const user = useStorage('user', {
    id: '',
    username: '',
    token: '',
    isAuth: false,
    role: '',
    lang: 'uk'
  })

  return user
}