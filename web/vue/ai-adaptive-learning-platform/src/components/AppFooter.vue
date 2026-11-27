<script setup lang="ts">
import { appConfig } from '@/config/env'
</script>

<template>
  <footer class="mt-auto border-t border-base-300 bg-base-100/90">
    <div class="mx-auto flex w-full max-w-5xl flex-col gap-2 px-4 py-6 text-center text-sm text-base-content/70 sm:flex-row sm:items-center sm:justify-between sm:text-left">
      <p>{{ appConfig.name }}</p>
      <p>
        By
        <a class="link link-hover font-semibold text-primary" href="https://polurus.com" target="_blank" rel="noreferrer"
          >Subrahmanyam Poluru</a
        >
      </p>
    </div>
  </footer>
</template>