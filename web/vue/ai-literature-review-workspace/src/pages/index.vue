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
  <div class="space-y-0">
    <section class="lrw-mag-hero grid gap-6 p-8 text-white lg:grid-cols-[1.35fr_1fr] lg:p-10">
      <div>
        <p class="text-xs font-bold uppercase tracking-widest text-white/65">{{ profile.kicker }}</p>
        <h1 class="mt-3 font-display text-4xl font-bold sm:text-5xl">{{ profile.headline }}</h1>
        <p class="mt-4 max-w-lg text-white/85">{{ profile.lede }}</p>
        <div class="mt-8 flex gap-3">
          <RouterLink to="/insights" class="border-0 bg-accent px-4 py-2 text-sm font-semibold text-accent-content">Open {{ profile.workspace }}</RouterLink>
          <RouterLink to="/about" class="border border-white/35 px-4 py-2 text-sm text-white">About</RouterLink>
        </div>
      </div>
      <div class="lrw-sharp-grid bg-base-100/10 p-5">
        <h2 class="text-xs font-bold uppercase text-secondary">Cited set</h2>
        <ul class="mt-3 space-y-2 text-sm">
          <li v-for="item in records.slice(0, 4)" :key="item.id" class="border-b border-white/15 pb-2">{{ item.title }}</li>
        </ul>
      </div>
    </section>

    <section class="grid gap-0 sm:grid-cols-3" aria-label="Summary metrics">
      <article v-for="(metric, index) in metrics" :key="metric.label" class="lrw-sharp-grid border-r border-base-300 bg-base-100 p-6 text-center last:border-r-0" :class="index === 0 ? 'md:col-span-1' : ''">
        <p class="font-display text-3xl font-bold text-primary">{{ metric.value }}</p>
        <p class="text-sm">{{ metric.label }}</p>
        <p class="text-xs text-secondary">{{ metric.note }}</p>
      </article>
    </section>

    <section class="grid gap-0 md:grid-cols-4 md:grid-rows-2">
      <article
        v-for="(item, index) in records.slice(0, 4)"
        :key="item.id"
        class="lrw-sharp-grid border border-base-300 bg-base-100 p-5"
        :class="index === 0 ? 'md:col-span-2 md:row-span-2 border-accent/50 bg-base-200' : ''"
      >
        <p class="font-mono text-xs text-accent">{{ item.id }}</p>
        <h2 class="mt-2 font-display font-bold">{{ item.title }}</h2>
        <p class="mt-2 text-xs text-base-content/60">{{ item.owner }} · {{ item.updated }}</p>
        <span class="badge mt-3 border-0" :class="'badge-' + item.tone">{{ item.status }}</span>
      </article>
      <article
        v-for="item in highlights"
        :key="item.title"
        class="lrw-sharp-grid border border-base-300 bg-base-100 p-5 md:col-span-2"
      >
        <AppIcon :name="item.icon" class="text-secondary" />
        <h2 class="mt-2 font-semibold">{{ item.title }}</h2>
        <p class="text-sm text-base-content/70">{{ item.detail }}</p>
      </article>
    </section>

    <section class="lrw-sharp-grid border border-base-300 bg-base-100 p-6">
      <ul class="grid gap-2 text-sm sm:grid-cols-2">
        <li v-for="(entry, idx) in activity" :key="idx"><span class="text-primary">{{ entry.when }}</span> — {{ entry.text }}</li>
      </ul>
    </section>
  </div>
</template>
