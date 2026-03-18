<template>
  <div class="unit-quiz" @keydown="handleKeydown" tabindex="0" ref="quizRef">
    <!-- Intro State -->
    <div v-if="state === 'intro'" class="quiz-card intro-card">
      <div class="icon-wrapper">
        <component :is="BrainCircuit" class="quiz-icon" />
      </div>
      <h3>Poné a prueba tus conocimientos</h3>
      <p>Realizá este breve cuestionario para repasar los conceptos clave de esta unidad.</p>
      <div class="mode-switch">
        <button class="mode-btn" :class="{ active: mode === 'practice' }" @click="mode = 'practice'">Práctica</button>
        <button class="mode-btn" :class="{ active: mode === 'exam' }" @click="mode = 'exam'">Modo examen</button>
      </div>
      <button @click="startQuiz" class="btn-primary">
        Comenzar Cuestionario
      </button>
      <button
        v-if="reviewCount > 0"
        @click="startReviewMode"
        class="btn-secondary review-btn"
      >
        Repasar falladas ({{ reviewCount }})
      </button>

      <!-- Quiz History in Intro -->
      <div v-if="quizHistoryData.length" class="history-section">
        <h4>Intentos anteriores</h4>
        <div class="history-mini-list">
          <div v-for="(h, i) in quizHistoryData.slice(0, 5)" :key="i" class="history-mini-item">
            <span class="history-mini-date">{{ formatHistoryDate(h.date) }}</span>
            <span class="history-mini-score" :class="historyScoreClass(h)">{{ h.score }}/{{ h.total }}</span>
            <div class="history-mini-bar">
              <div class="history-mini-fill" :class="historyScoreClass(h)" :style="{ width: ((h.score / Math.max(h.total, 1)) * 100) + '%' }"></div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Active Quiz State -->
    <div v-else-if="state === 'active'" class="quiz-card active-card">
      <div class="quiz-header">
        <div class="quiz-meta">
          <span class="question-count">Pregunta {{ currentQuestionIndex + 1 }} de {{ selectedQuestions.length }}</span>
          <span v-if="mode === 'exam'" class="timer">⏱ {{ formattedTime }}</span>
        </div>
        <div class="progress-bar">
          <div class="progress-fill" :style="{ width: progressPercentage + '%' }"></div>
        </div>
      </div>

      <div class="question-container" :key="currentQuestionIndex">
        <h4 class="question-text question-animate">{{ currentQuestion.question }}</h4>
        
        <div class="options-grid">
          <button 
            v-for="(option, index) in currentQuestion.options" 
            :key="index"
            class="option-btn option-animate"
            :style="{ animationDelay: (index * 60) + 'ms' }"
            :class="{ 
              'selected': selectedOptionIndex === index,
              'correct': showPracticeFeedback && hasAnswered && index === currentQuestion.correctIndex,
              'incorrect': showPracticeFeedback && hasAnswered && selectedOptionIndex === index && index !== currentQuestion.correctIndex,
              'correct-pulse': showPracticeFeedback && hasAnswered && index === currentQuestion.correctIndex,
              'shake': showPracticeFeedback && hasAnswered && selectedOptionIndex === index && index !== currentQuestion.correctIndex
            }"
            @click="selectOption(index)"
            :disabled="hasAnswered"
            :aria-pressed="selectedOptionIndex === index"
            :aria-label="getLetter(index) + ': ' + option"
          >
            <span class="option-letter">{{ getLetter(index) }}</span>
            <span class="option-text">{{ option }}</span>
            
            <component 
              v-if="showPracticeFeedback && hasAnswered && index === currentQuestion.correctIndex"
              :is="CheckCircle2" 
              class="status-icon success" 
            />
            <component 
              v-else-if="showPracticeFeedback && hasAnswered && selectedOptionIndex === index && index !== currentQuestion.correctIndex"
              :is="XCircle" 
              class="status-icon error" 
            />
          </button>
        </div>
      </div>

      <div class="quiz-footer">
        <div v-if="hasAnswered && showPracticeFeedback" class="feedback-msg" :class="isCorrect ? 'text-success' : 'text-error'">
          {{ isCorrect ? '¡Correcto!' : 'Incorrecto. La respuesta correcta era: ' + currentQuestion.options[currentQuestion.correctIndex] }}
        </div>
        <div class="footer-right">
          <small class="keyboard-hint">A-D elegir · Enter avanzar</small>
          <button 
            v-if="hasAnswered" 
            @click="nextQuestion" 
            class="btn-primary next-btn"
          >
            {{ isLastQuestion ? 'Ver Resultados' : 'Siguiente Pregunta' }}
            <component :is="ArrowRight" class="btn-icon" />
          </button>
        </div>
      </div>
    </div>

    <!-- Results State -->
    <div v-else-if="state === 'results'" class="quiz-card results-card" style="position: relative; overflow: hidden;">
      <ConfettiCanvas v-if="isPerfectScore" />
      <div class="results-header">
        <div class="score-circle score-animate" :class="scoreClass">
          <span class="score-number">{{ score }}</span>
          <span class="score-total">/ {{ selectedQuestions.length }}</span>
        </div>
        <h3>{{ resultTitle }}</h3>
        <p>{{ resultMessage }}</p>
      </div>

      <div v-if="diagnosisRows.length" class="diagnosis">
        <h4>Diagnóstico por subtema</h4>
        <div class="diagnosis-grid">
          <div v-for="row in diagnosisRows" :key="row.topic" class="diagnosis-row">
            <span>{{ row.topic }}</span>
            <div class="diagnosis-bar-wrapper">
              <div class="diagnosis-bar">
                <div class="diagnosis-fill" :style="{ width: ((row.correct / Math.max(row.total, 1)) * 100) + '%' }"></div>
              </div>
              <span>{{ row.correct }}/{{ row.total }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Previous Attempts -->
      <div v-if="quizHistoryData.length > 1" class="history-in-results">
        <h4>Evolución de intentos</h4>
        <div class="history-chart">
          <div v-for="(h, i) in quizHistoryData.slice(0, 10)" :key="i" class="chart-bar-col">
            <div class="chart-bar" :class="historyScoreClass(h)" :style="{ height: ((h.score / Math.max(h.total, 1)) * 100) + '%' }">
              <span class="chart-label">{{ h.score }}</span>
            </div>
            <small>{{ i === 0 ? 'Hoy' : `#${quizHistoryData.length - i}` }}</small>
          </div>
        </div>
      </div>
      
      <div class="result-actions">
        <button @click="resetQuiz" class="btn-secondary">
          <component :is="RotateCcw" class="btn-icon" />
          Intentar de nuevo
        </button>
        <button v-if="reviewCount > 0" @click="startReviewMode" class="btn-primary">
          Repasar falladas
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { BrainCircuit, CheckCircle2, XCircle, ArrowRight, RotateCcw } from 'lucide-vue-next'
import { useStudyProgress } from '../composables/useStudyProgress'
import ConfettiCanvas from './ConfettiCanvas.vue'

const props = defineProps({
  unitId: {
    type: [String, Number],
    default: 'global'
  },
  questions: {
    type: Array,
    required: true,
    validator: (value) => {
      return value.every(q => q.question && q.options && typeof q.correctIndex === 'number')
    }
  }
})

const { saveWrongQuestions, clearWrongQuestions, getWrongQuestions, saveQuizAttempt, getQuizHistory } = useStudyProgress(props.unitId)

const quizRef = ref(null)
const state = ref('intro') // intro, active, results
const mode = ref('practice')
const inReviewMode = ref(false)
const currentQuestionIndex = ref(0)
const selectedOptionIndex = ref(null)
const hasAnswered = ref(false)
const score = ref(0)
const selectedQuestions = ref([])
const timeLeft = ref(0)
const timerId = ref(null)
const answeredEntries = ref([])
const quizStartTime = ref(null)

const reviewQuestionIds = ref(getWrongQuestions())
const quizHistoryData = ref(getQuizHistory().reverse())

const currentQuestion = computed(() => selectedQuestions.value[currentQuestionIndex.value] || { options: [] })
const isLastQuestion = computed(() => currentQuestionIndex.value === selectedQuestions.value.length - 1)
const progressPercentage = computed(() => ((currentQuestionIndex.value + 1) / Math.max(selectedQuestions.value.length, 1)) * 100)
const isCorrect = computed(() => selectedOptionIndex.value === currentQuestion.value.correctIndex)
const reviewCount = computed(() => reviewQuestionIds.value.length)
const showPracticeFeedback = computed(() => mode.value === 'practice' && !inReviewMode.value)
const isPerfectScore = computed(() => score.value === selectedQuestions.value.length && selectedQuestions.value.length > 0)

const formattedTime = computed(() => {
  const minutes = Math.floor(timeLeft.value / 60)
  const seconds = String(timeLeft.value % 60).padStart(2, '0')
  return `${minutes}:${seconds}`
})

const scoreClass = computed(() => {
  const percentage = (score.value / Math.max(selectedQuestions.value.length, 1)) * 100
  if (percentage >= 80) return 'score-high'
  if (percentage >= 50) return 'score-medium'
  return 'score-low'
})

const resultTitle = computed(() => {
  const percentage = (score.value / Math.max(selectedQuestions.value.length, 1)) * 100
  if (percentage === 100) return '¡Excelente!'
  if (percentage >= 80) return '¡Muy bien!'
  if (percentage >= 50) return '¡Bien hecho!'
  return 'A seguir practicando'
})

const resultMessage = computed(() => {
  const percentage = (score.value / Math.max(selectedQuestions.value.length, 1)) * 100
  if (percentage === 100) return 'Dominás este tema a la perfección.'
  if (percentage >= 80) return 'Tenés un gran conocimiento sobre este tema.'
  if (percentage >= 50) return 'Entendiste los conceptos principales.'
  return 'Te recomendamos repasar los contenidos de la unidad.'
})

const diagnosisRows = computed(() => {
  const grouped = answeredEntries.value.reduce((acc, entry) => {
    const topic = entry.topic || 'General'
    if (!acc[topic]) acc[topic] = { topic, correct: 0, total: 0 }
    acc[topic].total += 1
    if (entry.isCorrect) acc[topic].correct += 1
    return acc
  }, {})
  return Object.values(grouped)
})

function startQuiz() {
  inReviewMode.value = false
  const preparedQuestions = buildQuestionSet()
  selectedQuestions.value = mode.value === 'exam' ? shuffleArray([...preparedQuestions]) : preparedQuestions
  if (!selectedQuestions.value.length) return
  state.value = 'active'
  resetState()
  quizStartTime.value = Date.now()
  if (mode.value === 'exam') {
    startTimer(Math.max(selectedQuestions.value.length * 35, 60))
  }
  focusQuiz()
}

function startReviewMode() {
  const ids = new Set(getWrongQuestions())
  selectedQuestions.value = buildQuestionSet().filter((question) => ids.has(question._quizId))
  if (!selectedQuestions.value.length) {
    reviewQuestionIds.value = []
    clearWrongQuestions()
    return
  }
  inReviewMode.value = true
  mode.value = 'practice'
  state.value = 'active'
  resetState()
  quizStartTime.value = Date.now()
  focusQuiz()
}

function resetState() {
  currentQuestionIndex.value = 0
  selectedOptionIndex.value = null
  hasAnswered.value = false
  score.value = 0
  answeredEntries.value = []
  stopTimer()
}

function selectOption(index) {
  if (hasAnswered.value) return
  selectedOptionIndex.value = index
  hasAnswered.value = true
}

function submitCurrentAnswer() {
  if (!hasAnswered.value || answeredEntries.value.length > currentQuestionIndex.value) return false

  const question = currentQuestion.value
  const correct = selectedOptionIndex.value === question.correctIndex

  if (correct) {
    score.value++
  }

  answeredEntries.value.push({
    id: question._quizId,
    topic: question.topic || 'General',
    isCorrect: correct
  })

  return true
}

function nextQuestion() {
  submitCurrentAnswer()

  if (isLastQuestion.value) {
    finalizeSession()
    state.value = 'results'
  } else {
    currentQuestionIndex.value++
    selectedOptionIndex.value = null
    hasAnswered.value = false
  }
}

function resetQuiz() {
  resetState()
  state.value = 'intro'
  inReviewMode.value = false
  reviewQuestionIds.value = getWrongQuestions()
  quizHistoryData.value = getQuizHistory().reverse()
}

function getLetter(index) {
  return String.fromCharCode(65 + index)
}

function finalizeSession() {
  stopTimer()
  submitCurrentAnswer()

  const wrongIds = answeredEntries.value.filter((entry) => !entry.isCorrect).map((entry) => entry.id)
  if (wrongIds.length) {
    saveWrongQuestions(wrongIds)
  }

  if (inReviewMode.value) {
    const resolvedIds = answeredEntries.value.filter((entry) => entry.isCorrect).map((entry) => entry.id)
    clearWrongQuestions(resolvedIds)
  }

  // Save quiz attempt to history
  const duration = quizStartTime.value ? Math.round((Date.now() - quizStartTime.value) / 1000) : 0
  saveQuizAttempt({
    score: score.value,
    total: selectedQuestions.value.length,
    duration
  })

  reviewQuestionIds.value = getWrongQuestions()
  quizHistoryData.value = getQuizHistory().reverse()
}

function buildQuestionSet() {
  return props.questions.map((question, index) => ({
    ...question,
    _quizId: getQuestionId(question, index)
  }))
}

function getQuestionId(question, sourceIndex) {
  return question.id || `q-${sourceIndex}-${String(question.question).slice(0, 32)}`
}

function startTimer(seconds) {
  timeLeft.value = seconds
  stopTimer()
  timerId.value = window.setInterval(() => {
    timeLeft.value -= 1
    if (timeLeft.value <= 0) {
      finalizeSession()
      state.value = 'results'
      stopTimer()
    }
  }, 1000)
}

function stopTimer() {
  if (timerId.value) {
    window.clearInterval(timerId.value)
    timerId.value = null
  }
}

function shuffleArray(items) {
  for (let i = items.length - 1; i > 0; i -= 1) {
    const swapIndex = Math.floor(Math.random() * (i + 1))
    ;[items[i], items[swapIndex]] = [items[swapIndex], items[i]]
  }
  return items
}

function focusQuiz() {
  setTimeout(() => quizRef.value?.focus(), 100)
}

// Keyboard shortcuts
function handleKeydown(e) {
  if (state.value !== 'active') return
  
  const key = e.key.toUpperCase()
  const optionCount = currentQuestion.value.options?.length || 0

  // A-D to select option
  if (!hasAnswered.value && key >= 'A' && key <= 'D') {
    const index = key.charCodeAt(0) - 65
    if (index < optionCount) {
      e.preventDefault()
      selectOption(index)
    }
  }

  // Enter to advance
  if (e.key === 'Enter' && hasAnswered.value) {
    e.preventDefault()
    nextQuestion()
  }
}

function formatHistoryDate(dateStr) {
  if (!dateStr) return ''
  const d = new Date(dateStr)
  return d.toLocaleDateString('es-AR', { day: '2-digit', month: 'short' })
}

function historyScoreClass(h) {
  const pct = (h.score / Math.max(h.total, 1)) * 100
  if (pct >= 80) return 'high'
  if (pct >= 50) return 'medium'
  return 'low'
}

onMounted(() => {
  focusQuiz()
})

onBeforeUnmount(() => {
  stopTimer()
})
</script>

<style scoped>
.unit-quiz {
  --primary: var(--accent-blue);
  --primary-dark: var(--accent-blue);
  --primary-light: var(--accent-blue-soft);
  --bg-main: var(--bg-secondary);
  --bg-input: var(--bg-tertiary);
  --text-main: var(--text-primary);
  --success: var(--accent-teal);
  --success-soft: var(--accent-teal-soft);
  --error: var(--accent-red);
  --error-soft: var(--accent-red-soft);

  margin-top: 48px;
  margin-bottom: 32px;
  animation: fadeIn 0.5s ease-out;
  outline: none;
}

.quiz-card {
  background: var(--bg-card);
  border: var(--border-width) solid var(--border-color);
  border-radius: var(--radius-lg);
  padding: 32px;
  text-align: center;
  box-shadow: var(--shadow-md);
  transition: all 0.3s ease;
}

.intro-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
}

