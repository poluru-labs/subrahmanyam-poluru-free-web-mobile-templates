<route lang="json">
{
  "meta": { "title": "Traces" }
}
</route>

<script setup lang="ts">
import profile from '../../mock/profile.json'
import records from '../../mock/records.json'
</script>

<template>
  <div class="space-y-6">
    <header class="rounded-box border border-base-300 bg-base-100 p-6 lg:p-8">
      <p class="font-mono text-xs uppercase tracking-widest text-primary">{{ profile.product }}</p>
      <h1 class="mt-2 text-3xl font-bold">{{ profile.workspace }}</h1>
      <p class="mt-2 max-w-2xl text-base-content/70">{{ profile.summary }}</p>
    </header>

    <div class="overflow-hidden rounded-box border border-base-300 bg-base-100">
      <div
        v-for="item in records"
        :key="item.id"
        class="ops-row-strip flex flex-col gap-3 border-b border-base-300 px-5 py-4 last:border-b-0 sm:flex-row sm:items-center sm:justify-between"
      >
        <div class="flex min-w-0 items-center gap-3">
          <span class="ops-timeline-dot size-2 shrink-0 rounded-full" aria-hidden="true" />
          <div>
            <p class="font-mono text-xs text-secondary">{{ item.id }}</p>
            <p class="font-medium">{{ item.title }}</p>
          </div>
        </div>
        <div class="flex flex-wrap items-center gap-4 text-sm sm:justify-end">
          <span>{{ item.owner }}</span>
          <span class="font-display font-bold">{{ item.score }}</span>
          <span class="badge rounded-box" :class="'badge-' + item.tone">{{ item.status }}</span>
          <span class="text-base-content/50">{{ item.updated }}</span>
        </div>
      </div>
    </div>
  </div>
</template>