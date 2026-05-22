<template>
  <div class="unit-view">
    <div class="unit-header">
      <span class="unit-badge badge badge-purple">Unidad 3</span>
      <h1>Rentas</h1>
      <p class="unit-subtitle">Sucesiones de pagos, valor actual, valor final, rentas diferidas, anticipadas y perpetuas</p>
    </div>

    <div class="study-toolbar">
      <div class="study-progress-card">
        <div class="card-head">
          <h3>Progreso por tema</h3>
          <span class="badge badge-purple">{{ studySummary.completion }}% dominado</span>
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
      <h3>Resultados en Unidad 3 ({{ searchResults.length }})</h3>
      <div class="search-results-list">
        <button v-for="result in searchResults" :key="`${result.topicId}-${result.term}`" class="search-result-item" @click="goToTopic(result.anchor)">
          <strong>{{ result.number }} · {{ result.title }}</strong>
          <span>Coincide con: {{ result.term }}</span>
        </button>
      </div>
    </div>

    <Accordion id="mfu3-t1" title="Concepto y Clasificación de Rentas" :icon="ListChecks" number="Tema 1" color="purple" :defaultOpen="true">
      <InfoCard type="definition" label="Renta">
        <p>Una renta es cualquier sucesión de pagos o cobros, iguales o distintos entre sí. Cada pago se denomina término o cuota.</p>
      </InfoCard>
      <div class="section-block">
        <h4>Clasificaciones principales</h4>
        <ul class="list-styled">
          <li><strong>Duración:</strong> temporarias o perpetuas.</li>
          <li><strong>Condicionamiento:</strong> ciertas o inciertas.</li>
          <li><strong>Cuotas:</strong> constantes o variables.</li>
          <li><strong>Momento de pago:</strong> vencidas o adelantadas.</li>
          <li><strong>Valuación:</strong> inmediatas, diferidas o anticipadas.</li>
        </ul>
      </div>
      <InfoCard type="important" label="Clave conceptual">
        <p>Valuar una renta es calcular su valor en una fecha determinada.</p>
        <p>El valor de una renta no vive separado del momento de valuación.</p>
      </InfoCard>
    </Accordion>

    <Accordion id="mfu3-t2" title="Valor Actual de Rentas Vencidas" :icon="ArrowDownToLine" number="Tema 2" color="purple">
      <div class="learning-grid">
        <FormulaBlock title="Renta constante temporaria vencida" :formulas="annuityDueEndFormulas" tone="purple" />
        <InfoCard type="example" label="Ejemplo del PDF">
          <p>Un préstamo de $1.500 a 3 cuotas mensuales con 2% efectivo mensual se cancela con cuotas de $520,13.</p>
        </InfoCard>
      </div>
      <InfoCard type="tip" label="Factor colectivo">
        <p>El factor de actualización permite traer todas las cuotas juntas, sin actualizar una por una.</p>
      </InfoCard>
    </Accordion>

    <Accordion id="mfu3-t3" title="Rentas Adelantadas y Diferidas" :icon="CalendarClock" number="Tema 3" color="purple">
      <FormulaBlock title="Variantes de valor actual" :formulas="annuityVariantFormulas" tone="purple" />
      <div class="section-block">
        <h4>Cómo reconocerlas</h4>
        <ul class="list-styled">
          <li><strong>Inmediata vencida:</strong> la valuación está un período antes de la primera cuota.</li>
          <li><strong>Inmediata adelantada:</strong> la valuación coincide con la primera cuota.</li>
          <li><strong>Diferida:</strong> la fecha de valuación está antes del inicio de la renta.</li>
          <li><strong>Anticipada:</strong> la valuación está después del inicio de la renta.</li>
        </ul>
      </div>
    </Accordion>

    <Accordion id="mfu3-t4" title="Imposiciones y Valor Final" :icon="TrendingUp" number="Tema 4" color="purple">
      <InfoCard type="definition" label="Imposición">
        <p>Es una renta anticipada donde se busca el valor acumulado de una serie de depósitos periódicos.</p>
      </InfoCard>
      <FormulaBlock title="Valor final de cuotas" :formulas="accumulationFormulas" tone="purple" />
      <InfoCard type="example" label="Lectura práctica">
        <p>Si se hacen depósitos periódicos para formar un capital, el valor final indica cuánto se podrá retirar al final del plazo.</p>
      </InfoCard>
    </Accordion>

    <Accordion id="mfu3-t5" title="Rentas Perpetuas" :icon="InfinityIcon" number="Tema 5" color="purple">
      <div class="learning-grid">
        <FormulaBlock title="Rentas constantes perpetuas" :formulas="perpetuityFormulas" tone="purple" />
        <InfoCard type="important" label="Límite">
          <p>Una renta perpetua tiene infinitas cuotas.</p>
          <p>El valor actual existe porque las cuotas futuras se descuentan cada vez más.</p>
        </InfoCard>
      </div>
    </Accordion>

    <UnitQuiz unitId="mf-3" title="Quiz — Unidad 3: Rentas" :questions="quizQuestions" />
  </div>
</template>

<script setup>
import { computed, onMounted, onUnmounted, reactive } from 'vue'
import Accordion from '../../components/Accordion.vue'
import FormulaBlock from '../../components/FormulaBlock.vue'
import InfoCard from '../../components/InfoCard.vue'
import UnitQuiz from '../../components/UnitQuiz.vue'
import { useStudyProgress } from '../../composables/useStudyProgress'
import { ArrowDownToLine, CalendarClock, InfinityIcon, ListChecks, TrendingUp } from 'lucide-vue-next'

const props = defineProps({
  searchQuery: { type: String, default: '' }
})

