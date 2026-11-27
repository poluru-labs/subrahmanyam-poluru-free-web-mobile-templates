<route lang="json">
{
  "meta": { "title": "Studies" }
}
</route>

<script setup lang="ts">
import profile from '../../mock/profile.json'
import records from '../../mock/records.json'
</script>

<template>
  <div class="space-y-6">
    <header class="srm-mag-hero rounded-box p-6 text-white">
      <p class="text-sm text-white/75">{{ profile.product }}</p>
      <h1 class="mt-2 font-display text-3xl font-bold">{{ profile.workspace }}</h1>
      <p class="mt-2 max-w-2xl text-white/85">{{ profile.summary }}</p>
    </header>
    <div class="grid gap-0 md:grid-cols-2">
      <article v-for="item in records" :key="item.id" class="srm-screen-tile border border-base-300 bg-base-100 p-5">
        <div class="flex justify-between gap-3">
          <p class="font-mono text-xs text-accent">{{ item.id }}</p>
          <span class="badge rounded-box badge-sm" :class="'badge-' + item.tone">{{ item.status }}</span>
        </div>
        <h2 class="mt-2 font-display text-xl font-bold">{{ item.title }}</h2>
        <p class="mt-2 text-sm text-base-content/65">{{ item.owner }} · score {{ item.score }} · {{ item.updated }}</p>
      </article>
    </div>
  </div>
</template>