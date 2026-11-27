<route lang="json">
{
  "meta": { "title": "About" }
}
</route>

<script setup lang="ts">
import profile from '../../mock/profile.json'
import highlights from '../../mock/highlights.json'
</script>

<template>
  <div class="grid gap-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]">
    <article class="rounded-box border border-base-300 bg-base-100 p-8">
      <p class="text-sm font-semibold text-primary">{{ profile.kicker }}</p>
      <h1 class="mt-2 text-3xl font-bold">About {{ profile.product }}</h1>
      <p v-for="paragraph in profile.about" :key="paragraph" class="mt-4 leading-relaxed text-base-content/80">
        {{ paragraph }}
      </p>
      <ul class="mt-8 space-y-4">
        <li v-for="item in highlights" :key="item.title" class="pdata-step-card rounded-box border border-base-300 p-4">
          <h2 class="font-display font-bold text-secondary">{{ item.title }}</h2>
          <p class="mt-1 text-sm text-base-content/70">{{ item.detail }}</p>
        </li>
      </ul>
    </article>
    <aside class="rounded-box border border-secondary/30 bg-secondary/10 p-8">
      <h2 class="font-display font-bold text-secondary">Open data steward</h2>
      <p class="mt-3">
        <a class="font-semibold text-primary hover:underline" href="https://polurus.com" target="_blank" rel="noreferrer">{{ profile.author.name }}</a>
      </p>
      <p class="mt-4 text-sm text-base-content/70">
        Tomato and violet timeline steps with 1.25rem cards — Roboto body, Open Sans headings for catalog clarity.
      </p>
      <ol class="mt-6 space-y-2 text-xs font-semibold uppercase tracking-wide text-base-content/55">
        <li class="rounded-box bg-base-100 px-3 py-2">Step 1 · Ingest</li>
        <li class="rounded-box bg-base-100 px-3 py-2">Step 2 · Describe</li>
        <li class="rounded-box bg-base-100 px-3 py-2">Step 3 · Publish</li>
      </ol>
      <a class="btn btn-secondary mt-6 rounded-box" href="https://polurus.com" target="_blank" rel="noreferrer">polurus.com</a>
    </aside>
  </div>
</template>