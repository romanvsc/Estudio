<template>
  <div class="flashcards" @keydown="handleKeydown" tabindex="0" ref="containerRef">
    <div class="flashcards-head">
      <div class="flashcards-title-row">
        <h3>Flashcards rápidas</h3>
        <span v-if="unitId" class="mastery-pill" :title="`${knownCount} de ${filteredCards.length} dominadas`">
          {{ knownCount }}/{{ filteredCards.length }} dominadas
        </span>
      </div>
      <div class="flashcards-actions">
        <div class="level-filter">
          <button
            v-for="level in levels"
            :key="level"
            class="chip"
            :class="{ active: currentLevel === level }"
            @click="currentLevel = level"
          >
            {{ level }}
          </button>
        </div>
        <button class="chip shuffle-btn" @click="shuffleCards" title="Barajar">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><polyline points="16 3 21 3 21 8"/><line x1="4" y1="20" x2="21" y2="3"/><polyline points="21 16 21 21 16 21"/><line x1="15" y1="15" x2="21" y2="21"/><line x1="4" y1="4" x2="9" y2="9"/></svg>
        </button>
      </div>
    </div>

    <!-- 3D Flip Card -->
    <div class="flashcard-scene" @click="flipped = !flipped">
      <div class="flashcard-3d" :class="{ flipped: flipped }">
        <div class="flashcard-face flashcard-front">
          <span class="card-label">Pregunta</span>
          <p>{{ currentCard.question }}</p>
          <small>Click o Espacio para voltear</small>
        </div>
        <div class="flashcard-face flashcard-back">
          <span class="card-label">Respuesta</span>
          <p>{{ currentCard.answer }}</p>
          <small>Click o Espacio para voltear</small>
        </div>
      </div>
    </div>

    <!-- Mastery Buttons -->
    <div v-if="unitId && filteredCards.length" class="mastery-actions">
      <button class="mastery-btn dont-know" :class="{ active: !isCurrentKnown }" @click="markDontKnow" title="No lo sé">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        No lo sé
      </button>
      <button class="mastery-btn know" :class="{ active: isCurrentKnown }" @click="markKnow" title="Lo sé">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><polyline points="20 6 9 17 4 12"/></svg>
        Lo sé
      </button>
    </div>

    <div class="controls">
      <button @click="prev" title="Anterior (←)">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><polyline points="15 18 9 12 15 6"/></svg>
      </button>
      <span>{{ activeIndex + 1 }} / {{ filteredCards.length }}</span>
      <button @click="next" title="Siguiente (→)">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><polyline points="9 18 15 12 9 6"/></svg>
      </button>
    </div>
    <div class="keyboard-hint">
      <small>← → navegar · Espacio voltear · S barajar</small>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import { useStudyProgress } from '../composables/useStudyProgress'

const props = defineProps({
  cards: {
    type: Array,
    required: true
  },
  unitId: {
    type: [String, Number],
    default: null
  }
})

const containerRef = ref(null)
const currentLevel = ref('todas')
const activeIndex = ref(0)
const flipped = ref(false)
const shuffledCards = ref(null)
const knownSet = ref(new Set())

const progress = props.unitId ? useStudyProgress(props.unitId) : null

onMounted(() => {
  if (progress) {
    knownSet.value = progress.getKnownFlashcards()
  }
})

const levels = computed(() => ['todas', ...new Set(props.cards.map((card) => card.level || 'media'))])

const baseCards = computed(() => {
  const source = shuffledCards.value || props.cards
  if (currentLevel.value === 'todas') return source
  return source.filter((card) => (card.level || 'media') === currentLevel.value)
})

const filteredCards = computed(() => baseCards.value)

const currentCard = computed(() => filteredCards.value[activeIndex.value] || { question: 'Sin tarjetas', answer: 'Sin contenido' })

const currentCardId = computed(() => {
  const card = currentCard.value
  return card.id || `fc-${card.question?.slice(0, 40)}`
})

const isCurrentKnown = computed(() => knownSet.value.has(currentCardId.value))

const knownCount = computed(() => {
  return filteredCards.value.filter((card) => {
    const id = card.id || `fc-${card.question?.slice(0, 40)}`
    return knownSet.value.has(id)
  }).length
})

watch(currentLevel, () => {
  activeIndex.value = 0
  flipped.value = false
})

watch(filteredCards, (cards) => {
  if (!cards.length) activeIndex.value = 0
  if (activeIndex.value >= cards.length) activeIndex.value = 0
})

function next() {
  if (!filteredCards.value.length) return
  activeIndex.value = (activeIndex.value + 1) % filteredCards.value.length
  flipped.value = false
}

function prev() {
  if (!filteredCards.value.length) return
  activeIndex.value = (activeIndex.value - 1 + filteredCards.value.length) % filteredCards.value.length
  flipped.value = false
}

function shuffleCards() {
  const arr = [...props.cards]
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[arr[i], arr[j]] = [arr[j], arr[i]]
  }
  shuffledCards.value = arr
  activeIndex.value = 0
  flipped.value = false
}

function markKnow() {
  if (!progress) return
  progress.markFlashcardKnown(currentCardId.value)
  knownSet.value = progress.getKnownFlashcards()
  setTimeout(() => next(), 300)
}

