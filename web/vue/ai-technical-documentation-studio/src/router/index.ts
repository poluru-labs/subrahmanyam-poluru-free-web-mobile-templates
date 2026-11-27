import { createRouter, createWebHistory } from 'vue-router'
import { handleHotUpdate, routes } from 'vue-router/auto-routes'
import { appConfig } from '@/config/env'
import { formatTitle } from '@/utils/formatTitle'

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior() {
    return { top: 0 }
  },
})

router.afterEach((to) => {
  const pageTitle = typeof to.meta.title === 'string' ? to.meta.title : ''
  document.title = formatTitle(pageTitle, appConfig.name)
})

if (import.meta.hot) {
  handleHotUpdate(router)
}
