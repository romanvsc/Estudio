<template>
  <div class="dashboard">
    <div class="dash-header">
      <span class="badge badge-blue">Dashboard</span>
      <h1>Panel de Estudio</h1>
      <p class="dash-subtitle">Visión general de tu progreso en todas las unidades</p>
    </div>

    <!-- Overall Stats -->
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
      <div class="stat-card">
        <span class="stat-number">{{ bookmarks.length }}</span>
        <span class="stat-label">Temas favoritos</span>
      </div>
      <div class="stat-card">
        <span class="stat-number">{{ notes.length }}</span>
        <span class="stat-label">Notas escritas</span>
      </div>
    </div>

    <!-- Unit Progress -->
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

    <!-- Quiz History -->
    <div class="dash-section">
      <h3>Historial de Quizzes</h3>
      <div v-if="quizHistory.length" class="history-list">
        <div v-for="(attempt, i) in quizHistory.slice(0, 20)" :key="i" class="history-item">
          <div class="history-left">
            <span class="history-unit badge" :class="`badge-${getUnitColor(attempt.unitId)}`">Unidad {{ attempt.unitId }}</span>
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

    <!-- Bookmarks -->
    <div class="dash-section">
      <h3>Temas Favoritos</h3>
      <div v-if="bookmarks.length" class="bookmark-grid">
        <button v-for="bm in bookmarks" :key="bm.id" class="bookmark-card" @click="goToBookmark(bm)">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="var(--accent-amber)" stroke="var(--accent-amber)" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
          <div class="bm-info">
            <strong>{{ bm.title || bm.id }}</strong>
            <span v-if="bm.unitId">Unidad {{ bm.unitId }}</span>
          </div>
        </button>
      </div>
      <p v-else class="empty-msg">No marcaste ningún tema como favorito. Usá la estrella en cada tema.</p>
    </div>

    <!-- Notes -->
    <div class="dash-section">
      <h3>Tus Notas</h3>
      <div v-if="notes.length" class="notes-grid">
        <div v-for="note in notes" :key="note.id" class="note-card">
          <div class="note-head">
            <strong>{{ note.title || note.id }}</strong>
            <span class="note-unit badge" :class="`badge-${getUnitColor(note.unitId)}`" v-if="note.unitId">U{{ note.unitId }}</span>
          </div>
          <p class="note-text">{{ note.text }}</p>
          <small class="note-date">{{ formatDate(note.updatedAt) }}</small>
        </div>
      </div>
      <p v-else class="empty-msg">No escribiste notas aún. Podés agregar notas dentro de cada tema.</p>
    </div>

    <!-- Achievements -->
    <div class="dash-section">
      <AchievementsPanel />
    </div>

    <!-- Quiz Evolution Chart -->
    <div v-if="quizHistory.length > 1" class="dash-section">
      <h3>Evolución de Quizzes</h3>
      <div class="chart-container">
        <svg class="quiz-chart" :viewBox="`0 0 ${chartWidth} 120`" preserveAspectRatio="none">
          <rect
            v-for="(bar, i) in chartBars"
            :key="i"
            :x="bar.x"
            :y="bar.y"
            :width="bar.w"
            :height="bar.h"
            :fill="bar.color"
            :stroke="'var(--border-color)'"
            stroke-width="2"
            rx="2"
          />
        </svg>
        <div class="chart-labels">
          <span v-for="(bar, i) in chartBars" :key="i" class="chart-label">
            {{ bar.score }}
          </span>
        </div>
      </div>
    </div>

    <!-- Study Streak Heatmap -->
    <div class="dash-section">
      <h3>Actividad reciente</h3>
      <div class="heatmap-grid">
        <div
          v-for="(day, i) in heatmapDays"
          :key="i"
          class="heatmap-cell"
          :class="{ active: day.active }"
          :title="day.label"
        ></div>
      </div>
      <div class="heatmap-legend">
        <small>Últimos 30 días · {{ activeDaysCount }} días activos</small>
      </div>
    </div>

    <!-- Export/Import -->
    <div class="dash-section export-section">
      <h3>Exportar / Importar Progreso</h3>
      <p>Guardá tu progreso como archivo JSON o restauralo desde una copia anterior.</p>
      <div class="export-actions">
        <button class="btn-export" @click="exportData">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
          Exportar Progreso
        </button>
        <label class="btn-import">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
          Importar Progreso
          <input type="file" accept=".json" @change="importData" hidden />
        </label>
      </div>
      <p v-if="importMsg" class="import-msg" :class="importSuccess ? 'success' : 'error'">{{ importMsg }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { useStudyStore } from '../stores/studyProgress'
import AchievementsPanel from '../components/AchievementsPanel.vue'

const router = useRouter()
const store = useStudyStore()
const importMsg = ref('')
const importSuccess = ref(false)

const unitsMeta = [
  { id: 1, title: 'Contabilidad y Organización', color: 'blue' },
  { id: 2, title: 'Aspectos Contables y Fiscales', color: 'teal' },
  { id: 3, title: 'Informes y Ecuaciones', color: 'amber' },
  { id: 4, title: 'Cuentas Contables', color: 'purple' },
  { id: 5, title: 'Registración y Normativa', color: 'red' }
]

const colorMap = { 1: 'blue', 2: 'teal', 3: 'amber', 4: 'purple', 5: 'red' }

onMounted(() => {
  window.addEventListener('study-progress-updated', refreshData)
  store.updateStreak()
})

onUnmounted(() => {
  window.removeEventListener('study-progress-updated', refreshData)
})

function refreshData() {
  store.refresh()
}

const bookmarks = computed(() => store.getBookmarks())
const notes = computed(() => store.getAllNotes())
const quizHistory = computed(() => store.getAllQuizHistory())
const totalQuizzes = computed(() => quizHistory.value.length)

function unitProgress(unitId) {
  const snap = store.snapshot
  const unit = snap?.units?.[String(unitId)]
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

// ─── Quiz Evolution Chart ───
const chartBars = computed(() => {
  const data = quizHistory.value.slice(0, 15).reverse()
  const count = data.length
  if (!count) return []
  const gap = 4
  const barW = Math.max(12, Math.floor((400 - gap * (count - 1)) / count))
  return data.map((q, i) => {
    const pct = (q.score / Math.max(q.total, 1)) * 100
    const h = Math.max(4, (pct / 100) * 100)
    const color = pct >= 80 ? 'var(--accent-teal)' : pct >= 50 ? 'var(--accent-amber)' : 'var(--accent-red)'
    return { x: i * (barW + gap), y: 110 - h, w: barW, h, score: q.score, color }
  })
})
const chartWidth = computed(() => {
  const bars = chartBars.value
  if (!bars.length) return 400
  const last = bars[bars.length - 1]
  return last.x + last.w + 4
})

// ─── Heatmap ───
const heatmapDays = computed(() => {
  const snap = store.snapshot
  const allDates = new Set()
  for (const unit of Object.values(snap?.units || {})) {
    for (const topic of Object.values(unit.topics || {})) {
      if (topic.updatedAt) allDates.add(topic.updatedAt.slice(0, 10))
    }
    for (const q of (unit.quizHistory || [])) {
      if (q.date) allDates.add(q.date.slice(0, 10))
    }
  }
  const days = []
  for (let i = 29; i >= 0; i--) {
    const d = new Date(Date.now() - i * 86400000)
    const key = d.toISOString().slice(0, 10)
    days.push({
      label: d.toLocaleDateString('es-AR', { day: '2-digit', month: 'short' }),
      active: allDates.has(key)
    })
  }
  return days
})

const activeDaysCount = computed(() => heatmapDays.value.filter(d => d.active).length)

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
  router.push(`/contabilidad/unidad/${id}`)
}

function goToBookmark(bm) {
  if (bm.unitId) {
    router.push(`/contabilidad/unidad/${bm.unitId}#${bm.id}`)
  }
}

function exportData() {
  const json = store.exportAllProgress()
  const blob = new Blob([json], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `estudio-progreso-${new Date().toISOString().slice(0, 10)}.json`
  a.click()
  URL.revokeObjectURL(url)
}

function importData(event) {
  const file = event.target?.files?.[0]
  if (!file) return
  const reader = new FileReader()
  reader.onload = () => {
    const ok = store.importAllProgress(reader.result)
    importSuccess.value = ok
    importMsg.value = ok ? 'Progreso importado correctamente. Recargá la página para ver los cambios.' : 'Error: archivo inválido.'
    setTimeout(() => { importMsg.value = '' }, 5000)
  }
  reader.readAsText(file)
  event.target.value = ''
}
</script>


<style scoped>
.dashboard {
  animation: fadeIn 0.3s ease;
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
  font-weight: 500;
}

/* Stats Row */
.stats-row {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  gap: 12px;
  margin-bottom: 32px;
}

.stat-card {
  background: var(--bg-card);
  border: var(--border-width) solid var(--border-color);
  border-radius: var(--radius-md);
  padding: 18px;
  text-align: center;
  box-shadow: var(--shadow-md);
  transition: all var(--transition-fast);
}

.stat-card:hover {
  transform: translate(-2px, -2px);
  box-shadow: 6px 6px 0 var(--border-color);
}

.stat-number {
  display: block;
  font-size: 2rem;
  font-weight: 800;
  color: var(--accent-blue);
  line-height: 1;
  margin-bottom: 4px;
}

.stat-label {
  font-size: 0.78rem;
  font-weight: 600;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 0.04em;
}

.stat-bar {
  height: 6px;
  background: var(--bg-tertiary);
  border: var(--border-width) solid var(--border-color);
  border-radius: 2px;
  margin-top: 10px;
  overflow: hidden;
}

.stat-fill {
  height: 100%;
  background: var(--accent-blue);
  transition: width 0.5s ease;
}

/* Sections */
.dash-section {
  margin-bottom: 32px;
}

.dash-section h3 {
  margin-bottom: 14px;
  padding-bottom: 10px;
  border-bottom: var(--border-width) solid var(--border-color);
}

/* Units Grid */
.units-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 14px;
}

.unit-card {
  background: var(--bg-card);
  border: var(--border-width) solid var(--border-color);
  border-radius: var(--radius-md);
  padding: 16px;
  cursor: pointer;
  box-shadow: var(--shadow-md);
  transition: all var(--transition-fast);
}

.unit-card:hover {
  transform: translate(-2px, -2px);
  box-shadow: 6px 6px 0 var(--border-color);
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
  font-weight: 500;
}

.unit-bar {
  height: 6px;
  background: var(--bg-tertiary);
  border: var(--border-width) solid var(--border-color);
  border-radius: 2px;
  overflow: hidden;
  margin-bottom: 8px;
}

.unit-fill {
  height: 100%;
  transition: width 0.5s ease;
}

.unit-detail {
  display: flex;
  gap: 10px;
  font-size: 0.72rem;
  color: var(--text-muted);
  font-weight: 600;
}

/* Quiz History */
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
  border: var(--border-width) solid var(--border-color);
  border-radius: var(--radius-sm);
  box-shadow: var(--shadow-sm);
}

