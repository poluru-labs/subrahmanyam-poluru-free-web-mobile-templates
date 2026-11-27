<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { isThemeName, themeLabel, themes } from '@/config/themes'
import { useThemeStore } from '@/stores/theme'

const themeStore = useThemeStore()
const { theme } = storeToRefs(themeStore)

function onChange(event: Event) {
  const value = (event.target as HTMLSelectElement).value
  if (isThemeName(value)) themeStore.setTheme(value)
}
</script>

<template>
  <label class="flex items-center gap-2 text-sm">
    <span id="theme-label" class="text-base-content/70">Theme</span>
    <select
      class="select select-sm"
      aria-labelledby="theme-label"
      :value="theme"
      @change="onChange"
    >
      <option v-for="name in themes" :key="name" :value="name">
        {{ themeLabel(name) }}
      </option>
    </select>
  </label>
</template>
