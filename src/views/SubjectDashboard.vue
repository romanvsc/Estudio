<template>
  <div v-if="subject" class="dashboard">
    <div class="dash-header">
      <span class="badge" :class="`badge-${subject.color}`">Dashboard</span>
      <h1>Panel de Estudio - {{ subject.title }}</h1>
      <p class="dash-subtitle">{{ subject.description }}</p>
    </div>

    <div class="stats-row">
      <div class="stat-card primary">
        <span class="stat-number">{{ overallCompletion }}%</span>
        <span class="stat-label">Progreso total</span>
        <div class="stat-bar"><div class="stat-fill" :style="{ width: overallCompletion + '%' }"></div></div>
      </div>
      <div class="stat-card">
        <span class="stat-number">{{ masteredCount }}</span>
        <span class="stat-label">Temas dominados</span>
      </div>
      <div class="stat-card">
        <span class="stat-number">{{ pendingCount }}</span>
        <span class="stat-label">Temas pendientes</span>
      </div>
      <button class="stat-card action-card" @click="goToReview">
        <span class="stat-number">{{ wrongQuestionCount }}</span>
        <span class="stat-label">Preguntas para repasar</span>
      </button>
    </div>

    <section v-if="nextTopic" class="next-topic-card">
      <div>
        <span class="badge badge-amber">Siguiente foco</span>
        <h2>{{ nextTopic.unit.title }}</h2>
        <p>{{ nextTopic.topic.number }} · {{ nextTopic.topic.title }}</p>
      </div>
      <button class="dash-btn" @click="goToTopic(nextTopic)">Continuar</button>
    </section>

    <section class="dash-section">
      <h3>Progreso por unidad</h3>
      <div class="units-grid">
        <button v-for="unit in unitCards" :key="unit.id" class="unit-card" @click="goToUnit(unit.id)">
          <div class="unit-card-head">
            <h4>Unidad {{ unit.id }}</h4>
            <span class="badge" :class="`badge-${unit.color}`">{{ unit.progress.completion }}%</span>
          </div>
          <p>{{ unit.title }}</p>
          <div class="unit-bar">
            <div class="unit-fill" :class="`fill-${unit.color}`" :style="{ width: unit.progress.completion + '%' }"></div>
          </div>
          <div class="unit-detail">
            <span>{{ unit.progress.mastered }} dominados</span>
            <span>{{ unit.progress.inProgress }} en curso</span>
            <span>{{ unit.progress.pending }} pendientes</span>
            <span>{{ unit.progress.quizzes }} quizzes</span>
          </div>
        </button>
      </div>
    </section>

    <section v-if="subject.exams.length" class="dash-section">
      <h3>Modelos de final</h3>
      <div class="exam-strip">
        <button v-for="exam in subject.exams" :key="exam.id" class="exam-chip" @click="goToExam(exam)">
          <span>{{ exam.title }}</span>
          <small>{{ exam.subtitle }}</small>
          <strong>{{ getExamAttempts(exam.storageId) }} intento{{ getExamAttempts(exam.storageId) === 1 ? '' : 's' }}</strong>
        </button>
      </div>
    </section>

    <section class="dash-section two-column">
      <div>
        <h3>Últimos quizzes</h3>
        <div v-if="quizHistory.length" class="history-list">
          <div v-for="attempt in quizHistory.slice(0, 8)" :key="`${attempt.unitId}-${attempt.date}`" class="history-item">
            <span>
              <strong>{{ getStorageTitle(attempt.unitId) }}</strong>
              <small>{{ formatDate(attempt.date) }}</small>
            </span>
            <span class="history-score" :class="scoreClass(attempt)">{{ attempt.score }}/{{ attempt.total }}</span>
          </div>
        </div>
        <p v-else class="empty-msg">Aún no completaste ningún cuestionario en esta materia.</p>
      </div>

      <ProgressBackupPanel />
    </section>
  </div>
  <NotFoundView v-else />
</template>

