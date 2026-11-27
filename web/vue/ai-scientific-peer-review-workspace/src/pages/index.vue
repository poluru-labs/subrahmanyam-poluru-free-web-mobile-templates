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

const lead = records[0]
</script>

<template>
  <div class="space-y-8">
    <section class="grid overflow-hidden rounded-box border border-base-300 bg-base-100 lg:grid-cols-2">
      <div class="sreview-studio-ms p-8">
        <p class="text-xs font-bold uppercase text-primary">Manuscript pane</p>
        <h1 class="mt-3 font-display text-3xl font-bold sm:text-4xl">{{ profile.headline }}</h1>
        <p class="mt-3 text-base-content/70">{{ profile.lede }}</p>
        <p v-if="lead" class="mt-4 font-mono text-xs text-base-content/55">{{ lead.id }} · {{ lead.title }}</p>
        <div class="mt-6 flex gap-3">
          <RouterLink to="/insights" class="btn btn-primary rounded-box">Open {{ profile.workspace }}</RouterLink>
          <RouterLink to="/about" class="btn btn-outline rounded-box">About</RouterLink>
        </div>
      </div>
      <div class="sreview-studio-review border-t border-base-300 p-8 lg:border-t-0 lg:border-l">
        <p class="text-xs font-bold uppercase text-secondary">Review pane</p>
        <p class="mt-2 text-sm font-semibold">{{ profile.kicker }}</p>
        <ul class="mt-4 space-y-3 text-sm">
          <li v-for="item in records.slice(0, 4)" :key="item.id" class="flex justify-between gap-2 border-b border-base-300 pb-2">
            <span class="truncate">{{ item.title }}</span>
            <span class="badge shrink-0 rounded-box" :class="'badge-' + item.tone">{{ item.status }}</span>
          </li>
        </ul>
        <div class="mt-6 grid grid-cols-3 gap-2">
          <article v-for="metric in metrics" :key="metric.label" class="rounded-box border border-base-300 p-2 text-center">
            <p class="font-display text-lg font-bold text-accent">{{ metric.value }}</p>
            <p class="text-[10px] text-base-content/55">{{ metric.label }}</p>
          </article>
        </div>
      </div>
    </section>

    <section class="grid gap-4 md:grid-cols-3">
      <article v-for="item in highlights" :key="item.title" class="rounded-box border border-base-300 bg-base-100 p-5">
        <AppIcon :name="item.icon" class="text-primary" />
        <h2 class="mt-2 font-display font-bold">{{ item.title }}</h2>
        <p class="mt-1 text-sm text-base-content/70">{{ item.detail }}</p>
      </article>
    </section>

    <section class="flex gap-4 rounded-box border border-base-300 bg-base-100 p-6">
      <span class="sreview-divider hidden w-1 shrink-0 lg:block" aria-hidden="true" />
      <ul class="space-y-2 text-sm">
        <li v-for="(entry, idx) in activity" :key="idx"><span class="text-primary">{{ entry.when }}</span> — {{ entry.text }}</li>
      </ul>
    </section>
  </div>
</template>