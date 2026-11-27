<script setup lang="ts">
import { appConfig } from '@/config/env'
</script>

<template>
  <footer class="mt-auto border-t-2 border-primary bg-base-100">
    <div class="mx-auto flex w-full max-w-6xl flex-col gap-2 px-4 py-6 text-sm text-base-content/70 lg:px-6 sm:flex-row sm:items-center sm:justify-between">
      <p class="font-medium">{{ appConfig.name }} · claim mosaic</p>
      <p>
        By
        <a class="font-semibold text-primary hover:underline" href="https://polurus.com" target="_blank" rel="noreferrer">Subrahmanyam Poluru</a>
      </p>
    </div>
  </footer>
</template>