.icon-wrapper {
  width: 64px;
  height: 64px;
  background: var(--primary-light);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 8px;
  animation: bounceIn 0.6s ease;
}

.quiz-icon {
  width: 32px;
  height: 32px;
  color: var(--primary);
}

.intro-card h3 {
  font-size: 1.5rem;
  margin: 0;
}

.intro-card p {
  color: var(--text-muted);
  max-width: 400px;
  margin: 0;
}

.mode-switch {
  display: flex;
  gap: 8px;
}

.mode-btn {
  border: var(--border-width) solid var(--border-color);
  background: var(--bg-input);
  color: var(--text-secondary);
  border-radius: var(--radius-sm);
  padding: 6px 10px;
  cursor: pointer;
  font-family: inherit;
  transition: all var(--transition-fast);
}

.mode-btn.active {
  color: var(--primary);
  border-color: var(--primary);
  background: var(--primary-light);
}

.review-btn {
  margin-top: 2px;
}

/* History in intro */
.history-section {
  width: 100%;
  max-width: 400px;
  border-top: 1px solid var(--border-color);
  padding-top: 16px;
  margin-top: 4px;
}

.history-section h4 {
  font-size: 0.85rem;
  margin-bottom: 10px;
  color: var(--text-secondary);
}

.history-mini-list {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.history-mini-item {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 0.8rem;
}

.history-mini-date {
  color: var(--text-muted);
  min-width: 55px;
}

.history-mini-score {
  font-weight: 700;
  min-width: 35px;
}

.history-mini-score.high { color: var(--success); }
.history-mini-score.medium { color: var(--accent-amber); }
.history-mini-score.low { color: var(--error); }

.history-mini-bar {
  flex: 1;
  height: 4px;
  background: var(--bg-input);
  border-radius: 4px;
  overflow: hidden;
}

.history-mini-fill {
  height: 100%;
  border-radius: 4px;
  transition: width 0.5s ease;
}

.history-mini-fill.high { background: var(--success); }
.history-mini-fill.medium { background: var(--accent-amber); }
.history-mini-fill.low { background: var(--error); }

/* Active State */
.active-card {
  text-align: left;
}

.quiz-header {
  margin-bottom: 24px;
}

.quiz-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}

