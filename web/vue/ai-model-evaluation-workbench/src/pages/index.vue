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
  <div class="lg:flex lg:min-h-[70vh] lg:gap-0">
    <aside class="meval-rail hidden w-60 shrink-0 rounded-box p-6 text-white lg:block">
      <p class="text-xs uppercase tracking-widest text-white/50">Metrics rail</p>
      <ul class="mt-6 space-y-3 text-sm">
        <li class="meval-rail-tick border-l-2 border-accent pl-3 font-semibold text-accent">Live eval set</li>
        <li class="border-l-2 border-white/25 pl-3 text-white/70">Candidate models</li>
        <li class="border-l-2 border-white/25 pl-3 text-white/70">Disagreement log</li>
      </ul>
      <div class="mt-8 space-y-2">
        <article v-for="metric in metrics" :key="metric.label" class="rounded-box bg-white/10 p-3 text-center">
          <p class="font-display text-xl font-bold">{{ metric.value }}</p>
          <p class="text-[10px] uppercase text-white/60">{{ metric.label }}</p>
        </article>
      </div>
    </aside>
    <div class="flex-1 space-y-8 lg:pl-8">
      <section>
        <p class="text-xs font-bold uppercase tracking-wide text-secondary">{{ profile.kicker }}</p>
        <h1 class="mt-2 max-w-2xl font-display text-4xl font-bold">{{ profile.headline }}</h1>
        <p class="mt-3 max-w-xl text-base-content/75">{{ profile.lede }}</p>
        <div class="mt-6 flex gap-3">
          <RouterLink to="/insights" class="btn btn-secondary rounded-box">Open {{ profile.workspace }}</RouterLink>
          <RouterLink to="/about" class="btn btn-outline rounded-box">About</RouterLink>
        </div>
      </section>
      <section class="overflow-hidden rounded-box border border-base-300 bg-base-100">
        <h2 class="border-b border-base-300 px-4 py-3 text-sm font-bold uppercase text-base-content/55">Eval queue</h2>
        <ul>
          <li v-for="item in records" :key="item.id" class="flex justify-between gap-3 border-b border-base-300 px-4 py-3 last:border-b-0">
            <div>
              <p class="font-medium">{{ item.title }}</p>
              <p class="text-xs text-base-content/55">{{ item.id }} · {{ item.owner }}</p>
            </div>
            <span class="badge rounded-box" :class="'badge-' + item.tone">{{ item.status }}</span>
          </li>
        </ul>
      </section>
      <section class="grid gap-4 md:grid-cols-3">
        <article v-for="item in highlights" :key="item.title" class="meval-rail-tick rounded-box border border-base-300 bg-base-100 p-5">
          <AppIcon :name="item.icon" class="text-secondary" />
          <h2 class="mt-2 font-display font-bold">{{ item.title }}</h2>
          <p class="mt-1 text-sm text-base-content/70">{{ item.detail }}</p>
        </article>
      </section>
      <ul class="space-y-2 text-sm text-base-content/70">
        <li v-for="(entry, idx) in activity" :key="idx"><span class="text-secondary">{{ entry.when }}</span> — {{ entry.text }}</li>
      </ul>
    </div>
  </div>
</template>
