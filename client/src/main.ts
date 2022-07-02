import { createApp } from 'vue'
import App from '~/App.vue'

import { createPinia } from 'pinia'
import { router } from '~/router'
import { i18n } from './i18n'
import { DefaultApolloClient } from '@vue/apollo-composable'
import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client/core'

import { useUserStore } from '~/store/user'

const link = createHttpLink({
  uri: 'http://localhost:4000/graphql',
  credentials: 'include'
});

const apolloClient = new ApolloClient({
  link,
  cache: new InMemoryCache(),
})

const app = createApp(App)


router.beforeEach((to, from, next) => {
  const user = useUserStore()

  if (to.meta.auth && !user.isAuth) {
    return next({ name: 'login' })
  } else if (!to.meta.auth && user.isAuth) {
    return next({ name: 'home' })
  }

  if (to.meta.admin && user.data.role?.name !== 'admin') {
    return next({ name: 'home' })
  }

  return next()
})

app.use(createPinia())
app.use(router)
app.use(i18n)
app.provide(DefaultApolloClient, apolloClient)

app.mount('#app')