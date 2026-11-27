<route lang="json">
{
  "meta": { "title": "Lineage" }
}
</route>

<script setup lang="ts">
import profile from '../../mock/profile.json'
import records from '../../mock/records.json'
</script>

<template>
  <div class="space-y-8">
    <header class="lineage-hero-float rounded-box border border-base-300 bg-base-100 p-8 text-center">
      <p class="text-sm font-semibold text-primary">{{ profile.product }}</p>
      <h1 class="mt-2 font-display text-3xl font-bold">{{ profile.workspace }}</h1>
      <p class="mx-auto mt-2 max-w-xl text-base-content/70">{{ profile.summary }}</p>
    </header>
    <ul class="space-y-4">
      <li
        v-for="item in records"
        :key="item.id"
        class="lineage-graph-node flex flex-col gap-3 rounded-box p-5 sm:flex-row sm:items-center sm:justify-between"
      >
        <div>
          <p class="font-mono text-xs text-accent">{{ item.id }}</p>
          <h2 class="mt-1 font-display font-bold">{{ item.title }}</h2>
          <p class="mt-1 text-sm text-base-content/60">{{ item.owner }} · {{ item.updated }}</p>
        </div>
        <div class="flex items-center gap-3">
          <span class="font-bold text-secondary">{{ item.score }}</span>
          <span class="badge rounded-box" :class="'badge-' + item.tone">{{ item.status }}</span>
        </div>
      </li>
    </ul>
  </div>
</template>