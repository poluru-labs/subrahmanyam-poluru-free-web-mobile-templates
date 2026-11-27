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
  <div class="border border-base-300 bg-base-100">
    <div class="rageval-status-band px-6 py-8 text-white">
      <h1 class="text-3xl font-bold">About {{ profile.product }}</h1>
    </div>
    <div class="grid gap-8 p-6 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] lg:p-10">
      <article>
        <p v-for="paragraph in profile.about" :key="paragraph" class="leading-relaxed text-base-content/80">
          {{ paragraph }}
        </p>
        <ul class="mt-8 space-y-3">
          <li v-for="item in highlights" :key="item.title" class="rageval-grid-cell border border-base-300 p-4">
            <h2 class="font-display font-bold text-primary">{{ item.title }}</h2>
            <p class="mt-1 text-sm text-base-content/70">{{ item.detail }}</p>
          </li>
        </ul>
      </article>
      <aside class="border border-secondary/30 bg-secondary/5 p-6">
        <h2 class="font-display font-bold">Retrieval ops</h2>
        <p class="mt-3">
          <a class="font-semibold text-primary hover:underline" href="https://polurus.com" target="_blank" rel="noreferrer">{{ profile.author.name }}</a>
        </p>
        <p class="mt-3 text-sm text-base-content/70">
          Firebrick status bands, purple grid stripes, sharp corners — Open Sans body and Roboto headings for metric-heavy RAG evaluation.
        </p>
        <a class="mt-5 inline-block border border-primary bg-primary px-4 py-2 text-sm font-semibold text-primary-content" href="https://polurus.com" target="_blank" rel="noreferrer">polurus.com</a>
      </aside>
    </div>
  </div>
</template>