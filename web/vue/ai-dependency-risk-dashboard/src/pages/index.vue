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
    <section class="risk-masthead grid gap-6 px-6 py-10 text-white lg:grid-cols-[1.2fr_1fr] lg:px-10 lg:py-12">
      <div>
        <p class="text-xs font-semibold uppercase tracking-[0.2em] text-white/75">{{ profile.kicker }}</p>
        <h1 class="mt-3 text-4xl font-bold leading-tight sm:text-5xl">{{ profile.headline }}</h1>
        <p class="mt-4 max-w-lg text-white/85">{{ profile.lede }}</p>
        <div class="mt-8 flex flex-wrap gap-3">
          <RouterLink to="/insights" class="btn rounded-field border-0 bg-white text-primary">Open {{ profile.workspace }}</RouterLink>
          <RouterLink to="/about" class="btn rounded-field border border-white/35 bg-transparent text-white">About</RouterLink>
        </div>
      </div>
      <ul class="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
        <li v-for="item in records.slice(0, 3)" :key="item.id" class="risk-supply-pill rounded-field px-4 py-3">
          <p class="text-xs text-white/60">{{ item.id }}</p>
          <p class="font-semibold">{{ item.title }}</p>
          <span class="badge badge-sm mt-2" :class="'badge-' + item.tone">{{ item.status }}</span>
        </li>
      </ul>
    </section>

    <section class="grid sm:grid-cols-3" aria-label="Summary metrics">
      <article
        v-for="(metric, index) in metrics"
        :key="metric.label"
        class="risk-col-divider border-b border-base-300 p-6 sm:border-b-0 sm:border-r last:sm:border-r-0"
        :class="index === 1 ? 'bg-primary/5' : 'bg-base-100'"
      >
        <p class="text-xs uppercase text-base-content/50">{{ metric.label }}</p>
        <p class="mt-2 font-display text-3xl font-bold text-primary">{{ metric.value }}</p>
        <p class="mt-1 text-sm text-accent">{{ metric.note }}</p>
      </article>
    </section>

    <section class="grid lg:grid-cols-3">
      <article
        v-for="item in highlights"
        :key="item.title"
        class="risk-col-divider border-t border-base-300 p-6 lg:border-t-0"
      >
        <AppIcon :name="item.icon" class="text-secondary" />
        <h2 class="mt-3 font-display font-bold">{{ item.title }}</h2>
        <p class="mt-2 text-sm text-base-content/70">{{ item.detail }}</p>
      </article>
    </section>

    <section class="border-t border-base-300 bg-base-200 p-6">
      <h2 class="text-xs font-bold uppercase tracking-wide text-base-content/50">Supply stream</h2>
      <ul class="mt-3 space-y-2 text-sm">
        <li v-for="(entry, idx) in activity" :key="idx"><span class="text-primary">{{ entry.when }}</span> — {{ entry.text }}</li>
      </ul>
    </section>
  </div>
</template>