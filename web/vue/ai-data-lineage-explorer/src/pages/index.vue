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
  <div class="space-y-14">
    <section class="relative">
      <div
        class="pointer-events-none absolute inset-x-12 top-0 z-0 h-28 rounded-full bg-primary/25 blur-3xl"
        aria-hidden="true"
      />
      <div
        class="lineage-hero-float relative z-10 -mt-2 rounded-box border border-base-300 bg-base-100 px-6 py-12 text-center sm:px-12"
      >
        <p class="inline-flex rounded-box bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-primary">
          {{ profile.kicker }}
        </p>
        <h1 class="mx-auto mt-5 max-w-2xl text-4xl font-bold leading-tight sm:text-5xl">
          {{ profile.headline }}
        </h1>
        <p class="mx-auto mt-5 max-w-xl text-base text-base-content/70">{{ profile.lede }}</p>
        <div class="mt-8 flex flex-wrap items-center justify-center gap-3">
          <RouterLink to="/insights" class="btn btn-primary rounded-box">Open {{ profile.workspace }}</RouterLink>
          <RouterLink to="/about" class="btn btn-outline rounded-box">About</RouterLink>
        </div>
      </div>
    </section>

    <section class="-mt-8 grid gap-4 px-2 sm:grid-cols-3" aria-label="Summary metrics">
      <article
        v-for="metric in metrics"
        :key="metric.label"
        class="rounded-box border border-base-300 bg-base-100 p-6 text-center shadow-md"
      >
        <p class="text-xs font-semibold uppercase tracking-wide text-base-content/50">{{ metric.label }}</p>
        <p class="mt-2 font-display text-4xl font-bold text-primary">{{ metric.value }}</p>
        <p class="mt-1 text-sm text-accent">{{ metric.note }}</p>
      </article>
    </section>

    <section class="rounded-box border border-base-300 bg-base-100 p-6 lg:p-8">
      <h2 class="font-display text-center text-xl font-bold">Lineage path preview</h2>
      <p class="mt-2 text-center text-sm text-base-content/60">Sample nodes along a metric walk</p>
      <p class="sr-only">Lineage nodes</p>
      <ul class="mt-8 flex flex-col items-center gap-2 sm:flex-row sm:flex-wrap sm:justify-center">
          <li
            v-for="(item, index) in records.slice(0, 4)"
            :key="item.id"
            class="flex items-center gap-2"
          >
            <article class="lineage-graph-node min-w-[9rem] rounded-box px-4 py-3 text-center">
              <p class="font-mono text-[10px] text-primary">{{ item.id }}</p>
              <p class="mt-1 text-sm font-semibold">{{ item.title }}</p>
              <span class="badge badge-sm mt-2" :class="'badge-' + item.tone">{{ item.status }}</span>
            </article>
            <span
              v-if="index < 3"
              class="lineage-connector hidden h-0.5 w-8 sm:block"
              aria-hidden="true"
            />
          </li>
      </ul>
    </section>

    <section class="grid gap-4 md:grid-cols-3">
      <article
        v-for="item in highlights"
        :key="item.title"
        class="rounded-box border border-base-300 bg-base-100 p-6 transition-colors hover:border-accent/40"
      >
        <AppIcon :name="item.icon" class="text-primary" />
        <h2 class="mt-3 font-display font-bold">{{ item.title }}</h2>
        <p class="mt-2 text-sm text-base-content/70">{{ item.detail }}</p>
      </article>
    </section>

    <section class="rounded-box border border-dashed border-secondary/30 bg-secondary/5 p-6">
      <h2 class="text-xs font-bold uppercase tracking-wide text-secondary">Recent path events</h2>
      <ul class="mt-4 space-y-2 text-sm">
        <li v-for="(entry, idx) in activity" :key="idx" class="flex justify-between gap-3">
          <span>{{ entry.text }}</span>
          <span class="shrink-0 font-mono text-xs text-base-content/45">{{ entry.when }}</span>
        </li>
      </ul>
    </section>
  </div>
</template>