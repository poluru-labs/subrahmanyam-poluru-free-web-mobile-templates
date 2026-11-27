<route lang="json">
{
  "meta": { "title": "Citations" }
}
</route>


<script setup lang="ts">
import profile from '../../mock/profile.json'
import records from '../../mock/records.json'
</script>

<template>
  <div class="space-y-6">
        <header class="text-center"><h1 class="text-3xl font-bold text-primary">{{ profile.workspace }}</h1><p class="mt-2 text-base-content/70">{{ profile.summary }}</p></header>
    <ol class="mt-8 space-y-4">
      <li v-for="(item, index) in records" :key="item.id" class="cite-step relative rounded-box border border-base-300 bg-base-100 p-5 pl-14">
        <span class="absolute left-4 top-5 flex size-8 items-center justify-center rounded-full bg-secondary text-xs font-bold text-secondary-content">{{ index + 1 }}</span>
        <p class="font-mono text-xs text-accent">{{ item.id }}</p>
        <p class="font-semibold">{{ item.title }}</p>
        <p class="mt-1 text-sm text-base-content/60">{{ item.owner }} · {{ item.updated }} · {{ item.score }}</p>
        <span class="badge mt-2 rounded-box" :class="'badge-' + item.tone">{{ item.status }}</span>
      </li>
    </ol>
  </div>
</template>
