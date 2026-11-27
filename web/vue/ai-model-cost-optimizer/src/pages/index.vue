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

const spendWidths = [78, 52, 66]
</script>

<template>
  <div class="mco-ops-panel space-y-0 overflow-hidden rounded-box bg-base-100">
    <section class="grid border-b border-base-300 lg:grid-cols-[1.15fr_1fr]">
      <div class="border-b border-base-300 p-6 lg:border-b-0 lg:border-r lg:p-8">
        <p class="text-xs font-bold uppercase text-secondary">{{ profile.kicker }}</p>
        <h1 class="mt-2 font-display text-4xl font-bold">{{ profile.headline }}</h1>
        <p class="mt-3 text-base-content/70">{{ profile.lede }}</p>
        <div class="mt-6 flex gap-2">
          <RouterLink to="/insights" class="btn btn-primary rounded-box">Open {{ profile.workspace }}</RouterLink>
          <RouterLink to="/about" class="btn btn-outline rounded-box">About</RouterLink>
        </div>
      </div>
      <div class="grid grid-cols-3 divide-x divide-base-300 bg-base-200">
        <article v-for="metric in metrics" :key="metric.label" class="p-4 text-center">
          <p class="font-display text-2xl font-bold text-primary">{{ metric.value }}</p>
          <p class="mt-1 text-[10px] uppercase text-base-content/55">{{ metric.label }}</p>
        </article>
      </div>
    </section>

    <section class="border-b border-base-300 p-6 lg:p-8">
      <h2 class="text-xs font-bold uppercase text-base-content/55">Spend load</h2>
      <div class="mt-5 space-y-4">
        <article v-for="(metric, index) in metrics" :key="'bar-' + metric.label">
          <div class="flex justify-between text-sm">
            <span class="font-medium">{{ metric.label }}</span>
            <span class="text-secondary">{{ metric.note }}</span>
          </div>
          <div class="mt-2 h-3 overflow-hidden rounded-box bg-base-300">
            <div class="mco-spend-bar h-full rounded-box" :style="{ width: spendWidths[index] + '%' }" />
          </div>
        </article>
      </div>
    </section>

    <section class="grid lg:grid-cols-2">
      <div class="border-b border-base-300 p-6 lg:border-b-0 lg:border-r">
        <h2 class="text-xs font-bold uppercase">Models</h2>
        <ul class="mt-3 divide-y divide-base-300">
          <li v-for="item in records" :key="item.id" class="flex justify-between gap-3 py-3 text-sm">
            <span class="font-medium">{{ item.title }}</span>
            <span class="badge rounded-box" :class="'badge-' + item.tone">{{ item.status }}</span>
          </li>
        </ul>
      </div>
      <div class="p-6">
        <h2 class="text-xs font-bold uppercase text-accent">Cut signals</h2>
        <ul class="mt-4 space-y-4">
          <li v-for="item in highlights" :key="item.title" class="flex gap-3">
            <AppIcon :name="item.icon" class="text-secondary" />
            <div>
              <p class="font-semibold">{{ item.title }}</p>
              <p class="text-xs text-base-content/65">{{ item.detail }}</p>
            </div>
          </li>
        </ul>
        <ul class="mt-6 space-y-2 border-t border-base-300 pt-4 text-xs">
          <li v-for="(entry, idx) in activity" :key="idx"><span class="text-primary">{{ entry.when }}</span> — {{ entry.text }}</li>
        </ul>
      </div>
    </section>
  </div>
</template>
