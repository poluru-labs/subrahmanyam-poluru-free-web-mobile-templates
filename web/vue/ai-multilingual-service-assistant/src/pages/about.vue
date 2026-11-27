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
  <div class="grid gap-8 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
    <article class="lg:order-1">
      <p class="text-sm font-medium text-primary">{{ profile.kicker }}</p>
      <h1 class="mt-2 font-display text-3xl font-bold">About {{ profile.product }}</h1>
      <p v-for="paragraph in profile.about" :key="paragraph" class="mt-4 text-base-content/80">
        {{ paragraph }}
      </p>
      <ul class="mt-6 space-y-4">
        <li v-for="item in highlights" :key="item.title" class="border-l-2 border-accent pl-4">
          <h2 class="font-semibold">{{ item.title }}</h2>
          <p class="text-sm text-base-content/70">{{ item.detail }}</p>
        </li>
      </ul>
    </article>
    <aside class="card h-fit bg-base-100 shadow-sm lg:order-2">
      <div class="card-body">
        <h2 class="card-title font-display">Studio credit</h2>
        <p>
          <a class="link font-medium" href="https://polurus.com" target="_blank" rel="noreferrer">Subrahmanyam Poluru</a>
        </p>
        <p class="text-sm text-base-content/70">Graphite and Sapphire language locale mosaic bento — Open Sans body, Roboto headings, 1rem radius.</p>
        <a class="btn btn-secondary btn-sm mt-2 w-fit rounded-box" href="https://polurus.com" target="_blank" rel="noreferrer">polurus.com</a>
      </div>
    </aside>
  </div>
</template>
