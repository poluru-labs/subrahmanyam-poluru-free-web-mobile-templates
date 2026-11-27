<route lang="json">
{
  "meta": { "title": "Queries" }
}
</route>

<script setup lang="ts">
import profile from '../../mock/profile.json'
import records from '../../mock/records.json'
</script>

<template>
  <div class="space-y-6">
    <header class="rqual-story-tick rounded-box border border-base-300 bg-base-100 p-6">
      <h1 class="text-3xl font-bold">{{ profile.workspace }}</h1>
      <p class="mt-2 text-base-content/70">{{ profile.summary }}</p>
    </header>

    <section class="space-y-0">
      <article
        v-for="(item, index) in records"
        :key="item.id"
        class="flex flex-col gap-4 border-b border-base-300 p-6 sm:flex-row sm:items-center sm:justify-between"
        :class="index % 2 === 0 ? 'rqual-zig-primary' : 'rqual-zig-secondary'"
      >
        <div>
          <p class="font-mono text-xs text-primary">{{ item.id }}</p>
          <p class="font-display font-semibold">{{ item.title }}</p>
          <p class="text-sm text-base-content/60">{{ item.owner }}</p>
        </div>
        <div class="flex flex-wrap gap-3 text-sm">
          <span class="font-bold text-accent">{{ item.score }}</span>
          <span class="badge rounded-box" :class="'badge-' + item.tone">{{ item.status }}</span>
          <span class="text-base-content/50">{{ item.updated }}</span>
        </div>
      </article>
    </section>
  </div>
</template>