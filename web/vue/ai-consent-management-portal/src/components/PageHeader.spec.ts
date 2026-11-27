import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import PageHeader from './PageHeader.vue'

describe('PageHeader', () => {
  it('renders the title and summary', () => {
    const wrapper = mount(PageHeader, {
      props: {
        title: 'About',
        summary: 'How this starter is organized.',
      },
    })

    expect(wrapper.get('h1').text()).toBe('About')
    expect(wrapper.text()).toContain('How this starter is organized.')
  })
})
