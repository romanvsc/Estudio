<template>
  <div class="dashboard">
    <div class="dash-header">
      <span class="badge badge-blue">Dashboard</span>
      <h1>Panel de Estudio — Sistemas de Datos III</h1>
      <p class="dash-subtitle">Visión general de tu progreso en las 5 unidades</p>
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
        <div v-for="unit in unitsMeta" :key="unit.id" class="unit-card" @click="goToUnit(unit.id)">
          <div class="unit-card-head">
            <h4>Unidad {{ unit.id }}</h4>
            <span class="badge" :class="`badge-${unit.color}`">{{ unitProgress(unit.id).completion }}%</span>
          </div>
          <p>{{ unit.title }}</p>
          <div class="unit-bar">
            <div class="unit-fill" :style="{ width: unitProgress(unit.id).completion + '%', background: `var(--accent-${unit.color})` }"></div>
          </div>
          <div class="unit-detail">
            <span>{{ unitProgress(unit.id).mastered }} dominados</span>
            <span>{{ unitProgress(unit.id).inProgress }} en curso</span>
            <span>{{ unitProgress(unit.id).quizzes }} quizzes</span>
          </div>
        </div>
      </div>
    </div>

    <div class="dash-section">
      <h3>Historial de Quizzes</h3>
      <div v-if="quizHistory.length" class="history-list">
        <div v-for="(attempt, i) in quizHistory.slice(0, 20)" :key="i" class="history-item">
          <div class="history-left">
            <span class="history-unit badge" :class="`badge-${getUnitColor(attempt.unitId)}`">{{ attempt.unitId }}</span>
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
      <p v-else class="empty-msg">Aún no completaste ningún cuestionario.</p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { getStudySnapshot, getAllQuizHistory } from '../composables/useStudyProgress'

const router = useRouter()
const snapshot = ref(null)

const unitsMeta = [
  { id: 'sd3-1', num: 1, title: 'Introducción a los SO', color: 'blue' },
  { id: 'sd3-2', num: 2, title: 'Procesos', color: 'teal' },
  { id: 'sd3-3', num: 3, title: 'Bloqueo Irreversible', color: 'amber' },
  { id: 'sd3-4', num: 4, title: 'Administración de Memoria', color: 'purple' },
  { id: 'sd3-5', num: 5, title: 'Sistema de Archivos', color: 'red' }
]

const colorMap = { 'sd3-1': 'blue', 'sd3-2': 'teal', 'sd3-3': 'amber', 'sd3-4': 'purple', 'sd3-5': 'red' }

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
  return getAllQuizHistory().filter(h => String(h.unitId).startsWith('sd3-'))
})
const totalQuizzes = computed(() => quizHistory.value.length)

function unitProgress(unitId) {
  const unit = snapshot.value?.units?.[String(unitId)]
  if (!unit?.topics) return { completion: 0, mastered: 0, inProgress: 0, quizzes: 0 }
  const topics = Object.values(unit.topics)
  const mastered = topics.filter(t => t.status === 'dominado').length
  const inProgress = topics.filter(t => t.status === 'en-curso').length
  const total = topics.length
  const quizzes = (unit.quizHistory || []).length
  const rawCompletion = total ? Math.round((mastered / total) * 100) : 0
  const completion = rawCompletion === 100 && quizzes === 0 ? 90 : rawCompletion
  return { completion, mastered, inProgress, quizzes }
}

const overallCompletion = computed(() => {
  const progs = unitsMeta.map(u => unitProgress(u.id).completion)
  if (!progs.length) return 0
  return Math.round(progs.reduce((a, b) => a + b, 0) / progs.length)
})

function getUnitColor(unitId) {
  return colorMap[unitId] || 'blue'
}

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

function goToUnit(id) {
  const num = String(id).replace('sd3-', '')
  router.push(`/sd3/unidad/${num}`)
}
</script>

<style scoped>
.dashboard { animation: fadeIn 0.4s ease; }
.dash-header { margin-bottom: 32px; }
.dash-header h1 { margin-top: 8px; }
.dash-subtitle { color: var(--text-muted); margin: 0; }
.stats-row { display: grid; grid-template-columns: repeat(auto-fit, minmax(160px, 1fr)); gap: 12px; margin-bottom: 32px; }
.stat-card { background: var(--bg-card); border: 1px solid var(--border-color); border-radius: var(--radius-lg); padding: 18px; text-align: center; transition: all var(--transition-fast); }
.stat-card:hover { border-color: var(--border-color-hover); box-shadow: var(--shadow-sm); }
.stat-number { display: block; font-size: 2rem; font-weight: 800; color: var(--accent-blue); line-height: 1; margin-bottom: 4px; }
.stat-label { font-size: 0.78rem; color: var(--text-muted); }
.stat-bar { height: 4px; background: var(--bg-tertiary); border-radius: 4px; margin-top: 10px; overflow: hidden; }
.stat-fill { height: 100%; background: linear-gradient(90deg, var(--accent-blue), var(--accent-teal)); border-radius: 4px; transition: width 0.5s ease; }
.dash-section { margin-bottom: 32px; }
.dash-section h3 { margin-bottom: 14px; padding-bottom: 8px; border-bottom: 1px solid var(--border-color); }
.units-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 12px; }
.unit-card { background: var(--bg-card); border: 1px solid var(--border-color); border-radius: var(--radius-lg); padding: 16px; cursor: pointer; transition: all var(--transition-fast); }
.unit-card:hover { border-color: var(--border-color-hover); box-shadow: var(--shadow-md); transform: translateY(-2px); }
.unit-card-head { display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px; }
.unit-card p { font-size: 0.82rem; margin-bottom: 10px; }
.unit-bar { height: 5px; background: var(--bg-tertiary); border-radius: 5px; overflow: hidden; margin-bottom: 8px; }
.unit-fill { height: 100%; border-radius: 5px; transition: width 0.5s ease; }
.unit-detail { display: flex; gap: 10px; font-size: 0.72rem; color: var(--text-muted); }
.history-list { display: flex; flex-direction: column; gap: 8px; }
.history-item { display: flex; align-items: center; justify-content: space-between; gap: 12px; padding: 10px 14px; background: var(--bg-card); border: 1px solid var(--border-color); border-radius: var(--radius-md); }
.history-left { display: flex; align-items: center; gap: 10px; }
.history-date { font-size: 0.75rem; color: var(--text-muted); }
.history-right { display: flex; align-items: center; gap: 10px; min-width: 140px; }
.history-score { font-weight: 700; font-size: 0.9rem; white-space: nowrap; }
.history-score.high { color: var(--accent-teal); }
.history-score.medium { color: var(--accent-amber); }
.history-score.low { color: var(--accent-red); }
.history-bar { flex: 1; height: 5px; background: var(--bg-tertiary); border-radius: 5px; overflow: hidden; min-width: 60px; }
.history-fill { height: 100%; border-radius: 5px; transition: width 0.3s ease; }
.history-fill.high { background: var(--accent-teal); }
.history-fill.medium { background: var(--accent-amber); }
.history-fill.low { background: var(--accent-red); }
.empty-msg { color: var(--text-muted); font-size: 0.88rem; padding: 18px; }
@keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
</style>
