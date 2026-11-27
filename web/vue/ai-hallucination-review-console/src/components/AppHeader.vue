<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { appConfig } from '@/config/env'
import { navigation } from '@/config/navigation'
import ThemeSelect from '@/components/ThemeSelect.vue'
</script>

<template>
  <header class="claim-sharp-header bg-base-100">
    <div class="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-4 lg:px-6 sm:flex-row sm:items-center">
      <RouterLink to="/" class="font-display text-lg font-bold tracking-tight text-primary">{{ appConfig.name }}</RouterLink>
      <nav aria-label="Primary" class="flex flex-wrap gap-0 sm:ml-6">
        <RouterLink
          v-for="item in navigation"
          :key="item.to"
          :to="item.to"
          class="border border-base-300 px-3 py-2 text-sm font-medium text-base-content/70 hover:bg-primary/10"
          exact-active-class="bg-primary text-primary-content border-primary font-semibold"
        >
          {{ item.label }}
        </RouterLink>
      </nav>
      <div class="sm:ml-auto"><ThemeSelect /></div>
    </div>
  </header>
</template>