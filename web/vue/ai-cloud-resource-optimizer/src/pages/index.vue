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

  <div class="space-y-0 border border-base-300 bg-base-100">
    <section class="grid border-b border-base-300 lg:grid-cols-[1.2fr_1fr]">
      <div class="border-r border-base-300 p-6 lg:p-8">
        <p class="text-xs font-bold uppercase text-primary">{{ profile.kicker }}</p>
        <h1 class="mt-2 text-3xl font-bold lg:text-4xl">{{ profile.headline }}</h1>
        <p class="mt-3 text-base-content/70">{{ profile.lede }}</p>
        <div class="mt-6 flex gap-2">
          <RouterLink to="/insights" class="btn btn-primary">Open {{ profile.workspace }}</RouterLink>
          <RouterLink to="/about" class="btn btn-outline">About</RouterLink>
        </div>
      </div>
      <div class="grid grid-cols-3 divide-x divide-base-300 bg-base-200">
        <article v-for="metric in metrics" :key="metric.label" class="p-4 text-center">
          <p class="text-2xl font-bold text-primary">{{ metric.value }}</p>
          <p class="mt-1 text-[10px] uppercase tracking-wide text-base-content/55">{{ metric.label }}</p>
        </article>
      </div>
    </section>
    <section class="grid lg:grid-cols-2">
      <div class="border-b border-base-300 p-6 lg:border-b-0 lg:border-r">
        <h2 class="text-xs font-bold uppercase text-base-content/50">Recommendations</h2>
        <ul class="mt-3 divide-y divide-base-300">
          <li v-for="item in records" :key="item.id" class="flex justify-between gap-3 py-3 text-sm">
            <span class="font-medium">{{ item.title }}</span>
            <span class="badge" :class="'badge-' + item.tone">{{ item.status }}</span>
          </li>
        </ul>
      </div>
      <div class="p-6">
        <h2 class="text-xs font-bold uppercase">Savings signals</h2>
        <ul class="mt-4 space-y-4">
          <li v-for="item in highlights" :key="item.title" class="flex gap-3 border-l-4 border-secondary pl-3">
            <div><p class="font-semibold">{{ item.title }}</p><p class="text-xs text-base-content/65">{{ item.detail }}</p></div>
          </li>
        </ul>
      </div>
    </section>
  </div>
</template>
