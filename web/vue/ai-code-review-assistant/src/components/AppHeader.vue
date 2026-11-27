<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { appConfig } from '@/config/env'
import { navigation } from '@/config/navigation'
import ThemeSelect from '@/components/ThemeSelect.vue'
</script>

<template>
  <header class="border-b border-base-300 bg-base-100 lg:pl-56">
    <div class="mx-auto flex max-w-7xl flex-wrap items-center gap-3 px-4 py-3">
      <RouterLink to="/" class="font-display font-bold text-primary">{{ appConfig.name }}</RouterLink>
      <nav aria-label="Primary" class="flex flex-wrap gap-1">
        <RouterLink v-for="item in navigation" :key="item.to" :to="item.to"
          class="rounded-field px-3 py-2 text-sm"
          exact-active-class="bg-primary/10 text-primary font-semibold">{{ item.label }}</RouterLink>
      </nav>
      <div class="sm:ml-auto"><ThemeSelect /></div>
    </div>
  </header>
</template>
