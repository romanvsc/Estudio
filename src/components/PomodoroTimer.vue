<template>
  <div class="pomodoro">
    <button class="pomo-toggle" @click="showPanel = !showPanel" :title="isRunning ? formattedTime : 'Temporizador Pomodoro'" aria-label="Pomodoro">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
        <circle cx="12" cy="12" r="10"/>
        <polyline points="12 6 12 12 16 14"/>
      </svg>
      <span v-if="isRunning" class="pomo-time" :class="{ 'pomo-break': isBreak }">{{ formattedTime }}</span>
    </button>

    <Transition name="pomo-panel">
      <div v-if="showPanel" class="pomo-panel" @click.stop>
        <div class="pomo-header">
          <h4>{{ isBreak ? 'Descanso' : 'Pomodoro' }}</h4>
          <span class="pomo-count">{{ completedCount }} sesiones</span>
        </div>
        <div class="pomo-display">
          <svg class="pomo-ring" width="130" height="130" viewBox="0 0 130 130">
            <circle cx="65" cy="65" r="56" fill="none" stroke="var(--border-color)" stroke-width="6"/>
            <circle
              cx="65" cy="65" r="56"
              fill="none"
              :stroke="isBreak ? 'var(--accent-teal)' : 'var(--accent-red)'"
              stroke-width="6"
              stroke-linecap="round"
              :stroke-dasharray="circumference"
              :stroke-dashoffset="dashOffset"
              transform="rotate(-90 65 65)"
              style="transition: stroke-dashoffset 1s linear"
            />
          </svg>
          <span class="pomo-timer-text">{{ formattedTime }}</span>
        </div>
        <div class="pomo-actions">
          <button v-if="!isRunning" class="pomo-btn primary" @click="start">
            {{ timeLeft === totalTime ? 'Iniciar' : 'Reanudar' }}
          </button>
          <button v-else class="pomo-btn" @click="pause">Pausar</button>
          <button class="pomo-btn" @click="reset">Reiniciar</button>
          <button class="pomo-btn" @click="skip">Saltar</button>
        </div>
        <div class="pomo-modes">
          <button :class="{ active: totalTime === 1500 && !isBreak }" @click="setMode(25, false)">25 min</button>
          <button :class="{ active: totalTime === 300 && isBreak }" @click="setMode(5, true)">5 min</button>
          <button :class="{ active: totalTime === 900 && isBreak }" @click="setMode(15, true)">15 min</button>
        </div>
      </div>
    </Transition>

    <div v-if="showPanel" class="pomo-backdrop" @click="showPanel = false"></div>
  </div>
</template>

<script setup>
import { ref, computed, onBeforeUnmount } from 'vue'

const showPanel = ref(false)
const isRunning = ref(false)
const isBreak = ref(false)
const totalTime = ref(1500)
const timeLeft = ref(1500)
const completedCount = ref(0)
let timer = null

const circumference = 2 * Math.PI * 56

const dashOffset = computed(() => {
  const progress = timeLeft.value / totalTime.value
  return circumference * (1 - progress)
})

const formattedTime = computed(() => {
  const m = Math.floor(timeLeft.value / 60)
  const s = String(timeLeft.value % 60).padStart(2, '0')
  return `${m}:${s}`
})

function start() {
  if (timer) return
  isRunning.value = true
  timer = setInterval(() => {
    timeLeft.value--
    if (timeLeft.value <= 0) {
      clearInterval(timer)
      timer = null
      isRunning.value = false
      if (!isBreak.value) {
        completedCount.value++
        isBreak.value = true
        totalTime.value = completedCount.value % 4 === 0 ? 900 : 300
      } else {
        isBreak.value = false
        totalTime.value = 1500
      }
      timeLeft.value = totalTime.value
      notifyUser()
    }
  }, 1000)
}

function pause() {
  clearInterval(timer)
  timer = null
  isRunning.value = false
}

function reset() {
  pause()
  timeLeft.value = totalTime.value
}

function skip() {
  pause()
  if (!isBreak.value) {
    completedCount.value++
    isBreak.value = true
    totalTime.value = completedCount.value % 4 === 0 ? 900 : 300
  } else {
    isBreak.value = false
    totalTime.value = 1500
  }
  timeLeft.value = totalTime.value
}

function setMode(minutes, breakMode) {
  pause()
  isBreak.value = breakMode
  totalTime.value = minutes * 60
  timeLeft.value = totalTime.value
}

