<template>
  <div>
    <div class="study-toolbar">
      <div class="study-progress-card">
        <div class="card-head">
          <h3>Progreso por tema</h3>
          <span class="badge" :class="badgeClass">{{ studySummary.completion }}% dominado</span>
        </div>
        <div class="status-grid">
          <div v-for="topic in topicMeta" :key="topic.id" class="status-row">
            <div>
              <strong>{{ topic.number }}</strong>
              <p>{{ topic.title }}</p>
            </div>
            <div class="status-actions">
              <button class="status-btn" :class="{ active: topicStatus[topic.id] === 'pendiente' }" @click="setStatus(topic.id, 'pendiente')">Pend.</button>
              <button class="status-btn" :class="{ active: topicStatus[topic.id] === 'en-curso' }" @click="setStatus(topic.id, 'en-curso')">En curso</button>
              <button class="status-btn" :class="{ active: topicStatus[topic.id] === 'dominado' }" @click="setStatus(topic.id, 'dominado')">Dominado</button>
            </div>
          </div>
        </div>
      </div>

      <div class="summary-card">
        <h3>Resumen de 1 minuto</h3>
        <div class="summary-grid">
          <div v-for="topic in topicMeta" :key="`${topic.id}-summary`" class="summary-item">
            <strong>{{ topic.number }} · {{ topic.title }}</strong>
            <ul>
              <li v-for="point in topic.summary" :key="point">{{ point }}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <div v-if="searchResults.length" class="search-results-card">
      <h3>Resultados en {{ title }} ({{ searchResults.length }})</h3>
      <div class="search-results-list">
        <button
          v-for="result in searchResults"
          :key="`${result.topicId}-${result.term}`"
          class="search-result-item"
          @click="goToTopic(result.anchor)"
        >
          <strong>{{ result.number }} · {{ result.title }}</strong>
          <span>Coincide con: {{ result.term }}</span>
        </button>
      </div>
    </div>

    <StudyFlashcards :cards="flashcards" :unitId="unitId" />

    <div class="mini-quiz-grid">
      <TopicQuickQuiz
        v-for="quiz in topicQuickChecks"
        :key="quiz.topicId"
        :title="quiz.title"
        :topicId="quiz.topicId"
        :question="quiz.question"
        :options="quiz.options"
        :correctIndex="quiz.correctIndex"
        @answered="handleQuickCheck"
      />
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, onUnmounted, reactive, ref } from 'vue'
import { useStudyProgress } from '../composables/useStudyProgress'
import StudyFlashcards from './StudyFlashcards.vue'
import TopicQuickQuiz from './TopicQuickQuiz.vue'

const props = defineProps({
  title: { type: String, default: 'la unidad' },
  unitId: { type: [String, Number], required: true },
  searchQuery: { type: String, default: '' },
  topicMeta: { type: Array, required: true },
  flashcards: { type: Array, required: true },
  topicQuickChecks: { type: Array, required: true },
  accent: { type: String, default: 'blue' }
})

const { getTopicStatus, setTopicStatus, getQuizHistory } = useStudyProgress(props.unitId)
const topicStatus = reactive({})
const quizAttempts = ref(0)

onMounted(() => {
  refreshProgressState()
  window.addEventListener('study-progress-updated', refreshProgressState)
})

onUnmounted(() => {
  window.removeEventListener('study-progress-updated', refreshProgressState)
})

const studySummary = computed(() => {
  const total = props.topicMeta.length
  const statuses = props.topicMeta.map((topic) => topicStatus[topic.id] || 'pendiente')
  const mastered = statuses.filter((status) => status === 'dominado').length
  const inProgress = statuses.filter((status) => status === 'en-curso').length
  const rawCompletion = total ? Math.round((mastered / total) * 100) : 0
  const completion = rawCompletion === 100 && quizAttempts.value === 0 ? 90 : rawCompletion
  return {
    total,
    mastered,
    inProgress,
    completion
  }
})

const searchResults = computed(() => {
  const term = props.searchQuery.trim().toLowerCase()
  if (!term) return []
  return props.topicMeta
    .map((topic) => {
      const match = topic.keywords.find((keyword) => keyword.toLowerCase().includes(term)) ||
        topic.title.toLowerCase().includes(term) && topic.title
      if (!match) return null
      return {
        topicId: topic.id,
        anchor: topic.anchor,
        number: topic.number,
        title: topic.title,
        term: typeof match === 'string' ? match : term
      }
    })
    .filter(Boolean)
})

const badgeClass = computed(() => {
  const map = {
    blue: 'badge-blue',
    teal: 'badge-teal',
    amber: 'badge-amber',
    red: 'badge-red',
    purple: 'badge-purple'
  }
  return map[props.accent] || 'badge-blue'
})

function setStatus(topicId, status) {
  topicStatus[topicId] = status
  setTopicStatus(topicId, status)
}

function refreshProgressState() {
  props.topicMeta.forEach((topic) => {
    topicStatus[topic.id] = getTopicStatus(topic.id)
  })
  quizAttempts.value = getQuizHistory().length
}

function handleQuickCheck({ topicId, isCorrect }) {
  setStatus(topicId, isCorrect ? 'dominado' : 'en-curso')
}

function goToTopic(anchor) {
  const target = document.getElementById(anchor)
  if (target) {
    target.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}
</script>

<style scoped>
.study-toolbar {
  display: grid;
  grid-template-columns: 1fr;
  gap: 12px;
  margin-bottom: 18px;
}

.study-progress-card,
.summary-card,
.search-results-card {
  border: var(--border-width) solid var(--border-color);
  border-radius: var(--radius-lg);
  background: var(--bg-card);
  padding: 14px;
}

.card-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
}

.status-grid {
  display: grid;
  gap: 8px;
}

.status-row {
  border: var(--border-width) solid var(--border-color);
  border-radius: var(--radius-sm);
  padding: 8px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
}

.status-row p {
  margin: 0;
  font-size: 0.8rem;
}

.status-actions {
  display: flex;
  gap: 6px;
}

.status-btn {
  border: var(--border-width) solid var(--border-color);
  background: var(--bg-tertiary);
  color: var(--text-secondary);
  border-radius: 6px;
  font-size: 0.72rem;
  padding: 5px 8px;
  cursor: pointer;
}

.status-btn.active {
  color: var(--accent-blue);
  border-color: var(--accent-blue);
  background: var(--accent-blue-soft);
}

.summary-grid {
  display: grid;
  gap: 10px;
}

.summary-item {
  border: var(--border-width) solid var(--border-color);
  border-radius: var(--radius-sm);
  padding: 8px;
}

.summary-item ul {
  margin: 6px 0 0;
  padding-left: 18px;
}

.summary-item li {
  color: var(--text-secondary);
  font-size: 0.8rem;
}

.search-results-list {
  display: grid;
  gap: 8px;
  margin-top: 10px;
}

.search-result-item {
  border: var(--border-width) solid var(--border-color);
  background: var(--bg-tertiary);
  border-radius: var(--radius-sm);
  padding: 10px;
  text-align: left;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.search-result-item span {
  color: var(--text-secondary);
  font-size: 0.8rem;
}

.mini-quiz-grid {
  margin-top: 12px;
  margin-bottom: 18px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 10px;
}
</style>
