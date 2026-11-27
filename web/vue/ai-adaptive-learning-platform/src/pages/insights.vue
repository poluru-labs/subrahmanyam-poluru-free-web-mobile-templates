<route lang="json">
{
  "meta": { "title": "Paths" }
}
</route>

<script setup lang="ts">
import profile from '../../mock/profile.json'
import records from '../../mock/records.json'
</script>

<template>
  <div class="space-y-8">
    <header class="learn-hero-float rounded-box border border-base-300 bg-base-100 px-6 py-8 text-center sm:px-10">
      <p class="text-xs font-semibold uppercase tracking-wide text-secondary">{{ profile.product }}</p>
      <h1 class="mt-2 font-display text-4xl font-bold">{{ profile.workspace }}</h1>
      <p class="mx-auto mt-3 max-w-lg text-base-content/70">{{ profile.summary }}</p>
    </header>

    <div class="grid gap-4">
      <article
        v-for="item in records"
        :key="item.id"
        class="flex flex-col gap-4 rounded-box border border-base-300 bg-base-100 p-5 shadow-sm transition-shadow hover:shadow-md sm:flex-row sm:items-center sm:justify-between"
      >
        <div>
          <p class="font-mono text-xs text-primary">{{ item.id }}</p>
          <h2 class="mt-1 font-display text-lg font-bold">{{ item.title }}</h2>
          <p class="mt-1 text-sm text-base-content/60">{{ item.owner }} · Updated {{ item.updated }}</p>
        </div>
        <div class="flex flex-wrap items-center gap-3 sm:justify-end">
          <span class="rounded-field bg-base-200 px-3 py-1 font-display text-sm font-bold">{{ item.score }}</span>
          <span class="badge" :class="'badge-' + item.tone">{{ item.status }}</span>
        </div>
      </article>
    </div>
  </div>
</template>