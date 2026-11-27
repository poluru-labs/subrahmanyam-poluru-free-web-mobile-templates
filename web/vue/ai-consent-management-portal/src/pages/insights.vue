<route lang="json">
{
  "meta": { "title": "Consents" }
}
</route>


<script setup lang="ts">
import profile from '../../mock/profile.json'
import records from '../../mock/records.json'
</script>

<template>
  <div class="space-y-6">
        <section class="rounded-box bg-secondary/10 border border-secondary/20 p-8">
      <h1 class="text-3xl font-bold">{{ profile.workspace }}</h1>
      <p class="mt-2 text-base-content/70">{{ profile.summary }}</p>
    </section>
    <ul class="mt-6 space-y-4">
      <li v-for="item in records" :key="item.id" class="rounded-box border border-base-300 bg-base-100 p-5">
        <p class="font-semibold">{{ item.title }}</p>
        <p class="mt-1 text-sm text-base-content/60">{{ item.id }} · {{ item.owner }} · {{ item.updated }}</p>
        <span class="badge mt-2 rounded-box" :class="'badge-' + item.tone">{{ item.status }}</span>
      </li>
    </ul>
  </div>
</template>
