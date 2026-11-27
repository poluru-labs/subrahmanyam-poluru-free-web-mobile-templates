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
  <div class="grid gap-8 lg:grid-cols-[1fr_18rem]">
    <article class="rounded-field border border-base-300 bg-base-100 p-8">
      <h1 class="text-3xl font-bold">About {{ profile.product }}</h1>
      <p v-for="paragraph in profile.about" :key="paragraph" class="mt-4 text-base-content/80">{{ paragraph }}</p>
      <ul class="mt-6 space-y-3">
        <li v-for="item in highlights" :key="item.title">
          <h2 class="font-display font-semibold text-primary">{{ item.title }}</h2>
          <p class="text-sm text-base-content/70">{{ item.detail }}</p>
        </li>
      </ul>
    </article>
    <aside class="rdisc-rail rounded-field p-6 text-white">
      <h2 class="font-display font-bold">Discoverer</h2>
      <p class="mt-3">
        <a class="font-semibold underline" href="https://polurus.com" target="_blank" rel="noreferrer">{{ profile.author.name }}</a>
      </p>
      <p class="mt-4 text-sm text-white/80">Pink discovery rail with fuchsia lanes — not kitchen prep or eval metrics.</p>
      <a class="mt-6 inline-block rounded-field bg-white px-4 py-2 text-sm font-semibold text-secondary" href="https://polurus.com" target="_blank" rel="noreferrer">polurus.com</a>
    </aside>
  </div>
</template>