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

  <div class="space-y-0">
    <section class="rounded-box bg-primary text-primary-content p-8 sm:p-12">
      <p class="text-sm font-medium opacity-90">{{ profile.kicker }}</p>
      <h1 class="mt-3 text-4xl font-bold">{{ profile.headline }}</h1>
      <p class="mt-4 max-w-lg opacity-90">{{ profile.lede }}</p>
      <div class="mt-8 flex gap-3">
        <RouterLink to="/insights" class="btn rounded-box bg-base-100 text-primary border-0">Open {{ profile.workspace }}</RouterLink>
        <RouterLink to="/about" class="btn rounded-box btn-outline border-white/40 text-white">About</RouterLink>
      </div>
    </section>
    <section class="grid gap-6 py-10 sm:grid-cols-2">
      <article v-for="(item, idx) in highlights" :key="item.title"
        class="rounded-box border border-base-300 bg-base-100 p-6"
        :class="idx % 2 === 1 ? 'sm:translate-y-6' : ''">
        <AppIcon :name="item.icon" class="text-secondary" />
        <h2 class="mt-3 font-display font-bold">{{ item.title }}</h2>
        <p class="mt-2 text-sm text-base-content/70">{{ item.detail }}</p>
      </article>
    </section>
    <section class="rounded-box border border-base-300 bg-base-100 p-6">
      <h2 class="font-display font-bold">Consent records</h2>
      <ul class="mt-4 space-y-3">
        <li v-for="item in records" :key="item.id" class="flex flex-wrap justify-between gap-2 border-b border-base-300 pb-3 text-sm last:border-b-0">
          <span>{{ item.title }}</span>
          <span class="badge rounded-box" :class="'badge-' + item.tone">{{ item.status }}</span>
        </li>
      </ul>
    </section>
    <section class="grid grid-cols-3 gap-4 py-8">
      <article v-for="metric in metrics" :key="metric.label" class="text-center">
        <p class="text-2xl font-bold text-primary">{{ metric.value }}</p>
        <p class="text-xs text-base-content/55">{{ metric.label }}</p>
      </article>
    </section>
  </div>
</template>
