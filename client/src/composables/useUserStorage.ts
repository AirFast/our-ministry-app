import { useStorage } from '@vueuse/core'

export const useUserStorage = () => {
  const user = useStorage('user', {
    id: '',
    hash: '',
    lang: 'uk'
  })

  return user
}