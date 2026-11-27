<route lang="json">
{
  "meta": { "title": "Districts" }
}
</route>

<script setup lang="ts">
import profile from '../../mock/profile.json'
import records from '../../mock/records.json'
</script>

<template>
  <div class="space-y-6">
    <header class="wui-story-tick rounded-box border border-base-300 bg-base-100 p-6">
      <p class="text-sm font-medium text-primary">{{ profile.product }}</p>
      <h1 class="mt-2 font-display text-3xl font-bold">{{ profile.workspace }}</h1>
      <p class="mt-2 text-base-content/70">{{ profile.summary }}</p>
    </header>
    <div class="space-y-0">
      <article
        v-for="(item, index) in records"
        :key="item.id"
        class="flex flex-col justify-between gap-3 border-b border-base-300 p-5 sm:flex-row sm:items-center"
        :class="index % 2 === 0 ? 'wui-zig-primary' : 'wui-zig-secondary'"
      >
        <div>
          <p class="font-mono text-xs text-accent">{{ item.id }}</p>
          <h2 class="mt-1 font-semibold">{{ item.title }}</h2>
          <p class="mt-1 text-sm text-base-content/65">{{ item.owner }} · {{ item.updated }}</p>
        </div>
        <div class="flex items-center gap-3 sm:text-right">
          <span class="text-sm text-secondary">{{ item.score }}</span>
          <span class="badge rounded-box badge-sm" :class="'badge-' + item.tone">{{ item.status }}</span>
        </div>
      </article>
    </div>
  </div>
</template>