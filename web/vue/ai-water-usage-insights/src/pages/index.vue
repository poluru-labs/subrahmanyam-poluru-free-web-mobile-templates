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
    <section class="wui-watershed-band rounded-box p-8 text-white lg:p-10">
      <p class="text-xs font-bold uppercase tracking-widest text-white/70">{{ profile.kicker }}</p>
      <h1 class="mt-3 max-w-2xl font-display text-4xl font-bold sm:text-5xl">{{ profile.headline }}</h1>
      <p class="mt-4 max-w-xl text-white/85">{{ profile.lede }}</p>
      <div class="mt-6 flex flex-wrap gap-3">
        <RouterLink to="/insights" class="rounded-box bg-white px-4 py-2 text-sm font-semibold text-primary">Open {{ profile.workspace }}</RouterLink>
        <RouterLink to="/about" class="rounded-box border border-white/35 px-4 py-2 text-sm text-white">About</RouterLink>
      </div>
    </section>

    <section class="grid border-y border-base-300 sm:grid-cols-3" aria-label="Summary metrics">
      <article v-for="metric in metrics" :key="metric.label" class="border-b border-base-300 p-6 text-center sm:border-b-0 sm:border-r last:sm:border-r-0">
        <p class="font-display text-3xl font-bold text-primary">{{ metric.value }}</p>
        <p class="text-sm">{{ metric.label }}</p>
        <p class="text-xs text-secondary">{{ metric.note }}</p>
      </article>
    </section>

    <section aria-label="Watershed usage zigzag">
      <article
        v-for="(item, index) in records"
        :key="item.id"
        class="grid items-center gap-6 border-b border-base-300 p-6 md:grid-cols-2 lg:p-8"
        :class="index % 2 === 0 ? 'wui-zig-primary' : 'wui-zig-secondary'"
      >
        <div :class="index % 2 === 1 ? 'md:order-2' : ''">
          <p class="font-mono text-xs text-primary">{{ item.id }}</p>
          <h2 class="mt-2 font-display text-2xl font-bold">{{ item.title }}</h2>
          <p class="mt-2 text-sm text-base-content/65">{{ item.owner }} · {{ item.updated }}</p>
          <span class="badge mt-3 rounded-box" :class="'badge-' + item.tone">{{ item.status }}</span>
        </div>
        <p class="text-sm text-base-content/75" :class="index % 2 === 1 ? 'md:order-1 md:text-right' : ''">
          District reading {{ item.score }} — usage story across the watershed zigzag.
        </p>
      </article>
    </section>

    <section class="grid gap-4 p-6 md:grid-cols-3 lg:p-8">
      <article v-for="item in highlights" :key="item.title" class="rounded-box border border-base-300 bg-base-100 p-5">
        <AppIcon :name="item.icon" class="text-secondary" />
        <h2 class="mt-3 font-semibold">{{ item.title }}</h2>
        <p class="mt-2 text-sm text-base-content/70">{{ item.detail }}</p>
      </article>
    </section>

    <section class="border-t border-base-300 bg-base-100 p-6">
      <ul class="space-y-2 text-sm">
        <li v-for="(entry, idx) in activity" :key="idx"><span class="text-primary">{{ entry.when }}</span> — {{ entry.text }}</li>
      </ul>
    </section>
  </div>
</template>