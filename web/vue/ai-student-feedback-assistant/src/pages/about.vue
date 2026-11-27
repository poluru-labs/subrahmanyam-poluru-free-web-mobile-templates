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
    <div class="sfeed-band px-6 py-6 text-white">
      <h1 class="text-3xl font-bold">About {{ profile.product }}</h1>
    </div>
    <div class="grid gap-0 lg:grid-cols-[1.2fr_0.8fr]">
      <article class="p-8">
        <p v-for="paragraph in profile.about" :key="paragraph" class="text-base-content/80">{{ paragraph }}</p>
        <ul class="mt-8 space-y-3">
          <li v-for="item in highlights" :key="item.title" class="sfeed-row-strip border border-base-300 p-4">
            <h2 class="font-display font-semibold text-primary">{{ item.title }}</h2>
            <p class="text-sm text-base-content/70">{{ item.detail }}</p>
          </li>
        </ul>
      </article>
      <aside class="border-t border-base-300 bg-base-200 p-8 lg:border-t-0 lg:border-l">
        <h2 class="font-display font-bold">Instructor</h2>
        <p class="mt-3">
          <a class="font-semibold text-primary hover:underline" href="https://polurus.com" target="_blank" rel="noreferrer">{{ profile.author.name }}</a>
        </p>
        <p class="mt-4 text-sm text-base-content/70">Dark cyan feedback bands with square corners — Open Sans body, Roboto headings.</p>
        <a class="mt-6 inline-block bg-primary px-4 py-2 text-sm font-semibold text-primary-content" href="https://polurus.com" target="_blank" rel="noreferrer">polurus.com</a>
      </aside>
    </div>
  </div>
</template>