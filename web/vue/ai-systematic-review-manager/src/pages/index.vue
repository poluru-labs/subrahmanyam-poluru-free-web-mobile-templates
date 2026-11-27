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
  <div class="space-y-0 overflow-hidden rounded-box border border-base-300 bg-base-100">
    <section class="srm-mag-hero grid gap-6 p-8 text-white lg:grid-cols-[1.3fr_1fr] lg:p-10">
      <div>
        <p class="text-xs font-bold uppercase tracking-widest text-white/65">{{ profile.kicker }}</p>
        <h1 class="mt-3 font-display text-4xl font-bold sm:text-5xl">{{ profile.headline }}</h1>
        <p class="mt-4 max-w-lg text-white/85">{{ profile.lede }}</p>
        <div class="mt-8 flex gap-3">
          <RouterLink to="/insights" class="rounded-box bg-secondary px-4 py-2 text-sm font-semibold text-secondary-content">Open {{ profile.workspace }}</RouterLink>
          <RouterLink to="/about" class="rounded-box border border-white/35 px-4 py-2 text-sm text-white">About</RouterLink>
        </div>
      </div>
      <div class="srm-screen-tile rounded-box bg-base-100/10 p-5">
        <h2 class="text-xs font-bold uppercase text-amber-200">Screening stack</h2>
        <ul class="mt-3 space-y-2 text-sm">
          <li v-for="item in records.slice(0, 4)" :key="item.id" class="border-b border-white/15 pb-2 last:border-b-0">{{ item.title }}</li>
        </ul>
      </div>
    </section>

    <section class="grid sm:grid-cols-3" aria-label="Summary metrics">
      <article v-for="(metric, index) in metrics" :key="metric.label" class="srm-screen-tile border-b border-base-300 p-6 text-center sm:border-b-0 sm:border-r last:sm:border-r-0" :class="index === 1 ? 'bg-secondary/5' : 'bg-base-100'">
        <p class="font-display text-3xl font-bold text-primary">{{ metric.value }}</p>
        <p class="text-sm">{{ metric.label }}</p>
        <p class="text-xs text-accent">{{ metric.note }}</p>
      </article>
    </section>

    <section class="grid gap-0 md:grid-cols-4 md:grid-rows-2">
      <article
        v-for="(item, index) in records.slice(0, 4)"
        :key="item.id"
        class="srm-screen-tile border border-base-300 bg-base-100 p-5"
        :class="index === 0 ? 'md:col-span-2 md:row-span-2 border-primary/40 bg-base-200' : ''"
      >
        <p class="font-mono text-xs text-accent">{{ item.id }}</p>
        <h2 class="mt-2 font-display font-bold">{{ item.title }}</h2>
        <p class="mt-2 text-xs text-base-content/60">{{ item.owner }} · {{ item.updated }}</p>
        <span class="badge mt-3 rounded-box border-0" :class="'badge-' + item.tone">{{ item.status }}</span>
      </article>
      <article v-for="item in highlights" :key="item.title" class="srm-screen-tile border border-base-300 bg-base-100 p-5 md:col-span-2">
        <AppIcon :name="item.icon" class="text-secondary" />
        <h2 class="mt-2 font-semibold">{{ item.title }}</h2>
        <p class="text-sm text-base-content/70">{{ item.detail }}</p>
      </article>
    </section>

    <section class="border-t border-base-300 bg-base-200 p-6 text-sm">
      <ul class="grid gap-2 sm:grid-cols-2">
        <li v-for="(entry, idx) in activity" :key="idx"><span class="text-primary">{{ entry.when }}</span> — {{ entry.text }}</li>
      </ul>
    </section>
  </div>
</template>