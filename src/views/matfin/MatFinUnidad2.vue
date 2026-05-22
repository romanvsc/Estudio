<template>
  <div class="unit-view">
    <div class="unit-header">
      <span class="unit-badge badge badge-amber">Unidad 2</span>
      <h1>Equivalencia Financiera y Tasas</h1>
      <p class="unit-subtitle">Capitales equivalentes, fecha focal, TNA, TEA, tasas efectivas y capitalización continua</p>
    </div>

    <div class="study-toolbar">
      <div class="study-progress-card">
        <div class="card-head">
          <h3>Progreso por tema</h3>
          <span class="badge badge-amber">{{ studySummary.completion }}% dominado</span>
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
      <h3>Resultados en Unidad 2 ({{ searchResults.length }})</h3>
      <div class="search-results-list">
        <button v-for="result in searchResults" :key="`${result.topicId}-${result.term}`" class="search-result-item" @click="goToTopic(result.anchor)">
          <strong>{{ result.number }} · {{ result.title }}</strong>
          <span>Coincide con: {{ result.term }}</span>
        </button>
      </div>
    </div>

    <Accordion id="mfu2-t1" title="Equivalencia Financiera de Capitales" :icon="Scale" number="Tema 1" color="amber" :defaultOpen="true">
      <InfoCard type="definition" label="Idea central">
        <p>Dos capitales ubicados en distintas fechas son equivalentes si, llevados a una misma fecha focal con la misma tasa, producen el mismo valor.</p>
      </InfoCard>
      <div class="learning-grid">
        <FormulaBlock title="Capitales equivalentes" :formulas="equivalenceFormulas" tone="amber" />
        <InfoCard type="important" label="Clave conceptual">
          <p>La equivalencia no compara importes nominales.</p>
          <p>Compara valores en una misma fecha de valuación.</p>
        </InfoCard>
      </div>
      <InfoCard type="example" label="Ejemplo del PDF">
        <p>$1.102,50 en fecha 2 y $1.215,51 en fecha 4 son equivalentes si al 5% mensual compuesto ambos valen $1.000 en fecha 0.</p>
      </InfoCard>
    </Accordion>

    <Accordion id="mfu2-t2" title="Equivalencia en Régimen Simple" :icon="Calculator" number="Tema 2" color="amber">
      <InfoCard type="warning" label="Particularidad">
        <p>En régimen simple, dos capitales equivalentes en una fecha pueden dejar de serlo si se cambia la fecha focal.</p>
      </InfoCard>
      <FormulaBlock title="Valor en fecha focal simple" :formulas="simpleEquivalenceFormulas" tone="amber" />
      <div class="section-block">
        <h4>Uso típico</h4>
        <ul class="list-styled">
          <li>Reemplazar una deuda por varios pagos.</li>
          <li>Prorrogar vencimientos.</li>
          <li>Igualar valores actuales de pagos futuros contra una deuda original.</li>
        </ul>
      </div>
    </Accordion>

    <Accordion id="mfu2-t3" title="Equivalencia en Régimen Compuesto" :icon="GitCompare" number="Tema 3" color="amber">
      <InfoCard type="definition" label="Propiedad">
        <p>En régimen compuesto, si dos capitales son equivalentes para una tasa dada, siguen siendo equivalentes cualquiera sea la fecha de valuación.</p>
      </InfoCard>
      <FormulaBlock title="Traslado compuesto entre fechas" :formulas="compoundEquivalenceFormulas" tone="amber" />
      <InfoCard type="tip" label="Atajo de estudio">
        <p>En compuesto podés elegir la fecha focal más cómoda porque el resultado financiero se conserva.</p>
      </InfoCard>
    </Accordion>

    <Accordion id="mfu2-t4" title="TNA, TEA y Frecuencia de Capitalización" :icon="Percent" number="Tema 4" color="amber">
      <div class="learning-grid">
        <FormulaBlock title="Tasa nominal y efectiva" :formulas="nominalEffectiveFormulas" tone="amber" />
        <InfoCard type="important" label="TNA vs TEA">
          <p>La TNA informa una tasa anual nominal.</p>
          <p>La TEA mide lo que efectivamente se gana al capitalizar intereses durante el año.</p>
        </InfoCard>
      </div>
      <div class="section-block">
        <h4>Vocabulario del PDF</h4>
        <ul class="list-styled">
          <li><strong>Período de capitalización:</strong> lapso al final del cual los intereses se agregan al capital.</li>
          <li><strong>Frecuencia de capitalización (m):</strong> cantidad de capitalizaciones dentro de un año.</li>
          <li><strong>Subperíodo:</strong> lapso inferior al año usado para capitalizar.</li>
        </ul>
      </div>
    </Accordion>

    <Accordion id="mfu2-t5" title="Tasas Efectivas Equivalentes" :icon="Repeat2" number="Tema 5" color="amber">
      <InfoCard type="definition" label="Comparabilidad">
        <p>Para comparar colocaciones con capitales, plazos y tasas distintas, se expresan todas en una tasa efectiva del mismo período.</p>
      </InfoCard>
      <FormulaBlock title="Conversión de tasas efectivas" :formulas="effectiveRateFormulas" tone="amber" />
      <InfoCard type="example" label="Lectura práctica">
        <p>Una tasa efectiva anual sólo representa el rendimiento real si la operación dura exactamente un año; para otros plazos hay que convertir.</p>
      </InfoCard>
    </Accordion>

    <Accordion id="mfu2-t6" title="Capitalización Continua" :icon="InfinityIcon" number="Tema 6" color="amber">
      <InfoCard type="definition" label="Límite">
        <p>Cuando la frecuencia de capitalización crece indefinidamente, el factor de capitalización tiende al número e.</p>
      </InfoCard>
      <FormulaBlock title="Capitalización continua" :formulas="continuousFormulas" tone="amber" />
      <InfoCard type="example" label="Ejemplo del PDF">
        <p>Si la tasa nominal continua es 0,12, entonces la tasa efectiva es aproximadamente 0,127496851.</p>
      </InfoCard>
    </Accordion>

    <UnitQuiz unitId="mf-2" title="Quiz — Unidad 2: Equivalencia y tasas" :questions="quizQuestions" />
  </div>
