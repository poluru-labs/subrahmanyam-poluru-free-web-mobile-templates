<route lang="json">
{
  "meta": { "title": "Catalog" }
}
</route>

<script setup lang="ts">
import profile from '../../mock/profile.json'
import records from '../../mock/records.json'
</script>

<template>
  <div class="space-y-8">
    <header class="rounded-box border border-base-300 bg-base-100 p-6 lg:p-8">
      <p class="text-xs font-semibold uppercase tracking-widest text-primary">{{ profile.product }}</p>
      <h1 class="mt-2 text-3xl font-bold">{{ profile.workspace }}</h1>
      <p class="mt-2 max-w-2xl text-base-content/70">{{ profile.summary }}</p>
    </header>

    <div class="rounded-box border border-base-300 bg-base-100 p-6 lg:p-8">
      <ol class="space-y-0">
        <li v-for="(item, index) in records" :key="item.id" class="flex gap-5 border-b border-base-300 py-5 last:border-b-0">
          <div class="flex w-10 shrink-0 flex-col items-center">
            <span class="pdata-step-dot text-xs">{{ index + 1 }}</span>
          </div>
          <div class="min-w-0 flex-1 sm:flex sm:items-center sm:justify-between sm:gap-4">
            <div>
              <p class="font-mono text-xs text-secondary">{{ item.id }}</p>
              <p class="font-display font-semibold">{{ item.title }}</p>
              <p class="text-sm text-base-content/60">{{ item.owner }}</p>
            </div>
            <div class="mt-3 flex flex-wrap items-center gap-3 text-sm sm:mt-0 sm:justify-end">
              <span class="font-display font-bold text-primary">{{ item.score }}</span>
              <span class="badge rounded-box" :class="'badge-' + item.tone">{{ item.status }}</span>
              <span class="text-base-content/50">{{ item.updated }}</span>
            </div>
          </div>
        </li>
      </ol>
    </div>
  </div>
</template>