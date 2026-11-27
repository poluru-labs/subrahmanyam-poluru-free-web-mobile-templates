<route lang="json">
{
  "meta": { "title": "Cases" }
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
    <div class="space-y-4">
      <article
        v-for="(item, index) in records"
        :key="item.id"
        class="grid gap-4 border border-base-300 p-5 md:grid-cols-2"
        :class="index % 2 === 0 ? 'inc-zig-primary' : 'inc-zig-secondary'"
      >
        <div :class="index % 2 === 1 ? 'md:order-2' : ''">
          <p class="font-mono text-xs text-primary">{{ item.id }}</p>
          <h2 class="mt-2 font-display text-xl font-bold">{{ item.title }}</h2>
          <p class="text-sm text-base-content/65">{{ item.owner }} · score {{ item.score }} · {{ item.updated }}</p>
        </div>
        <div class="flex items-center" :class="index % 2 === 1 ? 'md:order-1' : ''">
          <span class="badge rounded-field" :class="'badge-' + item.tone">{{ item.status }}</span>
        </div>
      </article>
    </div>
  </div>
</template>
