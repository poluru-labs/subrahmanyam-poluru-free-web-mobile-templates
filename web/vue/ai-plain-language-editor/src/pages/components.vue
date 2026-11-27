<route lang="json">
{
  "meta": { "title": "Components" }
}
</route>

<script setup lang="ts">
import PageHeader from '@/components/PageHeader.vue'
import AppIcon from '@/components/icons/AppIcon.vue'
import records from '../../mock/records.json'
</script>

<template>
  <div class="space-y-8">
    <PageHeader
      title="Components"
      summary="Plain Language Editor uses daisyUI components tinted with Olive. Sample data comes from the mock folder."
    />

    <section class="card bg-base-100 ring-1 ring-base-300" aria-labelledby="buttons-heading">
      <div class="card-body">
        <h2 id="buttons-heading" class="card-title">Buttons and badges</h2>
        <div class="flex flex-wrap gap-2">
          <button type="button" class="btn btn-primary">Primary</button>
          <button type="button" class="btn btn-secondary">Secondary</button>
          <button type="button" class="btn btn-accent">Accent</button>
          <button type="button" class="btn btn-outline">Outline</button>
          <button type="button" class="btn btn-ghost">Ghost</button>
        </div>
        <div class="mt-4 flex flex-wrap items-center gap-3">
          <AppIcon name="pen" class="text-primary" />
          <span class="badge badge-primary">Olive</span>
          <span class="badge badge-secondary">Cerulean</span>
          <span class="badge badge-accent">Coral</span>
        </div>
      </div>
    </section>

    <section class="grid gap-4 sm:grid-cols-3" aria-label="Sample record">
      <article v-for="item in records.slice(0, 3)" :key="item.id" class="card bg-base-100 ring-1 ring-base-300">
        <div class="card-body">
          <h2 class="card-title text-base">{{ item.title }}</h2>
          <p class="text-sm text-base-content/70">{{ item.status }} · {{ item.owner }}</p>
        </div>
      </article>
    </section>

    <section class="card bg-base-100 ring-1 ring-base-300" aria-labelledby="form-heading">
      <div class="card-body">
        <h2 id="form-heading" class="card-title">Form fields</h2>
        <p class="text-base-content/70">This form stays on the page. It shows field styles only.</p>
        <form class="mt-2 grid max-w-lg gap-4" @submit.prevent>
          <label class="flex flex-col gap-1">
            <span class="text-sm font-medium">Name</span>
            <input class="input w-full" type="text" name="name" autocomplete="name" />
          </label>
          <label class="flex flex-col gap-1">
            <span class="text-sm font-medium">Email</span>
            <input class="input w-full" type="email" name="email" autocomplete="email" />
          </label>
          <label class="flex flex-col gap-1">
            <span class="text-sm font-medium">Notes</span>
            <textarea class="textarea w-full" name="notes" rows="4"></textarea>
          </label>
          <button class="btn btn-primary w-fit" type="submit">Save sample</button>
        </form>
      </div>
    </section>
  </div>
</template>
