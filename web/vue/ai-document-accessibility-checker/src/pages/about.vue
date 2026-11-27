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
  <div class="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
    <article class="rounded-field border border-base-300 bg-base-100 p-8">
      <p class="text-sm font-semibold text-primary">{{ profile.kicker }}</p>
      <h1 class="mt-2 text-3xl font-bold">About {{ profile.product }}</h1>
      <p v-for="paragraph in profile.about" :key="paragraph" class="mt-4 text-base-content/80">{{ paragraph }}</p>
      <ul class="mt-6 space-y-4">
        <li v-for="item in highlights" :key="item.title">
          <h2 class="font-display font-semibold">{{ item.title }}</h2>
          <p class="text-sm text-base-content/70">{{ item.detail }}</p>
        </li>
      </ul>
    </article>
    <aside class="rounded-field border border-secondary/40 bg-secondary/5 p-8">
      <h2 class="font-display font-bold">Author</h2>
      <p class="mt-3">
        <a class="font-semibold text-primary hover:underline" href="https://polurus.com" target="_blank" rel="noreferrer">{{ profile.author.name }}</a>
      </p>
      <p class="mt-3 text-sm text-base-content/70">
        Emerald steps timeline — copper stage markers, ruby accent callouts, vertical doc review track. Roboto body, Open Sans headings.
      </p>
      <a class="btn btn-primary btn-sm mt-4 rounded-field" href="https://polurus.com" target="_blank" rel="noreferrer">polurus.com</a>
    </aside>
  </div>
</template>