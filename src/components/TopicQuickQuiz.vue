<template>
  <div class="topic-quiz">
    <h4>{{ title }}</h4>
    <p class="question">{{ question }}</p>

    <div class="options">
      <button
        v-for="(option, index) in options"
        :key="index"
        class="option"
        :class="{
          selected: selectedIndex === index,
          correct: answered && index === correctIndex,
          incorrect: answered && selectedIndex === index && index !== correctIndex
        }"
        :disabled="answered"
        @click="answer(index)"
      >
        {{ option }}
      </button>
    </div>

    <p v-if="answered" class="feedback" :class="isCorrect ? 'ok' : 'bad'">
      {{ isCorrect ? 'Respuesta correcta' : 'Respuesta incorrecta. Repasá este tema.' }}
    </p>

    <button v-if="answered" class="retry" @click="reset">Intentar otra vez</button>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  title: { type: String, required: true },
  topicId: { type: String, required: true },
  question: { type: String, required: true },
  options: { type: Array, required: true },
  correctIndex: { type: Number, required: true }
})

const emit = defineEmits(['answered'])

const selectedIndex = ref(null)
const answered = ref(false)

const isCorrect = computed(() => selectedIndex.value === props.correctIndex)

function answer(index) {
  if (answered.value) return
  selectedIndex.value = index
  answered.value = true
  emit('answered', { topicId: props.topicId, isCorrect: index === props.correctIndex })
}

function reset() {
  selectedIndex.value = null
  answered.value = false
}
</script>

<style scoped>
.topic-quiz {
  border: var(--border-width) solid var(--border-color);
  border-radius: var(--radius-md);
  background: var(--bg-card);
  padding: 14px;
}

.topic-quiz h4 {
  font-size: 0.92rem;
  margin-bottom: 4px;
}

.question {
  font-size: 0.86rem;
  color: var(--text-secondary);
  margin-bottom: 10px;
}

.options {
  display: grid;
  gap: 8px;
}

.option {
  border: var(--border-width) solid var(--border-color);
  background: var(--bg-tertiary);
  color: var(--text-primary);
  border-radius: var(--radius-sm);
  padding: 8px 10px;
  text-align: left;
  cursor: pointer;
}

.option.selected {
  border-color: var(--accent-blue);
}

.option.correct {
  border-color: var(--accent-teal);
  background: var(--accent-teal-soft);
}

.option.incorrect {
  border-color: var(--accent-red);
  background: var(--accent-red-soft);
}

.feedback {
  margin-top: 8px;
  font-size: 0.8rem;
  margin-bottom: 0;
}

.feedback.ok {
  color: var(--accent-teal);
}

.feedback.bad {
  color: var(--accent-red);
}

.retry {
  margin-top: 10px;
  border: var(--border-width) solid var(--border-color);
  background: transparent;
  color: var(--text-secondary);
  border-radius: var(--radius-sm);
  padding: 6px 10px;
  cursor: pointer;
}
</style>