.question-count {
  font-size: 0.9rem;
  color: var(--text-secondary);
  font-weight: 500;
  display: block;
}

.timer {
  font-size: 0.85rem;
  color: var(--accent-amber);
  font-weight: 600;
  font-variant-numeric: tabular-nums;
}

.progress-bar {
  width: 100%;
  height: 6px;
  background: var(--bg-input);
  border-radius: 3px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: var(--primary);
  border-radius: 3px;
  transition: width 0.3s ease;
}

.question-text {
  font-size: 1.35rem;
  font-weight: 600;
  margin-bottom: 24px;
  line-height: 1.4;
  color: var(--text-primary);
}

.question-animate {
  animation: slideInQuestion 0.35s ease;
}

.options-grid {
  display: grid;
  gap: 12px;
}

.option-btn {
  display: flex;
  align-items: flex-start;
  width: 100%;
  padding: 16px;
  background: var(--bg-main);
  border: var(--border-width) solid var(--border-color);
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: all var(--transition-fast);
  text-align: left;
  position: relative;
  font-family: inherit;
}

.option-animate {
  animation: slideInOption 0.3s ease both;
}

.option-btn:not(:disabled):hover {
  background: var(--bg-card-hover);
  border-color: var(--border-color-hover);
  transform: translateX(4px);
}

