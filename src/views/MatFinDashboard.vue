<template>
  <div class="dashboard">
    <div class="dash-header">
      <span class="badge badge-teal">Dashboard</span>
      <h1>Panel de Estudio — Matemática Financiera</h1>
      <p class="dash-subtitle">Seguimiento de avance en la Unidad 1</p>
    </div>

    <div class="stats-row">
      <div class="stat-card">
        <span class="stat-number">{{ overallCompletion }}%</span>
        <span class="stat-label">Progreso total</span>
        <div class="stat-bar"><div class="stat-fill" :style="{ width: overallCompletion + '%' }"></div></div>
      </div>
      <div class="stat-card">
        <span class="stat-number">{{ totalQuizzes }}</span>
        <span class="stat-label">Quizzes completados</span>
      </div>
    </div>

    <div class="dash-section">
      <h3>Progreso por Unidad</h3>
      <div class="units-grid">
        <div class="unit-card" @click="goToUnit(1)">
          <div class="unit-card-head">
            <h4>Unidad 1</h4>
            <span class="badge badge-teal">{{ unitProgress.completion }}%</span>
          </div>
          <p>Fundamentos y Cálculo Financiero</p>
          <div class="unit-bar">
            <div class="unit-fill" :style="{ width: unitProgress.completion + '%' }"></div>
          </div>
          <div class="unit-detail">
            <span>{{ unitProgress.mastered }} dominados</span>
            <span>{{ unitProgress.inProgress }} en curso</span>
            <span>{{ unitProgress.quizzes }} quizzes</span>
          </div>
        </div>
      </div>
    </div>

    <div class="dash-section">
      <h3>Historial de Quizzes</h3>
      <div v-if="quizHistory.length" class="history-list">
        <div v-for="(attempt, i) in quizHistory.slice(0, 20)" :key="i" class="history-item">
          <div class="history-left">
            <span class="history-unit badge badge-teal">Unidad 1</span>
            <span class="history-date">{{ formatDate(attempt.date) }}</span>
          </div>
          <div class="history-right">
            <span class="history-score" :class="scoreClass(attempt)">
              {{ attempt.score }}/{{ attempt.total }}
            </span>
            <div class="history-bar">
              <div class="history-fill" :class="scoreClass(attempt)" :style="{ width: ((attempt.score / Math.max(attempt.total, 1)) * 100) + '%' }"></div>
            </div>
          </div>
        </div>
      </div>
      <p v-else class="empty-msg">Aún no completaste ningún cuestionario en Matemática Financiera.</p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { getStudySnapshot, getAllQuizHistory } from '../composables/useStudyProgress'

const router = useRouter()
const snapshot = ref(null)

onMounted(() => {
  snapshot.value = getStudySnapshot()
  window.addEventListener('study-progress-updated', refreshData)
})

onUnmounted(() => {
  window.removeEventListener('study-progress-updated', refreshData)
})

function refreshData() {
  snapshot.value = getStudySnapshot()
}

const quizHistory = computed(() => {
  return getAllQuizHistory().filter(h => h.unitId === 'mf-1')
})

const totalQuizzes = computed(() => quizHistory.value.length)

const unitProgress = computed(() => {
  const unit = snapshot.value?.units?.['mf-1']
  if (!unit?.topics) return { completion: 0, mastered: 0, inProgress: 0, quizzes: 0 }
  const topics = Object.values(unit.topics)
  const mastered = topics.filter(t => t.status === 'dominado').length
  const inProgress = topics.filter(t => t.status === 'en-curso').length
  const total = topics.length
  const quizzes = (unit.quizHistory || []).length
  const rawCompletion = total ? Math.round((mastered / total) * 100) : 0
  const completion = rawCompletion === 100 && quizzes === 0 ? 90 : rawCompletion
  return { completion, mastered, inProgress, quizzes }
})

const overallCompletion = computed(() => unitProgress.value.completion)

function scoreClass(attempt) {
  const pct = (attempt.score / Math.max(attempt.total, 1)) * 100
  if (pct >= 80) return 'high'
  if (pct >= 50) return 'medium'
  return 'low'
}

function formatDate(dateStr) {
  if (!dateStr) return ''
  const d = new Date(dateStr)
  return d.toLocaleDateString('es-AR', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })
}

function goToUnit(unitId) {
  router.push(`/matfin/unidad/${unitId}`)
}
</script>

<style scoped>
.dashboard {
  animation: fadeIn 0.4s ease;
}

.dash-header {
  margin-bottom: 32px;
}

.dash-header h1 {
  margin-top: 8px;
}

.dash-subtitle {
  color: var(--text-muted);
  margin: 0;
}

.stats-row {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 12px;
  margin-bottom: 28px;
}

.stat-card {
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-lg);
  padding: 18px;
  text-align: center;
}

.stat-number {
  display: block;
  font-size: 2rem;
  font-weight: 800;
  color: var(--accent-teal);
  line-height: 1;
  margin-bottom: 4px;
}

.stat-label {
  font-size: 0.78rem;
  color: var(--text-muted);
}

.stat-bar {
  height: 4px;
  background: var(--bg-tertiary);
  border-radius: 4px;
  margin-top: 10px;
  overflow: hidden;
}

.stat-fill {
  height: 100%;
  background: linear-gradient(90deg, var(--accent-teal), var(--accent-blue));
  border-radius: 4px;
  transition: width 0.5s ease;
}

.dash-section {
  margin-bottom: 28px;
}

.dash-section h3 {
  margin-bottom: 14px;
  padding-bottom: 8px;
  border-bottom: 1px solid var(--border-color);
}

.units-grid {
  display: grid;
  grid-template-columns: 1fr;
}

.unit-card {
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-lg);
  padding: 16px;
  cursor: pointer;
  transition: all var(--transition-fast);
}

.unit-card:hover {
  border-color: var(--accent-teal);
  box-shadow: var(--shadow-md);
  transform: translateY(-2px);
}

.unit-card-head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 4px;
}

.unit-card p {
  font-size: 0.82rem;
  margin-bottom: 10px;
}

.unit-bar {
  height: 5px;
  background: var(--bg-tertiary);
  border-radius: 5px;
  overflow: hidden;
  margin-bottom: 8px;
}

.unit-fill {
  height: 100%;
  border-radius: 5px;
  background: var(--accent-teal);
  transition: width 0.5s ease;
}

.unit-detail {
  display: flex;
  gap: 10px;
  font-size: 0.72rem;
  color: var(--text-muted);
}

.history-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.history-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 10px 14px;
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
}

.history-left {
  display: flex;
  align-items: center;
  gap: 10px;
}

.history-date {
  font-size: 0.75rem;
  color: var(--text-muted);
}

.history-right {
  display: flex;
  align-items: center;
  gap: 10px;
  min-width: 140px;
}

.history-score {
  font-weight: 700;
  font-size: 0.9rem;
  white-space: nowrap;
}

.history-score.high {
  color: var(--accent-teal);
}

.history-score.medium {
  color: var(--accent-amber);
}

.history-score.low {
  color: var(--accent-red);
}

.history-bar {
  flex: 1;
  height: 5px;
  background: var(--bg-tertiary);
  border-radius: 5px;
  overflow: hidden;
  min-width: 60px;
}

.history-fill {
  height: 100%;
  border-radius: 5px;
  transition: width 0.3s ease;
}

.history-fill.high {
  background: var(--accent-teal);
}

.history-fill.medium {
  background: var(--accent-amber);
}

.history-fill.low {
  background: var(--accent-red);
}

.empty-msg {
  color: var(--text-muted);
  font-size: 0.88rem;
  padding: 18px;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
</style>
