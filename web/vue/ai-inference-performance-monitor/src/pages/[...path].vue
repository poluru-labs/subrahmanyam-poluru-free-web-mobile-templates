<route lang="json">
{
  "meta": { "title": "Page not found" }
}
</route>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { appConfig } from '@/config/env'
</script>

<template>
  <section class="mx-auto max-w-xl py-12 text-center">
    <p class="text-sm font-medium tracking-wide text-primary uppercase">404</p>
    <h1 class="mt-2 text-3xl font-bold">Page not found</h1>
    <p class="mt-3 text-base-content/70">This URL is not part of {{ appConfig.name }}.</p>
    <RouterLink to="/" class="btn btn-primary mt-6">Back home</RouterLink>
  </section>
</template>
