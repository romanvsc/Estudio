<template>
  <section v-if="contentComponent" class="unit-page">
    <UnitStudyToolkit
      v-if="unit"
      :title="unit.title"
      :unitId="unit.storageId"
      :searchQuery="searchQuery"
      :topicMeta="topicMeta"
      :accent="unit.color"
    />

    <div class="legacy-content">
      <component
        :is="contentComponent"
        :searchQuery="searchQuery"
      />
    </div>
  </section>

  <div v-else class="empty-study-page">
    <span class="badge badge-red">Sin contenido</span>
    <h1>Unidad no disponible</h1>
    <p>La unidad existe en el catálogo, pero todavía no tiene un renderer asociado.</p>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import UnitStudyToolkit from '../UnitStudyToolkit.vue'

const props = defineProps({
  contentComponent: { type: [Object, Function], default: null },
  searchQuery: { type: String, default: '' },
  unit: { type: Object, default: null }
})

const topicMeta = computed(() => {
  return (props.unit?.topics || []).map((topic) => ({
    ...topic,
    anchor: topic.anchor || topic.id,
    keywords: topic.keywords || [topic.number, topic.title]
  }))
})
</script>

<style scoped>
.empty-study-page {
  background: var(--bg-card);
  border: var(--border-width) solid var(--border-color);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-sm);
  padding: 24px;
}

.empty-study-page h1 {
  margin: 10px 0 8px;
}

.legacy-content :deep(.study-toolbar),
.legacy-content :deep(.search-results-card) {
  display: none;
}
</style>
