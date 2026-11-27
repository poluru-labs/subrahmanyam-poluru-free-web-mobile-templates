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
    <section class="max-w-3xl">
      <p class="text-xs font-bold uppercase tracking-widest text-primary">{{ profile.kicker }}</p>
      <h1 class="mt-3 font-display text-4xl font-bold sm:text-5xl">{{ profile.headline }}</h1>
      <p class="mt-4 text-base-content/70">{{ profile.lede }}</p>
      <div class="mt-6 flex gap-3">
        <RouterLink to="/insights" class="btn btn-primary rounded-field">Open {{ profile.workspace }}</RouterLink>
        <RouterLink to="/about" class="btn btn-outline rounded-field">About</RouterLink>
      </div>
    </section>

    <section class="grid gap-4 sm:grid-cols-3" aria-label="Summary metrics">
      <article v-for="metric in metrics" :key="metric.label" class="rounded-field border border-base-300 bg-base-100 p-5 text-center">
        <p class="font-display text-3xl font-bold text-primary">{{ metric.value }}</p>
        <p class="text-sm">{{ metric.label }}</p>
        <p class="text-xs text-accent">{{ metric.note }}</p>
      </article>
    </section>

    <section class="rounded-field border border-base-300 bg-base-100 p-6 lg:p-8">
      <h2 class="font-display text-lg font-bold">Bias score steps</h2>
      <ol class="mt-8 space-y-0">
        <li v-for="(item, index) in records.slice(0, 5)" :key="item.id" class="flex gap-4 pb-8 last:pb-0">
          <div class="flex flex-col items-center">
            <span class="mba-step-dot size-3 rounded-full bg-primary" />
            <span v-if="index < 4" class="mba-step-track mt-1 w-0.5 flex-1" aria-hidden="true" />
          </div>
          <article class="min-w-0 flex-1 rounded-field border border-base-300 bg-base-200/60 p-4">
            <p class="font-mono text-xs text-accent">Step {{ index + 1 }}</p>
            <h3 class="mt-1 font-semibold">{{ item.title }}</h3>
            <p class="mt-1 text-sm text-base-content/60">Score {{ item.score }} · {{ item.owner }}</p>
            <span class="badge mt-2 rounded-field" :class="'badge-' + item.tone">{{ item.status }}</span>
          </article>
        </li>
      </ol>
    </section>

    <section class="grid gap-4 md:grid-cols-3">
      <article v-for="item in highlights" :key="item.title" class="rounded-field border border-base-300 bg-base-100 p-6">
        <AppIcon :name="item.icon" class="text-primary" />
        <h2 class="mt-3 font-display font-bold">{{ item.title }}</h2>
        <p class="mt-2 text-sm text-base-content/70">{{ item.detail }}</p>
      </article>
    </section>

    <section class="mba-score-ribbon rounded-field border border-base-300 p-6 text-sm">
      <ul class="space-y-2">
        <li v-for="(entry, idx) in activity" :key="idx"><span class="text-primary">{{ entry.when }}</span> — {{ entry.text }}</li>
      </ul>
    </section>
  </div>
</template>
