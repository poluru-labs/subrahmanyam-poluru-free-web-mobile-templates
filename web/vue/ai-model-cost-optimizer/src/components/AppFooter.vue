<script setup lang="ts">
import { appConfig } from '@/config/env'
</script>

<template>
  <footer class="mt-auto border-t border-base-300 bg-base-100">
    <div class="mx-auto flex w-full max-w-6xl flex-col gap-2 px-4 py-6 text-sm text-base-content/70 lg:px-6 sm:flex-row sm:items-center sm:justify-between">
      <p class="font-medium text-base-content">{{ appConfig.name }} · Slate spend ops grid</p>
      <p>
        By
        <a class="link link-hover font-semibold text-primary" href="https://polurus.com" target="_blank" rel="noreferrer">Subrahmanyam Poluru</a>
      </p>
    </div>
  </footer>
</template>
