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
  <div class="grid gap-8 lg:grid-cols-2">
    <article class="rqual-zig-primary rounded-box border border-base-300 p-8">
      <h1 class="text-3xl font-bold">About {{ profile.product }}</h1>
      <p v-for="paragraph in profile.about" :key="paragraph" class="mt-4 text-base-content/80">{{ paragraph }}</p>
    </article>
    <aside class="rqual-zig-secondary rounded-box border border-secondary/30 p-8">
      <h2 class="font-display font-bold text-primary">Query analyst</h2>
      <p class="mt-3">
        <a class="font-semibold hover:underline" href="https://polurus.com" target="_blank" rel="noreferrer">{{ profile.author.name }}</a>
      </p>
      <ul class="mt-6 space-y-3">
        <li v-for="item in highlights" :key="item.title" class="text-sm"><span class="font-semibold">{{ item.title }}:</span> {{ item.detail }}</li>
      </ul>
      <a class="btn btn-primary mt-6 rounded-box" href="https://polurus.com" target="_blank" rel="noreferrer">polurus.com</a>
    </aside>
  </div>
</template>