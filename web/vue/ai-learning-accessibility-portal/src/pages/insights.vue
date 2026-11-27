<route lang="json">
{
  "meta": { "title": "Courses" }
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
    <ul class="divide-y divide-base-300 rounded-box border border-base-300 bg-base-100">
      <li v-for="(item, index) in records" :key="item.id" class="flex items-center justify-between gap-4 px-5 py-4" :class="index % 2 === 0 ? 'lap-course-row' : ''">
        <div>
          <p class="font-medium">{{ item.title }}</p>
          <p class="font-mono text-xs text-base-content/55">{{ item.id }} · {{ item.owner }} · {{ item.updated }}</p>
        </div>
        <span class="badge rounded-box border-0" :class="'badge-' + item.tone">{{ item.status }}</span>
      </li>
    </ul>
  </div>
</template>
