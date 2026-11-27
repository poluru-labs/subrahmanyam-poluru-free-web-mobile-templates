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
  <div class="space-y-8">
    <section class="mlang-mosaic-b rounded-box border border-base-300 p-8 sm:p-10">
      <p class="mlang-locale-chip inline-block rounded-box px-3 py-1 text-xs font-bold uppercase text-white">{{ profile.kicker }}</p>
      <h1 class="mt-4 font-display text-4xl font-bold">{{ profile.headline }}</h1>
      <p class="mt-3 max-w-xl text-base-content/75">{{ profile.lede }}</p>
      <div class="mt-6 flex gap-3">
        <RouterLink to="/insights" class="btn btn-secondary rounded-box">Open {{ profile.workspace }}</RouterLink>
        <RouterLink to="/about" class="btn btn-outline rounded-box">About</RouterLink>
      </div>
    </section>
    <section class="grid gap-3 sm:grid-cols-3">
      <article v-for="metric in metrics" :key="metric.label" class="rounded-box border border-base-300 bg-base-100 p-5 text-center">
        <p class="font-display text-2xl font-bold text-secondary">{{ metric.value }}</p>
        <p class="text-sm">{{ metric.label }}</p>
      </article>
    </section>
    <section class="grid gap-3 sm:grid-cols-2 lg:grid-cols-4 auto-rows-fr">
      <article
        v-for="(item, index) in records.slice(0, 4)"
        :key="item.id"
        class="rounded-box border border-base-300 bg-base-100 p-5"
        :class="index === 0 ? 'mlang-mosaic-a sm:col-span-1 lg:row-span-2' : ''"
      >
        <p class="text-xs font-mono text-accent">{{ item.id }}</p>
        <h2 class="mt-2 font-display font-bold">{{ item.title }}</h2>
        <p class="mt-2 text-xs text-base-content/60">{{ item.owner }}</p>
        <span class="badge mt-3 rounded-box" :class="'badge-' + item.tone">{{ item.status }}</span>
      </article>
      <article v-for="item in highlights" :key="item.title" class="mlang-mosaic-b rounded-box border border-secondary/30 p-4 lg:col-span-2">
        <AppIcon :name="item.icon" class="text-secondary" />
        <p class="mt-2 text-sm font-semibold">{{ item.title }}</p>
        <p class="text-xs text-base-content/65">{{ item.detail }}</p>
      </article>
    </section>
    <ul class="rounded-box border border-base-300 bg-base-100 p-6 text-sm space-y-2">
      <li v-for="(entry, idx) in activity" :key="idx"><span class="text-secondary">{{ entry.when }}</span> — {{ entry.text }}</li>
    </ul>
  </div>
</template>
