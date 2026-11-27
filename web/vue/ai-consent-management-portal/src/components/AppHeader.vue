<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { appConfig } from '@/config/env'
import { navigation } from '@/config/navigation'
import ThemeSelect from '@/components/ThemeSelect.vue'
</script>

<template>
  <header class="border-b border-base-300 bg-base-100">
    <div class="mx-auto flex max-w-5xl items-center justify-between gap-3 px-4 py-4">
      <RouterLink to="/" class="font-display text-lg font-bold text-primary">{{ appConfig.name }}</RouterLink>
      <nav aria-label="Primary" class="hidden gap-2 sm:flex">
        <RouterLink v-for="item in navigation" :key="item.to" :to="item.to"
          class="rounded-box px-3 py-2 text-sm"
          exact-active-class="bg-orange-500/15 text-primary font-semibold">{{ item.label }}</RouterLink>
      </nav>
      <ThemeSelect />
    </div>
    <nav aria-label="Primary mobile" class="flex gap-1 overflow-x-auto border-t border-base-300 px-4 py-2 sm:hidden">
      <RouterLink v-for="item in navigation" :key="item.to + '-m'" :to="item.to"
        class="shrink-0 rounded-box px-3 py-1.5 text-sm"
        exact-active-class="bg-primary/10 text-primary">{{ item.label }}</RouterLink>
    </nav>
  </header>
</template>
