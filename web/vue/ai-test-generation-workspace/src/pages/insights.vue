<route lang="json">
{
  "meta": { "title": "Suites" }
}
</route>

<script setup lang="ts">
import profile from '../../mock/profile.json'
import records from '../../mock/records.json'
</script>

<template>
  <div class="lg:flex lg:gap-6">
    <aside class="tgw-gen-rail mb-6 hidden w-48 shrink-0 rounded-field p-5 text-sm text-white lg:block">
      <p class="text-xs uppercase text-white/55">Filter</p>
      <ul class="mt-4 space-y-2">
        <li class="font-semibold">All suites</li>
        <li class="text-white/70">Draft</li>
        <li class="text-white/70">Accepted</li>
      </ul>
    </aside>
    <div class="min-w-0 flex-1 space-y-6">
      <header class="tgw-suite-panel rounded-field border border-base-300 bg-base-100 p-6">
        <p class="text-sm font-medium text-primary">{{ profile.product }}</p>
        <h1 class="mt-2 font-display text-3xl font-bold">{{ profile.workspace }}</h1>
        <p class="mt-2 text-base-content/70">{{ profile.summary }}</p>
      </header>
      <div class="grid gap-4 md:grid-cols-2">
        <article v-for="item in records" :key="item.id" class="rounded-field border border-base-300 bg-base-100 p-5">
          <div class="flex justify-between gap-2">
            <p class="font-mono text-xs text-accent">{{ item.id }}</p>
            <span class="badge rounded-field badge-sm" :class="'badge-' + item.tone">{{ item.status }}</span>
          </div>
          <h2 class="mt-2 font-semibold">{{ item.title }}</h2>
          <p class="mt-2 text-sm text-base-content/65">{{ item.owner }} · {{ item.score }} · {{ item.updated }}</p>
        </article>
      </div>
    </div>
  </div>
</template>