<route lang="json">
{
  "meta": { "title": "Audits" }
}
</route>

<script setup lang="ts">
import profile from '../../mock/profile.json'
import records from '../../mock/records.json'
</script>

<template>
  <div class="space-y-8">
    <header class="grid gap-6 border-b-4 border-primary pb-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
      <div>
        <p class="text-xs font-bold uppercase tracking-[0.2em] text-secondary">{{ profile.product }}</p>
        <h1 class="mt-2 text-4xl font-bold tracking-tight">{{ profile.workspace }}</h1>
        <p class="mt-3 max-w-2xl text-base-content/70">{{ profile.summary }}</p>
      </div>
      <div class="flex gap-2">
        <button type="button" class="btn btn-primary">New scan</button>
        <button type="button" class="btn btn-outline">Export</button>
      </div>
    </header>

    <div class="overflow-x-auto border border-base-300 bg-base-100">
      <table class="table table-zebra">
        <thead class="bg-base-200 text-xs uppercase tracking-wide">
          <tr>
            <th>ID</th>
            <th>Item</th>
            <th>Status</th>
            <th>Owner</th>
            <th>Score</th>
            <th>Updated</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in records" :key="item.id" class="hover:bg-primary/5">
            <td class="font-mono text-xs text-primary">{{ item.id }}</td>
            <td class="font-medium">{{ item.title }}</td>
            <td>
              <span class="badge badge-sm" :class="'badge-' + item.tone">{{ item.status }}</span>
            </td>
            <td>{{ item.owner }}</td>
            <td class="font-display font-bold">{{ item.score }}</td>
            <td class="text-sm text-base-content/60">{{ item.updated }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>