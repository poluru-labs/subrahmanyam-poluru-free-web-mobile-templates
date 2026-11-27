<script setup lang="ts">
import { RouterView } from 'vue-router'
import AppFooter from '@/components/AppFooter.vue'
import AppHeader from '@/components/AppHeader.vue'
</script>

<template>
  <div class="ops-shell flex min-h-screen flex-col font-sans text-base-content">
    <a
      href="#main"
      class="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-50 focus:rounded-box focus:bg-base-100 focus:px-3 focus:py-2"
    >
      Skip to content
    </a>
    <AppHeader />
    <main id="main" class="w-full flex-1">
      <div class="mx-auto max-w-6xl px-4 py-8 lg:px-6">
        <RouterView />
      </div>
    </main>
    <AppFooter />
  </div>
</template>