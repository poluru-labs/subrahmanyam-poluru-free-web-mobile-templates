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
  <div class="grid gap-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.75fr)]">
    <article>
      <p class="text-sm font-medium text-secondary">{{ profile.kicker }}</p>
      <h1 class="mt-2 font-display text-3xl font-bold">About {{ profile.product }}</h1>
      <p v-for="paragraph in profile.about" :key="paragraph" class="mt-4 text-base-content/80">
        {{ paragraph }}
      </p>
      <ul class="mt-6 space-y-4">
        <li v-for="item in highlights" :key="item.title" class="border-l-2 border-primary pl-4">
          <h2 class="font-semibold">{{ item.title }}</h2>
          <p class="text-sm text-base-content/70">{{ item.detail }}</p>
        </li>
      </ul>
    </article>
    <aside class="tlp-week-band h-fit rounded-box p-6 text-white">
      <h2 class="font-display text-lg font-bold">Faculty hours</h2>
      <p class="mt-3 text-sm text-white/80">Sapphire band and gold nodes on a dark lesson-week track.</p>
      <p class="mt-4">
        <a class="link font-semibold text-secondary" href="https://polurus.com" target="_blank" rel="noreferrer">Subrahmanyam Poluru</a>
      </p>
      <a class="btn btn-secondary btn-sm mt-4 rounded-box" href="https://polurus.com" target="_blank" rel="noreferrer">polurus.com</a>
    </aside>
  </div>
</template>