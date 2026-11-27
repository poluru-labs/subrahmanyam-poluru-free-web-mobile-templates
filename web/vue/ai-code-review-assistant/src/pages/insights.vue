<route lang="json">
{
  "meta": { "title": "Reviews" }
}
</route>


<script setup lang="ts">
import profile from '../../mock/profile.json'
import records from '../../mock/records.json'
</script>

<template>
  <div class="space-y-6">
        <div class="p-6 lg:p-8"><h1 class="text-2xl font-bold">{{ profile.workspace }}</h1>
    <div class="mt-6 space-y-3">
      <article v-for="item in records" :key="item.id" class="flex flex-col gap-2 rounded-field border border-base-300 bg-base-100 p-4 sm:flex-row sm:items-center sm:justify-between">
        <div><p class="font-mono text-xs text-primary">{{ item.id }}</p><p class="font-semibold">{{ item.title }}</p></div>
        <div class="flex gap-3 text-sm"><span>{{ item.owner }}</span><span class="font-bold">{{ item.score }}</span>
        <span class="badge" :class="'badge-' + item.tone">{{ item.status }}</span></div>
      </article>
    </div></div>
  </div>
</template>
