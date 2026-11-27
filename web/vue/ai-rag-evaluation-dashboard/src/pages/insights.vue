<route lang="json">
{
  "meta": { "title": "Retrieval" }
}
</route>

<script setup lang="ts">
import profile from '../../mock/profile.json'
import records from '../../mock/records.json'
</script>

<template>
  <div class="space-y-6">
    <header class="rageval-status-band px-6 py-8 text-white">
      <p class="font-mono text-xs uppercase tracking-widest text-white/70">{{ profile.product }}</p>
      <h1 class="mt-2 text-3xl font-bold">{{ profile.workspace }}</h1>
      <p class="mt-2 max-w-2xl text-white/85">{{ profile.summary }}</p>
    </header>

    <div class="border border-base-300 bg-base-100">
      <div
        v-for="(item, index) in records"
        :key="item.id"
        class="rageval-row-strip flex flex-col gap-3 border-b border-base-300 px-5 py-4 last:border-b-0 sm:flex-row sm:items-center sm:justify-between"
        :class="index % 2 === 0 ? 'bg-primary/5' : ''"
      >
        <div class="min-w-0">
          <p class="font-mono text-xs text-secondary">{{ item.id }}</p>
          <p class="font-medium">{{ item.title }}</p>
          <p class="text-sm text-base-content/55">{{ item.owner }}</p>
        </div>
        <div class="flex flex-wrap items-center gap-4 text-sm">
          <span class="font-display font-bold text-primary">{{ item.score }}</span>
          <span class="badge border-0" :class="'badge-' + item.tone">{{ item.status }}</span>
          <span class="text-base-content/50">{{ item.updated }}</span>
        </div>
      </div>
    </div>
  </div>
</template>