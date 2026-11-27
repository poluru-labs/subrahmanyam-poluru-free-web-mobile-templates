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
    <section class="pbn-mag-hero grid gap-6 p-8 text-white lg:grid-cols-[1.35fr_1fr] lg:p-10">
      <div>
        <p class="text-xs font-bold uppercase tracking-widest text-white/65">{{ profile.kicker }}</p>
        <h1 class="mt-3 font-display text-4xl font-bold sm:text-5xl">{{ profile.headline }}</h1>
        <p class="mt-4 max-w-lg text-white/85">{{ profile.lede }}</p>
        <div class="mt-8 flex gap-3">
          <RouterLink to="/insights" class="btn rounded-box border-0 bg-accent text-accent-content">Open {{ profile.workspace }}</RouterLink>
          <RouterLink to="/about" class="btn rounded-box btn-outline border-white/40 text-white">About</RouterLink>
        </div>
      </div>
      <div class="pbn-mag-tile rounded-box bg-base-100/10 p-5">
        <h2 class="text-xs font-bold uppercase text-accent">Program shelf</h2>
        <ul class="mt-3 space-y-2 text-sm">
          <li v-for="item in records.slice(0, 4)" :key="item.id" class="border-b border-white/15 pb-2">{{ item.title }}</li>
        </ul>
      </div>
    </section>
    <section class="grid gap-0 sm:grid-cols-3">
      <article v-for="metric in metrics" :key="metric.label" class="pbn-mag-tile border-r border-base-300 bg-base-100 p-6 text-center last:border-r-0">
        <p class="font-display text-3xl font-bold text-primary">{{ metric.value }}</p>
        <p class="text-sm">{{ metric.label }}</p>
      </article>
    </section>
    <section class="grid gap-0 md:grid-cols-4 md:grid-rows-2">
      <article
        v-for="(item, index) in records.slice(0, 4)"
        :key="item.id"
        class="pbn-mag-tile border border-base-300 bg-base-100 p-5"
        :class="index === 0 ? 'md:col-span-2 md:row-span-2 bg-base-200 border-secondary/40' : ''"
      >
        <p class="font-mono text-xs text-accent">{{ item.id }}</p>
        <h2 class="mt-2 font-display font-bold">{{ item.title }}</h2>
        <span class="badge mt-3 rounded-box" :class="'badge-' + item.tone">{{ item.status }}</span>
      </article>
      <article v-for="item in highlights" :key="item.title" class="pbn-mag-tile border border-base-300 bg-base-100 p-5 md:col-span-2">
        <AppIcon :name="item.icon" class="text-secondary" />
        <h2 class="mt-2 font-semibold">{{ item.title }}</h2>
        <p class="text-sm text-base-content/70">{{ item.detail }}</p>
      </article>
    </section>
    <section class="pbn-mag-tile border border-base-300 bg-base-100 p-6">
      <ul class="grid gap-2 text-sm sm:grid-cols-2">
        <li v-for="(entry, idx) in activity" :key="idx"><span class="text-primary">{{ entry.when }}</span> — {{ entry.text }}</li>
      </ul>
    </section>
  </div>
</template>
