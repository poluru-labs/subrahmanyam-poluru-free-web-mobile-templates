<route lang="json">
{
  "meta": { "title": "Home" }
}
</route>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
import AppIcon from '@/components/icons/AppIcon.vue'
import activity from '../../mock/activity.json'
import highlights from '../../mock/highlights.json'
import metrics from '../../mock/metrics.json'
import profile from '../../mock/profile.json'
import records from '../../mock/records.json'
</script>

<template>
  <div class="overflow-hidden rounded-box border border-base-300 bg-base-100">
    <section class="priv-copper-band px-6 py-12 text-white lg:px-10">
      <p class="text-xs font-bold uppercase tracking-[0.2em] text-white/75">{{ profile.kicker }}</p>
      <h1 class="mt-3 max-w-2xl font-display text-4xl font-bold">{{ profile.headline }}</h1>
      <p class="mt-4 max-w-xl text-sm text-white/85">{{ profile.lede }}</p>
      <div class="mt-8 flex flex-wrap gap-3">
        <RouterLink to="/insights" class="rounded-box border-0 bg-white px-4 py-2 text-sm font-semibold text-primary">Open {{ profile.workspace }}</RouterLink>
        <RouterLink to="/about" class="rounded-box border border-white/40 px-4 py-2 text-sm text-white">About</RouterLink>
      </div>
    </section>
    <section class="grid border-t border-base-300 sm:grid-cols-3">
      <article v-for="metric in metrics" :key="metric.label" class="border-b border-base-300 p-6 text-center sm:border-b-0 sm:border-r last:sm:border-r-0">
        <p class="font-display text-3xl font-bold text-primary">{{ metric.value }}</p>
        <p class="text-sm">{{ metric.label }}</p>
      </article>
    </section>
    <ul class="divide-y divide-base-300 border-t border-base-300">
      <li
        v-for="(item, index) in records"
        :key="item.id"
        class="flex items-center justify-between gap-4 px-6 py-4"
        :class="index % 2 === 0 ? 'priv-review-row' : 'priv-plum-row'"
      >
        <div>
          <p class="font-medium">{{ item.title }}</p>
          <p class="font-mono text-xs text-base-content/55">{{ item.id }} · {{ item.owner }}</p>
        </div>
        <span class="badge rounded-box border-0" :class="'badge-' + item.tone">{{ item.status }}</span>
      </li>
    </ul>
    <section class="grid border-t border-base-300 lg:grid-cols-2">
      <div class="space-y-3 p-6 lg:border-r">
        <article v-for="item in highlights" :key="item.title" class="flex gap-3 rounded-box border border-base-300 p-4">
          <AppIcon :name="item.icon" class="text-secondary" />
          <div>
            <h2 class="font-semibold">{{ item.title }}</h2>
            <p class="mt-1 text-sm text-base-content/70">{{ item.detail }}</p>
          </div>
        </article>
      </div>
      <div class="p-6 text-sm">
        <h2 class="text-xs font-bold uppercase text-accent">Review stream</h2>
        <ul class="mt-4 space-y-2">
          <li v-for="(entry, idx) in activity" :key="idx"><span class="text-primary">{{ entry.when }}</span> — {{ entry.text }}</li>
        </ul>
      </div>
    </section>
  </div>
</template>
