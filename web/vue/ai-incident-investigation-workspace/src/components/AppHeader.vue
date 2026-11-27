<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { appConfig } from '@/config/env'
import { navigation } from '@/config/navigation'
import ThemeSelect from '@/components/ThemeSelect.vue'
</script>

<template>
  <header class="inc-header-band text-white shadow-md">
    <div class="mx-auto flex w-full max-w-6xl flex-col gap-3 px-4 py-4 lg:px-6 sm:flex-row sm:items-center">
      <RouterLink to="/" class="font-display text-lg font-bold tracking-tight">{{ appConfig.name }}</RouterLink>
      <nav aria-label="Primary" class="flex flex-wrap gap-1 sm:ml-5">
        <RouterLink
          v-for="item in navigation"
          :key="item.to"
          :to="item.to"
          class="rounded-field px-3 py-2 text-sm font-medium text-white/85 hover:bg-white/15"
          exact-active-class="bg-white/25 font-semibold text-white"
        >
          {{ item.label }}
        </RouterLink>
      </nav>
      <div class="sm:ml-auto"><ThemeSelect /></div>
    </div>
  </header>
</template>
