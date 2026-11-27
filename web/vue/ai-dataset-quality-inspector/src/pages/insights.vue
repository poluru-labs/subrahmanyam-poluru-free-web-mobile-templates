<route lang="json">
{
  "meta": { "title": "Datasets" }
}
</route>

<script setup lang="ts">
import profile from '../../mock/profile.json'
import records from '../../mock/records.json'
</script>

<template>
  <div class="space-y-6">
    <header class="dqi-gold-band px-6 py-8 text-white">
      <p class="text-sm font-semibold text-white/80">{{ profile.product }}</p>
      <h1 class="mt-1 font-display text-3xl font-bold">{{ profile.workspace }}</h1>
      <p class="mt-2 max-w-xl text-white/85">{{ profile.summary }}</p>
    </header>
    <ul class="divide-y divide-base-300 border border-base-300 bg-base-100">
      <li
        v-for="item in records"
        :key="item.id"
        class="grid gap-2 px-5 py-4 sm:grid-cols-[7rem_minmax(0,1fr)_auto] sm:items-center"
      >
        <p class="font-mono text-xs text-primary">{{ item.id }}</p>
        <div>
          <p class="font-medium">{{ item.title }}</p>
          <p class="text-sm text-base-content/60">{{ item.owner }} · {{ item.updated }}</p>
        </div>
        <span class="font-display font-bold text-secondary">{{ item.score }}</span>
      </li>
    </ul>
  </div>
</template>