<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import ProgressBackupPanel from '../components/study/ProgressBackupPanel.vue'
import NotFoundView from './NotFoundView.vue'
import { getAllQuizHistory, getStudySnapshot } from '../composables/useStudyProgress'
import { getSubjectById } from '../content/subjects'

const route = useRoute()
const router = useRouter()

const subject = computed(() => getSubjectById(route.params.subject))
const snapshot = computed(() => getStudySnapshot())

const unitCards = computed(() => {
  return (subject.value?.units || []).map((unit) => ({
    ...unit,
    progress: getUnitProgress(unit)
  }))
})

const quizHistory = computed(() => {
  const storageIds = new Set([
    ...(subject.value?.units || []).map((unit) => unit.storageId),
    ...(subject.value?.exams || []).map((exam) => exam.storageId)
  ])
  return getAllQuizHistory().filter((attempt) => storageIds.has(String(attempt.unitId)))
})

const overallCompletion = computed(() => {
  if (!unitCards.value.length) return 0
  const total = unitCards.value.reduce((sum, unit) => sum + unit.progress.completion, 0)
  return Math.round(total / unitCards.value.length)
})

const masteredCount = computed(() => unitCards.value.reduce((sum, unit) => sum + unit.progress.mastered, 0))
const pendingCount = computed(() => unitCards.value.reduce((sum, unit) => sum + unit.progress.pending, 0))
const wrongQuestionCount = computed(() => {
  const ids = [
    ...(subject.value?.units || []).map((unit) => unit.storageId),
    ...(subject.value?.exams || []).map((exam) => exam.storageId)
  ]
  return ids.reduce((sum, id) => sum + (snapshot.value.units?.[id]?.spacedRepetition?.wrongQuestionIds?.length || 0), 0)
})

const nextTopic = computed(() => {
  for (const unit of subject.value?.units || []) {
    const unitData = snapshot.value.units?.[unit.storageId]
    const topic = unit.topics.find((item) => unitData?.topics?.[item.id]?.status !== 'dominado')
    if (topic) return { unit, topic }
  }
  return null
})

function getUnitProgress(unit) {
  const unitData = snapshot.value.units?.[unit.storageId]
  const topics = unit.topics || []
  const statuses = topics.map((topic) => unitData?.topics?.[topic.id]?.status || 'pendiente')
  const mastered = statuses.filter((status) => status === 'dominado').length
  const inProgress = statuses.filter((status) => status === 'en-curso').length
  const pending = statuses.filter((status) => status === 'pendiente').length
  const completion = topics.length ? Math.round((mastered / topics.length) * 100) : 0
  const quizzes = unitData?.quizHistory?.length || 0
  return { completion, mastered, inProgress, pending, quizzes }
}

function getExamAttempts(storageId) {
  return snapshot.value.units?.[storageId]?.quizHistory?.length || 0
}

function getStorageTitle(storageId) {
  const unit = subject.value?.units.find((item) => item.storageId === String(storageId))
  const exam = subject.value?.exams.find((item) => item.storageId === String(storageId))
  return unit?.title || exam?.title || storageId
}

function goToUnit(unitId) {
  router.push(`/${subject.value.id}/unidad/${unitId}`)
}

function goToTopic(target) {
  router.push({ path: `/${subject.value.id}/unidad/${target.unit.id}`, hash: `#${target.topic.id}` })
}

function goToExam(exam) {
  router.push(exam.route)
}

function goToReview() {
  router.push('/repaso')
}

function scoreClass(attempt) {
  const pct = (attempt.score / Math.max(attempt.total, 1)) * 100
  if (pct >= 80) return 'high'
  if (pct >= 50) return 'medium'
  return 'low'
}