function markDontKnow() {
  if (!progress) return
  progress.unmarkFlashcardKnown(currentCardId.value)
  knownSet.value = progress.getKnownFlashcards()
  setTimeout(() => next(), 300)
}

function handleKeydown(e) {
  if (e.key === 'ArrowRight') { e.preventDefault(); next() }
  else if (e.key === 'ArrowLeft') { e.preventDefault(); prev() }
  else if (e.key === ' ') { e.preventDefault(); flipped.value = !flipped.value }
  else if (e.key === 's' || e.key === 'S') { e.preventDefault(); shuffleCards() }
}
</script>

<style scoped>
.flashcards {
  margin-top: 20px;
  margin-bottom: 20px;
  border: var(--border-width) solid var(--border-color);
  border-radius: var(--radius-lg);
  padding: 16px;
  background: var(--bg-card);
  outline: none;
}

.flashcards:focus-within {
  border-color: var(--accent-blue);
  box-shadow: 0 0 0 2px var(--accent-blue-soft);
}

.flashcards-head {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 10px;
  margin-bottom: 12px;
  flex-wrap: wrap;
}

.flashcards-title-row {
  display: flex;
  align-items: center;
  gap: 10px;
}

.mastery-pill {
  font-size: 0.72rem;
  padding: 2px 8px;
  border-radius: 20px;
  background: var(--accent-teal-soft);
  color: var(--accent-teal);
  white-space: nowrap;
}

.flashcards-actions {
  display: flex;
  align-items: center;
  gap: 6px;
  flex-wrap: wrap;
}

.level-filter {
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
}

.chip {
  border: var(--border-width) solid var(--border-color);
  background: var(--bg-tertiary);
  color: var(--text-secondary);
  border-radius: 999px;
  padding: 4px 10px;
  font-size: 0.75rem;
  cursor: pointer;
  font-family: inherit;
  transition: all var(--transition-fast);
}

.chip:hover {
  border-color: var(--border-color-hover);
  color: var(--text-primary);
}

.chip.active {
  color: var(--accent-blue);
  border-color: var(--accent-blue);
  background: var(--accent-blue-soft);
}

.shuffle-btn {
  display: flex;
  align-items: center;
  padding: 4px 8px;
}

.shuffle-btn:hover {
  color: var(--accent-amber);
  border-color: var(--accent-amber);
}

/* 3D Flip Card */
.flashcard-scene {
  perspective: 800px;
  min-height: 160px;
  cursor: pointer;
}

.flashcard-3d {
  position: relative;
  width: 100%;
  min-height: 160px;
  transform-style: preserve-3d;
  transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

.flashcard-3d.flipped {
  transform: rotateY(180deg);
}

.flashcard-face {
  position: absolute;
  inset: 0;
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
  border: var(--border-width) solid var(--border-color);
  background: var(--bg-secondary);
  border-radius: var(--radius-md);
  padding: 18px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.flashcard-back {
  transform: rotateY(180deg);
  background: var(--accent-blue-soft);
  border-color: var(--accent-blue);
}

.card-label {
  display: inline-block;
  margin-bottom: 8px;
  font-size: 0.72rem;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.flashcard-face p {
  margin-bottom: 8px;
  font-size: 0.95rem;
  line-height: 1.6;
  color: var(--text-primary);
}

.flashcard-face small {
  color: var(--text-muted);
  font-size: 0.72rem;
  margin-top: auto;
}

/* Mastery Actions */
.mastery-actions {
  display: flex;
  gap: 8px;
  justify-content: center;
  margin-top: 12px;
}

.mastery-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 16px;
  border: var(--border-width) solid var(--border-color);
  background: var(--bg-tertiary);
  color: var(--text-secondary);
  border-radius: var(--radius-md);
  cursor: pointer;
  font-family: inherit;
  font-size: 0.82rem;
  font-weight: 500;
  transition: all var(--transition-fast);
}

.mastery-btn:hover {
  border-color: var(--border-color-hover);
}

.mastery-btn.know:hover,
.mastery-btn.know.active {
  color: var(--accent-teal);
  border-color: var(--accent-teal);
  background: var(--accent-teal-soft);
}

.mastery-btn.dont-know:hover,
.mastery-btn.dont-know.active {
  color: var(--accent-red);
  border-color: var(--accent-red);
  background: var(--accent-red-soft);
}

.controls {
  margin-top: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
}

.controls button {
  border: var(--border-width) solid var(--border-color);
  background: var(--bg-tertiary);
  color: var(--text-primary);
  border-radius: var(--radius-sm);
  padding: 8px 12px;
  cursor: pointer;
  display: flex;
  align-items: center;
  transition: all var(--transition-fast);
}

.controls button:hover {
  background: var(--bg-card-hover);
  border-color: var(--border-color-hover);
}

.controls span {
  color: var(--text-secondary);
  font-size: 0.85rem;
  font-variant-numeric: tabular-nums;
}

.keyboard-hint {
  text-align: center;
  margin-top: 8px;
}

.keyboard-hint small {
  color: var(--text-muted);
  font-size: 0.68rem;
}
</style>
