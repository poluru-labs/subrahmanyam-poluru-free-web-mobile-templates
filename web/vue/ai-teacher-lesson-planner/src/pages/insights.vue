<route lang="json">
{
  "meta": { "title": "Lessons" }
}
</route>

<script setup lang="ts">
import profile from '../../mock/profile.json'
import records from '../../mock/records.json'
</script>

<template>
  <div class="space-y-6">
    <header class="rounded-box border border-base-300 bg-base-100 p-6">
      <p class="text-sm font-medium text-secondary">{{ profile.product }}</p>
      <h1 class="mt-2 font-display text-3xl font-bold">{{ profile.workspace }}</h1>
      <p class="mt-2 text-base-content/70">{{ profile.summary }}</p>
    </header>
    <ol class="space-y-4">
      <li v-for="(item, index) in records" :key="item.id" class="flex gap-4">
        <span class="tlp-step-dot mt-2 size-3 shrink-0 rounded-full bg-primary" />
        <article class="flex-1 rounded-box border border-base-300 bg-base-100 p-4">
          <p class="font-mono text-xs text-accent">Period {{ index + 1 }} · {{ item.id }}</p>
          <h2 class="mt-1 font-semibold">{{ item.title }}</h2>
          <p class="mt-2 text-sm text-base-content/65">{{ item.owner }} · {{ item.score }} · {{ item.updated }}</p>
          <span class="badge mt-2 rounded-box" :class="'badge-' + item.tone">{{ item.status }}</span>
        </article>
      </li>
    </ol>
  </div>
</template>