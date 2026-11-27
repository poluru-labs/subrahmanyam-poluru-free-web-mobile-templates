<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { appConfig } from '@/config/env'
import { navigation } from '@/config/navigation'
import ThemeSelect from '@/components/ThemeSelect.vue'
</script>

<template>
  <header class="border-b border-primary/20 bg-base-100">
    <div class="inf-latency-bar h-0.5 w-full opacity-60" aria-hidden="true" />
    <div class="mx-auto flex max-w-5xl flex-col gap-3 px-4 py-4 lg:px-6 sm:flex-row sm:items-center">
      <RouterLink to="/" class="font-display text-lg font-bold text-primary">{{ appConfig.name }}</RouterLink>
      <nav aria-label="Primary" class="flex flex-wrap gap-1 sm:ml-5">
        <RouterLink
          v-for="item in navigation"
          :key="item.to"
          :to="item.to"
          class="rounded-box px-3 py-2 text-sm font-medium text-base-content/70 hover:bg-primary/10 hover:text-primary"
          exact-active-class="bg-primary/15 font-semibold text-primary"
        >
          {{ item.label }}
        </RouterLink>
      </nav>
      <div class="sm:ml-auto"><ThemeSelect /></div>
    </div>
  </header>
</template>
