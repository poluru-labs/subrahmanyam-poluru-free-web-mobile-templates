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
  <div class="space-y-14">
    <section class="grid overflow-hidden border border-base-300 bg-base-100 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]">
      <div class="audit-hero-panel audit-grid-bg relative p-8 text-white lg:p-12">
        <p class="text-xs font-bold uppercase tracking-[0.2em] text-secondary">{{ profile.kicker }}</p>
        <h1 class="mt-4 max-w-lg text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl">
          {{ profile.headline }}
        </h1>
        <p class="mt-5 max-w-md text-sm leading-relaxed text-white/75 sm:text-base">
          {{ profile.lede }}
        </p>
        <div class="mt-8 flex flex-wrap gap-3">
          <RouterLink to="/insights" class="btn border-0 bg-primary text-primary-content hover:bg-primary/90">
            Open {{ profile.workspace }}
          </RouterLink>
          <RouterLink to="/about" class="btn border border-white/25 bg-transparent text-white hover:bg-white/10">
            About
          </RouterLink>
        </div>
        <div class="absolute -right-6 bottom-8 hidden lg:block" aria-hidden="true">
          <div
            class="audit-score-ring flex size-36 items-center justify-center rounded-full p-[6px] shadow-[0_20px_60px_rgb(0_0_0/0.45)]"
          >
            <div class="flex size-full flex-col items-center justify-center bg-[#1c2430]">
              <span class="text-3xl font-bold text-white">92</span>
              <span class="text-[10px] uppercase tracking-widest text-white/60">AA score</span>
            </div>
          </div>
        </div>
      </div>

      <div class="flex flex-col justify-between border-l border-base-300 bg-base-100 p-6 lg:p-8">
        <div>
          <div class="flex items-center justify-between gap-3 border-b border-base-300 pb-3">
            <h2 class="font-display text-sm font-bold uppercase tracking-wide">Live queue</h2>
            <span class="badge badge-error badge-outline">12 critical</span>
          </div>
          <ul class="mt-1 divide-y divide-base-300">
            <li
              v-for="item in records.slice(0, 5)"
              :key="item.id"
              class="flex items-start justify-between gap-3 py-4"
            >
              <div class="min-w-0">
                <p class="truncate font-semibold">{{ item.title }}</p>
                <p class="mt-1 font-mono text-xs text-base-content/55">
                  {{ item.id }} · {{ item.owner }}
                </p>
              </div>
              <span class="badge shrink-0" :class="'badge-' + item.tone">{{ item.status }}</span>
            </li>
          </ul>
        </div>
        <div class="mt-6 border border-dashed border-base-300 bg-base-200 p-4 contrast-stripes">
          <p class="bg-base-100 px-2 py-1 text-xs font-medium text-base-content/70">
            Keyboard pass scheduled · Checkout flow · 2h
          </p>
        </div>
      </div>
    </section>

    <section class="grid gap-px bg-base-300 sm:grid-cols-3" aria-label="Summary metrics">
      <article v-for="metric in metrics" :key="metric.label" class="bg-base-100 p-6 lg:p-8">
        <p class="text-xs font-bold uppercase tracking-widest text-base-content/50">{{ metric.label }}</p>
        <p class="mt-2 font-display text-4xl font-bold text-primary">{{ metric.value }}</p>
        <p class="mt-2 text-sm text-base-content/65">{{ metric.note }}</p>
      </article>
    </section>

    <section class="grid gap-6 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)]">
      <div class="grid gap-4 md:grid-cols-3" aria-label="Highlights">
        <article
          v-for="item in highlights"
          :key="item.title"
          class="group border border-base-300 bg-base-100 p-6 transition-colors hover:border-primary hover:bg-primary/5"
        >
          <AppIcon :name="item.icon" class="text-secondary" />
          <h2 class="mt-4 font-display text-lg font-bold">{{ item.title }}</h2>
          <p class="mt-2 text-sm leading-relaxed text-base-content/70">{{ item.detail }}</p>
        </article>
      </div>
      <aside class="border border-base-300 bg-base-100 p-6">
        <h2 class="font-display text-sm font-bold uppercase tracking-wide">Activity</h2>
        <ul class="mt-4 space-y-4">
          <li v-for="(entry, index) in activity" :key="index" class="flex gap-3 text-sm">
            <span class="w-16 shrink-0 font-mono text-xs text-base-content/45">{{ entry.when }}</span>
            <span class="text-base-content/80">{{ entry.text }}</span>
          </li>
        </ul>
      </aside>
    </section>
  </div>
</template>