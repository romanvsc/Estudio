<template>
  <button class="final-card" @click="$emit('open', exam)">
    <div class="final-card-top">
      <span class="badge badge-gold">Modelo de Final</span>
      <span class="subject-pill">{{ exam.subject.title }}</span>
    </div>
    <h3>{{ exam.title }}</h3>
    <p>{{ exam.subtitle }}</p>
    <div class="attempt-summary" :class="{ empty: !attemptCount }">
      <strong>{{ attemptCount ? `${attemptCount} intento${attemptCount === 1 ? '' : 's'}` : 'Sin intentar' }}</strong>
      <span v-if="lastAttempt">Último: {{ lastAttempt.score }}/{{ lastAttempt.total }}</span>
      <span v-else>Listo para practicar</span>
    </div>
    <div class="final-card-foot">
      <span>{{ exam.subject.units.length }} unidades de referencia</span>
      <span>Practicar -></span>
    </div>
  </button>
</template>

<script setup>
defineProps({
  exam: { type: Object, required: true },
  attemptCount: { type: Number, default: 0 },
  lastAttempt: { type: Object, default: null }
})

defineEmits(['open'])
</script>

<style scoped>
.final-card {
  background: var(--bg-card);
  border: var(--border-width) solid var(--border-color);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-sm);
  color: var(--text-primary);
  cursor: pointer;
  display: grid;
  font-family: inherit;
  gap: 10px;
  min-height: 210px;
  padding: 18px;
  text-align: left;
  transition: transform var(--transition-fast), box-shadow var(--transition-fast), border-color var(--transition-fast);
}

.final-card:hover {
  border-color: var(--accent-gold);
  box-shadow: var(--shadow-md);
  transform: translate(-2px, -2px);
}

.final-card-top,
.final-card-foot {
  align-items: center;
  display: flex;
  gap: 10px;
  justify-content: space-between;
}

.subject-pill {
  color: var(--text-muted);
  font-size: 0.72rem;
  font-weight: 800;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.final-card h3 {
  font-size: 1.15rem;
  margin: 0;
}

.final-card p {
  font-size: 0.88rem;
  margin: 0;
}

.attempt-summary {
  background: var(--accent-teal-soft);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-sm);
  display: grid;
  gap: 2px;
  padding: 8px 10px;
}

.attempt-summary.empty {
  background: var(--bg-tertiary);
}

.attempt-summary strong {
  font-size: 0.82rem;
}

.attempt-summary span {
  color: var(--text-muted);
  font-size: 0.74rem;
  font-weight: 700;
}

.final-card-foot {
  align-self: end;
  color: var(--text-muted);
  font-size: 0.78rem;
  font-weight: 700;
  margin-top: 8px;
}
</style>
