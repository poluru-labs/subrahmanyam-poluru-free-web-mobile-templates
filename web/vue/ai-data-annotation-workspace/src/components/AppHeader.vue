<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { appConfig } from '@/config/env'
import { navigation } from '@/config/navigation'
import ThemeSelect from '@/components/ThemeSelect.vue'
</script>

<template>
  <header class="border-b border-base-300 bg-base-200">
    <div class="mx-auto flex max-w-7xl flex-wrap items-center gap-3 px-4 py-4 lg:px-6">
      <RouterLink to="/" class="flex items-center gap-2 font-display font-bold text-primary">
        <span class="flex size-8 items-center justify-center rounded-box bg-primary text-sm text-primary-content">Lbl</span>
        {{ appConfig.name }}
      </RouterLink>
      <nav aria-label="Primary" class="flex flex-wrap gap-1">
        <RouterLink v-for="item in navigation" :key="item.to" :to="item.to"
          class="rounded-box px-3 py-2 text-sm text-base-content/70 hover:bg-base-300"
          exact-active-class="bg-accent/20 text-accent-content font-semibold text-accent">{{ item.label }}</RouterLink>
      </nav>
      <div class="sm:ml-auto"><ThemeSelect /></div>
    </div>
  </header>
</template>
