<route lang="json">
{
  "meta": { "title": "Documents" }
}
</route>

<script setup lang="ts">
import profile from '../../mock/profile.json'
import records from '../../mock/records.json'
</script>

<template>
  <div class="space-y-8">
    <header class="doc-review-ribbon rounded-box border border-base-300 p-8">
      <p class="text-sm font-semibold text-primary">{{ profile.product }}</p>
      <h1 class="mt-1 text-3xl font-bold">{{ profile.workspace }}</h1>
      <p class="mt-2 text-base-content/70">{{ profile.summary }}</p>
    </header>
    <ol class="space-y-6 border-l-2 border-primary/30 pl-6">
      <li v-for="(item, index) in records" :key="item.id" class="relative">
        <span class="doc-step-dot absolute -left-[1.65rem] top-2 size-3 rounded-full bg-primary" />
        <article class="rounded-field border border-base-300 bg-base-100 p-5">
          <p class="font-mono text-xs text-secondary">Stage {{ index + 1 }} · {{ item.id }}</p>
          <h2 class="mt-1 font-display font-bold">{{ item.title }}</h2>
          <p class="mt-2 text-sm text-base-content/60">{{ item.owner }} · {{ item.score }}</p>
          <span class="badge mt-3 rounded-field" :class="'badge-' + item.tone">{{ item.status }}</span>
        </article>
      </li>
    </ol>
  </div>
</template>