function notifyUser() {
  if ('Notification' in window && Notification.permission === 'granted') {
    new Notification(isBreak.value ? '¡Hora de descansar!' : '¡A estudiar!')
  } else if ('Notification' in window && Notification.permission !== 'denied') {
    Notification.requestPermission()
  }
}

onBeforeUnmount(() => {
  if (timer) clearInterval(timer)
})
</script>

<style scoped>
.pomodoro {
  position: relative;
}

.pomo-toggle {
  display: flex;
  align-items: center;
  gap: 6px;
  background: var(--accent-red-soft);
  border: var(--border-width) solid var(--border-color);
  color: var(--text-primary);
  cursor: pointer;
  padding: 7px 10px;
  border-radius: var(--radius-sm);
  transition: all var(--transition-fast);
  font-family: inherit;
  font-size: 0.82rem;
  font-weight: 700;
  white-space: nowrap;
  box-shadow: var(--shadow-sm);
}

.pomo-toggle:hover {
  color: var(--accent-red);
  border-color: var(--accent-red);
  transform: translate(-1px, -1px);
  box-shadow: 4px 4px 0 var(--border-color);
}

.pomo-time {
  font-variant-numeric: tabular-nums;
  color: var(--accent-red);
  font-weight: 600;
}

.pomo-time.pomo-break {
  color: var(--accent-teal);
}

.pomo-backdrop {
  position: fixed;
  inset: 0;
  z-index: 149;
}

.pomo-panel {
  position: absolute;
  top: calc(100% + 10px);
  right: 0;
  width: 280px;
  background: var(--bg-secondary);
  border: var(--border-width) solid var(--border-color);
  border-radius: var(--radius-md);
  padding: 20px;
  box-shadow: var(--shadow-lg);
  z-index: 150;
  text-align: center;
}

.pomo-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.pomo-header h4 {
  font-size: 1rem;
  margin: 0;
}

.pomo-count {
  font-size: 0.72rem;
  font-weight: 700;
  color: var(--text-muted);
  background: var(--bg-tertiary);
  padding: 2px 8px;
  border-radius: 3px;
  border: var(--border-width) solid var(--border-color);
}

.pomo-display {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 16px;
  width: 130px;
  height: 130px;
}

.pomo-ring {
  position: absolute;
}

.pomo-timer-text {
  font-size: 1.8rem;
  font-weight: 700;
  color: var(--text-primary);
  font-variant-numeric: tabular-nums;
  letter-spacing: 0.02em;
  z-index: 1;
}

.pomo-actions {
  display: flex;
  gap: 6px;
  justify-content: center;
  margin-bottom: 12px;
}

.pomo-btn {
  padding: 6px 12px;
  border: var(--border-width) solid var(--border-color);
  background: var(--bg-tertiary);
  color: var(--text-secondary);
  border-radius: var(--radius-sm);
  cursor: pointer;
  font-size: 0.78rem;
  font-weight: 700;
  font-family: inherit;
  box-shadow: var(--shadow-sm);
  transition: all var(--transition-fast);
}

.pomo-btn:hover {
  background: var(--bg-card-hover);
  color: var(--text-primary);
  transform: translate(-1px, -1px);
  box-shadow: 3px 3px 0 var(--border-color);
}

.pomo-btn.primary {
  background: var(--accent-red);
  color: white;
  border-color: var(--border-color);
}

.pomo-btn.primary:hover {
  background: var(--accent-red);
  filter: brightness(0.9);
  transform: translate(-1px, -1px);
  box-shadow: 3px 3px 0 var(--border-color);
}

.pomo-modes {
  display: flex;
  gap: 4px;
  justify-content: center;
}

.pomo-modes button {
  padding: 4px 10px;
  border: var(--border-width) solid var(--border-color);
  background: var(--bg-tertiary);
  color: var(--text-muted);
  border-radius: 3px;
  font-size: 0.7rem;
  font-weight: 700;
  cursor: pointer;
  font-family: inherit;
  transition: all var(--transition-fast);
}

.pomo-modes button.active {
  border-color: var(--accent-red);
  color: var(--accent-red);
  background: var(--accent-red-soft);
  box-shadow: 2px 2px 0 var(--border-color);
}

.pomo-panel-enter-active,
.pomo-panel-leave-active {
  transition: all 0.2s ease;
}

.pomo-panel-enter-from,
.pomo-panel-leave-to {
  opacity: 0;
  transform: translateY(-8px) scale(0.96);
}
</style>
