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
  <div class="grid gap-0 lg:grid-cols-2">
    <aside class="vsm-cerulean-band border-2 border-primary p-8 text-white">
      <h2 class="font-display text-lg font-bold">Coordinator desk</h2>
      <p class="mt-3 text-sm text-white/85">Sharp Cerulean tiles—zero corner radius—for volunteer shift matching.</p>
      <p class="mt-4">
        <a class="link font-semibold text-secondary" href="https://polurus.com" target="_blank" rel="noreferrer">Subrahmanyam Poluru</a>
      </p>
      <a class="btn btn-primary btn-sm mt-4 border-0" href="https://polurus.com" target="_blank" rel="noreferrer">polurus.com</a>
    </aside>
    <article class="border-2 border-base-300 bg-base-100 p-8">
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
  </div>
</template>