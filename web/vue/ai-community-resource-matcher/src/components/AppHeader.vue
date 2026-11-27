<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { appConfig } from '@/config/env'
import { navigation } from '@/config/navigation'
import ThemeSelect from '@/components/ThemeSelect.vue'
</script>

<template>
  <header class="bg-base-100">
    <div class="mx-auto max-w-6xl px-4 py-4">
      <div class="flex flex-wrap items-center justify-between gap-3">
        <RouterLink to="/" class="text-xl font-bold text-primary">{{ appConfig.name }}</RouterLink>
        <ThemeSelect />
      </div>
      <nav aria-label="Primary" class="mt-3 flex flex-wrap gap-2">
        <RouterLink v-for="item in navigation" :key="item.to" :to="item.to"
          class="rounded-box border border-base-300 px-3 py-1.5 text-sm"
          exact-active-class="border-primary bg-primary/10 text-primary font-semibold">{{ item.label }}</RouterLink>
      </nav>
    </div>
  </header>
</template>
