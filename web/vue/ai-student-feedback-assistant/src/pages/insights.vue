<route lang="json">
{
  "meta": { "title": "Notes" }
}
</route>

<script setup lang="ts">
import profile from '../../mock/profile.json'
import records from '../../mock/records.json'
</script>

<template>
  <div class="space-y-0 border border-base-300 bg-base-100">
    <header class="sfeed-band px-6 py-8 text-white">
      <h1 class="text-3xl font-bold">{{ profile.workspace }}</h1>
      <p class="mt-2 max-w-2xl text-white/85">{{ profile.summary }}</p>
    </header>

    <div
      v-for="(item, index) in records"
      :key="item.id"
      class="flex flex-col gap-3 border-b border-base-300 px-5 py-4 last:border-b-0 sm:flex-row sm:items-center sm:justify-between"
      :class="index % 2 === 0 ? 'sfeed-row-strip bg-primary/5' : ''"
    >
      <div>
        <p class="font-mono text-xs text-secondary">{{ item.id }}</p>
        <p class="font-display font-semibold">{{ item.title }}</p>
        <p class="text-sm text-base-content/60">{{ item.owner }}</p>
      </div>
      <div class="flex flex-wrap gap-3 text-sm">
        <span class="font-bold text-primary">{{ item.score }}</span>
        <span class="badge border-0" :class="'badge-' + item.tone">{{ item.status }}</span>
        <span class="text-base-content/50">{{ item.updated }}</span>
      </div>
    </div>
  </div>
</template>