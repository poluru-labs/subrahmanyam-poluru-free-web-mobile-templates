<route lang="json">
{
  "meta": { "title": "Critiques" }
}
</route>

<script setup lang="ts">
import profile from '../../mock/profile.json'
import records from '../../mock/records.json'
</script>

<template>
  <div class="space-y-6">
    <header class="max-w-3xl">
      <p class="text-sm font-medium text-primary">{{ profile.product }}</p>
      <h1 class="mt-2 font-display text-3xl font-bold">{{ profile.workspace }}</h1>
      <p class="mt-2 text-base-content/70">{{ profile.summary }}</p>
    </header>
    <div class="grid gap-0 overflow-hidden rounded-box border border-base-300 lg:grid-cols-2">
      <article v-for="(item, index) in records" :key="item.id" class="idr-critique border-b border-base-300 p-5 last:border-b-0" :class="index % 2 === 0 ? 'idr-canvas' : ''">
        <p class="font-mono text-xs text-secondary">{{ item.id }}</p>
        <h2 class="mt-2 font-display text-lg font-bold">{{ item.title }}</h2>
        <p class="mt-2 text-sm text-base-content/65">{{ item.owner }} · {{ item.updated }}</p>
        <span class="badge mt-3 rounded-field" :class="'badge-' + item.tone">{{ item.status }}</span>
      </article>
    </div>
  </div>
</template>
