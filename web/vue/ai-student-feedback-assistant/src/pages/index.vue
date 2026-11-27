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
  <div class="overflow-hidden border border-base-300 bg-base-100">
    <section class="sfeed-band px-6 py-10 text-white lg:px-10">
      <p class="font-mono text-xs uppercase tracking-widest text-white/70">{{ profile.kicker }}</p>
      <h1 class="mt-3 max-w-2xl font-display text-4xl font-bold">{{ profile.headline }}</h1>
      <p class="mt-4 max-w-xl text-white/85">{{ profile.lede }}</p>
      <div class="mt-8 flex gap-3">
        <RouterLink to="/insights" class="border-0 bg-white px-4 py-2 text-sm font-semibold text-primary">Open {{ profile.workspace }}</RouterLink>
        <RouterLink to="/about" class="border border-white/40 px-4 py-2 text-sm text-white">About</RouterLink>
      </div>
    </section>

    <section class="grid border-t border-base-300 sm:grid-cols-3">
      <article
        v-for="(metric, index) in metrics"
        :key="metric.label"
        class="border-b border-base-300 p-6 text-center sm:border-b-0 sm:border-r last:sm:border-r-0"
        :class="index === 1 ? 'sfeed-row-strip' : ''"
      >
        <p class="font-display text-3xl font-bold text-primary">{{ metric.value }}</p>
        <p class="text-sm">{{ metric.label }}</p>
        <p class="text-xs text-secondary">{{ metric.note }}</p>
      </article>
    </section>

    <section>
      <h2 class="sr-only">Feedback note bands</h2>
      <div
        v-for="item in records"
        :key="item.id"
        class="sfeed-row-strip flex flex-col gap-2 border-b border-base-300 px-5 py-4 sm:flex-row sm:items-center sm:justify-between"
      >
        <div>
          <p class="font-mono text-xs text-primary">{{ item.id }}</p>
          <p class="font-medium">{{ item.title }}</p>
          <p class="text-xs text-base-content/55">{{ item.owner }}</p>
        </div>
        <div class="flex flex-wrap gap-3 text-sm">
          <span class="badge border-0" :class="'badge-' + item.tone">{{ item.status }}</span>
          <span class="text-base-content/50">{{ item.updated }}</span>
        </div>
      </div>
    </section>

    <section class="grid gap-0 border-t border-base-300 sm:grid-cols-3">
      <article v-for="item in highlights" :key="item.title" class="border-b border-base-300 p-5 sm:border-b-0 sm:border-r last:sm:border-r-0">
        <AppIcon :name="item.icon" class="text-primary" />
        <h2 class="mt-2 text-sm font-semibold">{{ item.title }}</h2>
        <p class="text-xs text-base-content/65">{{ item.detail }}</p>
      </article>
    </section>

    <section class="border-t border-base-300 bg-base-200 p-5">
      <ul class="space-y-2 text-sm">
        <li v-for="(entry, idx) in activity" :key="idx"><span class="text-primary">{{ entry.when }}</span> — {{ entry.text }}</li>
      </ul>
    </section>
  </div>
</template>