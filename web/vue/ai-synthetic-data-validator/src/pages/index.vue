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

const columns = ['Distribution', 'Privacy', 'Rare cases']
</script>

<template>
  <div class="overflow-hidden rounded-box border border-base-300 bg-base-100">
    <section class="sdv-masthead grid gap-6 px-6 py-10 text-white lg:grid-cols-[1.15fr_1fr] lg:px-10">
      <div>
        <p class="text-xs font-bold uppercase tracking-widest text-white/70">{{ profile.kicker }}</p>
        <h1 class="mt-3 font-display text-4xl font-bold sm:text-5xl">{{ profile.headline }}</h1>
        <p class="mt-4 max-w-xl text-white/85">{{ profile.lede }}</p>
        <div class="mt-6 flex flex-wrap gap-3">
          <RouterLink to="/insights" class="rounded-box bg-white px-4 py-2 text-sm font-semibold text-primary">Open {{ profile.workspace }}</RouterLink>
          <RouterLink to="/about" class="rounded-box border border-white/35 px-4 py-2 text-sm text-white">About</RouterLink>
        </div>
      </div>
      <div class="grid grid-cols-3 gap-2 self-end">
        <article v-for="metric in metrics" :key="metric.label" class="sdv-fidelity-pill rounded-box p-3 text-center">
          <p class="font-display text-xl font-bold">{{ metric.value }}</p>
          <p class="text-[10px] uppercase text-white/70">{{ metric.label }}</p>
        </article>
      </div>
    </section>

    <section class="grid border-t border-base-300 lg:grid-cols-3">
      <article
        v-for="(col, index) in columns"
        :key="col"
        class="sdv-sample-col border-b border-base-300 p-6 lg:border-b-0 lg:border-r last:lg:border-r-0"
      >
        <p class="text-xs font-bold uppercase text-accent">{{ col }}</p>
        <h2 class="mt-2 font-display text-xl font-bold text-primary">{{ col }} checks</h2>
        <ul class="mt-4 space-y-3">
          <li
            v-for="item in records.slice(index * 2, index * 2 + 2)"
            :key="item.id"
            class="rounded-box border border-base-300 bg-base-100 p-3 text-sm"
          >
            <p class="font-medium">{{ item.title }}</p>
            <p class="mt-1 font-mono text-xs text-base-content/55">{{ item.id }}</p>
            <span class="badge mt-2 badge-sm rounded-box" :class="'badge-' + item.tone">{{ item.status }}</span>
          </li>
        </ul>
      </article>
    </section>

    <section class="grid gap-4 border-t border-base-300 p-6 md:grid-cols-3">
      <article v-for="item in highlights" :key="item.title" class="rounded-box border border-primary/25 bg-base-200/60 p-5">
        <AppIcon :name="item.icon" class="text-primary" />
        <h2 class="mt-3 font-semibold">{{ item.title }}</h2>
        <p class="mt-2 text-sm text-base-content/70">{{ item.detail }}</p>
      </article>
    </section>

    <section class="border-t border-base-300 bg-base-200 p-6 text-sm">
      <ul class="space-y-2">
        <li v-for="(entry, idx) in activity" :key="idx"><span class="text-secondary">{{ entry.when }}</span> — {{ entry.text }}</li>
      </ul>
    </section>
  </div>
</template>