<template>
  <div class="unit-view">
    <div class="unit-header">
      <span class="unit-badge badge badge-teal">Unidad 1</span>
      <h1>Fundamentos y Cálculo Financiero</h1>
      <p class="unit-subtitle">Decisiones financieras, tasas, interés simple/compuesto y descuentos</p>
    </div>

    <div class="study-toolbar">
      <div class="study-progress-card">
        <div class="card-head">
          <h3>Progreso por tema</h3>
          <span class="badge badge-teal">{{ studySummary.completion }}% dominado</span>
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
    </div>

    <div v-if="searchResults.length" class="search-results-card">
      <h3>Resultados en Unidad 1 ({{ searchResults.length }})</h3>
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

    <Accordion id="mfu1-t1" title="Decisiones Financieras y Principios Fundamentales" :icon="Target" number="Tema 1" color="teal" :defaultOpen="true">
      <InfoCard type="definition" label="Decisiones">
        <ul class="list-styled">
          <li><strong>Decisión de financiamiento:</strong> conseguir recursos para operar o invertir.</li>
          <li><strong>Decisión de inversión:</strong> colocar recursos excedentes para obtener rendimiento.</li>
        </ul>
      </InfoCard>
      <div class="section-block">
        <h4>Principios financieros</h4>
        <ul class="list-styled">
          <li><strong>Valor del dinero en el tiempo:</strong> un peso hoy vale más que un peso mañana.</li>
          <li><strong>Relación riesgo-rendimiento:</strong> entre alternativas de igual rendimiento, se prefiere la de menor riesgo.</li>
          <li><strong>Preferencia por liquidez:</strong> se valora la disponibilidad inmediata del dinero.</li>
        </ul>
      </div>
    </Accordion>

    <Accordion id="mfu1-t2" title="Tasa de Interés y Componentes" :icon="Percent" number="Tema 2" color="teal">
      <InfoCard type="definition" label="Definición">
        <p>La tasa de interés es el precio que se paga por usar una unidad de capital durante una unidad de tiempo.</p>
      </InfoCard>
      <div class="section-block">
        <h4>Factores de la tasa</h4>
        <ul class="list-styled">
          <li><strong>Tasa pura:</strong> compensa postergar consumo.</li>
          <li><strong>Prima por inflación:</strong> protege poder adquisitivo.</li>
          <li><strong>Prima por riesgo:</strong> compensa posibilidad de incumplimiento.</li>
          <li><strong>Prima por liquidez:</strong> mayor premio en inversiones menos líquidas.</li>
          <li><strong>Prima por vencimiento:</strong> mayor plazo suele implicar mayor tasa.</li>
        </ul>
      </div>
    </Accordion>

    <Accordion id="mfu1-t3" title="Operación Financiera y Elementos" :icon="Calculator" number="Tema 3" color="teal">
      <InfoCard type="definition" label="Operación financiera">
        <p>Acción que genera variación cuantitativa del capital por el transcurso del tiempo.</p>
      </InfoCard>
      <div class="section-block">
        <h4>Elementos</h4>
        <ul class="list-styled">
          <li><strong>Capital inicial (C)</strong></li>
          <li><strong>Capital final (Cf)</strong></li>
          <li><strong>Interés (I)</strong></li>
          <li><strong>Unidad monetaria</strong></li>
          <li><strong>Unidad de tiempo (n)</strong></li>
        </ul>
      </div>
      <InfoCard type="important" label="Ley financiera">
        <p>Simple: los intereses no generan intereses. Compuesta: capitalizan y generan interés sobre interés.</p>
      </InfoCard>
    </Accordion>

    <Accordion id="mfu1-t4" title="Interés Simple" :icon="TrendingUp" number="Tema 4" color="teal">
      <div class="formula-block" data-formula-set="Interes simple">
        <p>I = C x i x n</p>
        <p>Cf = C + I = C(1 + i x n)</p>
      </div>
      <div class="section-block">
        <h4>Despejes frecuentes</h4>
        <ul class="list-styled formula-list">
          <li>C = I / (i x n)</li>
          <li>i = I / (C x n)</li>
          <li>n = I / (C x i)</li>
          <li>C = Cf / (1 + i x n)</li>
        </ul>
      </div>
      <InfoCard type="tip" label="Consistencia de unidades">
        <p>La tasa y el tiempo deben estar expresados en la misma unidad temporal.</p>
      </InfoCard>
    </Accordion>

    <Accordion id="mfu1-t5" title="Interés Compuesto" :icon="BarChart3" number="Tema 5" color="teal">
      <div class="formula-block" data-formula-set="Interes compuesto">
        <p>Cf = C(1 + i)^n</p>
        <p>C = Cf / (1 + i)^n</p>
        <p>i = (Cf / C)^(1/n) - 1</p>
        <p>n = (log Cf - log C) / log(1 + i)</p>
      </div>
      <InfoCard type="important" label="Clave conceptual">
        <p>En régimen compuesto los intereses se capitalizan, por eso el crecimiento del capital es exponencial.</p>
      </InfoCard>
    </Accordion>

    <Accordion id="mfu1-t6" title="Descuento Simple y Compuesto" :icon="ArrowDownCircle" number="Tema 6" color="teal">
      <InfoCard type="definition" label="Descuento">
        <p>Es la operación inversa a capitalizar: traer un valor futuro a valor actual.</p>
      </InfoCard>
      <div class="section-block">
        <h4>Fórmulas de descuento simple</h4>
        <div class="formula-block compact" data-formula-set="Descuento simple">
          <p>V = Cn - D</p>
          <p>V = Cn(1 - n x d)</p>
          <p>D = Cn x d x n</p>
        </div>
      </div>
      <div class="section-block">
        <h4>Fórmulas de descuento compuesto</h4>
        <div class="formula-block compact" data-formula-set="Descuento compuesto">
          <p>V = Cn(1 - d)^n</p>
          <p>d = 1 - (V / Cn)^(1/n)</p>
          <p>Cn = V / (1 - d)^n</p>
        </div>
      </div>
    </Accordion>

    <Accordion id="mfu1-t7" title="Equivalencia de Tasas y Puntos Porcentuales" :icon="Scale" number="Tema 7" color="teal">
      <div class="section-block">
        <h4>Equivalencia interés-descuento</h4>
        <div class="formula-block compact" data-formula-set="Equivalencia de tasas">
          <p>d = i / (1 + i)</p>
          <p>i = d / (1 - d)</p>
        </div>
      </div>
      <InfoCard type="example" label="Puntos porcentuales">
        <p>Si una tasa pasa de 28% a 31%, la variación es de 3 puntos porcentuales.</p>
      </InfoCard>
      <InfoCard type="warning" label="Interpretación">
        <p>Puntos porcentuales no es lo mismo que variación porcentual relativa.</p>
      </InfoCard>
    </Accordion>

    <UnitQuiz unitId="mf-1" :questions="quizQuestions" />
  </div>
