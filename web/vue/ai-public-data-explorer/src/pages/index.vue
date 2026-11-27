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
    <section class="rounded-box border border-base-300 bg-base-100 p-8 text-center lg:p-12">
      <p class="text-xs font-semibold uppercase tracking-[0.2em] text-secondary">{{ profile.kicker }}</p>
      <h1 class="mx-auto mt-4 max-w-2xl text-4xl font-bold sm:text-5xl">{{ profile.headline }}</h1>
      <p class="mx-auto mt-4 max-w-xl text-base-content/70">{{ profile.lede }}</p>
      <div class="mt-8 flex flex-wrap justify-center gap-3">
        <RouterLink to="/insights" class="btn btn-primary rounded-box">Open {{ profile.workspace }}</RouterLink>
        <RouterLink to="/about" class="btn btn-outline rounded-box">About</RouterLink>
      </div>
    </section>

    <section class="grid gap-4 sm:grid-cols-3" aria-label="Summary metrics">
      <article v-for="metric in metrics" :key="metric.label" class="rounded-box border border-base-300 bg-base-100 p-6 text-center">
        <p class="text-xs font-semibold uppercase text-base-content/50">{{ metric.label }}</p>
        <p class="mt-2 font-display text-3xl font-bold text-primary">{{ metric.value }}</p>
        <p class="mt-1 text-sm text-accent">{{ metric.note }}</p>
      </article>
    </section>

    <section aria-label="Open data catalog steps">
      <h2 class="font-display text-center text-xl font-bold">Catalog timeline</h2>
      <p class="mt-2 text-center text-sm text-base-content/60">From intake to resident-ready download</p>
      <ol class="mt-10 space-y-0">
        <li v-for="(item, index) in records.slice(0, 5)" :key="item.id" class="flex gap-5">
          <div class="flex w-10 shrink-0 flex-col items-center pt-1">
            <span class="pdata-step-dot">{{ index + 1 }}</span>
            <span v-if="index < 4" class="pdata-step-rail w-0.5 flex-1" aria-hidden="true" />
          </div>
          <article class="pdata-step-card mb-6 flex-1 rounded-box border border-base-300 bg-base-100 p-5">
            <p class="font-mono text-xs text-secondary">{{ item.id }}</p>
            <h3 class="mt-2 font-display text-lg font-bold">{{ item.title }}</h3>
            <p class="mt-1 text-sm text-base-content/65">{{ item.owner }} · {{ item.updated }}</p>
            <span class="badge mt-3 rounded-box" :class="'badge-' + item.tone">{{ item.status }}</span>
          </article>
        </li>
      </ol>
    </section>

    <section class="grid gap-4 md:grid-cols-3">
      <article
        v-for="item in highlights"
        :key="item.title"
        class="rounded-box border border-base-300 bg-base-100 p-6 hover:border-violet-400/40"
      >
        <AppIcon :name="item.icon" class="text-primary" />
        <h2 class="mt-3 font-display font-bold">{{ item.title }}</h2>
        <p class="mt-2 text-sm text-base-content/70">{{ item.detail }}</p>
      </article>
    </section>

    <section class="rounded-box border border-dashed border-primary/30 bg-primary/5 p-6">
      <h2 class="text-xs font-bold uppercase tracking-wide text-primary">Publish stream</h2>
      <ul class="mt-4 space-y-2 text-sm">
        <li v-for="(entry, idx) in activity" :key="idx" class="flex justify-between gap-3">
          <span>{{ entry.text }}</span>
          <span class="shrink-0 font-mono text-xs text-secondary">{{ entry.when }}</span>
        </li>
      </ul>
    </section>
  </div>
</template>