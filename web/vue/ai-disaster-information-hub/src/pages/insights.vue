<route lang="json">
{
  "meta": { "title": "Alerts" }
}
</route>

<script setup lang="ts">
import profile from '../../mock/profile.json'
import records from '../../mock/records.json'
</script>

<template>
  <div class="space-y-6">
    <header class="alert-mag-hero rounded-box p-8 text-white">
      <p class="text-sm font-semibold text-white/80">{{ profile.product }}</p>
      <h1 class="mt-1 font-display text-3xl font-bold">{{ profile.workspace }}</h1>
      <p class="mt-2 max-w-xl text-white/90">{{ profile.summary }}</p>
    </header>
    <div class="grid gap-4 md:grid-cols-2">
      <article
        v-for="(item, index) in records"
        :key="item.id"
        class="alert-mag-tile rounded-box border border-base-300 bg-base-100 p-6"
        :class="index === 0 ? 'alert-mag-accent md:col-span-2' : ''"
      >
        <p class="font-mono text-xs text-accent">{{ item.id }}</p>
        <h2 class="mt-1 font-display text-xl font-bold">{{ item.title }}</h2>
        <p class="mt-2 text-sm text-base-content/60">{{ item.owner }} · {{ item.updated }}</p>
        <span class="badge mt-3 rounded-box" :class="'badge-' + item.tone">{{ item.status }}</span>
      </article>
    </div>
  </div>
</template>