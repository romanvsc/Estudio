<template>
  <component
    :is="contentComponent"
    v-if="contentComponent"
    :searchQuery="searchQuery"
  />
  <div v-else class="empty-exam">
    <span class="badge badge-gold">Modelo de Final</span>
    <h1>{{ exam?.title || 'Modelo no disponible' }}</h1>
    <p>Este modelo está registrado, pero todavía no tiene contenido asociado.</p>
  </div>
</template>

<script setup>
defineProps({
  exam: { type: Object, default: null },
  contentComponent: { type: [Object, Function], default: null },
  searchQuery: { type: String, default: '' }
})
</script>

<style scoped>
.empty-exam {
  background: var(--bg-card);
  border: var(--border-width) solid var(--border-color);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-sm);
  padding: 24px;
}

.empty-exam h1 {
  margin: 10px 0 8px;
}
</style>
