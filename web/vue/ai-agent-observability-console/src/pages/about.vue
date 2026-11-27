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
  <div class="overflow-hidden rounded-box border border-base-300 bg-base-100">
    <div class="ops-status-band px-6 py-8 text-white lg:px-10">
      <p class="font-mono text-xs uppercase tracking-widest text-white/70">{{ profile.kicker }}</p>
      <h1 class="mt-2 text-3xl font-bold">About {{ profile.product }}</h1>
    </div>
    <div class="grid gap-8 p-6 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] lg:p-10">
      <article>
        <p v-for="paragraph in profile.about" :key="paragraph" class="leading-relaxed text-base-content/80">
          {{ paragraph }}
        </p>
        <ul class="mt-8 space-y-4">
          <li v-for="item in highlights" :key="item.title" class="rounded-box border border-base-300 bg-base-200 p-4">
            <h2 class="font-display font-bold text-primary">{{ item.title }}</h2>
            <p class="mt-1 text-sm text-base-content/70">{{ item.detail }}</p>
          </li>
        </ul>
      </article>
      <aside class="rounded-box border border-primary/20 bg-base-200 p-6">
        <h2 class="font-display font-bold">Author</h2>
        <p class="mt-3">
          <a class="font-semibold text-primary hover:underline" href="https://polurus.com" target="_blank" rel="noreferrer">{{ profile.author.name }}</a>
        </p>
        <p class="mt-3 text-sm text-base-content/70">
          Violet telemetry bands, rounded trace rows, and operator-first typography — Open Sans body, Roboto headings.
        </p>
        <a class="btn btn-primary mt-5 rounded-box" href="https://polurus.com" target="_blank" rel="noreferrer">polurus.com</a>
      </aside>
    </div>
  </div>
</template>