<route lang="json">
{
  "meta": { "title": "Tasks" }
}
</route>


<script setup lang="ts">
import profile from '../../mock/profile.json'
import records from '../../mock/records.json'
</script>

<template>
  <div class="space-y-6">
        <div class="grid gap-6 lg:grid-cols-[240px_1fr]">
      <aside class="rounded-box border border-base-300 bg-base-200 p-4 text-sm">
        <p class="font-bold text-primary">{{ profile.workspace }}</p>
        <p class="mt-2 text-base-content/65">{{ profile.summary }}</p>
      </aside>
      <div class="space-y-3">
        <article v-for="item in records" :key="item.id" class="rounded-box border border-base-300 bg-base-100 p-4">
          <p class="font-mono text-xs text-primary">{{ item.id }}</p>
          <p class="font-semibold">{{ item.title }}</p>
          <p class="mt-1 text-sm">{{ item.owner }} · {{ item.updated }} · {{ item.score }}% agree</p>
          <span class="badge mt-2" :class="'badge-' + item.tone">{{ item.status }}</span>
        </article>
      </div>
    </div>
  </div>
</template>
