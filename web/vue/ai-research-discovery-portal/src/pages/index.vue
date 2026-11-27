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
  <div class="lg:flex lg:gap-0">
    <aside class="rdisc-rail mb-6 w-full rounded-field p-6 text-white lg:mb-0 lg:block lg:w-52 lg:shrink-0">
      <p class="text-[10px] uppercase tracking-widest text-white/55">Discovery lanes</p>
      <ul class="mt-5 space-y-2 text-sm">
        <li class="rdisc-lane rounded-field border border-white/20 bg-white/10 px-3 py-2 font-semibold">Cross-index labs</li>
        <li class="rounded-field px-3 py-2 text-white/75">Preprint watch</li>
        <li class="rounded-field px-3 py-2 text-white/75">Grant signals</li>
        <li class="rounded-field px-3 py-2 text-white/75">Citation graph</li>
      </ul>
      <p class="mt-6 text-[10px] text-white/40">Hot pink · fuchsia</p>
    </aside>
    <div class="flex-1 space-y-8 lg:pl-8">
      <section>
        <p class="text-xs font-bold uppercase tracking-wide text-secondary">{{ profile.kicker }}</p>
        <h1 class="mt-2 max-w-2xl font-display text-4xl font-bold">{{ profile.headline }}</h1>
        <p class="mt-3 max-w-xl text-base-content/75">{{ profile.lede }}</p>
        <div class="mt-6 flex gap-3">
          <RouterLink to="/insights" class="btn btn-primary rounded-field">Open {{ profile.workspace }}</RouterLink>
          <RouterLink to="/about" class="btn btn-outline rounded-field">About</RouterLink>
        </div>
      </section>
      <section class="grid gap-3 sm:grid-cols-3">
        <article v-for="metric in metrics" :key="metric.label" class="rdisc-lane rounded-field border border-base-300 bg-base-100 p-4 text-center">
          <p class="font-display text-2xl font-bold text-primary">{{ metric.value }}</p>
          <p class="text-xs text-base-content/60">{{ metric.label }}</p>
        </article>
      </section>
      <section class="rounded-field border border-base-300 bg-base-100">
        <h2 class="border-b border-base-300 px-4 py-3 text-sm font-bold uppercase text-base-content/55">Lab matches</h2>
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
        <article v-for="item in highlights" :key="item.title" class="rounded-field border border-base-300 bg-base-100 p-5">
          <AppIcon :name="item.icon" class="text-secondary" />
          <h2 class="mt-2 font-display font-bold">{{ item.title }}</h2>
          <p class="mt-1 text-sm text-base-content/70">{{ item.detail }}</p>
        </article>
      </section>
      <ul class="space-y-2 text-sm">
        <li v-for="(entry, idx) in activity" :key="idx"><span class="text-secondary">{{ entry.when }}</span> — {{ entry.text }}</li>
      </ul>
    </div>
  </div>
</template>