</template>

<script setup>
import { computed, onMounted, onUnmounted, reactive } from 'vue'
import Accordion from '../../components/Accordion.vue'
import FormulaBlock from '../../components/FormulaBlock.vue'
import InfoCard from '../../components/InfoCard.vue'
import UnitQuiz from '../../components/UnitQuiz.vue'
import { useStudyProgress } from '../../composables/useStudyProgress'
import { Calculator, GitCompare, InfinityIcon, Percent, Repeat2, Scale } from 'lucide-vue-next'

const props = defineProps({
  searchQuery: { type: String, default: '' }
})

const topicMeta = [
  { id: 'mfu2-t1', anchor: 'mfu2-t1', number: 'Tema 1', title: 'Equivalencia financiera', keywords: ['equivalencia', 'fecha focal', 'valor actual', 'capitales equivalentes'] },
  { id: 'mfu2-t2', anchor: 'mfu2-t2', number: 'Tema 2', title: 'Régimen simple', keywords: ['régimen simple', 'interés simple', 'fecha focal', 'pagos iguales'] },
  { id: 'mfu2-t3', anchor: 'mfu2-t3', number: 'Tema 3', title: 'Régimen compuesto', keywords: ['régimen compuesto', 'valoración', 'capitalización', 'equivalencia'] },
  { id: 'mfu2-t4', anchor: 'mfu2-t4', number: 'Tema 4', title: 'TNA y TEA', keywords: ['TNA', 'TEA', 'nominal', 'efectiva', 'frecuencia', 'capitalización'] },
  { id: 'mfu2-t5', anchor: 'mfu2-t5', number: 'Tema 5', title: 'Tasas efectivas equivalentes', keywords: ['tasa efectiva', 'tasas equivalentes', 'comparar colocaciones', 'plazo'] },
  { id: 'mfu2-t6', anchor: 'mfu2-t6', number: 'Tema 6', title: 'Capitalización continua', keywords: ['capitalización continua', 'e', 'infinito', 'tasa continua'] }
]

