<route lang="json">
{
  "meta": { "title": "Labs" }
}
</route>

<script setup lang="ts">
import profile from '../../mock/profile.json'
import records from '../../mock/records.json'
</script>

<template>
  <div class="lg:flex lg:gap-6">
    <aside class="rdisc-rail mb-6 hidden w-48 shrink-0 rounded-field p-5 text-white lg:block">
      <p class="text-xs uppercase tracking-widest text-white/60">Labs</p>
      <p class="mt-4 text-sm text-white/80">{{ records.length }} indexed groups</p>
    </aside>
    <div class="min-w-0 flex-1 space-y-6">
      <header class="rdisc-lane rounded-field border border-base-300 bg-base-100 p-6">
        <p class="text-xs font-bold uppercase text-secondary">{{ profile.product }}</p>
        <h1 class="mt-2 text-3xl font-bold">{{ profile.workspace }}</h1>
        <p class="mt-2 text-base-content/70">{{ profile.summary }}</p>
      </header>
      <ul class="rounded-field border border-base-300 bg-base-100">
        <li v-for="item in records" :key="item.id" class="flex flex-col gap-2 border-b border-base-300 px-5 py-4 last:border-b-0 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p class="font-mono text-xs text-primary">{{ item.id }}</p>
            <p class="font-display font-semibold">{{ item.title }}</p>
            <p class="text-sm text-base-content/60">{{ item.owner }}</p>
          </div>
          <div class="flex flex-wrap gap-3 text-sm">
            <span class="font-bold text-secondary">{{ item.score }}</span>
            <span class="badge rounded-field" :class="'badge-' + item.tone">{{ item.status }}</span>
            <span class="text-base-content/50">{{ item.updated }}</span>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>