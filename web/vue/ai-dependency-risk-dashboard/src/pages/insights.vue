<route lang="json">
{
  "meta": { "title": "Risks" }
}
</route>

<script setup lang="ts">
import profile from '../../mock/profile.json'
import records from '../../mock/records.json'
</script>

<template>
  <div class="space-y-6">
    <header class="risk-masthead rounded-box p-8 text-white">
      <p class="text-sm font-semibold text-white/80">{{ profile.product }}</p>
      <h1 class="mt-1 text-3xl font-bold">{{ profile.workspace }}</h1>
      <p class="mt-2 max-w-2xl text-white/85">{{ profile.summary }}</p>
    </header>
    <div class="grid gap-4 lg:grid-cols-3">
      <article
        v-for="item in records"
        :key="item.id"
        class="risk-col-divider rounded-box border border-base-300 bg-base-100 p-5"
      >
        <p class="font-mono text-xs text-accent">{{ item.id }}</p>
        <h2 class="mt-1 font-display font-bold">{{ item.title }}</h2>
        <p class="mt-2 text-sm text-base-content/60">{{ item.owner }} · {{ item.updated }}</p>
        <div class="mt-3 flex justify-between">
          <span class="font-bold">{{ item.score }}</span>
          <span class="badge rounded-field" :class="'badge-' + item.tone">{{ item.status }}</span>
        </div>
      </article>
    </div>
  </div>
</template>