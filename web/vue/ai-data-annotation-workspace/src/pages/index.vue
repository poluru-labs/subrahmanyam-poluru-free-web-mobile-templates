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

  <div class="grid gap-6 lg:grid-cols-2">
    <section class="label-canvas rounded-box border border-base-300 p-8 lg:p-10">
      <p class="text-xs font-bold uppercase tracking-widest text-primary">{{ profile.kicker }}</p>
      <h1 class="mt-3 text-4xl font-bold">{{ profile.headline }}</h1>
      <p class="mt-4 text-base-content/75">{{ profile.lede }}</p>
      <div class="mt-8 flex gap-3">
        <RouterLink to="/insights" class="btn btn-primary rounded-box">Open {{ profile.workspace }}</RouterLink>
        <RouterLink to="/about" class="btn btn-outline rounded-box">About</RouterLink>
      </div>
      <div class="mt-10 grid grid-cols-3 gap-3">
        <article v-for="metric in metrics" :key="metric.label" class="rounded-box bg-base-300/50 p-3 text-center">
          <p class="text-xl font-bold text-primary">{{ metric.value }}</p>
          <p class="text-[10px] uppercase text-base-content/50">{{ metric.label }}</p>
        </article>
      </div>
    </section>
    <section class="rounded-box border border-base-300 bg-base-100 p-6">
      <h2 class="font-display font-bold">Task queue</h2>
      <ul class="mt-4 space-y-3">
        <li v-for="item in records" :key="item.id" class="rounded-box border border-base-300 bg-base-200 p-4">
          <div class="flex justify-between gap-2">
            <p class="font-medium">{{ item.title }}</p>
            <span class="badge rounded-box" :class="'badge-' + item.tone">{{ item.status }}</span>
          </div>
          <p class="mt-1 text-xs text-base-content/55">Agreement {{ item.score }} · {{ item.owner }}</p>
        </li>
      </ul>
      <div class="mt-6 grid gap-3">
        <article v-for="item in highlights" :key="item.title" class="flex gap-3 text-sm">
          <AppIcon :name="item.icon" class="text-accent shrink-0" />
          <div><p class="font-semibold">{{ item.title }}</p><p class="text-base-content/65">{{ item.detail }}</p></div>
        </article>
      </div>
    </section>
  </div>
</template>
