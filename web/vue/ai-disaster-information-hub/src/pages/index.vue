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
    <section class="grid gap-4 lg:grid-cols-[1.35fr_1fr]">
      <article class="alert-mag-hero rounded-box p-8 text-primary-content lg:p-10">
        <p class="text-xs font-bold uppercase tracking-widest text-white/70">{{ profile.kicker }}</p>
        <h1 class="mt-3 font-display text-4xl font-bold sm:text-5xl">{{ profile.headline }}</h1>
        <p class="mt-4 max-w-lg text-white/90">{{ profile.lede }}</p>
        <div class="mt-8 flex gap-3">
          <RouterLink to="/insights" class="btn rounded-box border-0 bg-accent text-accent-content">Open {{ profile.workspace }}</RouterLink>
          <RouterLink to="/about" class="btn rounded-box border border-white/35 bg-transparent text-white">About</RouterLink>
        </div>
      </article>
      <article class="alert-mag-accent rounded-box border border-base-300 bg-base-100 p-6">
        <h2 class="font-display text-sm font-bold uppercase text-accent">Live tiles</h2>
        <ul class="mt-4 space-y-3">
          <li v-for="item in records.slice(0, 4)" :key="item.id" class="border-l-4 border-primary pl-3">
            <p class="font-semibold">{{ item.title }}</p>
            <p class="text-xs text-base-content/55">{{ item.status }} · {{ item.updated }}</p>
          </li>
        </ul>
      </article>
    </section>

    <section class="grid gap-4 sm:grid-cols-3">
      <article
        v-for="metric in metrics"
        :key="metric.label"
        class="alert-mag-tile rounded-box border border-base-300 bg-base-100 p-6 text-center"
      >
        <p class="text-xs uppercase text-base-content/50">{{ metric.label }}</p>
        <p class="mt-2 font-display text-3xl font-bold text-primary">{{ metric.value }}</p>
        <p class="text-sm text-secondary">{{ metric.note }}</p>
      </article>
    </section>

    <section class="grid gap-4 md:grid-cols-3">
      <article
        v-for="(item, index) in highlights"
        :key="item.title"
        class="rounded-box border border-base-300 bg-base-100 p-6"
        :class="index === 0 ? 'border-accent/40 bg-accent/5 md:col-span-2' : ''"
      >
        <AppIcon :name="item.icon" class="text-primary" />
        <h2 class="mt-3 font-display font-bold">{{ item.title }}</h2>
        <p class="mt-2 text-sm text-base-content/70">{{ item.detail }}</p>
      </article>
    </section>

    <section class="rounded-box border border-dashed border-accent/40 bg-base-100 p-6">
      <h2 class="text-xs font-bold uppercase text-accent">Brief updates</h2>
      <ul class="mt-3 grid gap-2 sm:grid-cols-2 text-sm">
        <li v-for="(entry, idx) in activity" :key="idx"><span class="text-primary">{{ entry.when }}</span> — {{ entry.text }}</li>
      </ul>
    </section>
  </div>
</template>