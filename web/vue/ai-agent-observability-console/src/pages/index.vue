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
  <div class="space-y-0 overflow-hidden rounded-box border border-base-300 bg-base-100 shadow-sm">
    <section class="ops-status-band px-6 py-10 text-white lg:px-10 lg:py-12">
      <p class="font-mono text-xs uppercase tracking-[0.25em] text-white/70">{{ profile.kicker }}</p>
      <h1 class="mt-3 max-w-2xl text-4xl font-bold tracking-tight sm:text-5xl">{{ profile.headline }}</h1>
      <p class="mt-4 max-w-xl text-sm leading-relaxed text-white/80 sm:text-base">{{ profile.lede }}</p>
      <div class="mt-8 flex flex-wrap gap-3">
        <RouterLink to="/insights" class="btn rounded-box border-0 bg-white text-primary hover:bg-white/90">
          Open {{ profile.workspace }}
        </RouterLink>
        <RouterLink to="/about" class="btn rounded-box border border-white/40 bg-transparent text-white hover:bg-white/10">
          About
        </RouterLink>
      </div>
    </section>

    <section class="grid border-t border-base-300 sm:grid-cols-3" aria-label="Summary metrics">
      <article
        v-for="(metric, index) in metrics"
        :key="metric.label"
        class="border-b border-base-300 p-6 sm:border-b-0 sm:border-r last:sm:border-r-0"
        :class="index === 0 ? 'ops-row-strip bg-primary/5' : 'bg-base-100'"
      >
        <p class="text-xs font-medium uppercase tracking-wide text-base-content/50">{{ metric.label }}</p>
        <p class="mt-2 font-display text-3xl font-bold text-primary">{{ metric.value }}</p>
        <p class="mt-1 text-sm text-base-content/60">{{ metric.note }}</p>
      </article>
    </section>

    <section class="grid gap-px bg-base-300 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
      <div class="bg-base-100 p-6 lg:p-8">
        <h2 class="font-display text-sm font-bold uppercase tracking-wide text-base-content/60">Recent runs</h2>
        <ul class="mt-5 space-y-0">
          <li
            v-for="(item, index) in records.slice(0, 5)"
            :key="item.id"
            class="flex gap-4 border-b border-base-300 py-4 last:border-b-0"
          >
            <div class="flex flex-col items-center pt-1">
              <span class="ops-timeline-dot size-2.5 shrink-0 rounded-full" />
              <span
                v-if="index < 4"
                class="mt-1 w-px flex-1 bg-gradient-to-b from-primary/40 to-transparent"
                aria-hidden="true"
              />
            </div>
            <div class="min-w-0 flex-1">
              <p class="font-medium">{{ item.title }}</p>
              <p class="mt-1 font-mono text-xs text-base-content/55">{{ item.id }} · {{ item.owner }}</p>
            </div>
            <span class="badge shrink-0 rounded-box" :class="'badge-' + item.tone">{{ item.status }}</span>
          </li>
        </ul>
      </div>

      <div class="bg-base-200 p-6 lg:p-8">
        <h2 class="font-display text-sm font-bold uppercase tracking-wide">Capabilities</h2>
        <ul class="mt-5 space-y-4">
          <li v-for="item in highlights" :key="item.title" class="flex gap-3 rounded-box bg-base-100 p-4 shadow-sm">
            <AppIcon :name="item.icon" class="text-secondary" />
            <div>
              <h3 class="font-semibold">{{ item.title }}</h3>
              <p class="mt-1 text-sm text-base-content/70">{{ item.detail }}</p>
            </div>
          </li>
        </ul>
        <h3 class="mt-8 text-xs font-bold uppercase tracking-wide text-base-content/50">Stream</h3>
        <ul class="mt-3 space-y-2 font-mono text-xs text-base-content/75">
          <li v-for="(entry, idx) in activity" :key="idx">
            <span class="text-secondary">{{ entry.when }}</span> — {{ entry.text }}
          </li>
        </ul>
      </div>
    </section>
  </div>
</template>