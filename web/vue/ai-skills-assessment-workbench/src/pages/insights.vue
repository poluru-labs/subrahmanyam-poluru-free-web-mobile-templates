<route lang="json">
{
  "meta": { "title": "Skills" }
}
</route>

<script setup lang="ts">
import profile from '../../mock/profile.json'
import records from '../../mock/records.json'
</script>

<template>
  <div class="space-y-6">
    <header class="skill-hero-float rounded-box border border-base-300 bg-base-100 p-8 text-center">
      <p class="text-xs uppercase text-primary">{{ profile.product }}</p>
      <h1 class="mt-2 text-3xl font-bold">{{ profile.workspace }}</h1>
      <p class="mx-auto mt-2 max-w-xl text-base-content/70">{{ profile.summary }}</p>
    </header>

    <div class="overflow-hidden rounded-box border border-base-300 bg-base-100">
      <div
        v-for="item in records"
        :key="item.id"
        class="flex flex-col gap-3 border-b border-base-300 px-5 py-4 last:border-b-0 sm:flex-row sm:items-center sm:justify-between"
      >
        <div>
          <p class="font-mono text-xs text-secondary">{{ item.id }}</p>
          <p class="font-display font-semibold">{{ item.title }}</p>
          <p class="text-sm text-base-content/60">{{ item.owner }}</p>
        </div>
        <div class="flex flex-wrap gap-3 text-sm">
          <span class="rounded-box bg-primary/10 px-3 py-1 font-display font-bold text-primary">{{ item.score }}</span>
          <span class="badge rounded-box" :class="'badge-' + item.tone">{{ item.status }}</span>
          <span class="text-base-content/50">{{ item.updated }}</span>
        </div>
      </div>
    </div>
  </div>
</template>