<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { appConfig } from '@/config/env'
import { navigation } from '@/config/navigation'
import ThemeSelect from '@/components/ThemeSelect.vue'
</script>

<template>
  <header class="aq-masthead border-b border-white/10 text-white">
    <div class="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-5 lg:px-8 sm:flex-row sm:items-center">
      <RouterLink to="/" class="font-display text-xl font-bold tracking-tight">{{ appConfig.name }}</RouterLink>
      <nav aria-label="Primary" class="flex flex-wrap gap-2 sm:ml-6">
        <RouterLink v-for="item in navigation" :key="item.to" :to="item.to"
          class="rounded-box px-3 py-2 text-sm font-medium text-white/75 hover:bg-white/10"
          exact-active-class="bg-white/15 text-white font-semibold">{{ item.label }}</RouterLink>
      </nav>
      <div class="sm:ml-auto"><ThemeSelect /></div>
    </div>
  </header>
</template>
