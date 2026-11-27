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

  <div class="space-y-10">
    <section class="aq-masthead overflow-hidden rounded-box p-8 text-white lg:p-12">
      <p class="text-xs font-semibold uppercase tracking-[0.2em] text-secondary">{{ profile.kicker }}</p>
      <div class="mt-6 grid gap-10 lg:grid-cols-[1fr_auto] lg:items-center">
        <div>
          <h1 class="text-4xl font-bold leading-tight sm:text-5xl">{{ profile.headline }}</h1>
          <p class="mt-4 max-w-xl text-white/80">{{ profile.lede }}</p>
          <div class="mt-8 flex flex-wrap gap-3">
            <RouterLink to="/insights" class="btn rounded-box border-0 bg-primary text-primary-content">Open {{ profile.workspace }}</RouterLink>
            <RouterLink to="/about" class="btn rounded-box border border-white/30 bg-transparent text-white hover:bg-white/10">About</RouterLink>
          </div>
        </div>
        <div class="aq-aqi-ring flex size-32 items-center justify-center rounded-full p-1.5 shadow-xl" aria-hidden="true">
          <div class="flex size-full flex-col items-center justify-center rounded-full bg-base-300">
            <span class="text-3xl font-bold text-white">62</span>
            <span class="text-[10px] uppercase tracking-widest text-white/60">AQI moderate</span>
          </div>
        </div>
      </div>
    </section>
    <section class="grid gap-4 md:grid-cols-3" aria-label="Summary metrics">
      <article v-for="metric in metrics" :key="metric.label" class="rounded-box border border-base-300 bg-base-100 p-6">
        <p class="text-xs uppercase tracking-wide text-base-content/50">{{ metric.label }}</p>
        <p class="mt-2 font-display text-4xl font-bold text-secondary">{{ metric.value }}</p>
        <p class="mt-1 text-sm text-accent">{{ metric.note }}</p>
      </article>
    </section>
    <section class="grid gap-6 lg:grid-cols-3">
      <div class="lg:col-span-2 rounded-box border border-base-300 bg-base-100 p-6">
        <h2 class="font-display font-bold">Station readings</h2>
        <ul class="mt-4 divide-y divide-base-300">
          <li v-for="item in records.slice(0, 5)" :key="item.id" class="flex justify-between gap-3 py-3">
            <div><p class="font-medium">{{ item.title }}</p><p class="text-xs text-base-content/55">{{ item.id }} · {{ item.owner }}</p></div>
            <span class="badge" :class="'badge-' + item.tone">{{ item.status }}</span>
          </li>
        </ul>
      </div>
      <aside class="space-y-4">
        <article v-for="item in highlights" :key="item.title" class="rounded-box border border-primary/30 bg-primary/10 p-5">
          <AppIcon :name="item.icon" class="text-primary" />
          <h3 class="mt-2 font-display font-bold">{{ item.title }}</h3>
          <p class="mt-1 text-sm text-base-content/70">{{ item.detail }}</p>
        </article>
      </aside>
    </section>
    <section class="rounded-box border border-base-300 bg-base-100 p-6">
      <h2 class="text-sm font-bold uppercase tracking-wide text-base-content/50">Forecast notes</h2>
      <ul class="mt-3 grid gap-3 sm:grid-cols-2">
        <li v-for="(e, i) in activity" :key="i" class="text-sm"><span class="text-secondary">{{ e.when }}</span> — {{ e.text }}</li>
      </ul>
    </section>
  </div>
</template>
