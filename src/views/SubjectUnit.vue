<template>
  <UnitPage
    v-if="unit"
    :contentComponent="contentComponent"
    :searchQuery="searchQuery"
    :unit="unit"
  />
  <NotFoundView v-else />
</template>

<script setup>
import { computed, defineAsyncComponent } from 'vue'
import { useRoute } from 'vue-router'
import UnitPage from '../components/study/UnitPage.vue'
import NotFoundView from './NotFoundView.vue'
import { getUnitById } from '../content/subjects'

defineProps({
  searchQuery: { type: String, default: '' }
})

const route = useRoute()

const unit = computed(() => getUnitById(route.params.subject, route.params.unitId))
const contentComponent = computed(() => {
  if (!unit.value?.component) return null
  return defineAsyncComponent(unit.value.component)
})
</script>
