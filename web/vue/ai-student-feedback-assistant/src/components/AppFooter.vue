<script setup lang="ts">
import { appConfig } from '@/config/env'
</script>

<template>
  <footer class="mt-auto border-t border-base-300 bg-base-100">
    <div class="mx-auto flex max-w-6xl justify-between px-4 py-6 text-sm lg:px-6">
      <p class="font-mono text-xs uppercase">{{ appConfig.name }}</p>
      <a class="link link-hover font-semibold text-primary" href="https://polurus.com" target="_blank" rel="noreferrer">Subrahmanyam Poluru</a>
    </div>
  </footer>
</template>