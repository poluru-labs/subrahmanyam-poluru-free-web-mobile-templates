<script setup lang="ts">
defineProps<{
  title: string
  summary: string
}>()
</script>

<template>
  <header class="mb-8 max-w-3xl">
    <h1 class="text-3xl font-bold tracking-tight">{{ title }}</h1>
    <p class="mt-2 text-base-content/70">{{ summary }}</p>
  </header>
</template>