.option-btn.selected {
  border-color: var(--primary);
  background: var(--primary-light);
}

.option-btn.correct {
  border-color: var(--success);
  background: var(--success-soft);
}

.option-btn.incorrect {
  border-color: var(--error);
  background: var(--error-soft);
}

.option-btn.correct-pulse {
  animation: correctPulse 0.5s ease;
}

.option-btn.shake {
  animation: shake 0.4s ease;
}

.option-letter {
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--bg-input);
  border-radius: 6px;
  font-weight: 600;
  font-size: 0.9rem;
  margin-right: 12px;
  color: var(--text-muted);
  flex-shrink: 0;
  transition: all var(--transition-fast);
}

.option-text {
  color: var(--text-primary);
  line-height: 1.45;
  font-size: 1rem;
}

.option-btn.selected .option-letter {
  background: var(--primary);
  color: white;
}

.status-icon {
  margin-left: auto;
  width: 20px;
  height: 20px;
}

.status-icon.success {
  color: var(--success);
}

.status-icon.error {
  color: var(--error);
}

.quiz-footer {
  margin-top: 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-height: 48px;
  flex-wrap: wrap;
  gap: 10px;
}

.footer-right {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-left: auto;
}

.keyboard-hint {
  color: var(--text-muted);
  font-size: 0.7rem;
}

