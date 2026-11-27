<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { appConfig } from '@/config/env'
import { navigation } from '@/config/navigation'
import ThemeSelect from '@/components/ThemeSelect.vue'
</script>

<template>
  <header class="border-b-2 border-primary bg-base-100">
    <div class="mx-auto flex max-w-7xl flex-wrap items-center gap-3 px-4 py-3">
      <RouterLink to="/" class="font-display text-lg font-bold">{{ appConfig.name }}</RouterLink>
      <span class="badge badge-error badge-outline">Waste radar</span>
      <nav aria-label="Primary" class="flex flex-wrap gap-0 sm:ml-4">
        <RouterLink v-for="item in navigation" :key="item.to" :to="item.to"
          class="border border-base-300 px-3 py-2 text-sm font-medium hover:bg-base-200"
          exact-active-class="bg-primary text-primary-content border-primary">{{ item.label }}</RouterLink>
      </nav>
      <div class="sm:ml-auto"><ThemeSelect /></div>
    </div>
  </header>
</template>
