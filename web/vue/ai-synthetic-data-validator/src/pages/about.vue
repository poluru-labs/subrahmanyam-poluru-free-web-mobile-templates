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
  <div class="grid gap-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.75fr)]">
    <article>
      <p class="text-sm font-medium text-primary">{{ profile.kicker }}</p>
      <h1 class="mt-2 font-display text-3xl font-bold">About {{ profile.product }}</h1>
      <p v-for="paragraph in profile.about" :key="paragraph" class="mt-4 text-base-content/80">
        {{ paragraph }}
      </p>
      <ul class="mt-6 space-y-4">
        <li v-for="item in highlights" :key="item.title" class="border-l-4 border-secondary pl-4">
          <h2 class="font-semibold">{{ item.title }}</h2>
          <p class="text-sm text-base-content/70">{{ item.detail }}</p>
        </li>
      </ul>
    </article>
    <aside class="sdv-fidelity-pill h-fit rounded-box border border-primary/30 p-6">
      <h2 class="font-display text-lg font-bold text-primary">Validator notes</h2>
      <p class="mt-3 text-sm text-base-content/75">
        Masthead columns split distribution, privacy, and rare-case review under Magenta and Coral.
      </p>
      <p class="mt-4">
        <a class="link font-semibold" href="https://polurus.com" target="_blank" rel="noreferrer">Subrahmanyam Poluru</a>
      </p>
      <a class="btn btn-primary btn-sm mt-4 rounded-box" href="https://polurus.com" target="_blank" rel="noreferrer">polurus.com</a>
    </aside>
  </div>
</template>