.feedback-msg {
  font-weight: 500;
  font-size: 1rem;
  color: var(--text-primary);
}

.text-success { color: var(--success); }
.text-error { color: var(--error); }

.next-btn {
  display: flex;
  align-items: center;
  gap: 8px;
}

/* Results State */
.results-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  animation: popIn 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.results-header {
  margin-bottom: 24px;
}

.result-actions {
  display: flex;
  gap: 10px;
}

.diagnosis {
  width: 100%;
  margin-bottom: 16px;
  border: var(--border-width) solid var(--border-color);
  border-radius: var(--radius-md);
  padding: 12px;
  background: var(--bg-main);
  text-align: left;
}

.diagnosis h4 {
  font-size: 0.88rem;
  margin-bottom: 8px;
}

.diagnosis-grid {
  display: grid;
  gap: 8px;
}

.diagnosis-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: var(--text-secondary);
  font-size: 0.82rem;
  gap: 12px;
}

.diagnosis-bar-wrapper {
  display: flex;
  align-items: center;
  gap: 8px;
  min-width: 120px;
}

.diagnosis-bar {
  flex: 1;
  height: 5px;
  background: var(--bg-input);
  border-radius: 5px;
  overflow: hidden;
}

.diagnosis-fill {
  height: 100%;
  background: var(--primary);
  border-radius: 5px;
  transition: width 0.5s ease;
}

