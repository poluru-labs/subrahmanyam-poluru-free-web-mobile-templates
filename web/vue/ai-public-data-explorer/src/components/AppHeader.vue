<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { appConfig } from '@/config/env'
import { navigation } from '@/config/navigation'
import ThemeSelect from '@/components/ThemeSelect.vue'
</script>

<template>
  <header class="border-b border-base-300 bg-base-100">
    <div class="pdata-header-rail border-b border-base-300/80">
      <ol class="mx-auto flex max-w-5xl gap-2 overflow-x-auto px-4 py-2 text-[10px] font-semibold uppercase tracking-widest lg:px-8" aria-label="Publish steps">
        <li class="rounded-box bg-primary/15 px-2 py-1 text-primary">Ingest</li>
        <li class="text-base-content/40">→</li>
        <li class="rounded-box bg-secondary/15 px-2 py-1 text-secondary">Describe</li>
        <li class="text-base-content/40">→</li>
        <li class="rounded-box px-2 py-1 text-accent">Publish</li>
      </ol>
    </div>
    <div class="mx-auto flex max-w-5xl flex-col gap-3 px-4 py-4 lg:px-8 sm:flex-row sm:items-center">
      <RouterLink to="/" class="flex items-center gap-2 font-display text-lg font-bold tracking-tight text-primary">
        <span class="size-2.5 rounded-full bg-secondary" aria-hidden="true" />
        {{ appConfig.name }}
      </RouterLink>
      <nav aria-label="Primary" class="flex flex-wrap gap-1 sm:ml-4">
        <RouterLink
          v-for="item in navigation"
          :key="item.to"
          :to="item.to"
          class="rounded-box px-3 py-2 text-sm font-medium text-base-content/70 hover:bg-primary/10"
          exact-active-class="bg-secondary/15 text-secondary font-semibold"
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