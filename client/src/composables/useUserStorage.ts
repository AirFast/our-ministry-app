import { useStorage } from '@vueuse/core'

export const useUserStorage = () => {
  const user = useStorage('user', {
    id: '',
    username: '',
    role: '',
    token: '',
    isAuth: false,
    lang: 'uk'
  })

  return user
}