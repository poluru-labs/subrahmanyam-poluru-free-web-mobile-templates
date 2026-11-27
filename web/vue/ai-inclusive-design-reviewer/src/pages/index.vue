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
    <section class="grid overflow-hidden rounded-box border border-base-300 bg-base-100 lg:grid-cols-[1.05fr_0.95fr]">
      <div class="idr-canvas p-8 lg:p-10">
        <p class="text-xs font-bold uppercase tracking-widest text-primary">{{ profile.kicker }}</p>
        <h1 class="mt-4 max-w-lg font-display text-4xl font-bold sm:text-5xl">{{ profile.headline }}</h1>
        <p class="mt-4 max-w-md text-base-content/70">{{ profile.lede }}</p>
        <div class="mt-8 flex flex-wrap gap-3">
          <RouterLink to="/insights" class="btn btn-primary rounded-field">Open {{ profile.workspace }}</RouterLink>
          <RouterLink to="/about" class="btn btn-outline rounded-field">About</RouterLink>
        </div>
        <div class="mt-10 grid gap-3 sm:grid-cols-3">
          <article v-for="metric in metrics" :key="metric.label" class="rounded-field bg-base-100/80 p-4 text-center">
            <p class="font-display text-2xl font-bold text-primary">{{ metric.value }}</p>
            <p class="text-xs text-base-content/60">{{ metric.label }}</p>
          </article>
        </div>
      </div>
      <div class="idr-critique border-t border-base-300 p-6 lg:border-t-0 lg:border-l lg:p-8">
        <h2 class="font-display text-sm font-bold uppercase text-secondary">Critique panel</h2>
        <ul class="mt-4 divide-y divide-base-300">
          <li v-for="item in records.slice(0, 5)" :key="item.id" class="py-4">
            <div class="flex items-start justify-between gap-3">
              <div>
                <p class="font-semibold">{{ item.title }}</p>
                <p class="mt-1 font-mono text-xs text-base-content/55">{{ item.id }}</p>
              </div>
              <span class="badge rounded-field" :class="'badge-' + item.tone">{{ item.status }}</span>
            </div>
            <p class="mt-2 text-sm text-base-content/65">{{ item.owner }} · {{ item.updated }}</p>
          </li>
        </ul>
      </div>
    </section>

    <section class="grid gap-4 md:grid-cols-3">
      <article v-for="item in highlights" :key="item.title" class="rounded-field border border-base-300 bg-base-100 p-6">
        <AppIcon :name="item.icon" class="text-secondary" />
        <h2 class="mt-3 font-display font-bold">{{ item.title }}</h2>
        <p class="mt-2 text-sm text-base-content/70">{{ item.detail }}</p>
      </article>
    </section>

    <section class="rounded-field border border-dashed border-secondary/40 bg-base-100 p-6">
      <h2 class="text-xs font-bold uppercase text-accent">Studio notes</h2>
      <ul class="mt-3 space-y-2 text-sm">
        <li v-for="(entry, idx) in activity" :key="idx"><span class="text-primary">{{ entry.when }}</span> — {{ entry.text }}</li>
      </ul>
    </section>
  </div>
</template>