.history-left {
  display: flex;
  align-items: center;
  gap: 10px;
}

.history-date {
  font-size: 0.75rem;
  color: var(--text-muted);
  font-weight: 500;
}

.history-right {
  display: flex;
  align-items: center;
  gap: 10px;
  min-width: 140px;
}

.history-score {
  font-weight: 800;
  font-size: 0.9rem;
  white-space: nowrap;
}

.history-score.high { color: var(--accent-teal); }
.history-score.medium { color: var(--accent-amber); }
.history-score.low { color: var(--accent-red); }

.history-bar {
  flex: 1;
  height: 6px;
  background: var(--bg-tertiary);
  border: var(--border-width) solid var(--border-color);
  border-radius: 2px;
  overflow: hidden;
  min-width: 60px;
}

.history-fill {
  height: 100%;
  transition: width 0.3s ease;
}

.history-fill.high { background: var(--accent-teal); }
.history-fill.medium { background: var(--accent-amber); }
.history-fill.low { background: var(--accent-red); }

/* Bookmarks */
.bookmark-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 10px;
}

.bookmark-card {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 14px;
  background: var(--accent-gold-soft);
  border: var(--border-width) solid var(--border-color);
  border-radius: var(--radius-sm);
  cursor: pointer;
  text-align: left;
  font-family: inherit;
  box-shadow: var(--shadow-sm);
  transition: all var(--transition-fast);
}

