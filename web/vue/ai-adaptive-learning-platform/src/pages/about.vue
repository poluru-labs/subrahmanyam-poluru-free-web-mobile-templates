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
  <div class="space-y-8">
    <article class="learn-hero-float rounded-box border border-base-300 bg-base-100 p-8 sm:p-10">
      <p class="text-xs font-semibold uppercase tracking-wide text-primary">{{ profile.kicker }}</p>
      <h1 class="mt-3 font-display text-4xl font-bold">About {{ profile.product }}</h1>
      <p v-for="paragraph in profile.about" :key="paragraph" class="mt-5 max-w-2xl leading-relaxed text-base-content/80">
        {{ paragraph }}
      </p>
    </article>

    <div class="grid gap-4 sm:grid-cols-3">
      <article
        v-for="item in highlights"
        :key="item.title"
        class="rounded-box border border-base-300 bg-base-100 p-6 shadow-sm"
      >
        <h2 class="font-display font-bold text-primary">{{ item.title }}</h2>
        <p class="mt-2 text-sm text-base-content/70">{{ item.detail }}</p>
      </article>
    </div>

    <aside class="rounded-box border border-secondary/30 bg-gradient-to-br from-secondary/10 to-primary/5 p-8 text-center sm:text-left">
      <h2 class="font-display text-lg font-bold">Author</h2>
      <p class="mt-3">
        <a class="font-semibold text-primary hover:underline" href="https://polurus.com" target="_blank" rel="noreferrer">{{ profile.author.name }}</a>
      </p>
      <p class="mt-3 text-sm text-base-content/70">
        Indigo warmth on a centered overlap layout. Soft cards, layered paths, Roboto body and Open Sans headings.
      </p>
      <a class="btn btn-primary btn-sm mt-5" href="https://polurus.com" target="_blank" rel="noreferrer">polurus.com</a>
    </aside>
  </div>
</template>