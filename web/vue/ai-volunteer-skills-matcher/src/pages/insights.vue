<route lang="json">
{
  "meta": { "title": "Shifts" }
}
</route>

<script setup lang="ts">
import profile from '../../mock/profile.json'
import records from '../../mock/records.json'
</script>

<template>
  <div class="space-y-6">
    <header class="vsm-mosaic-a border-2 border-primary p-6">
      <p class="text-sm font-medium text-primary">{{ profile.product }}</p>
      <h1 class="mt-2 font-display text-3xl font-bold">{{ profile.workspace }}</h1>
      <p class="mt-2 text-base-content/70">{{ profile.summary }}</p>
    </header>
    <div class="grid gap-0 sm:grid-cols-2">
      <article v-for="item in records" :key="item.id" class="border-2 border-base-300 bg-base-100 p-5">
        <div class="flex justify-between gap-2">
          <p class="font-mono text-xs text-accent">{{ item.id }}</p>
          <span class="badge border-0 badge-sm" :class="'badge-' + item.tone">{{ item.status }}</span>
        </div>
        <h2 class="mt-2 font-semibold">{{ item.title }}</h2>
        <p class="mt-2 text-sm text-base-content/65">{{ item.owner }} · {{ item.score }} · {{ item.updated }}</p>
      </article>
    </div>
  </div>
</template>