<route lang="json">
{
  "meta": { "title": "Plans" }
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
    <div class="grid gap-4 lg:grid-cols-3">
      <article v-for="(item, index) in records" :key="item.id" class="lcm-phase-col rounded-box border border-base-300 p-5">
        <p class="text-xs font-bold uppercase text-accent">Column {{ (index % 3) + 1 }}</p>
        <h2 class="mt-2 font-display font-bold">{{ item.title }}</h2>
        <p class="mt-2 text-sm text-base-content/65">{{ item.id }} · {{ item.owner }}</p>
        <span class="badge mt-3 rounded-box" :class="'badge-' + item.tone">{{ item.status }}</span>
      </article>
    </div>
  </div>
</template>
