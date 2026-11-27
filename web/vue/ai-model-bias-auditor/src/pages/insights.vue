<route lang="json">
{
  "meta": { "title": "Scores" }
}
</route>

<script setup lang="ts">
import profile from '../../mock/profile.json'
import records from '../../mock/records.json'
</script>

<template>
  <div class="space-y-6">
    <header class="max-w-3xl">
      <p class="text-sm font-medium text-primary">{{ profile.product }}</p>
      <h1 class="mt-2 font-display text-3xl font-bold">{{ profile.workspace }}</h1>
      <p class="mt-2 text-base-content/70">{{ profile.summary }}</p>
    </header>
    <ol class="space-y-4">
      <li v-for="(item, index) in records" :key="item.id" class="flex gap-4">
        <div class="flex flex-col items-center pt-1">
          <span class="mba-step-dot size-3 rounded-full bg-primary" />
          <span v-if="index < records.length - 1" class="mba-step-track mt-1 w-0.5 flex-1 min-h-8" aria-hidden="true" />
        </div>
        <article class="flex-1 rounded-field border border-base-300 bg-base-100 p-4">
          <h2 class="font-semibold">{{ item.title }}</h2>
          <p class="text-sm text-base-content/65">{{ item.id }} · score {{ item.score }} · {{ item.owner }}</p>
          <span class="badge mt-2 rounded-field" :class="'badge-' + item.tone">{{ item.status }}</span>
        </article>
      </li>
    </ol>
  </div>
</template>