.bookmark-card:hover {
  background: var(--accent-gold);
  transform: translate(-1px, -1px);
  box-shadow: 4px 4px 0 var(--border-color);
}

.bm-info {
  display: flex;
  flex-direction: column;
}

.bm-info strong {
  font-size: 0.88rem;
  font-weight: 700;
}

.bm-info span {
  font-size: 0.72rem;
  color: var(--text-muted);
  font-weight: 600;
}

/* Notes */
.notes-grid {
  display: grid;
  gap: 10px;
}

.note-card {
  background: var(--bg-card);
  border: var(--border-width) solid var(--border-color);
  border-radius: var(--radius-sm);
  padding: 14px;
  box-shadow: var(--shadow-sm);
}

.note-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 6px;
}

.note-text {
  font-size: 0.85rem;
  white-space: pre-wrap;
  line-height: 1.6;
  margin-bottom: 4px;
}

.note-date {
  font-size: 0.7rem;
  color: var(--text-muted);
  font-weight: 600;
}

/* Export/Import */
.export-section {
  background: var(--bg-card);
  border: var(--border-width) solid var(--border-color);
  border-radius: var(--radius-md);
  padding: 20px;
  box-shadow: var(--shadow-md);
}

.export-section h3 {
  border: none;
  padding: 0;
  margin-bottom: 6px;
}

