<template>
  <div class="topic-notes">
    <button class="notes-toggle" @click="expanded = !expanded" :aria-expanded="expanded">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
        <path d="M12 20h9"/>
        <path d="M16.5 3.5a2.121 2.121 0 1 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>
      </svg>
      Notas personales
      <span v-if="noteText && !expanded" class="has-note-dot"></span>
      <svg class="toggle-chevron" :class="{ open: expanded }" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round">
        <polyline points="6 9 12 15 18 9"/>
      </svg>
    </button>
    <Transition name="notes-slide">
      <div v-if="expanded" class="notes-body">
        <textarea
          v-model="noteText"
          placeholder="Escribí tus notas aquí... (se guardan automáticamente)"
          rows="4"
          @input="debounceSave"
        ></textarea>
        <div class="notes-footer">
          <small v-if="lastSaved" class="save-status">Guardado</small>
          <small v-if="noteText" class="char-count">{{ noteText.length }} caracteres</small>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { getNote, saveNote } from '../composables/useStudyProgress'

const props = defineProps({
  topicId: { type: String, required: true },
  topicTitle: { type: String, default: '' },
  unitId: { type: [String, Number], default: '' }
})

const expanded = ref(false)
const noteText = ref('')
const lastSaved = ref(false)
let saveTimer = null

onMounted(() => {
  noteText.value = getNote(props.topicId)
})

function debounceSave() {
  lastSaved.value = false
  clearTimeout(saveTimer)
  saveTimer = setTimeout(() => {
    saveNote(props.topicId, noteText.value, props.topicTitle, props.unitId)
    lastSaved.value = true
    setTimeout(() => { lastSaved.value = false }, 2000)
  }, 500)
}
</script>

<style scoped>
.topic-notes {
  margin-top: 16px;
  border-top: 1px dashed var(--border-color);
  padding-top: 12px;
}

.notes-toggle {
  display: flex;
  align-items: center;
  gap: 6px;
  background: none;
  border: none;
  color: var(--text-muted);
  cursor: pointer;
  font-size: 0.78rem;
  font-family: inherit;
  padding: 4px 0;
  transition: color var(--transition-fast);
}

.notes-toggle:hover {
  color: var(--accent-blue);
}

.has-note-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--accent-teal);
  flex-shrink: 0;
}

.toggle-chevron {
  margin-left: auto;
  transition: transform var(--transition-fast);
}

.toggle-chevron.open {
  transform: rotate(180deg);
}

.notes-body {
  margin-top: 8px;
}

.notes-body textarea {
  width: 100%;
  background: var(--bg-tertiary);
  border: var(--border-width) solid var(--border-color);
  border-radius: var(--radius-sm);
  color: var(--text-primary);
  font-family: inherit;
  font-size: 0.85rem;
  padding: 10px 12px;
  resize: vertical;
  line-height: 1.6;
  outline: none;
  transition: border-color var(--transition-fast);
}

.notes-body textarea:focus {
  border-color: var(--accent-blue);
}

.notes-body textarea::placeholder {
  color: var(--text-muted);
}

.notes-footer {
  display: flex;
  justify-content: space-between;
  margin-top: 4px;
  min-height: 18px;
}

.save-status {
  color: var(--accent-teal);
  font-size: 0.72rem;
  animation: fadeInSave 0.3s ease;
}

.char-count {
  color: var(--text-muted);
  font-size: 0.7rem;
  margin-left: auto;
}

@keyframes fadeInSave {
  from { opacity: 0; transform: translateY(4px); }
  to { opacity: 1; transform: translateY(0); }
}

.notes-slide-enter-active,
.notes-slide-leave-active {
  transition: all 0.25s ease;
  overflow: hidden;
}

.notes-slide-enter-from,
.notes-slide-leave-to {
  opacity: 0;
  max-height: 0;
}

.notes-slide-enter-to,
.notes-slide-leave-from {
  max-height: 300px;
}
</style>
