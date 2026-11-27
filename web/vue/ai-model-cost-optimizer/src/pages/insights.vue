<route lang="json">
{
  "meta": { "title": "Spend" }
}
</route>

<script setup lang="ts">
import profile from '../../mock/profile.json'
import records from '../../mock/records.json'
</script>

<template>
  <div class="space-y-6">
    <header class="max-w-3xl">
      <p class="text-sm font-medium text-primary">{{ profile.product }}</p>
      <h1 class="mt-2 font-display text-3xl font-bold">{{ profile.workspace }}</h1>
      <p class="mt-2 text-base-content/70">{{ profile.summary }}</p>
    </header>
    <div class="mco-ops-panel overflow-x-auto rounded-box bg-base-100">
      <table class="table">
        <thead>
          <tr class="text-xs uppercase text-base-content/55">
            <th>ID</th>
            <th>Item</th>
            <th>Status</th>
            <th>Owner</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in records" :key="item.id">
            <td class="font-mono text-xs">{{ item.id }}</td>
            <td class="font-medium">{{ item.title }}</td>
            <td><span class="badge badge-sm rounded-box" :class="'badge-' + item.tone">{{ item.status }}</span></td>
            <td>{{ item.owner }}</td>
            <td>{{ item.score }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