.export-section > p {
  font-size: 0.85rem;
}

.export-actions {
  display: flex;
  gap: 10px;
  margin-top: 14px;
  flex-wrap: wrap;
}

.btn-export,
.btn-import {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 18px;
  border-radius: var(--radius-sm);
  font-weight: 700;
  cursor: pointer;
  font-size: 0.88rem;
  font-family: inherit;
  border: var(--border-width) solid var(--border-color);
  box-shadow: var(--shadow-sm);
  transition: all var(--transition-fast);
}

.btn-export {
  background: var(--accent-blue);
  color: white;
}

.btn-export:hover {
  transform: translate(-1px, -1px);
  box-shadow: 4px 4px 0 var(--border-color);
}

.btn-import {
  background: var(--bg-tertiary);
  color: var(--text-primary);
}

.btn-import:hover {
  background: var(--bg-card-hover);
  transform: translate(-1px, -1px);
  box-shadow: 4px 4px 0 var(--border-color);
}

.btn-export:active,
.btn-import:active {
  transform: translate(2px, 2px);
  box-shadow: 1px 1px 0 var(--border-color);
}

.import-msg {
  margin-top: 10px;
  font-size: 0.85rem;
  font-weight: 700;
}

.import-msg.success { color: var(--accent-teal); }
.import-msg.error { color: var(--accent-red); }

.empty-msg {
  color: var(--text-muted);
  font-size: 0.88rem;
  font-weight: 500;
  font-style: italic;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(8px); }
  to { opacity: 1; transform: translateY(0); }
}

@media (max-width: 768px) {
  .stats-row {
    grid-template-columns: repeat(2, 1fr);
  }

  .units-grid {
    grid-template-columns: 1fr;
  }

  .history-item {
    flex-direction: column;
    align-items: flex-start;
    gap: 6px;
  }

  .history-right {
    width: 100%;
  }
}

/* Quiz Chart */
.chart-container {
  background: var(--bg-card);
  border: var(--border-width) solid var(--border-color);
  border-radius: var(--radius-md);
  padding: 18px;
  box-shadow: var(--shadow-md);
}

.quiz-chart {
  width: 100%;
  height: 120px;
}

.chart-labels {
  display: flex;
  justify-content: space-around;
  margin-top: 6px;
}

.chart-label {
  font-size: 0.65rem;
  font-weight: 800;
  color: var(--text-muted);
}

/* Heatmap */
.heatmap-grid {
  display: grid;
  grid-template-columns: repeat(15, 1fr);
  gap: 4px;
}

.heatmap-cell {
  aspect-ratio: 1;
  border: var(--border-width) solid var(--border-color);
  border-radius: 3px;
  background: var(--bg-tertiary);
  transition: all var(--transition-fast);
}

.heatmap-cell.active {
  background: var(--accent-teal);
  box-shadow: 2px 2px 0 var(--border-color);
}

.heatmap-legend {
  margin-top: 8px;
  text-align: right;
}

.heatmap-legend small {
  font-size: 0.7rem;
  font-weight: 600;
  color: var(--text-muted);
}
</style>


