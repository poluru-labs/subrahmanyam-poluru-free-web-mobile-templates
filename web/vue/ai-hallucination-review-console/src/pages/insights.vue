<route lang="json">
{
  "meta": { "title": "Claims" }
}
</route>

<script setup lang="ts">
import profile from '../../mock/profile.json'
import records from '../../mock/records.json'
</script>

<template>
  <div class="space-y-6">
    <header class="claim-mosaic-a border-2 border-primary p-8">
      <p class="text-sm font-semibold text-primary">{{ profile.product }}</p>
      <h1 class="mt-1 font-display text-3xl font-bold">{{ profile.workspace }}</h1>
      <p class="mt-2">{{ profile.summary }}</p>
    </header>
    <div class="grid gap-0 sm:grid-cols-2">
      <article
        v-for="(item, index) in records"
        :key="item.id"
        class="border border-base-300 bg-base-100 p-6"
        :class="index % 3 === 0 ? 'claim-mosaic-b bg-primary/5' : ''"
      >
        <p class="font-mono text-xs text-secondary">{{ item.id }}</p>
        <h2 class="mt-1 font-display font-bold">{{ item.title }}</h2>
        <p class="mt-2 text-sm text-base-content/60">{{ item.owner }} · {{ item.score }} · {{ item.updated }}</p>
        <span class="mt-3 inline-block border-2 border-primary px-2 py-1 text-xs font-bold">{{ item.status }}</span>
      </article>
    </div>
  </div>
</template>