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
  <div class="grid gap-0 lg:grid-cols-2">
    <article class="border border-base-300 bg-base-100 p-8">
      <p class="text-sm font-semibold text-primary">{{ profile.kicker }}</p>
      <h1 class="mt-2 font-display text-3xl font-bold">About {{ profile.product }}</h1>
      <p v-for="paragraph in profile.about" :key="paragraph" class="mt-4 text-base-content/80">{{ paragraph }}</p>
      <ul class="mt-6 space-y-4">
        <li v-for="item in highlights" :key="item.title">
          <h2 class="font-semibold">{{ item.title }}</h2>
          <p class="text-sm text-base-content/70">{{ item.detail }}</p>
        </li>
      </ul>
    </article>
    <aside class="claim-mosaic-a border border-base-300 border-l-0 p-8 lg:border-l">
      <h2 class="font-display font-bold">Author</h2>
      <p class="mt-3">
        <a class="font-semibold text-primary hover:underline" href="https://polurus.com" target="_blank" rel="noreferrer">{{ profile.author.name }}</a>
      </p>
      <p class="mt-3 text-sm text-base-content/70">
        Cyan record mosaic — zero radius, tomato/tangerine sharp claim tiles, grid-aligned reviewer cells. Open Sans body, Roboto headings.
      </p>
      <a class="mt-4 inline-block bg-primary px-4 py-2 text-sm font-semibold text-primary-content" href="https://polurus.com" target="_blank" rel="noreferrer">polurus.com</a>
    </aside>
  </div>
</template>