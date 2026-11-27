<route lang="json">
{
  "meta": { "title": "Clusters" }
}
</route>


<script setup lang="ts">
import profile from '../../mock/profile.json'
import records from '../../mock/records.json'
</script>

<template>
  <div class="space-y-6">
        <header class="mb-4 border-l-4 border-primary pl-4"><h1 class="text-2xl font-bold">{{ profile.workspace }}</h1><p class="text-sm text-base-content/70">{{ profile.summary }}</p></header>
    <div class="overflow-x-auto border border-base-300">
      <table class="table table-sm">
        <thead class="bg-base-200"><tr><th>ID</th><th>Cluster</th><th>Status</th><th>Owner</th><th>$/mo</th><th>Updated</th></tr></thead>
        <tbody>
          <tr v-for="item in records" :key="item.id"><td class="font-mono text-xs">{{ item.id }}</td><td>{{ item.title }}</td>
          <td><span class="badge badge-sm" :class="'badge-' + item.tone">{{ item.status }}</span></td>
          <td>{{ item.owner }}</td><td class="font-bold text-primary">{{ item.score }}</td><td>{{ item.updated }}</td></tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
