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
    <section class="tlp-week-band rounded-box px-6 py-10 text-white lg:px-10">
      <p class="text-xs font-bold uppercase tracking-[0.2em] text-white/70">{{ profile.kicker }}</p>
      <h1 class="mt-3 max-w-2xl font-display text-4xl font-bold">{{ profile.headline }}</h1>
      <p class="mt-4 max-w-xl text-white/85">{{ profile.lede }}</p>
      <div class="mt-8 flex flex-wrap gap-3">
        <RouterLink to="/insights" class="rounded-box bg-secondary px-4 py-2 text-sm font-semibold text-secondary-content">Open {{ profile.workspace }}</RouterLink>
        <RouterLink to="/about" class="rounded-box border border-white/40 px-4 py-2 text-sm text-white">About</RouterLink>
      </div>
    </section>

    <section class="grid gap-4 sm:grid-cols-3" aria-label="Summary metrics">
      <article v-for="metric in metrics" :key="metric.label" class="rounded-box border border-base-300 bg-base-100 p-6 text-center">
        <p class="text-xs uppercase text-base-content/50">{{ metric.label }}</p>
        <p class="mt-2 font-display text-3xl font-bold text-secondary">{{ metric.value }}</p>
        <p class="text-sm text-primary">{{ metric.note }}</p>
      </article>
    </section>

    <section class="rounded-box border border-base-300 bg-base-100 p-6 lg:p-8">
      <h2 class="font-display text-xl font-bold text-primary">Lesson week timeline</h2>
      <ol class="mt-8 space-y-0">
        <li v-for="(item, index) in records.slice(0, 5)" :key="item.id" class="flex gap-4 pb-8 last:pb-0">
          <div class="flex flex-col items-center">
            <span class="tlp-step-dot size-3 rounded-full bg-secondary" />
            <span v-if="index < 4" class="tlp-step-track mt-1 w-0.5 flex-1" aria-hidden="true" />
          </div>
          <article class="min-w-0 flex-1 rounded-box border border-base-300 bg-base-200/80 p-4">
            <p class="font-mono text-xs text-secondary">Day {{ index + 1 }}</p>
            <h3 class="mt-1 font-semibold">{{ item.title }}</h3>
            <p class="mt-1 text-sm text-base-content/60">{{ item.owner }} · {{ item.updated }}</p>
            <span class="badge mt-2 rounded-box" :class="'badge-' + item.tone">{{ item.status }}</span>
          </article>
        </li>
      </ol>
    </section>

    <section class="grid gap-4 md:grid-cols-3">
      <article v-for="item in highlights" :key="item.title" class="rounded-box border border-primary/30 bg-base-100 p-6">
        <AppIcon :name="item.icon" class="text-secondary" />
        <h2 class="mt-3 font-display font-bold">{{ item.title }}</h2>
        <p class="mt-2 text-sm text-base-content/70">{{ item.detail }}</p>
      </article>
    </section>

    <section class="rounded-box border border-base-300 bg-base-100 p-6 text-sm">
      <ul class="space-y-2">
        <li v-for="(entry, idx) in activity" :key="idx"><span class="text-secondary">{{ entry.when }}</span> — {{ entry.text }}</li>
      </ul>
    </section>
  </div>
</template>