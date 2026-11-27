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

const readability = 86
</script>

<template>
  <div class="space-y-10">
    <section class="relative pt-6">
      <div class="plain-overlap-band pointer-events-none absolute inset-x-8 top-0 z-0 h-20 rounded-field blur-2xl" aria-hidden="true" />
      <div class="plain-hero-float relative z-10 rounded-field px-6 py-12 text-center sm:px-12">
        <p class="text-xs font-semibold uppercase tracking-widest text-accent">{{ profile.kicker }}</p>
        <h1 class="mx-auto mt-4 max-w-2xl font-display text-4xl font-bold sm:text-5xl">{{ profile.headline }}</h1>
        <p class="mx-auto mt-4 max-w-xl text-base-content/75">{{ profile.lede }}</p>
        <div class="mt-8 flex flex-wrap justify-center gap-3">
          <RouterLink to="/insights" class="btn btn-primary rounded-field">Open {{ profile.workspace }}</RouterLink>
          <RouterLink to="/about" class="btn btn-outline rounded-field">About</RouterLink>
        </div>
      </div>
      <div class="relative z-20 -mt-10 flex justify-center">
        <div class="plain-readability-gauge flex size-28 items-center justify-center rounded-full p-1.5">
          <div class="flex size-full flex-col items-center justify-center rounded-full bg-base-200">
            <span class="font-display text-2xl font-bold text-primary">{{ readability }}</span>
            <span class="text-[10px] uppercase text-base-content/55">readability</span>
          </div>
        </div>
      </div>
    </section>
    <section class="-mt-4 grid gap-4 sm:grid-cols-3">
      <article v-for="metric in metrics" :key="metric.label" class="rounded-field border border-base-300 bg-base-100/80 p-6 text-center">
        <p class="font-display text-3xl font-bold text-primary">{{ metric.value }}</p>
        <p class="text-sm text-base-content/60">{{ metric.label }}</p>
      </article>
    </section>
  <section class="rounded-field border border-base-300 bg-base-100/90 p-6">
      <h2 class="font-display text-center text-lg font-bold">Draft preview</h2>
      <ul class="mt-6 space-y-3">
        <li v-for="item in records.slice(0, 4)" :key="item.id" class="flex items-center justify-between gap-4 text-sm">
          <span class="font-medium">{{ item.title }}</span>
          <span class="badge badge-sm rounded-field" :class="'badge-' + item.tone">{{ item.status }}</span>
        </li>
      </ul>
    </section>
    <section class="grid gap-4 md:grid-cols-3">
      <article v-for="item in highlights" :key="item.title" class="rounded-field border border-primary/25 bg-base-100/80 p-6">
        <AppIcon :name="item.icon" class="text-secondary" />
        <h2 class="mt-3 font-display font-bold">{{ item.title }}</h2>
        <p class="mt-2 text-sm text-base-content/70">{{ item.detail }}</p>
      </article>
    </section>
    <ul class="text-sm space-y-2 text-base-content/70">
      <li v-for="(entry, idx) in activity" :key="idx"><span class="text-accent">{{ entry.when }}</span> — {{ entry.text }}</li>
    </ul>
  </div>
</template>