</template>

<script setup>
import { computed, onMounted, onUnmounted, reactive } from 'vue'
import Accordion from '../components/Accordion.vue'
import InfoCard from '../components/InfoCard.vue'
import UnitQuiz from '../components/UnitQuiz.vue'
import { useStudyProgress } from '../composables/useStudyProgress'
import { Target, Percent, Calculator, TrendingUp, BarChart3, ArrowDownCircle, Scale } from 'lucide-vue-next'

const props = defineProps({
  searchQuery: { type: String, default: '' }
})

const topicMeta = [
  { id: 'mfu1-t1', anchor: 'mfu1-t1', number: 'Tema 1', title: 'Decisiones y principios', keywords: ['decisión de financiamiento', 'decisión de inversión', 'valor del dinero', 'riesgo', 'liquidez'] },
  { id: 'mfu1-t2', anchor: 'mfu1-t2', number: 'Tema 2', title: 'Tasa de interés', keywords: ['tasa de interés', 'prima por inflación', 'prima por riesgo', 'prima por liquidez', 'prima por vencimiento'] },
  { id: 'mfu1-t3', anchor: 'mfu1-t3', number: 'Tema 3', title: 'Operación financiera', keywords: ['capital inicial', 'capital final', 'interés', 'unidad de tiempo', 'ley financiera'] },
  { id: 'mfu1-t4', anchor: 'mfu1-t4', number: 'Tema 4', title: 'Interés simple', keywords: ['interés simple', 'I = C x i x n', 'capital final', 'despeje'] },
  { id: 'mfu1-t5', anchor: 'mfu1-t5', number: 'Tema 5', title: 'Interés compuesto', keywords: ['interés compuesto', '(1+i)^n', 'capitalización', 'logaritmos'] },
  { id: 'mfu1-t6', anchor: 'mfu1-t6', number: 'Tema 6', title: 'Descuentos', keywords: ['descuento simple', 'descuento compuesto', 'valor actual', 'valor nominal'] },
  { id: 'mfu1-t7', anchor: 'mfu1-t7', number: 'Tema 7', title: 'Equivalencia de tasas', keywords: ['equivalencia', 'puntos porcentuales', 'tasa de descuento', 'tasa de interés'] }
]

