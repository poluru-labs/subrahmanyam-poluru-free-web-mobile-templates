<route lang="json">
{
  "meta": { "title": "Matches" }
}
</route>


<script setup lang="ts">
import profile from '../../mock/profile.json'
import records from '../../mock/records.json'
</script>

<template>
  <div class="space-y-6">
        <h1 class="text-3xl font-bold text-primary">{{ profile.workspace }}</h1>
    <p class="mt-1 text-base-content/70">{{ profile.summary }}</p>
    <div class="mt-8 grid gap-4 sm:grid-cols-2">
      <article v-for="item in records" :key="item.id" class="rounded-box border-2 border-base-300 bg-base-100 p-6">
        <h2 class="font-display text-lg font-bold">{{ item.title }}</h2>
        <p class="mt-2 text-sm">{{ item.owner }} · {{ item.updated }}</p>
        <div class="mt-4 flex justify-between"><span class="text-secondary font-bold">{{ item.score }}</span>
        <span class="badge" :class="'badge-' + item.tone">{{ item.status }}</span></div>
      </article>
    </div>
  </div>
</template>
