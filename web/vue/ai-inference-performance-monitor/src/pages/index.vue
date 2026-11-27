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

const gaugePct = 72
</script>

<template>
  <div class="space-y-12">
    <section class="relative pt-4">
      <div class="pointer-events-none absolute inset-x-16 top-0 z-0 h-24 rounded-full bg-primary/30 blur-3xl" aria-hidden="true" />
      <div class="inf-hero-float relative z-10 rounded-box border border-primary/25 bg-base-100 px-6 py-12 text-center sm:px-12">
        <p class="text-xs font-semibold uppercase tracking-widest text-accent">{{ profile.kicker }}</p>
        <h1 class="mx-auto mt-4 max-w-2xl font-display text-4xl font-bold sm:text-5xl">{{ profile.headline }}</h1>
        <p class="mx-auto mt-4 max-w-xl text-base-content/70">{{ profile.lede }}</p>
        <div class="mt-8 flex flex-wrap items-center justify-center gap-3">
          <RouterLink to="/insights" class="btn btn-primary rounded-box">Open {{ profile.workspace }}</RouterLink>
          <RouterLink to="/about" class="btn btn-outline rounded-box">About</RouterLink>
        </div>
      </div>
      <div class="relative z-20 -mt-10 flex justify-center">
        <div class="inf-gauge-ring flex size-28 items-center justify-center rounded-full p-1.5">
          <div class="flex size-full flex-col items-center justify-center rounded-full bg-base-100">
            <span class="font-display text-2xl font-bold text-primary">{{ gaugePct }}ms</span>
            <span class="text-[10px] uppercase text-base-content/55">p99 latency</span>
          </div>
        </div>
      </div>
    </section>

    <section class="-mt-4 grid gap-4 sm:grid-cols-3" aria-label="Summary metrics">
      <article v-for="metric in metrics" :key="metric.label" class="rounded-box border border-base-300 bg-base-100 p-6 text-center shadow-sm">
        <p class="text-xs uppercase text-base-content/50">{{ metric.label }}</p>
        <p class="mt-2 font-display text-3xl font-bold text-primary">{{ metric.value }}</p>
        <p class="text-sm text-secondary">{{ metric.note }}</p>
      </article>
    </section>

    <section class="rounded-box border border-base-300 bg-base-100 p-6 lg:p-8">
      <h2 class="font-display text-center text-lg font-bold">Endpoint preview</h2>
      <ul class="mt-6 space-y-3">
        <li v-for="item in records.slice(0, 4)" :key="item.id" class="flex items-center gap-4">
          <div class="h-2 flex-1 overflow-hidden rounded-box bg-base-300">
            <div class="inf-latency-bar h-full rounded-box" :style="{ width: item.score + '%' }" />
          </div>
          <span class="w-32 truncate text-sm font-medium">{{ item.title }}</span>
          <span class="badge badge-sm rounded-box" :class="'badge-' + item.tone">{{ item.status }}</span>
        </li>
      </ul>
    </section>

    <section class="grid gap-4 md:grid-cols-3">
      <article v-for="item in highlights" :key="item.title" class="rounded-box border border-base-300 bg-base-100 p-6">
        <AppIcon :name="item.icon" class="text-primary" />
        <h2 class="mt-3 font-display font-bold">{{ item.title }}</h2>
        <p class="mt-2 text-sm text-base-content/70">{{ item.detail }}</p>
      </article>
    </section>

    <section class="rounded-box border border-dashed border-primary/30 bg-base-100 p-6 text-sm">
      <ul class="space-y-2">
        <li v-for="(entry, idx) in activity" :key="idx"><span class="text-primary">{{ entry.when }}</span> — {{ entry.text }}</li>
      </ul>
    </section>
  </div>
</template>
