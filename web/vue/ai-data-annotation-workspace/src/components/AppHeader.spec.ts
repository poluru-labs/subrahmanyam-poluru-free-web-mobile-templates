import { mount } from '@vue/test-utils'
import { createPinia } from 'pinia'
import { describe, expect, it } from 'vitest'
import { createMemoryHistory, createRouter } from 'vue-router'
import { routes } from 'vue-router/auto-routes'
import { appConfig } from '@/config/env'
import { navigation } from '@/config/navigation'
import AppHeader from './AppHeader.vue'

async function mountHeader() {
  const router = createRouter({
    history: createMemoryHistory(),
    routes,
  })
  router.push('/')
  await router.isReady()

  return mount(AppHeader, {
    global: {
      plugins: [createPinia(), router],
    },
  })
}

describe('AppHeader', () => {
  it('renders the app name and primary navigation', async () => {
    const wrapper = await mountHeader()
    expect(wrapper.text()).toContain(appConfig.name)
    for (const item of navigation) {
      expect(wrapper.text()).toContain(item.label)
    }
    expect(wrapper.get('nav').findAll('a')).toHaveLength(navigation.length)
  })
})
