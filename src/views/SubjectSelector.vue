<template>
  <div class="selector-page">
    <div class="selector-header">
      <span class="logo-icon">📚</span>
      <h1>Guía de Estudio</h1>
      <p>Seleccioná una materia, practicá finales o repasá preguntas pendientes.</p>
    </div>

    <div class="subjects-grid">
      <button v-for="subject in subjects" :key="subject.id" class="subject-card" @click="$router.push(subject.defaultPath)">
        <div class="subject-icon">{{ subject.emoji }}</div>
        <div class="subject-info">
          <h2>{{ subject.title }}</h2>
          <p>{{ subject.description }}</p>
          <span class="subject-units">{{ subject.units.length }} unidades<span v-if="subject.exams.length"> · {{ subject.exams.length }} modelos de final</span></span>
        </div>
        <ChevronRight class="arrow" :size="20" aria-hidden="true" />
      </button>

      <button class="subject-card final-models-card" @click="$router.push('/modelos-final')">
        <div class="subject-icon">🎓</div>
        <div class="subject-info">
          <h2>Modelos de Final</h2>
          <p>Buscá modelos por materia y practicá cuestionarios o resoluciones integrales desde un solo lugar.</p>
          <span class="subject-units">{{ allExams.length }} modelos disponibles</span>
        </div>
        <ChevronRight class="arrow" :size="20" aria-hidden="true" />
      </button>

      <button class="subject-card review-card" @click="$router.push('/repaso')">
        <div class="subject-icon">↻</div>
        <div class="subject-info">
          <h2>Repaso global</h2>
          <p>Volvé a las preguntas falladas de todas las materias y recuperá tu progreso cuando lo necesites.</p>
          <span class="subject-units">Preguntas falladas y backup</span>
        </div>
        <ChevronRight class="arrow" :size="20" aria-hidden="true" />
      </button>
    </div>
  </div>
</template>

<script setup>
import { ChevronRight } from 'lucide-vue-next'
import { allExams, subjects } from '../content/subjects'
</script>

<style scoped>
.selector-page {
  align-items: center;
  animation: fadeIn 0.3s ease;
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-height: 80vh;
  padding: 32px 24px;
}

.selector-header {
  margin-bottom: 44px;
  text-align: center;
}

.logo-icon {
  display: block;
  filter: drop-shadow(2px 2px 0 rgba(0, 0, 0, 0.14));
  font-size: 3.3rem;
  margin-bottom: 14px;
}

.selector-header h1 {
  font-size: 2.35rem;
  margin-bottom: 10px;
}

.selector-header p {
  color: var(--text-muted);
  font-size: 1rem;
  font-weight: 500;
}

.subjects-grid {
  display: grid;
  gap: 14px;
  max-width: 680px;
  width: 100%;
}

.subject-card {
  align-items: center;
  background: var(--bg-card);
  border: var(--border-width) solid var(--border-color);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-sm);
  color: var(--text-primary);
  cursor: pointer;
  display: flex;
  font-family: inherit;
  gap: 18px;
  padding: 22px;
  text-align: left;
  transition: transform var(--transition-fast), box-shadow var(--transition-fast), border-color var(--transition-fast), background var(--transition-fast);
}

.subject-card:hover {
  background: var(--accent-blue-soft);
  border-color: var(--accent-blue);
  box-shadow: var(--shadow-md);
  transform: translate(-2px, -2px);
}

.final-models-card:hover {
  background: var(--accent-gold-soft);
  border-color: var(--accent-gold);
}

.review-card:hover {
  background: var(--accent-teal-soft);
  border-color: var(--accent-teal);
}

.subject-card:active {
  box-shadow: 1px 1px 0 var(--border-color);
  transform: translate(1px, 1px);
}

.subject-icon {
  flex-shrink: 0;
  filter: drop-shadow(2px 2px 0 rgba(0, 0, 0, 0.12));
  font-size: 2.4rem;
  line-height: 1;
}

.subject-info {
  flex: 1;
  min-width: 0;
}

.subject-info h2 {
  font-size: 1.15rem;
  margin-bottom: 6px;
}

.subject-info p {
  color: var(--text-secondary);
  font-size: 0.83rem;
  font-weight: 500;
  line-height: 1.45;
  margin-bottom: 8px;
}

.subject-units {
  background: var(--bg-tertiary);
  border: var(--border-width) solid var(--border-color);
  border-radius: var(--radius-sm);
  color: var(--text-muted);
  display: inline-block;
  font-size: 0.7rem;
  font-weight: 800;
  letter-spacing: 0.06em;
  padding: 2px 8px;
  text-transform: uppercase;
}

.arrow {
  color: var(--text-muted);
  flex-shrink: 0;
  transition: transform var(--transition-fast), color var(--transition-fast);
}

.subject-card:hover .arrow {
  color: var(--text-primary);
  transform: translateX(4px);
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(8px); }
  to { opacity: 1; transform: translateY(0); }
}

@media (max-width: 600px) {
  .subject-card {
    gap: 14px;
    padding: 18px;
  }

  .subject-icon {
    font-size: 2rem;
  }
}
</style>
