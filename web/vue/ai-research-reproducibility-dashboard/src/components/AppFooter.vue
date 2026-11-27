<script setup lang="ts">
import { appConfig } from '@/config/env'
</script>

<template>
  <footer class="mt-auto border-t border-primary/20 bg-base-100">
    <div class="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-6 text-sm text-base-content/70 lg:px-6 sm:flex-row sm:justify-between">
      <p>{{ appConfig.name }}</p>
      <a class="link link-hover text-primary" href="https://polurus.com" target="_blank" rel="noreferrer">Subrahmanyam Poluru</a>
    </div>
  </footer>
</template>