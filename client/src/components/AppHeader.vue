<script setup lang="ts">
import { ref } from 'vue'
import gql from 'graphql-tag'
import { useMutation } from '@vue/apollo-composable'
import { RouterLink, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { onClickOutside } from '@vueuse/core'
import { useUserStorage } from '~/composables/useUserStorage'
import { useUserStore } from '~/store/user'
import { UserIcon, CogIcon, LogoutIcon } from '@heroicons/vue/solid'
import { VOptionButton } from '~/components'
import { Mutation } from '~/generated/GraphqlTypes'

const { push } = useRouter()
const { t } = useI18n()
const userStorage = useUserStorage()
const user = useUserStore()

const userMenuRef = ref(null)
const isShowUserMenu = ref(false)

onClickOutside(
  userMenuRef,
  (e) => {
    isShowUserMenu.value = !isShowUserMenu.value
  },
)

const LOGOUT_MUTATION = gql`
  mutation Logout {
    logout {
      isAuth
    }
  } 
`
const { mutate } = useMutation<Mutation>(LOGOUT_MUTATION)

const logout = async () => {
  const res = await mutate()

  if(!res?.data?.logout?.isAuth) {
    userStorage.value.isAuth = res?.data?.logout?.isAuth ?? false
    
    user.isAuth = res?.data?.logout?.isAuth ?? false
    user.data = {
      name: '',
      email: '',
      role: {}
    }

    push({name: 'login'})
  }
}
</script>

<template>
  <header class="py-6">
    <nav class="flex justify-end">
      <ul v-if="user.isAuth" class="flex items-center -ml-4 text-right">
        <li class="inline-block">
          <RouterLink :to="{name: 'home'}" class="text-sm font-medium block px-4 py-1 transition-all duration-200 ease-out hover:text-indigo-500 dark:hover:text-indigo-200">{{ t('home') }}</RouterLink>
        </li>
        <li class="inline-block relative">
          <VOptionButton @click="isShowUserMenu = !isShowUserMenu">
            <UserIcon class="w-6 h-6 text-indigo-500 dark:text-indigo-200" />
          </VOptionButton>
          <ul v-if="isShowUserMenu" ref="userMenuRef" class="absolute z-10 -right-2 bottom-100 mt-4 whitespace-nowrap rounded ring-1 ring-indigo-500/5 shadow-md bg-white dark:bg-slate-800">
            <li>
              <span class="block font-medium mx-2 p-3 border-b border-slate-100 dark:border-slate-700">
                {{ user.data.name }}
                <span class="block font-normal text-sm">{{ t(`user.role.${user.data.role?.name}`) }}</span>
              </span>
            </li>
            <li @click="isShowUserMenu = !isShowUserMenu" v-if="user.data.role?.name === 'admin'">
              <RouterLink :to="{name: 'setting'}" class="flex items-center w-full px-5 py-3 transition-all duration-200  ease-out hover:bg-slate-100 dark:hover:bg-slate-700">
                <CogIcon class="w-5 h-5 mr-3 text-indigo-500 dark:text-indigo-200" />
                <span>{{ t('user.menu.setting') }}</span>
              </RouterLink>
            </li>
            <li>
              <button @click="logout" type="button" class="flex items-center w-full px-5 py-3 transition-all duration-200  ease-out hover:bg-slate-100 dark:hover:bg-slate-700">
                <LogoutIcon class="w-5 h-5 mr-3 text-indigo-500 dark:text-indigo-200" />
                <span>{{ t('user.menu.logout') }}</span>
              </button>
            </li>
          </ul>
        </li>
      </ul>
      <ul v-else class="-mx-2 text-right inline-block">
        <li class="inline-block">
          <RouterLink :to="{name: 'login'}" class="text-sm font-medium block transition-all duration-200 ease-out link-button">{{ t('login') }}</RouterLink>
        </li>
        <li class="inline-block">
          <RouterLink :to="{name: 'register'}" class="text-sm font-medium block transition-all duration-200 ease-out link-button">{{ t('register') }}</RouterLink>
        </li>
      </ul>
    </nav>
  </header>
</template>