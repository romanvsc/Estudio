<template>
  <ExamRenderer
    v-if="exam"
    :exam="exam"
    :contentComponent="contentComponent"
    :searchQuery="searchQuery"
  />
  <NotFoundView v-else />
</template>

<script setup>
import { computed, defineAsyncComponent } from 'vue'
import { useRoute } from 'vue-router'
import ExamRenderer from '../components/study/ExamRenderer.vue'
import NotFoundView from './NotFoundView.vue'
import { getExamById } from '../content/subjects'

defineProps({
  searchQuery: { type: String, default: '' }
})

const route = useRoute()

const exam = computed(() => getExamById(route.params.subject, route.params.examId))
const contentComponent = computed(() => {
  if (!exam.value?.component) return null
  return defineAsyncComponent(exam.value.component)
})
</script>
