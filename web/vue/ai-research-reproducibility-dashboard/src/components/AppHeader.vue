<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { appConfig } from '@/config/env'
import { navigation } from '@/config/navigation'
import ThemeSelect from '@/components/ThemeSelect.vue'
</script>

<template>
  <header class="border-b border-base-300 bg-base-100/80 backdrop-blur">
    <div class="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-4 lg:px-6 sm:flex-row sm:items-center">
      <RouterLink to="/" class="flex items-center gap-2 font-display text-lg font-bold text-primary">
        <span class="grid grid-cols-2 gap-0.5" aria-hidden="true">
          <span class="size-2 rounded-sm bg-primary" />
          <span class="size-2 rounded-sm bg-secondary" />
          <span class="size-2 rounded-sm bg-accent" />
          <span class="size-2 rounded-sm bg-primary/60" />
        </span>
        {{ appConfig.name }}
      </RouterLink>
      <nav aria-label="Primary" class="flex flex-wrap gap-1 sm:ml-6">
        <RouterLink
          v-for="item in navigation"
          :key="item.to"
          :to="item.to"
          class="rounded-box px-3 py-2 text-sm text-base-content/70 hover:bg-primary/15"
          exact-active-class="bg-primary/20 font-semibold text-primary"
        >
          {{ item.label }}
        </RouterLink>
      </nav>
      <div class="sm:ml-auto"><ThemeSelect /></div>
    </div>
  </header>
</template>