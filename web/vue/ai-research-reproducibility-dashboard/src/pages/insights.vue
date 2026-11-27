<route lang="json">
{
  "meta": { "title": "Runs" }
}
</route>

<script setup lang="ts">
import profile from '../../mock/profile.json'
import records from '../../mock/records.json'
</script>

<template>
  <div class="space-y-6">
    <header class="repro-mosaic-a rounded-box border border-primary p-8">
      <p class="text-xs uppercase tracking-widest text-accent">{{ profile.product }}</p>
      <h1 class="mt-2 text-3xl font-bold">{{ profile.workspace }}</h1>
      <p class="mt-2 max-w-2xl text-base-content/75">{{ profile.summary }}</p>
    </header>

    <div class="grid gap-0 sm:grid-cols-2 lg:grid-cols-3">
      <article
        v-for="(item, index) in records"
        :key="item.id"
        class="border border-base-300 bg-base-100 p-5"
        :class="index % 3 === 0 ? 'repro-mosaic-a border-primary' : 'repro-mosaic-b'"
      >
        <p class="font-mono text-xs text-primary">{{ item.id }}</p>
        <p class="mt-2 font-display font-bold">{{ item.title }}</p>
        <p class="mt-2 text-sm text-base-content/60">{{ item.owner }}</p>
        <div class="mt-3 flex flex-wrap gap-2 text-sm">
          <span class="font-bold text-accent">{{ item.score }}</span>
          <span class="badge rounded-box" :class="'badge-' + item.tone">{{ item.status }}</span>
          <span class="text-base-content/50">{{ item.updated }}</span>
        </div>
      </article>
    </div>
  </div>
</template>