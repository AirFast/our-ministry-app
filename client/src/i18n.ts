import { createI18n } from 'vue-i18n'
import { useUserStorage } from '~/composables'
 
import { en } from '~/locales/en'
import { uk } from '~/locales/uk'

const userStorage = useUserStorage()

export const i18n = createI18n({
  locale: userStorage.value.lang,
  messages: {
    en,
    uk
  },
});