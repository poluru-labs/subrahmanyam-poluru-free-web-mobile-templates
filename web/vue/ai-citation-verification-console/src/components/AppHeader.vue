<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { appConfig } from '@/config/env'
import { navigation } from '@/config/navigation'
import ThemeSelect from '@/components/ThemeSelect.vue'
</script>

<template>
  <header class="bg-base-100 shadow-sm">
    <div class="mx-auto flex max-w-5xl flex-col items-center gap-4 px-4 py-6 text-center">
      <RouterLink to="/" class="font-display text-2xl font-bold text-primary">{{ appConfig.name }}</RouterLink>
      <nav aria-label="Primary" class="inline-flex flex-wrap justify-center gap-2 rounded-box bg-base-200 p-2">
        <RouterLink v-for="item in navigation" :key="item.to" :to="item.to"
          class="rounded-box px-4 py-2 text-sm"
          exact-active-class="bg-primary text-primary-content shadow">{{ item.label }}</RouterLink>
      </nav>
      <ThemeSelect />
    </div>
  </header>
</template>
