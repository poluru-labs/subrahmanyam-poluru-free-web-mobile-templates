<script setup lang="ts">
import { appConfig } from '@/config/env'
</script>

<template>
  <footer class="mt-auto border-t border-base-300 bg-base-100">
    <div class="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-6 text-sm text-base-content/70 sm:flex-row sm:items-center sm:justify-between">
      <p class="font-medium text-base-content">{{ appConfig.name }} · Probe/threat masthead · Chocolate / Royal Blue</p>
      <p>
        By
        <a class="link link-hover font-medium" href="https://polurus.com" target="_blank" rel="noreferrer">Subrahmanyam Poluru</a>
      </p>
    </div>
  </footer>
</template>
