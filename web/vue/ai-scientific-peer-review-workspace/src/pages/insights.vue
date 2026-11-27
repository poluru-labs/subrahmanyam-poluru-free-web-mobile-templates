<route lang="json">
{
  "meta": { "title": "Reviews" }
}
</route>

<script setup lang="ts">
import profile from '../../mock/profile.json'
import records from '../../mock/records.json'
</script>

<template>
  <div class="space-y-6">
    <header class="rounded-box border border-base-300 bg-base-100 p-6">
      <h1 class="text-3xl font-bold">{{ profile.workspace }}</h1>
      <p class="mt-2 text-base-content/70">{{ profile.summary }}</p>
    </header>

    <div class="space-y-4">
      <article
        v-for="item in records"
        :key="item.id"
        class="grid gap-4 rounded-box border border-base-300 bg-base-100 lg:grid-cols-2"
      >
        <div class="sreview-studio-ms p-5">
          <p class="text-xs uppercase text-primary">Manuscript</p>
          <p class="font-mono text-xs">{{ item.id }}</p>
          <p class="mt-2 font-display font-bold">{{ item.title }}</p>
          <p class="text-sm text-base-content/60">{{ item.owner }}</p>
        </div>
        <div class="sreview-studio-review border-t border-base-300 p-5 lg:border-t-0 lg:border-l">
          <p class="text-xs uppercase text-secondary">Review</p>
          <p class="mt-2 font-display text-xl font-bold text-accent">{{ item.score }}</p>
          <span class="badge mt-2 rounded-box" :class="'badge-' + item.tone">{{ item.status }}</span>
          <p class="mt-2 text-sm text-base-content/55">{{ item.updated }}</p>
        </div>
      </article>
    </div>
  </div>
</template>