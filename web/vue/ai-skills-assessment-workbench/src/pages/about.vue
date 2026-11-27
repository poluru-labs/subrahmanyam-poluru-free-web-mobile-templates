<route lang="json">
{
  "meta": { "title": "About" }
}
</route>

<script setup lang="ts">
import profile from '../../mock/profile.json'
import highlights from '../../mock/highlights.json'
import metrics from '../../mock/metrics.json'
</script>

<template>
  <div class="relative">
    <article class="rounded-box border border-base-300 bg-base-100 p-8 lg:pr-48">
      <h1 class="text-3xl font-bold">About {{ profile.product }}</h1>
      <p v-for="paragraph in profile.about" :key="paragraph" class="mt-4 text-base-content/80">{{ paragraph }}</p>
      <ul class="mt-8 space-y-4">
        <li v-for="item in highlights" :key="item.title">
          <h2 class="font-display font-semibold text-primary">{{ item.title }}</h2>
          <p class="text-sm text-base-content/70">{{ item.detail }}</p>
        </li>
      </ul>
    </article>
    <aside class="skill-hero-float mx-auto mt-6 w-full max-w-xs rounded-box border border-primary/30 bg-base-100 p-6 text-center lg:absolute lg:right-4 lg:top-8 lg:mt-0">
      <p class="text-xs uppercase text-base-content/55">Author</p>
      <p class="mt-2 font-semibold">
        <a class="text-primary hover:underline" href="https://polurus.com" target="_blank" rel="noreferrer">{{ profile.author.name }}</a>
      </p>
      <p class="skill-score-ring mx-auto mt-4 flex size-20 items-center justify-center rounded-full p-1">
        <span class="flex size-full items-center justify-center rounded-full bg-base-100 font-display text-lg font-bold text-primary">{{ metrics[0]?.value }}</span>
      </p>
      <p class="mt-4 text-sm text-base-content/70">Cadet overlap card — evidence behind every skill claim.</p>
      <a class="btn btn-primary btn-sm mt-4 rounded-box" href="https://polurus.com" target="_blank" rel="noreferrer">polurus.com</a>
    </aside>
  </div>
</template>