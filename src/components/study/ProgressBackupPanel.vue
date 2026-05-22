<template>
  <section class="backup-panel">
    <div>
      <span class="badge badge-blue">Backup</span>
      <h3>Progreso guardado</h3>
      <p>Exportá o importá el avance local de esta guía sin cambiar los IDs existentes.</p>
    </div>

    <div class="backup-actions">
      <button class="backup-btn" @click="exportProgress">Exportar</button>
      <button class="backup-btn secondary" @click="importProgress">Importar</button>
    </div>

    <textarea
      v-model="buffer"
      class="backup-textarea"
      placeholder="El JSON exportado o a importar aparece acá..."
      spellcheck="false"
    />

    <p v-if="message" class="backup-message" :class="{ error: isError }">{{ message }}</p>
  </section>
</template>

<script setup>
import { shallowRef } from 'vue'
import { exportAllProgress, importAllProgress } from '../../composables/useStudyProgress'

const buffer = shallowRef('')
const message = shallowRef('')
const isError = shallowRef(false)

async function exportProgress() {
  buffer.value = exportAllProgress()
  isError.value = false
  message.value = 'Progreso exportado. También quedó listo para copiar.'
  try {
    await navigator.clipboard?.writeText(buffer.value)
  } catch {
    // Clipboard access is optional; the textarea still contains the export.
  }
}

function importProgress() {
  const ok = importAllProgress(buffer.value)
  isError.value = !ok
  message.value = ok ? 'Progreso importado correctamente.' : 'No se pudo importar: revisá que el JSON sea válido.'
}
</script>

<style scoped>
.backup-panel {
  background: var(--bg-card);
  border: var(--border-width) solid var(--border-color);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-sm);
  display: grid;
  gap: 12px;
  padding: 18px;
}

.backup-panel h3 {
  margin: 8px 0 4px;
}

.backup-panel p {
  color: var(--text-muted);
  margin: 0;
}

.backup-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.backup-btn {
  background: var(--accent-blue);
  border: var(--border-width) solid var(--border-color);
  border-radius: var(--radius-sm);
  box-shadow: var(--shadow-sm);
  color: #fff;
  cursor: pointer;
  font-family: inherit;
  font-weight: 800;
  padding: 8px 12px;
}

.backup-btn.secondary {
  background: var(--bg-tertiary);
  color: var(--text-primary);
}

.backup-textarea {
  background: var(--bg-tertiary);
  border: var(--border-width) solid var(--border-color);
  border-radius: var(--radius-sm);
  color: var(--text-primary);
  font-family: 'JetBrains Mono', 'IBM Plex Mono', 'Fira Code', monospace;
  min-height: 120px;
  outline: 0;
  padding: 10px;
  resize: vertical;
  width: 100%;
}

.backup-message {
  color: var(--accent-teal) !important;
  font-weight: 700;
}

.backup-message.error {
  color: var(--accent-red) !important;
}
</style>
