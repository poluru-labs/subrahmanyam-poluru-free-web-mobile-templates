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
    <section class="rounded-box border border-base-300 bg-base-100 p-8">
      <p class="text-xs font-bold uppercase tracking-widest text-primary">{{ profile.kicker }}</p>
      <h1 class="mt-3 max-w-2xl text-4xl font-bold">{{ profile.headline }}</h1>
      <p class="mt-4 max-w-xl text-base-content/70">{{ profile.lede }}</p>
      <div class="mt-6 flex gap-3">
        <RouterLink to="/insights" class="btn btn-primary rounded-field">Open {{ profile.workspace }}</RouterLink>
        <RouterLink to="/about" class="btn btn-outline rounded-field">About</RouterLink>
      </div>
    </section>

    <section class="grid gap-4 sm:grid-cols-3" aria-label="Summary metrics">
      <article v-for="metric in metrics" :key="metric.label" class="rounded-field border border-base-300 bg-base-100 p-6 text-center">
        <p class="text-xs uppercase text-base-content/50">{{ metric.label }}</p>
        <p class="mt-2 font-display text-3xl font-bold text-primary">{{ metric.value }}</p>
        <p class="text-sm text-secondary">{{ metric.note }}</p>
      </article>
    </section>

    <section class="rounded-box border border-base-300 bg-base-100 p-6 lg:p-8">
      <h2 class="font-display text-xl font-bold">Review timeline</h2>
      <ol class="mt-8 space-y-0">
        <li
          v-for="(item, index) in records.slice(0, 5)"
          :key="item.id"
          class="flex gap-4 pb-8 last:pb-0"
        >
          <div class="flex flex-col items-center">
            <span class="doc-step-dot size-3 rounded-full bg-primary" />
            <span
              v-if="index < 4"
              class="doc-step-track mt-1 w-0.5 flex-1"
              aria-hidden="true"
            />
          </div>
          <article class="min-w-0 flex-1 border border-base-300 bg-base-200/50 p-4">
            <p class="font-mono text-xs text-accent">Step {{ index + 1 }}</p>
            <h3 class="mt-1 font-semibold">{{ item.title }}</h3>
            <p class="mt-1 text-sm text-base-content/60">{{ item.owner }} · {{ item.updated }}</p>
            <span class="badge mt-2 rounded-field" :class="'badge-' + item.tone">{{ item.status }}</span>
          </article>
        </li>
      </ol>
    </section>

    <section class="grid gap-4 md:grid-cols-3">
      <article v-for="item in highlights" :key="item.title" class="rounded-field border border-base-300 bg-base-100 p-6">
        <AppIcon :name="item.icon" class="text-primary" />
        <h2 class="mt-3 font-display font-bold">{{ item.title }}</h2>
        <p class="mt-2 text-sm text-base-content/70">{{ item.detail }}</p>
      </article>
    </section>
  </div>
</template>