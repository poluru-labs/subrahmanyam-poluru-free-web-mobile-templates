<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { appConfig } from '@/config/env'
import { navigation } from '@/config/navigation'
import ThemeSelect from '@/components/ThemeSelect.vue'
</script>

<template>
  <header>
    <div class="ops-status-band text-white">
      <div class="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-2 text-xs lg:px-6">
        <p class="font-mono uppercase tracking-widest text-white/80">Live · All regions</p>
        <p class="font-mono text-white/90">Latency <span class="font-bold text-white">142ms</span></p>
        <p class="font-mono text-white/90">Agents <span class="font-bold text-accent">28</span></p>
      </div>
    </div>
    <div class="border-b border-base-300 bg-base-100">
      <div class="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-4 lg:px-6 sm:flex-row sm:items-center">
        <RouterLink to="/" class="flex items-center gap-2 font-display text-lg font-bold tracking-tight">
          <span class="ops-trace-pulse size-2.5 rounded-full bg-primary" aria-hidden="true" />
          {{ appConfig.name }}
        </RouterLink>
        <nav aria-label="Primary" class="flex flex-wrap gap-1 sm:ml-6">
          <RouterLink
            v-for="item in navigation"
            :key="item.to"
            :to="item.to"
            class="rounded-box px-3 py-2 text-sm font-medium text-base-content/70 hover:bg-base-200"
            exact-active-class="bg-primary/10 text-primary font-semibold"
          >
            {{ item.label }}
          </RouterLink>
        </nav>
        <div class="sm:ml-auto">
          <ThemeSelect />
        </div>
      </div>
    </div>
  </header>
</template>