.score-circle {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 0 auto 24px;
  border: 4px solid currentColor;
}

.score-animate {
  animation: scaleInBounce 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.score-high { color: var(--success); background: var(--success-soft); }
.score-medium { color: var(--accent-amber); background: var(--accent-amber-soft); }
.score-low { color: var(--error); background: var(--error-soft); }

.score-number {
  font-size: 2.5rem;
  font-weight: 800;
  line-height: 1;
}

.score-total {
  font-size: 1rem;
  opacity: 0.8;
  font-weight: 500;
}

/* History in Results */
.history-in-results {
  width: 100%;
  margin-bottom: 16px;
  border: var(--border-width) solid var(--border-color);
  border-radius: var(--radius-md);
  padding: 14px;
  background: var(--bg-main);
  text-align: left;
}

.history-in-results h4 {
  font-size: 0.88rem;
  margin-bottom: 12px;
}

.history-chart {
  display: flex;
  align-items: flex-end;
  gap: 6px;
  height: 80px;
  padding: 0 4px;
}

.chart-bar-col {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  max-width: 40px;
}

.chart-bar-col small {
  font-size: 0.62rem;
  color: var(--text-muted);
}

.chart-bar {
  width: 100%;
  min-height: 4px;
  border-radius: 3px 3px 0 0;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  transition: height 0.5s ease;
}

.chart-bar.high { background: var(--success); }
.chart-bar.medium { background: var(--accent-amber); }
.chart-bar.low { background: var(--error); }

.chart-label {
  font-size: 0.65rem;
  font-weight: 700;
  color: white;
  padding-top: 2px;
}

.btn-icon {
  width: 18px;
  height: 18px;
}

/* Buttons */
.btn-primary, .btn-secondary {
  padding: 10px 20px;
  border-radius: var(--radius-md);
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  border: none;
  font-size: 0.95rem;
  font-family: inherit;
}

.btn-primary {
  background: var(--primary);
  color: white;
}

.btn-primary:hover {
  filter: brightness(1.05);
  transform: translateY(-1px);
}

.btn-secondary {
  background: var(--bg-input);
  color: var(--text-main);
  display: flex;
  align-items: center;
  gap: 8px;
}

.btn-secondary:hover {
  background: var(--bg-card-hover);
}

/* Animations */
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes popIn {
  from { opacity: 0; transform: scale(0.9); }
  to { opacity: 1; transform: scale(1); }
}

@keyframes bounceIn {
  0% { transform: scale(0); }
  50% { transform: scale(1.15); }
  100% { transform: scale(1); }
}

@keyframes scaleInBounce {
  0% { transform: scale(0); opacity: 0; }
  60% { transform: scale(1.1); opacity: 1; }
  100% { transform: scale(1); }
}

@keyframes slideInQuestion {
  from { opacity: 0; transform: translateX(-20px); }
  to { opacity: 1; transform: translateX(0); }
}

@keyframes slideInOption {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes correctPulse {
  0% { transform: scale(1); }
  50% { transform: scale(1.02); box-shadow: 0 0 16px var(--success-soft); }
  100% { transform: scale(1); }
}

@keyframes shake {
  0%, 100% { transform: translateX(0); }
  20% { transform: translateX(-6px); }
  40% { transform: translateX(6px); }
  60% { transform: translateX(-4px); }
  80% { transform: translateX(4px); }
}
</style>
