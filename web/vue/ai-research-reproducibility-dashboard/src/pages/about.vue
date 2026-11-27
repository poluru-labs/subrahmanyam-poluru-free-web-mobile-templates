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
  <div class="grid gap-0 lg:grid-cols-[1.1fr_0.9fr]">
    <article class="border border-base-300 bg-base-100 p-8">
      <h1 class="text-3xl font-bold">About {{ profile.product }}</h1>
      <p v-for="paragraph in profile.about" :key="paragraph" class="mt-4 text-base-content/80">{{ paragraph }}</p>
      <ul class="mt-8 grid gap-3 sm:grid-cols-2">
        <li v-for="item in highlights" :key="item.title" class="repro-mosaic-b border border-base-300 p-4">
          <h2 class="font-display font-semibold text-primary">{{ item.title }}</h2>
          <p class="text-sm text-base-content/70">{{ item.detail }}</p>
        </li>
      </ul>
    </article>
    <aside class="repro-mosaic-a border border-base-300 border-l-0 p-8 lg:border-l">
      <h2 class="font-display font-bold text-primary">Dark orchid mosaic</h2>
      <p class="mt-3">
        <a class="font-semibold text-secondary hover:underline" href="https://polurus.com" target="_blank" rel="noreferrer">{{ profile.author.name }}</a>
      </p>
      <p class="mt-4 text-sm text-base-content/75">Reproducibility runs as tiled status cards on a dark orchid surface.</p>
      <a class="btn btn-primary mt-6 rounded-box" href="https://polurus.com" target="_blank" rel="noreferrer">polurus.com</a>
    </aside>
  </div>
</template>