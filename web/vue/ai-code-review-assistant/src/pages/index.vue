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

  <div class="lg:flex lg:min-h-[70vh]">
    <aside class="review-rail hidden w-52 shrink-0 p-6 text-white lg:block">
      <p class="text-xs uppercase tracking-widest text-white/50">Risk rail</p>
      <ul class="mt-6 space-y-3 text-sm">
        <li class="border-l-2 border-primary pl-3 font-semibold">High risk</li>
        <li class="border-l-2 border-white/20 pl-3 text-white/70">Missing tests</li>
        <li class="border-l-2 border-white/20 pl-3 text-white/70">Open questions</li>
      </ul>
      <p class="mt-8 text-xs text-white/40">Midnight secondary · Crimson primary</p>
    </aside>
    <div class="flex-1 space-y-8 p-6 lg:p-10">
      <section>
        <p class="text-xs font-bold uppercase text-primary">{{ profile.kicker }}</p>
        <h1 class="mt-2 text-4xl font-bold">{{ profile.headline }}</h1>
        <p class="mt-3 max-w-2xl text-base-content/70">{{ profile.lede }}</p>
        <div class="mt-6 flex gap-3">
          <RouterLink to="/insights" class="btn btn-primary rounded-field">Open {{ profile.workspace }}</RouterLink>
          <RouterLink to="/about" class="btn btn-outline rounded-field">About</RouterLink>
        </div>
      </section>
      <section class="grid gap-4 sm:grid-cols-3">
        <article v-for="metric in metrics" :key="metric.label" class="rounded-field border border-base-300 bg-base-100 p-5">
          <p class="text-2xl font-bold text-primary">{{ metric.value }}</p>
          <p class="text-sm text-base-content/60">{{ metric.label }}</p>
        </article>
      </section>
      <section class="rounded-field border border-base-300 bg-base-100">
        <h2 class="border-b border-base-300 px-4 py-3 text-sm font-bold uppercase">Queue</h2>
        <ul>
          <li v-for="item in records" :key="item.id" class="flex justify-between gap-3 border-b border-base-300 px-4 py-3 last:border-b-0">
            <div><p class="font-medium">{{ item.title }}</p><p class="text-xs text-base-content/55">{{ item.id }}</p></div>
            <span class="badge rounded-field" :class="'badge-' + item.tone">{{ item.status }}</span>
          </li>
        </ul>
      </section>
    </div>
  </div>
</template>
