<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { appConfig } from '@/config/env'
import { navigation } from '@/config/navigation'
import ThemeSelect from '@/components/ThemeSelect.vue'
</script>

<template>
  <header class="border-b border-base-300/80 bg-base-100/80 backdrop-blur-md">
    <div class="mx-auto flex w-full max-w-5xl flex-col items-center gap-4 px-4 py-5">
      <div class="flex w-full flex-col items-center gap-4 sm:flex-row sm:justify-between">
        <RouterLink to="/" class="text-center font-display text-xl font-bold tracking-tight text-primary sm:text-left">
          {{ appConfig.name }}
        </RouterLink>
        <ThemeSelect />
      </div>
      <nav
        aria-label="Primary"
        class="inline-flex flex-wrap items-center justify-center gap-1 rounded-box border border-base-300 bg-base-100 p-1 shadow-sm"
      >
        <RouterLink
          v-for="item in navigation"
          :key="item.to"
          :to="item.to"
          class="rounded-field px-4 py-2 text-sm font-medium text-base-content/70 transition-colors hover:bg-base-200 hover:text-base-content"
          exact-active-class="bg-primary text-primary-content shadow-sm"
        >
          {{ item.label }}
        </RouterLink>
      </nav>
    </div>
  </header>
</template>