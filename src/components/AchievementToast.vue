<template>
  <Transition name="toast">
    <div v-if="achievement" class="achievement-toast" @click="dismiss">
      <div class="toast-stamp">{{ achievement.icon }}</div>
      <div class="toast-content">
        <span class="toast-label">¡Logro desbloqueado!</span>
        <strong>{{ achievement.name }}</strong>
        <small>{{ achievement.description }}</small>
      </div>
      <button class="toast-close" @click.stop="dismiss" aria-label="Cerrar">×</button>
    </div>
  </Transition>
</template>

<script setup>
import { watch, onUnmounted } from 'vue'
import { useStudyStore } from '../stores/studyProgress'
import { storeToRefs } from 'pinia'

const store = useStudyStore()
const { pendingAchievement: achievement } = storeToRefs(store)

let timer = null

watch(achievement, (val) => {
  if (timer) clearTimeout(timer)
  if (val) {
    timer = setTimeout(() => { store.dismissAchievement() }, 4500)
  }
})

onUnmounted(() => {
  if (timer) clearTimeout(timer)
})

function dismiss() {
  store.dismissAchievement()
}
</script>

<style scoped>
.achievement-toast {
  position: fixed;
  bottom: 24px;
  right: 24px;
  z-index: 9999;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px 18px;
  background: var(--accent-gold-soft);
  border: 3px solid var(--border-color);
  border-radius: var(--radius-md);
  box-shadow: 6px 6px 0 var(--border-color);
  max-width: 340px;
  cursor: pointer;
  animation: toastBounce 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  transform: rotate(-1deg);
}

.toast-stamp {
  width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--accent-gold);
  border: 3px solid var(--border-color);
  border-radius: 50%;
  font-size: 1.5rem;
  flex-shrink: 0;
  box-shadow: 3px 3px 0 var(--border-color);
  animation: stampPop 0.4s 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275) backwards;
}

.toast-content {
  display: flex;
  flex-direction: column;
  gap: 1px;
}

.toast-label {
  font-size: 0.65rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--accent-amber);
}

.toast-content strong {
  font-size: 0.92rem;
  font-weight: 800;
  color: var(--text-primary);
}

.toast-content small {
  font-size: 0.72rem;
  color: var(--text-muted);
  font-weight: 500;
}

.toast-close {
  position: absolute;
  top: 6px;
  right: 8px;
  background: none;
  border: none;
  font-size: 1.1rem;
  cursor: pointer;
  color: var(--text-muted);
  font-weight: 800;
  line-height: 1;
  padding: 2px 4px;
}

.toast-close:hover { color: var(--text-primary); }

/* Transition */
.toast-enter-active { animation: toastBounce 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275); }
.toast-leave-active { transition: all 0.3s ease; }
.toast-leave-to { opacity: 0; transform: translateY(20px) rotate(-1deg) scale(0.9); }

@keyframes toastBounce {
  0% { opacity: 0; transform: translateY(40px) rotate(2deg) scale(0.8); }
  60% { transform: translateY(-5px) rotate(-2deg) scale(1.03); }
  100% { opacity: 1; transform: translateY(0) rotate(-1deg) scale(1); }
}

@keyframes stampPop {
  0% { transform: scale(0) rotate(-20deg); }
  100% { transform: scale(1) rotate(0deg); }
}

@media (max-width: 600px) {
  .achievement-toast {
    left: 16px;
    right: 16px;
    bottom: 16px;
    max-width: none;
  }
}
</style>
