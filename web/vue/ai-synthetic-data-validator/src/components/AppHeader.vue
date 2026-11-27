<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { appConfig } from '@/config/env'
import { navigation } from '@/config/navigation'
import ThemeSelect from '@/components/ThemeSelect.vue'
</script>

<template>
  <header class="sdv-masthead border-b border-white/10 text-white">
    <div class="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-4 sm:flex-row sm:items-center lg:px-6">
      <RouterLink to="/" class="font-display text-lg font-bold tracking-tight text-white hover:text-white/90">
        {{ appConfig.name }}
      </RouterLink>
      <nav aria-label="Primary" class="flex flex-wrap gap-2 sm:ml-6">
        <RouterLink
          v-for="item in navigation"
          :key="item.to"
          :to="item.to"
          class="rounded-box border border-white/25 px-3 py-2 text-sm text-white/90 hover:border-secondary hover:bg-secondary/15"
          exact-active-class="border-secondary bg-white/15 font-semibold text-white"
        >
          {{ item.label }}
        </RouterLink>
      </nav>
      <div class="sm:ml-auto"><ThemeSelect /></div>
    </div>
  </header>
</template>