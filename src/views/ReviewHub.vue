<template>
  <div class="review-page">
    <header class="review-header">
      <span class="badge badge-teal">Repaso global</span>
      <h1>Preguntas falladas</h1>
      <p>Reuní los puntos flojos de todas las materias y volvé a la unidad o modelo exacto para repasarlos.</p>
    </header>

    <div class="review-controls">
      <div class="review-search">
        <Search :size="18" aria-hidden="true" />
        <input v-model="query" type="search" placeholder="Buscar por materia, unidad o pregunta..." />
      </div>
      <div class="subject-tabs" aria-label="Filtrar repaso por materia">
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
    </div>

    <section v-if="filteredRows.length" class="review-list">
      <article v-for="row in filteredRows" :key="row.storageId" class="review-card">
        <div>
          <span class="badge" :class="`badge-${row.color}`">{{ row.subjectTitle }}</span>
          <h2>{{ row.title }}</h2>
          <p>{{ row.count }} pregunta{{ row.count === 1 ? '' : 's' }} para repasar.</p>
        </div>
        <div class="question-chips">
          <span v-for="questionId in row.questionIds.slice(0, 8)" :key="questionId" class="question-chip">{{ questionId }}</span>
          <span v-if="row.questionIds.length > 8" class="question-chip">+{{ row.questionIds.length - 8 }}</span>
        </div>
        <button class="open-btn" @click="openRow(row)">Abrir contenido</button>
      </article>
    </section>

    <section v-else class="empty-review">
      <span class="badge badge-amber">Sin pendientes</span>
      <h2>No hay preguntas falladas para este filtro</h2>
      <p>Cuando completes quizzes y queden respuestas incorrectas, van a aparecer acá.</p>
    </section>

    <ProgressBackupPanel />
  </div>
</template>

<script setup>
import { computed, shallowRef } from 'vue'
import { useRouter } from 'vue-router'
import { Search } from 'lucide-vue-next'
import ProgressBackupPanel from '../components/study/ProgressBackupPanel.vue'
import { getStudySnapshot } from '../composables/useStudyProgress'
import { getUnitByStorageId, subjects } from '../content/subjects'

const router = useRouter()
const query = shallowRef('')
const selectedSubject = shallowRef('all')

const subjectOptions = computed(() => [
  { id: 'all', label: 'Todas' },
  ...subjects.map((subject) => ({ id: subject.id, label: subject.shortTitle || subject.title }))
])

const reviewRows = computed(() => {
  const snapshot = getStudySnapshot()
  return Object.entries(snapshot.units || [])
    .map(([storageId, unitData]) => {
      const questionIds = unitData.spacedRepetition?.wrongQuestionIds || []
      if (!questionIds.length) return null

      const match = getUnitByStorageId(storageId)
      if (!match) return null

      const subject = match.subject
      const target = match.unit || match.exam
      return {
        storageId,
        subjectId: subject.id,
        subjectTitle: subject.title,
        title: target.title,
        color: target.color || subject.color,
        route: match.unit ? `/${subject.id}/unidad/${target.id}` : target.route,
        count: questionIds.length,
        questionIds
      }
    })
    .filter(Boolean)
    .sort((a, b) => b.count - a.count)
})

const filteredRows = computed(() => {
  const term = query.value.trim().toLowerCase()
  return reviewRows.value.filter((row) => {
    const matchesSubject = selectedSubject.value === 'all' || row.subjectId === selectedSubject.value
    if (!matchesSubject) return false
    if (!term) return true
    return [row.subjectTitle, row.title, row.storageId, ...row.questionIds].join(' ').toLowerCase().includes(term)
  })
})

function openRow(row) {
  router.push(row.route)
}
</script>

<style scoped>
.review-page {
  animation: fadeIn 0.35s ease;
  display: grid;
  gap: 18px;
}

.review-header {
  max-width: 760px;
}

.review-header h1 {
  margin: 10px 0 8px;
}

.review-header p,
.empty-review p {
  color: var(--text-muted);
}

.review-controls,
.review-list {
  display: grid;
  gap: 12px;
}

.review-search {
  align-items: center;
  background: var(--bg-card);
  border: var(--border-width) solid var(--border-color);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-sm);
  display: flex;
  gap: 10px;
  padding: 10px 12px;
}

.review-search input {
  background: transparent;
  border: 0;
  color: var(--text-primary);
  flex: 1;
  font: inherit;
  min-width: 0;
  outline: 0;
}

.subject-tabs {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.subject-tab,
.open-btn {
  border: var(--border-width) solid var(--border-color);
  border-radius: var(--radius-sm);
  box-shadow: var(--shadow-sm);
  cursor: pointer;
  font-family: inherit;
  font-weight: 800;
}

.subject-tab {
  background: var(--bg-card);
  color: var(--text-primary);
  padding: 8px 12px;
}

.subject-tab.active {
  background: var(--accent-teal-soft);
  border-color: var(--accent-teal);
}

.review-card,
.empty-review {
  background: var(--bg-card);
  border: var(--border-width) solid var(--border-color);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-sm);
  padding: 18px;
}

.review-card {
  display: grid;
  gap: 12px;
}

.review-card h2 {
  font-size: 1.15rem;
  margin: 10px 0 4px;
}

.question-chips {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.question-chip {
  background: var(--bg-tertiary);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-sm);
  color: var(--text-muted);
  font-family: 'JetBrains Mono', 'IBM Plex Mono', 'Fira Code', monospace;
  font-size: 0.72rem;
  padding: 3px 6px;
}

.open-btn {
  background: var(--accent-teal);
  color: #06241c;
  justify-self: start;
  padding: 9px 12px;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(8px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>
