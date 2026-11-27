<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { appConfig } from '@/config/env'
import { navigation } from '@/config/navigation'
import ThemeSelect from '@/components/ThemeSelect.vue'
</script>

<template>
  <header class="sticky top-0 z-30 border-b border-base-300 bg-base-100/90 backdrop-blur">
    <div class="lineage-header-bar mx-auto flex max-w-5xl flex-col gap-3 px-4 py-4 lg:px-8 sm:flex-row sm:items-center">
      <RouterLink to="/" class="flex items-center gap-2 font-display text-lg font-bold tracking-tight">
        <span class="flex gap-1" aria-hidden="true">
          <span class="size-2 rounded-full bg-primary" />
          <span class="size-2 rounded-full bg-accent/80" />
          <span class="size-2 rounded-full bg-secondary/60" />
        </span>
        {{ appConfig.name }}
      </RouterLink>
      <nav aria-label="Primary" class="flex flex-wrap gap-1 sm:ml-4">
        <RouterLink
          v-for="item in navigation"
          :key="item.to"
          :to="item.to"
          class="rounded-box px-3 py-2 text-sm font-medium text-base-content/70 hover:bg-primary/10"
          exact-active-class="bg-primary/15 text-primary font-semibold"
        >
          {{ item.label }}
        </RouterLink>
      </nav>
      <div class="sm:ml-auto">
        <ThemeSelect />
      </div>
    </div>
  </header>
</template>