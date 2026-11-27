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

const pathProgress = [74, 61, 88]
</script>

<template>
  <div class="space-y-16">
    <section class="relative pt-4">
      <div
        class="pointer-events-none absolute inset-x-8 top-0 z-0 h-32 rounded-full bg-primary/20 blur-3xl"
        aria-hidden="true"
      />
      <div
        class="learn-hero-float relative z-10 -mt-2 rounded-box border border-base-300 bg-base-100 px-6 py-10 text-center sm:px-12 sm:py-14"
      >
        <p class="inline-flex rounded-field bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-primary">
          {{ profile.kicker }}
        </p>
        <h1 class="mx-auto mt-5 max-w-2xl text-4xl font-bold leading-tight tracking-tight sm:text-5xl">
          {{ profile.headline }}
        </h1>
        <p class="mx-auto mt-5 max-w-xl text-base text-base-content/70">{{ profile.lede }}</p>
        <div class="mt-8 flex flex-wrap items-center justify-center gap-3">
          <RouterLink to="/insights" class="btn btn-primary shadow-md">Open {{ profile.workspace }}</RouterLink>
          <RouterLink to="/about" class="btn btn-outline">About</RouterLink>
        </div>
      </div>
    </section>

    <section class="grid gap-4 sm:grid-cols-3" aria-label="Summary metrics">
      <article
        v-for="metric in metrics"
        :key="metric.label"
        class="rounded-box border border-base-300 bg-base-100 p-6 text-center shadow-sm"
      >
        <p class="text-xs font-semibold uppercase tracking-wide text-base-content/50">{{ metric.label }}</p>
        <p class="mt-2 font-display text-4xl font-bold text-primary">{{ metric.value }}</p>
        <p class="mt-1 text-sm text-accent">{{ metric.note }}</p>
      </article>
    </section>

    <section class="grid gap-6 lg:grid-cols-[1fr_minmax(0,1.1fr)] lg:items-start">
      <div>
        <h2 class="font-display text-2xl font-bold">Paths in motion</h2>
        <p class="mt-2 text-sm text-base-content/65">Sample cohorts responding to mastery signals.</p>
        <div class="mt-6 space-y-5">
          <article
            v-for="(item, index) in records.slice(0, 3)"
            :key="item.id"
            class="learn-path-card rounded-box border border-base-300 bg-base-100 p-5 shadow-sm transition-transform hover:-translate-y-1"
          >
            <div class="flex items-start justify-between gap-3">
              <div>
                <p class="font-display font-bold">{{ item.title }}</p>
                <p class="mt-1 text-xs text-base-content/55">{{ item.owner }} · {{ item.updated }}</p>
              </div>
              <span class="badge badge-sm" :class="'badge-' + item.tone">{{ item.status }}</span>
            </div>
            <div class="mt-4 h-2 overflow-hidden rounded-field bg-base-300">
              <div
                class="learn-progress-track h-full rounded-field"
                :style="{ width: pathProgress[index] + '%' }"
              />
            </div>
            <p class="mt-2 text-right text-xs font-medium text-secondary">{{ pathProgress[index] }}% mastery</p>
          </article>
        </div>
      </div>

      <aside class="rounded-box border border-base-300 bg-base-100 p-6 shadow-sm">
        <h2 class="font-display text-lg font-bold">Why adapt</h2>
        <ul class="mt-5 space-y-5">
          <li v-for="item in highlights" :key="item.title" class="flex gap-4">
            <span class="flex size-10 shrink-0 items-center justify-center rounded-field bg-secondary/10 text-secondary">
              <AppIcon :name="item.icon" class="size-5" />
            </span>
            <div>
              <h3 class="font-semibold">{{ item.title }}</h3>
              <p class="mt-1 text-sm text-base-content/70">{{ item.detail }}</p>
            </div>
          </li>
        </ul>
        <div class="mt-8 border-t border-base-300 pt-6">
          <h3 class="text-sm font-semibold text-base-content/60">Recent adjustments</h3>
          <ul class="mt-3 space-y-3 text-sm">
            <li v-for="(entry, idx) in activity.slice(0, 3)" :key="idx" class="flex justify-between gap-2">
              <span class="text-base-content/80">{{ entry.text }}</span>
              <span class="shrink-0 text-xs text-base-content/45">{{ entry.when }}</span>
            </li>
          </ul>
        </div>
      </aside>
    </section>
  </div>
</template>