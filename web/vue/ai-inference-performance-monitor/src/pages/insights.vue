<route lang="json">
{
  "meta": { "title": "Latency" }
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
    <ul class="space-y-3">
      <li v-for="item in records" :key="item.id" class="rounded-box border border-base-300 bg-base-100 p-4">
        <div class="flex flex-wrap items-center justify-between gap-3">
          <div class="min-w-[12rem] flex-1">
            <h2 class="font-semibold">{{ item.title }}</h2>
            <p class="text-xs text-base-content/55">{{ item.id }} · {{ item.owner }}</p>
          </div>
          <span class="font-mono text-sm text-primary">{{ item.score }}ms</span>
          <span class="badge rounded-box" :class="'badge-' + item.tone">{{ item.status }}</span>
        </div>
        <div class="mt-3 h-2 overflow-hidden rounded-box bg-base-300">
          <div class="inf-latency-bar h-full rounded-box" :style="{ width: item.score + '%' }" />
        </div>
      </li>
    </ul>
  </div>
</template>
