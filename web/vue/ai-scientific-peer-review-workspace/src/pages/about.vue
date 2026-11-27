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
  <div class="grid overflow-hidden rounded-box border border-base-300 bg-base-100 lg:grid-cols-2">
    <article class="sreview-studio-ms p-8">
      <h1 class="text-3xl font-bold">About {{ profile.product }}</h1>
      <p v-for="paragraph in profile.about" :key="paragraph" class="mt-4 text-base-content/80">{{ paragraph }}</p>
    </article>
    <aside class="sreview-studio-review border-t border-base-300 p-8 lg:border-t-0 lg:border-l">
      <h2 class="font-display font-bold text-secondary">Editor</h2>
      <p class="mt-3">
        <a class="font-semibold text-primary hover:underline" href="https://polurus.com" target="_blank" rel="noreferrer">{{ profile.author.name }}</a>
      </p>
      <ul class="mt-6 space-y-3">
        <li v-for="item in highlights" :key="item.title" class="text-sm"><span class="font-semibold">{{ item.title }}</span> — {{ item.detail }}</li>
      </ul>
      <a class="btn btn-primary mt-6 rounded-box" href="https://polurus.com" target="_blank" rel="noreferrer">polurus.com</a>
    </aside>
  </div>
</template>