<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { appConfig } from '@/config/env'
import { navigation } from '@/config/navigation'
import ThemeSelect from '@/components/ThemeSelect.vue'
</script>

<template>
  <header class="border-b-4 border-primary bg-base-100">
    <div class="mx-auto grid max-w-6xl gap-3 px-4 py-4 lg:px-6 sm:grid-cols-[1fr_auto] sm:items-center">
      <div>
        <RouterLink to="/" class="font-display text-2xl font-bold text-primary">{{ appConfig.name }}</RouterLink>
        <p class="text-xs text-base-content/55">Breaking-change radar</p>
      </div>
      <div class="flex flex-wrap items-center gap-2 sm:justify-end">
        <nav aria-label="Primary" class="flex flex-wrap gap-1">
          <RouterLink v-for="item in navigation" :key="item.to" :to="item.to"
            class="rounded-box px-3 py-2 text-sm hover:bg-base-200"
            exact-active-class="bg-secondary/15 text-secondary font-semibold">{{ item.label }}</RouterLink>
        </nav>
        <ThemeSelect />
      </div>
    </div>
  </header>
</template>
