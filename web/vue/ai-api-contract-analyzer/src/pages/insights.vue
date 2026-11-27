<route lang="json">
{
  "meta": { "title": "Contracts" }
}
</route>


<script setup lang="ts">
import profile from '../../mock/profile.json'
import records from '../../mock/records.json'
</script>

<template>
  <div class="space-y-6">
    <header class="mb-8 rounded-box bg-secondary/10 p-6"><p class="text-sm font-semibold text-primary">{{ profile.product }}</p><h1 class="text-3xl font-bold">{{ profile.workspace }}</h1><p class="mt-2">{{ profile.summary }}</p></header>
        <div class="grid gap-4 lg:grid-cols-2">
      <article v-for="item in records" :key="item.id" class="rounded-box border-2 border-base-300 bg-base-100 p-6 hover:border-primary">
        <p class="font-mono text-xs text-accent">{{ item.id }}</p>
        <h2 class="mt-2 font-display text-xl font-bold">{{ item.title }}</h2>
        <p class="mt-2 text-sm">{{ item.owner }} · {{ item.score }} · {{ item.updated }}</p>
        <span class="badge mt-3" :class="'badge-' + item.tone">{{ item.status }}</span>
      </article>
    </div>
  </div>
</template>