const { getTopicStatus, setTopicStatus, getSummary } = useStudyProgress('mf-2')
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

const equivalenceFormulas = [
  { label: 'Valor actual', latex: 'V_0 = \\frac{C_t}{(1+i)^t}' },
  { label: 'Valor futuro', latex: 'C_t = V_0(1+i)^t' },
  { label: 'Ecuación de valor', latex: '\\sum \\text{VA de pagos} = \\text{deuda en fecha focal}' }
]

const simpleEquivalenceFormulas = [
  { label: 'Actualización simple', latex: 'V_0 = \\frac{C_t}{1+i \\cdot t}' },
  { label: 'Capitalización simple', latex: 'C_t = V_0(1+i \\cdot t)' }
]

const compoundEquivalenceFormulas = [
  { label: 'Llevar de a hacia f', latex: 'C_f = C_a(1+i)^{f-a}' },
  { label: 'Traer de b hacia f', latex: 'C_f = \\frac{C_b}{(1+i)^{b-f}}' }
]

const nominalEffectiveFormulas = [
  { label: 'Tasa subperiódica', latex: 'i^{(m)} = \\frac{j^{(m)}}{m}' },
  { label: 'Tasa efectiva anual', latex: '1+i = \\left(1+\\frac{j^{(m)}}{m}\\right)^m' },
  { label: 'TEA', latex: 'i = \\left(1+\\frac{j^{(m)}}{m}\\right)^m - 1' }
]

const effectiveRateFormulas = [
  { label: 'Equivalencia general', latex: '1+i_a = (1+i_b)^{a/b}' },
  { label: 'Tasa buscada', latex: 'i_a = (1+i_b)^{a/b} - 1' }
]

const continuousFormulas = [
  { label: 'Factor continuo', latex: '1+i = e^{j(\\infty)}' },
  { label: 'Tasa efectiva continua', latex: 'i = e^{j(\\infty)} - 1' },
  { label: 'Monto continuo', latex: 'C_n = C \\cdot e^{j(\\infty)n}' }
]

const quizQuestions = [
  {
    question: '¿Cuándo dos capitales son financieramente equivalentes?',
    options: ['Cuando tienen el mismo importe nominal', 'Cuando actualizados a una misma fecha con la misma tasa dan el mismo valor', 'Cuando vencen el mismo día', 'Cuando tienen la misma tasa nominal'],
    correctIndex: 1
  },
  {
    question: 'En régimen simple, al cambiar la fecha focal:',
    options: ['La equivalencia siempre se conserva', 'La tasa deja de existir', 'Los capitales pueden dejar de ser equivalentes', 'El interés se vuelve compuesto'],
    correctIndex: 2
  },
  {
    question: 'La TEA expresa:',
    options: ['La tasa nominal sin capitalización', 'El rendimiento efectivo anual considerando capitalizaciones', 'La tasa de descuento simple', 'El plazo de una operación'],
    correctIndex: 1
  },
  {
    question: 'Si aumenta la frecuencia de capitalización con la misma tasa nominal:',
    options: ['La tasa efectiva baja siempre', 'La tasa efectiva aumenta', 'La tasa efectiva queda igual en todos los casos', 'La operación pasa a ser simple'],
    correctIndex: 1
  },
  {
    question: 'La capitalización continua usa como límite el número:',
    options: ['pi', 'e', 'cero', 'uno'],
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
  color: var(--accent-amber);
  border-color: var(--accent-amber);
  background: var(--accent-amber-soft);
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
