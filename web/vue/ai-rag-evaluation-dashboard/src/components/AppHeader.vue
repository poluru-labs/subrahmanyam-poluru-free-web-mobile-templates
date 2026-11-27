<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { appConfig } from '@/config/env'
import { navigation } from '@/config/navigation'
import ThemeSelect from '@/components/ThemeSelect.vue'
</script>

<template>
  <header>
    <div class="rageval-status-band text-white">
      <div class="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-2 font-mono text-xs lg:px-6">
        <p class="uppercase tracking-widest text-white/75">RAG eval · live</p>
        <p>nDCG <span class="font-bold text-white">0.74</span></p>
        <p>Recall@5 <span class="font-bold text-accent">0.81</span></p>
        <p>Latency p95 <span class="font-bold text-secondary">380ms</span></p>
      </div>
    </div>
    <div class="border-b border-base-300 bg-base-100">
      <div class="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-4 lg:px-6 sm:flex-row sm:items-center">
        <RouterLink to="/" class="flex items-center gap-2 font-display text-lg font-bold tracking-tight">
          <span class="rageval-metric-pulse size-2 bg-primary" aria-hidden="true" />
          {{ appConfig.name }}
        </RouterLink>
        <nav aria-label="Primary" class="flex flex-wrap gap-0 sm:ml-6">
          <RouterLink
            v-for="item in navigation"
            :key="item.to"
            :to="item.to"
            class="border border-transparent px-3 py-2 text-sm font-medium text-base-content/70 hover:bg-base-200"
            exact-active-class="border-primary bg-primary/10 font-semibold text-primary"
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