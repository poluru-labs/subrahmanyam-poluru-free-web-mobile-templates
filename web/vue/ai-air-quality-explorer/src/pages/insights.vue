<route lang="json">
{
  "meta": { "title": "Sensors" }
}
</route>


<script setup lang="ts">
import profile from '../../mock/profile.json'
import records from '../../mock/records.json'
</script>

<template>
  <div class="space-y-6">
        <header class="rounded-box border border-base-300 bg-base-100 p-6"><p class="text-secondary text-sm font-semibold">{{ profile.product }}</p>
      <h1 class="mt-1 text-3xl font-bold">{{ profile.workspace }}</h1><p class="mt-2 text-base-content/70">{{ profile.summary }}</p></header>
    <div class="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <article v-for="item in records" :key="item.id" class="rounded-box border border-base-300 bg-base-100 p-5">
        <p class="font-mono text-xs text-primary">{{ item.id }}</p>
        <h2 class="mt-1 font-display font-bold">{{ item.title }}</h2>
        <p class="mt-2 text-sm text-base-content/60">{{ item.owner }} · {{ item.updated }}</p>
        <div class="mt-3 flex justify-between"><span class="font-bold">{{ item.score }}</span><span class="badge" :class="'badge-' + item.tone">{{ item.status }}</span></div>
      </article>
    </div>
  </div>
</template>
