<route lang="json">
{
  "meta": { "title": "Home" }
}
</route>


<script setup lang="ts">
import { RouterLink } from 'vue-router'
import AppIcon from '@/components/icons/AppIcon.vue'
import highlights from '../../mock/highlights.json'
import metrics from '../../mock/metrics.json'
import profile from '../../mock/profile.json'
import records from '../../mock/records.json'
</script>

<template>

  <div class="space-y-12">
    <section class="grid mag-feature gap-4 max-lg:grid-cols-1">
      <article class="rounded-box bg-primary p-8 text-primary-content lg:p-10">
        <p class="text-xs font-bold uppercase tracking-widest text-white/70">{{ profile.kicker }}</p>
        <h1 class="mt-3 text-4xl font-bold leading-tight sm:text-5xl">{{ profile.headline }}</h1>
        <p class="mt-4 text-white/85">{{ profile.lede }}</p>
        <div class="mt-8 flex gap-3">
          <RouterLink to="/insights" class="btn rounded-box bg-base-100 text-primary border-0">Open {{ profile.workspace }}</RouterLink>
          <RouterLink to="/about" class="btn rounded-box btn-outline border-white/40 text-white">About</RouterLink>
        </div>
      </article>
      <article class="rounded-box border border-base-300 bg-base-100 p-6">
        <h2 class="font-display text-lg font-bold">Latest diffs</h2>
        <ul class="mt-4 space-y-3">
          <li v-for="item in records.slice(0, 4)" :key="item.id" class="border-l-4 border-accent pl-3">
            <p class="font-semibold">{{ item.title }}</p>
            <p class="text-xs text-base-content/55">{{ item.status }} · {{ item.updated }}</p>
          </li>
        </ul>
      </article>
    </section>
    <section class="grid gap-4 sm:grid-cols-3">
      <article v-for="metric in metrics" :key="metric.label" class="mag-tile rounded-box border border-base-300 bg-base-100 p-6 text-center">
        <p class="text-xs uppercase text-base-content/50">{{ metric.label }}</p>
        <p class="mt-2 text-3xl font-bold text-primary">{{ metric.value }}</p>
        <p class="text-sm text-base-content/60">{{ metric.note }}</p>
      </article>
    </section>
    <section class="grid gap-4 md:grid-cols-3">
      <article v-for="item in highlights" :key="item.title" class="rounded-box border border-base-300 bg-base-100 p-6">
        <AppIcon :name="item.icon" class="text-secondary" />
        <h2 class="mt-3 font-display font-bold">{{ item.title }}</h2>
        <p class="mt-2 text-sm text-base-content/70">{{ item.detail }}</p>
      </article>
    </section>
  </div>
</template>
