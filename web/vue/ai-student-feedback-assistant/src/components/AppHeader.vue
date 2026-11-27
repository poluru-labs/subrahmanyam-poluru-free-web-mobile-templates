<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { appConfig } from '@/config/env'
import { navigation } from '@/config/navigation'
import ThemeSelect from '@/components/ThemeSelect.vue'
</script>

<template>
  <header>
    <div class="sfeed-band text-white">
      <div class="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-2 px-4 py-2 text-xs lg:px-6">
        <p class="font-mono uppercase tracking-widest">Feedback bands</p>
        <p>Drafts <span class="font-bold">12</span></p>
        <p>Returned <span class="font-bold text-accent">8</span></p>
      </div>
    </div>
    <div class="border-b border-base-300 bg-base-100">
      <div class="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-4 lg:px-6 sm:flex-row sm:items-center">
        <RouterLink to="/" class="font-display text-lg font-bold text-primary">{{ appConfig.name }}</RouterLink>
        <nav aria-label="Primary" class="flex flex-wrap gap-0 sm:ml-6">
          <RouterLink
            v-for="item in navigation"
            :key="item.to"
            :to="item.to"
            class="px-3 py-2 text-sm text-base-content/70 hover:bg-base-200"
            exact-active-class="bg-primary/10 font-semibold text-primary"
          >
            {{ item.label }}
          </RouterLink>
        </nav>
        <div class="sm:ml-auto"><ThemeSelect /></div>
      </div>
    </div>
  </header>
</template>