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
  <div class="overflow-hidden border border-base-300 bg-base-100 shadow-sm">
    <section class="rageval-status-band px-6 py-10 text-white lg:px-10">
      <p class="font-mono text-xs uppercase tracking-[0.25em] text-white/70">{{ profile.kicker }}</p>
      <h1 class="mt-3 max-w-2xl text-4xl font-bold sm:text-5xl">{{ profile.headline }}</h1>
      <p class="mt-4 max-w-xl text-sm text-white/85 sm:text-base">{{ profile.lede }}</p>
      <div class="mt-8 flex flex-wrap gap-3">
        <RouterLink to="/insights" class="border-0 bg-white px-4 py-2 text-sm font-semibold text-primary hover:bg-white/90">
          Open {{ profile.workspace }}
        </RouterLink>
        <RouterLink to="/about" class="border border-white/40 px-4 py-2 text-sm text-white hover:bg-white/10">About</RouterLink>
      </div>
    </section>

    <section class="grid border-t border-base-300 sm:grid-cols-3" aria-label="Summary metrics">
      <article
        v-for="(metric, index) in metrics"
        :key="metric.label"
        class="rageval-grid-cell border-b border-base-300 p-6 sm:border-b-0 sm:border-r last:sm:border-r-0"
        :class="index === 0 ? 'rageval-row-strip' : ''"
      >
        <p class="text-xs font-medium uppercase tracking-wide text-base-content/50">{{ metric.label }}</p>
        <p class="mt-2 font-display text-3xl font-bold text-primary">{{ metric.value }}</p>
        <p class="mt-1 text-sm text-secondary">{{ metric.note }}</p>
      </article>
    </section>

    <section class="grid gap-px bg-base-300 lg:grid-cols-2">
      <div class="rageval-grid-cell bg-base-100 p-6 lg:col-span-1 lg:p-8">
        <h2 class="font-display text-sm font-bold uppercase tracking-wide text-base-content/60">Retrieval runs</h2>
        <ul class="mt-4 divide-y divide-base-300">
          <li v-for="item in records.slice(0, 5)" :key="item.id" class="flex items-center justify-between gap-3 py-3">
            <div class="min-w-0">
              <p class="font-mono text-xs text-secondary">{{ item.id }}</p>
              <p class="truncate font-medium">{{ item.title }}</p>
            </div>
            <span class="badge border-0" :class="'badge-' + item.tone">{{ item.status }}</span>
          </li>
        </ul>
      </div>
      <div class="grid gap-px bg-base-300 sm:grid-cols-2">
        <article v-for="item in highlights" :key="item.title" class="rageval-grid-cell bg-base-100 p-5">
          <AppIcon :name="item.icon" class="text-primary" />
          <h3 class="mt-2 font-semibold">{{ item.title }}</h3>
          <p class="mt-1 text-sm text-base-content/65">{{ item.detail }}</p>
        </article>
        <article class="rageval-row-strip rageval-grid-cell bg-base-200 p-5 sm:col-span-2">
          <h3 class="text-xs font-bold uppercase text-base-content/50">Eval stream</h3>
          <ul class="mt-3 space-y-2 font-mono text-xs">
            <li v-for="(entry, idx) in activity" :key="idx">
              <span class="text-primary">{{ entry.when }}</span> — {{ entry.text }}
            </li>
          </ul>
        </article>
      </div>
    </section>
  </div>
</template>