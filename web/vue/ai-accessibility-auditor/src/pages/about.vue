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
  <div class="grid gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]">
    <article class="border border-base-300 bg-base-100 p-8 lg:p-10">
      <p class="text-xs font-bold uppercase tracking-[0.2em] text-secondary">{{ profile.kicker }}</p>
      <h1 class="mt-3 text-4xl font-bold tracking-tight">About {{ profile.product }}</h1>
      <p v-for="paragraph in profile.about" :key="paragraph" class="mt-5 text-base leading-relaxed text-base-content/80">
        {{ paragraph }}
      </p>
      <ul class="mt-8 grid gap-6 sm:grid-cols-3">
        <li v-for="item in highlights" :key="item.title" class="border-t-2 border-primary pt-4">
          <h2 class="font-display font-bold">{{ item.title }}</h2>
          <p class="mt-2 text-sm text-base-content/70">{{ item.detail }}</p>
        </li>
      </ul>
    </article>
    <aside class="audit-hero-panel p-8 text-white lg:p-10">
      <h2 class="font-display text-lg font-bold">Author</h2>
      <p class="mt-4">
        <a class="font-semibold text-secondary underline-offset-4 hover:underline" href="https://polurus.com" target="_blank" rel="noreferrer">{{ profile.author.name }}</a>
      </p>
      <p class="mt-4 text-sm leading-relaxed text-white/70">
        Royal Blue on a split studio layout. Sharp corners, high contrast panels, and audit-first typography — Open Sans
        body, Roboto headings.
      </p>
      <a
        class="btn mt-6 border-0 bg-secondary text-secondary-content hover:bg-secondary/90"
        href="https://polurus.com"
        target="_blank"
        rel="noreferrer"
        >polurus.com</a
      >
    </aside>
  </div>
</template>