function formatDate(dateStr) {
  if (!dateStr) return ''
  return new Date(dateStr).toLocaleDateString('es-AR', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' })
}
</script>

<style scoped>
.dashboard {
  animation: fadeIn 0.4s ease;
}

.dash-header {
  margin-bottom: 28px;
}

.dash-header h1 {
  margin-top: 8px;
}

.dash-subtitle,
.empty-msg {
  color: var(--text-muted);
}

.stats-row,
.units-grid {
  display: grid;
  gap: 12px;
  grid-template-columns: repeat(auto-fit, minmax(190px, 1fr));
}

.stats-row {
  margin-bottom: 20px;
}

.stat-card,
.unit-card,
.history-item,
.exam-chip,
.next-topic-card {
  background: var(--bg-card);
  border: var(--border-width) solid var(--border-color);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-sm);
}

.stat-card {
  color: var(--text-primary);
  display: grid;
  font-family: inherit;
  padding: 18px;
  text-align: left;
}

.stat-card.primary {
  background: var(--accent-teal-soft);
}

.action-card {
  cursor: pointer;
}

.stat-number {
  color: var(--accent-teal);
  display: block;
  font-size: 2rem;
  font-weight: 800;
  line-height: 1;
}

.stat-label {
  color: var(--text-muted);
  font-size: 0.78rem;
  font-weight: 800;
  text-transform: uppercase;
}

.stat-bar,
.unit-bar {
  background: var(--bg-tertiary);
  border-radius: 5px;
  height: 5px;
  margin-top: 10px;
  overflow: hidden;
}

.stat-fill,
.unit-fill {
  background: var(--accent-teal);
  height: 100%;
}

.next-topic-card {
  align-items: center;
  display: flex;
  gap: 16px;
  justify-content: space-between;
  margin-bottom: 26px;
  padding: 18px;
}

.next-topic-card h2 {
  font-size: 1.2rem;
  margin: 10px 0 4px;
}

.dash-btn {
  background: var(--accent-amber);
  border: var(--border-width) solid var(--border-color);
  border-radius: var(--radius-sm);
  box-shadow: var(--shadow-sm);
  color: #1f1500;
  cursor: pointer;
  font-family: inherit;
  font-weight: 800;
  padding: 9px 12px;
}

.dash-section {
  margin-bottom: 28px;
}

.dash-section h3 {
  border-bottom: 1px solid var(--border-color);
  margin-bottom: 14px;
  padding-bottom: 8px;
}

.two-column {
  align-items: start;
  display: grid;
  gap: 16px;
  grid-template-columns: minmax(0, 1.2fr) minmax(280px, 0.8fr);
}

.unit-card,
.exam-chip {
  color: var(--text-primary);
  cursor: pointer;
  font-family: inherit;
  padding: 16px;
  text-align: left;
  transition: transform var(--transition-fast), box-shadow var(--transition-fast);
}

.unit-card:hover,
.exam-chip:hover,
.action-card:hover {
  box-shadow: var(--shadow-md);
  transform: translateY(-2px);
}

.unit-card-head {
  align-items: center;
  display: flex;
  justify-content: space-between;
  margin-bottom: 4px;
}

.unit-card p {
  font-size: 0.82rem;
  margin-bottom: 10px;
}

.unit-detail {
  color: var(--text-muted);
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  font-size: 0.72rem;
  margin-top: 8px;
}

.exam-strip,
.history-list {
  display: grid;
  gap: 8px;
}

.exam-chip {
  display: grid;
  gap: 3px;
}

.exam-chip span {
  font-weight: 800;
}

.exam-chip small,
.history-item small {
  color: var(--text-muted);
}

.history-item {
  align-items: center;
  display: flex;
  justify-content: space-between;
  padding: 10px 14px;
}

.history-item span:first-child {
  display: grid;
  gap: 2px;
}

.history-score {
  font-weight: 800;
}

.history-score.high { color: var(--accent-teal); }
.history-score.medium { color: var(--accent-amber); }
.history-score.low { color: var(--accent-red); }
.fill-blue { background: var(--accent-blue); }
.fill-teal { background: var(--accent-teal); }
.fill-amber { background: var(--accent-amber); }
.fill-purple { background: var(--accent-purple); }
.fill-red { background: var(--accent-red); }

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@media (max-width: 820px) {
  .next-topic-card,
  .two-column {
    display: grid;
    grid-template-columns: 1fr;
  }
}
</style>
