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
    <section class="dqi-gold-band px-6 py-12 text-white lg:px-10">
      <p class="text-xs font-bold uppercase tracking-[0.25em] text-white/75">{{ profile.kicker }}</p>
      <h1 class="mt-3 max-w-2xl font-display text-4xl font-bold sm:text-5xl">{{ profile.headline }}</h1>
      <p class="mt-4 max-w-xl text-sm text-white/85 sm:text-base">{{ profile.lede }}</p>
      <div class="mt-8 flex flex-wrap gap-3">
        <RouterLink to="/insights" class="border-0 bg-white px-4 py-2 text-sm font-semibold text-primary">Open {{ profile.workspace }}</RouterLink>
        <RouterLink to="/about" class="border border-white/40 px-4 py-2 text-sm font-medium text-white">About</RouterLink>
      </div>
    </section>

    <section class="grid border-t border-base-300 sm:grid-cols-3" aria-label="Summary metrics">
      <article
        v-for="(metric, index) in metrics"
        :key="metric.label"
        class="border-b border-base-300 p-6 sm:border-b-0 sm:border-r last:sm:border-r-0"
        :class="index === 0 ? 'dqi-row-strip' : ''"
      >
        <p class="text-xs font-medium uppercase tracking-wide text-base-content/50">{{ metric.label }}</p>
        <p class="mt-2 font-display text-3xl font-bold text-primary">{{ metric.value }}</p>
        <p class="mt-1 text-sm text-base-content/60">{{ metric.note }}</p>
      </article>
    </section>

    <section class="grid border-t border-base-300 lg:grid-cols-2">
      <ul class="divide-y divide-base-300">
        <li
          v-for="item in records.slice(0, 6)"
          :key="item.id"
          class="flex items-center justify-between gap-4 px-6 py-4"
          :class="item.tone === 'warning' ? 'dqi-row-strip' : ''"
        >
          <div>
            <p class="font-medium">{{ item.title }}</p>
            <p class="font-mono text-xs text-base-content/55">{{ item.id }} · {{ item.owner }}</p>
          </div>
          <span class="badge border-0" :class="'badge-' + item.tone">{{ item.status }}</span>
        </li>
      </ul>
      <div class="border-t border-base-300 bg-base-200 p-6 lg:border-t-0 lg:border-l">
        <h2 class="font-display text-sm font-bold uppercase">Inspection signals</h2>
        <ul class="mt-4 space-y-3">
          <li v-for="item in highlights" :key="item.title" class="flex gap-3 border border-base-300 bg-base-100 p-4">
            <AppIcon :name="item.icon" class="text-secondary" />
            <div>
              <h3 class="font-semibold">{{ item.title }}</h3>
              <p class="mt-1 text-sm text-base-content/70">{{ item.detail }}</p>
            </div>
          </li>
        </ul>
        <ul class="mt-6 space-y-2 border-t border-base-300 pt-4 text-xs">
          <li v-for="(entry, idx) in activity" :key="idx"><span class="text-primary">{{ entry.when }}</span> — {{ entry.text }}</li>
        </ul>
      </div>
    </section>
  </div>
</template>