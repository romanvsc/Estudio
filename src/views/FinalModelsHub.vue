<template>
  <div class="finals-hub">
    <header class="hub-header">
      <span class="badge badge-gold">Modelos de Final</span>
      <h1>Elegí qué final querés practicar</h1>
      <p>Buscá por materia, tema o nombre del modelo. También podés separar modelos pendientes de los ya practicados.</p>
    </header>

    <div class="hub-controls">
      <div class="hub-search">
        <Search class="search-icon" :size="18" aria-hidden="true" />
        <input v-model="query" type="search" placeholder="Buscar por materia, modelo o tema..." />
      </div>
      <div class="filter-row">
        <div class="subject-tabs" aria-label="Filtrar por materia">
          <button
            v-for="option in subjectOptions"
            :key="option.id"
            class="subject-tab"
            :class="{ active: selectedSubject === option.id }"
            @click="selectedSubject = option.id"
          >
            {{ option.label }}
          </button>
        </div>
        <div class="subject-tabs" aria-label="Filtrar por estado">
          <button
            v-for="option in statusOptions"
            :key="option.id"
            class="subject-tab"
            :class="{ active: selectedStatus === option.id }"
            @click="selectedStatus = option.id"
          >
            {{ option.label }}
          </button>
        </div>
      </div>
    </div>

    <section v-if="filteredExams.length" class="finals-grid">
      <FinalModelCard
        v-for="exam in filteredExams"
        :key="`${exam.subject.id}-${exam.id}`"
        :exam="exam"
        :attemptCount="attemptsByExam[exam.storageId]?.length || 0"
        :lastAttempt="attemptsByExam[exam.storageId]?.[0] || null"
        @open="openExam"
      />
    </section>

    <section v-else class="empty-state">
      <span class="badge badge-amber">Sin resultados</span>
      <h2>No hay modelos que coincidan</h2>
      <p>Probá limpiando el filtro o buscando por el nombre de la materia.</p>
    </section>
  </div>
</template>

<script setup>
import { computed, shallowRef } from 'vue'
import { useRouter } from 'vue-router'
import { Search } from 'lucide-vue-next'
import FinalModelCard from '../components/study/FinalModelCard.vue'
import { getAllQuizHistory } from '../composables/useStudyProgress'
import { allExams, subjects } from '../content/subjects'

const router = useRouter()
const query = shallowRef('')
const selectedSubject = shallowRef('all')
const selectedStatus = shallowRef('all')

const statusOptions = [
  { id: 'all', label: 'Todos' },
  { id: 'pending', label: 'Pendientes' },
  { id: 'attempted', label: 'Practicados' }
]

const subjectOptions = computed(() => [
  { id: 'all', label: 'Todas' },
  ...subjects.map((subject) => ({ id: subject.id, label: subject.title }))
])

const attemptsByExam = computed(() => {
  return getAllQuizHistory().reduce((acc, attempt) => {
    const key = String(attempt.unitId)
    if (!acc[key]) acc[key] = []
    acc[key].push(attempt)
    return acc
  }, {})
})

const filteredExams = computed(() => {
  const term = query.value.trim().toLowerCase()
  return allExams.filter((exam) => {
    const attempts = attemptsByExam.value[exam.storageId] || []
    const matchesSubject = selectedSubject.value === 'all' || exam.subject.id === selectedSubject.value
    const matchesStatus = selectedStatus.value === 'all' ||
      (selectedStatus.value === 'pending' && attempts.length === 0) ||
      (selectedStatus.value === 'attempted' && attempts.length > 0)

    if (!matchesSubject || !matchesStatus) return false
    if (!term) return true

    const haystack = [
      exam.title,
      exam.subtitle,
      exam.subject.title,
      exam.subject.shortTitle,
      ...(exam.keywords || []),
      ...exam.subject.units.map((unit) => unit.title),
      ...exam.subject.units.flatMap((unit) => unit.topics.map((topic) => topic.title))
    ].join(' ').toLowerCase()

    return haystack.includes(term)
  })
})

function openExam(exam) {
  router.push(exam.route)
}
</script>

<style scoped>
.finals-hub {
  animation: fadeIn 0.35s ease;
}

.hub-header {
  margin-bottom: 24px;
  max-width: 760px;
}

.hub-header h1 {
  margin: 10px 0 8px;
}

.hub-header p {
  color: var(--text-muted);
}

.hub-controls {
  display: grid;
  gap: 12px;
  margin-bottom: 18px;
}

.hub-search {
  align-items: center;
  background: var(--bg-card);
  border: var(--border-width) solid var(--border-color);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-sm);
  display: flex;
  gap: 10px;
  padding: 10px 12px;
}

.search-icon {
  color: var(--text-muted);
}

.hub-search input {
  background: transparent;
  border: 0;
  color: var(--text-primary);
  flex: 1;
  font: inherit;
  min-width: 0;
  outline: 0;
}

.filter-row,
.subject-tabs {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.filter-row {
  justify-content: space-between;
}

.subject-tab {
  background: var(--bg-card);
  border: var(--border-width) solid var(--border-color);
  border-radius: var(--radius-sm);
  box-shadow: var(--shadow-sm);
  color: var(--text-primary);
  cursor: pointer;
  font-family: inherit;
  font-size: 0.82rem;
  font-weight: 800;
  padding: 8px 12px;
}

.subject-tab.active {
  background: var(--accent-gold-soft);
  border-color: var(--accent-gold);
}

.finals-grid {
  display: grid;
  gap: 14px;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
}

.empty-state {
  background: var(--bg-card);
  border: var(--border-width) solid var(--border-color);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-sm);
  padding: 24px;
}

.empty-state h2 {
  margin: 10px 0 8px;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(8px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>
