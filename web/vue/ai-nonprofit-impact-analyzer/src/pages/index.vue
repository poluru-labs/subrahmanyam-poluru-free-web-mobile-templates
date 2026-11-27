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
  <div class="space-y-0 overflow-hidden rounded-box border border-base-300 bg-base-100">
    <section class="nimp-story-tick rounded-box p-8 lg:p-10">
      <p class="text-xs font-bold uppercase tracking-widest text-secondary">{{ profile.kicker }}</p>
      <h1 class="mt-3 max-w-2xl font-display text-4xl font-bold">{{ profile.headline }}</h1>
      <p class="mt-4 max-w-xl text-base-content/70">{{ profile.lede }}</p>
      <div class="mt-6 flex gap-3">
        <RouterLink to="/insights" class="btn btn-primary rounded-box">Open {{ profile.workspace }}</RouterLink>
        <RouterLink to="/about" class="btn btn-outline rounded-box">About</RouterLink>
      </div>
    </section>
    <section class="grid border-y border-base-300 sm:grid-cols-3">
      <article v-for="metric in metrics" :key="metric.label" class="border-b border-base-300 p-6 text-center sm:border-b-0 sm:border-r last:sm:border-r-0">
        <p class="font-display text-3xl font-bold text-primary">{{ metric.value }}</p>
        <p class="mt-1 text-sm">{{ metric.label }}</p>
      </article>
    </section>
    <section aria-label="Impact zigzag">
      <article
        v-for="(item, index) in records"
        :key="item.id"
        class="grid items-center gap-6 border-b border-base-300 p-6 md:grid-cols-2 lg:p-8"
        :class="index % 2 === 0 ? 'nimp-zig-primary' : 'nimp-zig-secondary'"
      >
        <div :class="index % 2 === 1 ? 'md:order-2' : ''">
          <p class="font-mono text-xs text-primary">{{ item.id }}</p>
          <h2 class="mt-2 font-display text-2xl font-bold">{{ item.title }}</h2>
          <span class="badge mt-3 rounded-box" :class="'badge-' + item.tone">{{ item.status }}</span>
        </div>
        <p class="text-sm text-base-content/75" :class="index % 2 === 1 ? 'md:order-1 md:text-right' : ''">Score {{ item.score }} · {{ item.owner }}</p>
      </article>
    </section>
    <section class="grid gap-4 p-6 md:grid-cols-3">
      <article v-for="item in highlights" :key="item.title" class="rounded-box border border-base-300 p-5">
        <AppIcon :name="item.icon" class="text-accent" />
        <h2 class="mt-3 font-semibold">{{ item.title }}</h2>
        <p class="mt-2 text-sm text-base-content/70">{{ item.detail }}</p>
      </article>
    </section>
    <section class="border-t border-base-300 p-6 text-sm">
      <ul class="space-y-2">
        <li v-for="(entry, idx) in activity" :key="idx"><span class="text-primary">{{ entry.when }}</span> — {{ entry.text }}</li>
      </ul>
    </section>
  </div>
</template>
