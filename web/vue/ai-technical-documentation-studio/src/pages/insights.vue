<route lang="json">
{
  "meta": { "title": "Docs" }
}
</route>

<script setup lang="ts">
import profile from '../../mock/profile.json'
import records from '../../mock/records.json'
</script>

<template>
  <div class="space-y-6">
    <header class="tds-ops-band rounded-field p-6 text-white">
      <p class="text-sm text-white/75">{{ profile.product }}</p>
      <h1 class="mt-2 font-display text-3xl font-bold">{{ profile.workspace }}</h1>
      <p class="mt-2 max-w-2xl text-white/85">{{ profile.summary }}</p>
    </header>
    <div class="overflow-x-auto rounded-field border border-base-300 bg-base-100">
      <table class="table">
        <thead>
          <tr class="bg-base-200">
            <th>ID</th>
            <th>Doc</th>
            <th>Status</th>
            <th>Owner</th>
            <th>Coverage</th>
            <th>Updated</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in records" :key="item.id">
            <td class="font-mono text-xs">{{ item.id }}</td>
            <td class="font-medium">{{ item.title }}</td>
            <td><span class="badge rounded-field badge-sm" :class="'badge-' + item.tone">{{ item.status }}</span></td>
            <td>{{ item.owner }}</td>
            <td>{{ item.score }}</td>
            <td>{{ item.updated }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>