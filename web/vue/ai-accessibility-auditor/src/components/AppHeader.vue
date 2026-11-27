<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { appConfig } from '@/config/env'
import { navigation } from '@/config/navigation'
import ThemeSelect from '@/components/ThemeSelect.vue'
</script>

<template>
  <header class="border-b-4 border-primary bg-base-100">
    <div class="mx-auto flex w-full max-w-7xl flex-col gap-3 px-4 py-4 lg:px-8 sm:flex-row sm:items-center">
      <RouterLink to="/" class="group flex items-center gap-3">
        <span
          class="flex size-9 items-center justify-center bg-primary font-display text-sm font-bold text-primary-content"
          aria-hidden="true"
        >
          A11y
        </span>
        <span class="font-display text-lg font-bold tracking-tight group-hover:text-primary">{{ appConfig.name }}</span>
      </RouterLink>
      <nav aria-label="Primary" class="flex flex-wrap items-center gap-0 sm:ml-6">
        <RouterLink
          v-for="item in navigation"
          :key="item.to"
          :to="item.to"
          class="border border-transparent px-3 py-2 text-sm font-semibold uppercase tracking-wide text-base-content/70 hover:border-base-300 hover:bg-base-200 hover:text-base-content"
          exact-active-class="border-primary bg-primary/10 text-primary"
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