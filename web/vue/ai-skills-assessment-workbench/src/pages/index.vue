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

const skillScore = metrics[0]?.value ?? '—'
</script>

<template>
  <div class="space-y-12">
    <section class="relative pt-4">
      <div class="skill-hero-float relative z-10 rounded-box border border-base-300 bg-base-100 px-6 py-12 text-center sm:px-12">
        <p class="text-xs font-semibold uppercase tracking-widest text-secondary">{{ profile.kicker }}</p>
        <h1 class="mx-auto mt-4 max-w-2xl font-display text-4xl font-bold sm:text-5xl">{{ profile.headline }}</h1>
        <p class="mx-auto mt-4 max-w-xl text-base-content/70">{{ profile.lede }}</p>
        <div class="mt-8 flex flex-wrap justify-center gap-3">
          <RouterLink to="/insights" class="btn btn-primary rounded-box">Open {{ profile.workspace }}</RouterLink>
          <RouterLink to="/about" class="btn btn-outline rounded-box">About</RouterLink>
        </div>
      </div>
      <div class="relative z-20 -mt-12 flex justify-center">
        <div class="skill-score-ring flex size-32 items-center justify-center rounded-full p-1.5">
          <div class="flex size-full flex-col items-center justify-center rounded-full bg-base-100 shadow-lg">
            <span class="font-display text-3xl font-bold text-primary">{{ skillScore }}</span>
            <span class="text-[10px] uppercase text-base-content/55">skill index</span>
          </div>
        </div>
      </div>
    </section>

    <section class="grid gap-4 sm:grid-cols-3">
      <article v-for="metric in metrics" :key="metric.label" class="rounded-box border border-base-300 bg-base-100 p-5 text-center">
        <p class="font-display text-2xl font-bold text-primary">{{ metric.value }}</p>
        <p class="text-sm">{{ metric.label }}</p>
        <p class="text-xs text-accent">{{ metric.note }}</p>
      </article>
    </section>

    <section class="rounded-box border border-base-300 bg-base-100 p-6">
      <h2 class="font-display font-bold">Evidence items</h2>
      <ul class="mt-4 space-y-3">
        <li v-for="item in records" :key="item.id" class="flex flex-wrap justify-between gap-2 border-b border-base-300 pb-3 text-sm last:border-b-0">
          <span>{{ item.title }}</span>
          <span class="badge rounded-box" :class="'badge-' + item.tone">{{ item.status }}</span>
        </li>
      </ul>
    </section>

    <section class="grid gap-4 md:grid-cols-3">
      <article v-for="item in highlights" :key="item.title" class="rounded-box border border-base-300 bg-base-100 p-5">
        <AppIcon :name="item.icon" class="text-primary" />
        <h2 class="mt-2 font-display font-bold">{{ item.title }}</h2>
        <p class="mt-1 text-sm text-base-content/70">{{ item.detail }}</p>
      </article>
    </section>

    <ul class="space-y-2 text-sm text-base-content/70">
      <li v-for="(entry, idx) in activity" :key="idx"><span class="text-secondary">{{ entry.when }}</span> — {{ entry.text }}</li>
    </ul>
  </div>
</template>