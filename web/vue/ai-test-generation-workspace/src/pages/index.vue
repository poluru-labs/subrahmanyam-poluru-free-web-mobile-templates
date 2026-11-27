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
  <div class="overflow-hidden rounded-field border border-base-300 bg-base-100 lg:flex lg:min-h-[70vh]">
    <aside class="tgw-gen-rail hidden w-56 shrink-0 rounded-field p-6 text-white lg:block">
      <p class="text-xs uppercase tracking-widest text-white/55">Suite rail</p>
      <ul class="mt-6 space-y-3 text-sm">
        <li class="tgw-suite-panel border-l-2 border-white pl-3 font-semibold">Gap scan</li>
        <li class="border-l-2 border-white/25 pl-3 text-white/70">Suggested cases</li>
        <li class="border-l-2 border-white/25 pl-3 text-white/70">Accepted runs</li>
      </ul>
      <p class="mt-8 text-xs text-white/45">Tangerine · Green trim</p>
    </aside>
    <div class="flex-1 space-y-8 p-6 lg:p-10">
      <section>
        <p class="text-xs font-bold uppercase tracking-wide text-secondary">{{ profile.kicker }}</p>
        <h1 class="mt-2 max-w-2xl font-display text-4xl font-bold">{{ profile.headline }}</h1>
        <p class="mt-3 max-w-xl text-base-content/75">{{ profile.lede }}</p>
        <div class="mt-6 flex flex-wrap gap-3">
          <RouterLink to="/insights" class="btn btn-primary rounded-field">Open {{ profile.workspace }}</RouterLink>
          <RouterLink to="/about" class="btn btn-outline rounded-field">About</RouterLink>
        </div>
      </section>
      <section class="grid gap-4 sm:grid-cols-3">
        <article v-for="(metric, index) in metrics" :key="metric.label" class="rounded-field border border-base-300 bg-base-100 p-5" :class="index === 0 ? 'tgw-candidate-glow' : ''">
          <p class="font-display text-3xl font-bold text-primary">{{ metric.value }}</p>
          <p class="text-sm text-base-content/60">{{ metric.label }}</p>
          <p class="mt-1 text-xs text-accent">{{ metric.note }}</p>
        </article>
      </section>
      <section class="rounded-field border border-base-300 bg-base-100">
        <h2 class="border-b border-base-300 px-4 py-3 text-sm font-bold uppercase text-base-content/55">Generation queue</h2>
        <ul>
          <li v-for="item in records" :key="item.id" class="flex justify-between gap-3 border-b border-base-300 px-4 py-3 last:border-b-0">
            <div>
              <p class="font-medium">{{ item.title }}</p>
              <p class="text-xs text-base-content/55">{{ item.id }} · {{ item.owner }}</p>
            </div>
            <span class="badge rounded-field" :class="'badge-' + item.tone">{{ item.status }}</span>
          </li>
        </ul>
      </section>
      <section class="grid gap-4 md:grid-cols-3">
        <article v-for="item in highlights" :key="item.title" class="rounded-field border border-secondary/30 bg-secondary/5 p-5">
          <AppIcon :name="item.icon" class="text-primary" />
          <h2 class="mt-2 font-semibold">{{ item.title }}</h2>
          <p class="mt-1 text-sm text-base-content/70">{{ item.detail }}</p>
        </article>
      </section>
      <section class="rounded-field border border-base-300 bg-base-200 p-4 text-sm">
        <ul class="space-y-2">
          <li v-for="(entry, idx) in activity" :key="idx"><span class="text-primary">{{ entry.when }}</span> — {{ entry.text }}</li>
        </ul>
      </section>
    </div>
  </div>
</template>