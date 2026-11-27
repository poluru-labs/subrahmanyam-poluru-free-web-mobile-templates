<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { appConfig } from '@/config/env'
import { navigation } from '@/config/navigation'
import ThemeSelect from '@/components/ThemeSelect.vue'
</script>

<template>
  <header class="border-b border-base-300 bg-base-100">
    <div class="rdisc-rail px-4 py-2 text-center text-xs font-semibold uppercase tracking-[0.3em] text-white/90">
      Lab discovery rail
    </div>
    <div class="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-4 lg:px-6 sm:flex-row sm:items-center">
      <RouterLink to="/" class="flex items-center gap-2 font-display text-lg font-bold text-primary">
        <span class="rdisc-orbit size-2.5 rounded-field bg-secondary" aria-hidden="true" />
        {{ appConfig.name }}
      </RouterLink>
      <nav aria-label="Primary" class="flex flex-wrap gap-1 sm:ml-6">
        <RouterLink
          v-for="item in navigation"
          :key="item.to"
          :to="item.to"
          class="rounded-field px-3 py-2 text-sm text-base-content/70 hover:bg-primary/15"
          exact-active-class="bg-secondary/15 font-semibold text-secondary"
        >
          {{ item.label }}
        </RouterLink>
      </nav>
      <div class="sm:ml-auto"><ThemeSelect /></div>
    </div>
  </header>
</template>