const { getTopicStatus, setTopicStatus, getSummary } = useStudyProgress('mf-1')
const topicStatus = reactive({})

const studySummary = computed(() => getSummary(topicMeta.map(topic => topic.id)))

const searchResults = computed(() => {
  const term = props.searchQuery.trim().toLowerCase()
  if (!term) return []
  return topicMeta
    .map((topic) => {
      const match = topic.keywords.find((keyword) => keyword.toLowerCase().includes(term)) ||
        (topic.title.toLowerCase().includes(term) ? topic.title : null)
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

onMounted(() => {
  refreshProgressState()
  window.addEventListener('study-progress-updated', refreshProgressState)
})

onUnmounted(() => {
  window.removeEventListener('study-progress-updated', refreshProgressState)
})

function setStatus(topicId, status) {
  topicStatus[topicId] = status
  setTopicStatus(topicId, status)
}

function refreshProgressState() {
  topicMeta.forEach((topic) => {
    topicStatus[topic.id] = getTopicStatus(topic.id)
  })
}

function goToTopic(anchor) {
  const target = document.getElementById(anchor)
  if (target) {
    target.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}

const quizQuestions = [
  {
    question: '¿Cuál enunciado describe mejor una decisión de financiamiento?',
    options: [
      'Elegir dónde colocar excedentes de caja',
      'Definir cómo obtener recursos para la empresa',
      'Registrar una compra en el libro diario',
      'Calcular el costo de oportunidad de un activo fijo'
    ],
    correctIndex: 1
  },
  {
    question: '¿Qué principio explica por qué un peso hoy vale más que un peso en el futuro?',
    options: [
      'Principio de prudencia',
      'Valor tiempo del dinero',
      'Devengado fiscal',
      'Dualidad económica'
    ],
    correctIndex: 1
  },
  {
    question: 'En interés simple, ¿qué fórmula es correcta para el interés?',
    options: [
      'I = C(1+i)^n',
      'I = C x i x n',
      'I = C / (1+i)^n',
      'I = Cn - D'
    ],
    correctIndex: 1
  },
  {
    question: 'En interés compuesto, el capital final se calcula como:',
    options: [
      'Cf = C(1+i x n)',
      'Cf = C + i + n',
      'Cf = C(1+i)^n',
      'Cf = C(1-d)^n'
    ],
    correctIndex: 2
  },
  {
    question: '¿Qué expresa V = Cn(1 - n x d)?',
    options: [
      'Descuento simple comercial',
      'Interés compuesto',
      'Capitalización continua',
      'Tasa pura'
    ],
    correctIndex: 0
  },
  {
    question: 'Si una tasa sube de 24% a 29%, la variación es:',
    options: [
      '5 puntos porcentuales',
      '5% exacto',
      '24 puntos porcentuales',
      '29 puntos porcentuales'
    ],
    correctIndex: 0
  }
]
</script>

<style scoped>
.unit-view {
  animation: fadeInUp 0.4s ease-out;
}

.unit-header {
  margin-bottom: 32px;
}

.unit-badge {
  margin-bottom: 12px;
}

.badge-teal {
  background: var(--accent-teal-soft);
  color: var(--accent-teal);
  border: 1px solid var(--accent-teal);
  display: inline-block;
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}

.unit-header h1 {
  margin-bottom: 8px;
}

.unit-subtitle {
  color: var(--text-muted);
  font-size: 0.95rem;
}

.study-toolbar {
  display: grid;
  grid-template-columns: 1fr;
  gap: 12px;
  margin-bottom: 18px;
}

.study-progress-card,
.search-results-card {
  border: 1px solid var(--border-color);
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
  border: 1px solid var(--border-color);
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
  border: 1px solid var(--border-color);
  background: var(--bg-tertiary);
  color: var(--text-secondary);
  border-radius: 6px;
  font-size: 0.72rem;
  padding: 5px 8px;
  cursor: pointer;
}

.status-btn.active {
  color: var(--accent-teal);
  border-color: var(--accent-teal);
  background: var(--accent-teal-soft);
}

.search-results-list {
  display: grid;
  gap: 8px;
  margin-top: 10px;
}

.search-result-item {
  border: 1px solid var(--border-color);
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

.section-block {
  margin: 10px 0;
}

.section-block h4 {
  margin-bottom: 6px;
}

.list-styled {
  margin: 0;
  padding-left: 20px;
  color: var(--text-secondary);
}

.list-styled li {
  margin: 4px 0;
}

.formula-block {
  position: relative;
  border: 2px solid var(--accent-teal);
  border-radius: var(--radius-md);
  background:
    linear-gradient(135deg, color-mix(in srgb, var(--accent-teal) 16%, transparent), transparent 56%),
    var(--bg-card);
  box-shadow: var(--shadow-sm);
  padding: 18px 14px 12px;
  margin: 12px 0;
  overflow: hidden;
  transition: transform var(--transition-fast), box-shadow var(--transition-fast);
}

.formula-block::before {
  content: attr(data-formula-set);
  position: absolute;
  top: 0;
  right: 12px;
  transform: translateY(-50%);
  border: 1px solid var(--border-color);
  border-radius: 999px;
  background: var(--accent-teal);
  color: #063327;
  padding: 2px 10px;
  font-size: 0.63rem;
  font-weight: 800;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.formula-block::after {
  content: '';
  position: absolute;
  width: 120px;
  height: 120px;
  right: -40px;
  bottom: -62px;
  border-radius: 50%;
  background: color-mix(in srgb, var(--accent-teal) 16%, transparent);
  pointer-events: none;
}

.formula-block:hover {
  transform: translate(-2px, -2px);
  box-shadow: 6px 6px 0 var(--border-color);
}

.formula-block p {
  margin: 0;
  font-family: 'JetBrains Mono', 'Fira Code', monospace;
  font-size: 0.96rem;
  font-weight: 700;
  line-height: 1.45;
  letter-spacing: 0.01em;
  color: var(--text-primary);
  background: color-mix(in srgb, var(--bg-secondary) 82%, transparent);
  border: 1px dashed color-mix(in srgb, var(--accent-teal) 55%, var(--border-color));
  border-radius: 8px;
  padding: 7px 10px;
}

.formula-block p + p {
  margin-top: 8px;
}

.formula-block.compact {
  padding-top: 16px;
}

.formula-block.compact p {
  font-size: 0.88rem;
  padding: 6px 9px;
}

.formula-list {
  padding-left: 0;
  margin-top: 8px;
  display: grid;
  gap: 8px;
}

.formula-list li {
  list-style: none;
  margin: 0;
  font-family: 'JetBrains Mono', 'Fira Code', monospace;
  font-size: 0.9rem;
  color: var(--text-primary);
  background: color-mix(in srgb, var(--accent-teal) 12%, var(--bg-card));
  border: 1px solid color-mix(in srgb, var(--accent-teal) 52%, var(--border-color));
  border-radius: 8px;
  padding: 6px 10px;
}

.formula-list li::before {
  content: 'f';
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 18px;
  height: 18px;
  margin-right: 8px;
  border-radius: 999px;
  background: var(--accent-teal);
  color: #063327;
  font-size: 0.68rem;
  font-weight: 800;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(12px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 768px) {
  .status-row {
    flex-direction: column;
    align-items: flex-start;
  }

  .formula-block {
    padding: 16px 10px 10px;
  }

  .formula-block::before {
    right: 8px;
    font-size: 0.56rem;
  }

  .formula-block p {
    font-size: 0.88rem;
  }

  .formula-list li {
    font-size: 0.84rem;
  }
}
</style>
