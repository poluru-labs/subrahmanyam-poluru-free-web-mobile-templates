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

  <div class="space-y-10">
    <section class="rounded-box bg-gradient-to-br from-primary/15 via-base-100 to-secondary/10 p-8 sm:p-12 text-center">
      <p class="text-sm font-semibold text-primary">{{ profile.kicker }}</p>
      <h1 class="mx-auto mt-3 max-w-2xl text-4xl font-bold">{{ profile.headline }}</h1>
      <p class="mx-auto mt-4 max-w-xl text-base-content/70">{{ profile.lede }}</p>
      <div class="mt-8 flex justify-center gap-3">
        <RouterLink to="/insights" class="btn btn-primary rounded-box">Open {{ profile.workspace }}</RouterLink>
        <RouterLink to="/about" class="btn btn-outline rounded-box">About</RouterLink>
      </div>
    </section>
    <section class="grid gap-4 sm:grid-cols-3">
      <article v-for="metric in metrics" :key="metric.label" class="rounded-box bg-base-100 border border-base-300 p-6 text-center shadow-sm">
        <p class="text-3xl font-bold text-primary">{{ metric.value }}</p>
        <p class="mt-1 text-sm font-semibold">{{ metric.label }}</p>
        <p class="text-xs text-base-content/55">{{ metric.note }}</p>
      </article>
    </section>
    <section aria-label="Verification steps" class="rounded-box border border-base-300 bg-base-100 p-6 sm:p-8">
      <h2 class="font-display text-xl font-bold">Pipeline</h2>
      <ol class="relative mt-6 space-y-6">
        <li v-for="(item, index) in highlights" :key="item.title" class="cite-step relative flex gap-4 pl-10">
          <span class="absolute left-0 flex size-9 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-content">{{ index + 1 }}</span>
          <div>
            <h3 class="font-semibold">{{ item.title }}</h3>
            <p class="mt-1 text-sm text-base-content/70">{{ item.detail }}</p>
          </div>
        </li>
      </ol>
    </section>
    <section class="rounded-box border border-base-300 bg-base-100 p-6">
      <h2 class="font-display font-bold">In review</h2>
      <ul class="mt-4 space-y-3">
        <li v-for="item in records.slice(0, 4)" :key="item.id" class="flex justify-between gap-2 rounded-box bg-base-200 px-4 py-3 text-sm">
          <span>{{ item.title }}</span>
          <span class="badge rounded-box" :class="'badge-' + item.tone">{{ item.status }}</span>
        </li>
      </ul>
    </section>
  </div>
</template>