const topicMeta = [
  { id: 'mfu3-t1', anchor: 'mfu3-t1', number: 'Tema 1', title: 'Concepto y clasificación', keywords: ['renta', 'cuota', 'término', 'temporaria', 'perpetua', 'cierta', 'incierta'] },
  { id: 'mfu3-t2', anchor: 'mfu3-t2', number: 'Tema 2', title: 'Valor actual vencido', keywords: ['valor actual', 'renta vencida', 'factor de actualización', 'cuota'] },
  { id: 'mfu3-t3', anchor: 'mfu3-t3', number: 'Tema 3', title: 'Adelantadas y diferidas', keywords: ['adelantada', 'diferida', 'inmediata', 'momento de valuación'] },
  { id: 'mfu3-t4', anchor: 'mfu3-t4', number: 'Tema 4', title: 'Imposiciones y valor final', keywords: ['imposición', 'valor final', 'capital acumulado', 'depósitos'] },
  { id: 'mfu3-t5', anchor: 'mfu3-t5', number: 'Tema 5', title: 'Rentas perpetuas', keywords: ['perpetua', 'infinita', 'valor actual', 'cuota perpetua'] }
]

const { getTopicStatus, setTopicStatus, getSummary } = useStudyProgress('mf-3')
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
      return { topicId: topic.id, anchor: topic.anchor, number: topic.number, title: topic.title, term: typeof match === 'string' ? match : term }
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
  if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

const annuityDueEndFormulas = [
  { label: 'Factor de actualización', latex: 'a_{n|i} = \\frac{1-v^n}{i}' },
  { label: 'Valor actual', latex: 'V = c \\cdot \\frac{1-v^n}{i}' },
  { label: 'Cuota', latex: 'c = V \\cdot \\frac{i}{1-v^n}' },
  { label: 'Cantidad de cuotas', latex: 'n = \\frac{-\\log(1 - V \\cdot i / c)}{\\log(1+i)}' }
]

const annuityVariantFormulas = [
  { label: 'Factor de descuento', latex: 'v = \\frac{1}{1+i}' },
  { label: 'Inmediata adelantada', latex: 'V = c \\cdot \\frac{1-v^n}{i}(1+i)' },
  { label: 'Diferida vencida', latex: 'V = c \\cdot \\frac{1-v^n}{i} \\cdot v^t' },
  { label: 'Diferida adelantada', latex: 'V = c \\cdot \\frac{1-v^n}{i} \\cdot v^{t-1}' }
]

const accumulationFormulas = [
  { label: 'Factor de capitalización', latex: 's_{n|i} = \\frac{(1+i)^n - 1}{i}' },
  { label: 'Valor final', latex: 'A_n = c \\cdot \\frac{(1+i)^n - 1}{i}' },
  { label: 'Relación con valor actual', latex: 'A_n = V_0(1+i)^n' }
]

const perpetuityFormulas = [
  { label: 'Perpetua vencida', latex: 'V = \\frac{c}{i}' },
  { label: 'Cuota perpetua', latex: 'c = V \\cdot i' },
  { label: 'Tasa implícita', latex: 'i = \\frac{c}{V}' },
  { label: 'Perpetua adelantada', latex: 'V = \\frac{c(1+i)}{i}' }
]

const quizQuestions = [
  {
    question: '¿Qué es una renta en matemática financiera?',
    options: ['Un pago único al final del plazo', 'Una sucesión de pagos o cobros', 'Una tasa nominal anual', 'Un descuento comercial'],
    correctIndex: 1
  },
  {
    question: 'Valuar una renta significa:',
    options: ['Calcular su valor en una fecha determinada', 'Sumar cuotas sin interés', 'Eliminar la tasa', 'Convertirla siempre a perpetua'],
    correctIndex: 0
  },
  {
    question: 'En una renta inmediata vencida, el momento de valuación está:',
    options: ['Un período antes de la primera cuota', 'Después de la última cuota', 'En una fecha aleatoria', 'Siempre en infinito'],
    correctIndex: 0
  },
  {
    question: 'La fórmula V = c(1 - v^n) / i corresponde a:',
    options: ['Valor actual de una renta constante vencida', 'Capitalización continua', 'Descuento simple', 'Sistema alemán'],
    correctIndex: 0
  },
  {
    question: 'Una renta perpetua tiene:',
    options: ['Una sola cuota', 'Cuotas infinitas', 'Tasa cero obligatoria', 'Plazo de tres meses'],
    correctIndex: 1
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

.card-head,
.status-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
}

.card-head {
  margin-bottom: 10px;
}

.status-grid,
.search-results-list {
  display: grid;
  gap: 8px;
}

.status-row {
  border: 1px solid var(--border-color);
  border-radius: var(--radius-sm);
  padding: 8px;
}

.status-row p {
  margin: 0;
  font-size: 0.8rem;
}

.status-actions {
  display: flex;
  gap: 6px;
}

.status-btn,
.search-result-item {
  border: 1px solid var(--border-color);
  background: var(--bg-tertiary);
  border-radius: 6px;
  cursor: pointer;
  font-family: inherit;
}

.status-btn {
  color: var(--text-secondary);
  font-size: 0.72rem;
  padding: 5px 8px;
}

.status-btn.active {
  color: var(--accent-purple);
  border-color: var(--accent-purple);
  background: var(--accent-purple-soft);
}

.search-results-list {
  margin-top: 10px;
}

.search-result-item {
  padding: 10px;
  text-align: left;
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

.learning-grid {
  display: grid;
  grid-template-columns: minmax(0, 1.45fr) minmax(260px, 0.85fr);
  gap: 14px;
  align-items: start;
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

  .learning-grid {
    grid-template-columns: 1fr;
  }
}
</style>
