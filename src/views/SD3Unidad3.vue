<template>
  <div class="unit-view">
    <div class="unit-header">
      <span class="unit-badge badge badge-amber">Unidad 3</span>
      <h1>Bloqueo Irreversible (Deadlock)</h1>
      <p class="unit-subtitle">Concepto, condiciones de Coffman, detección, evitación y prevención</p>
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
      <h3>Resultados en Unidad 3 ({{ searchResults.length }})</h3>
      <div class="search-results-list">
        <button v-for="result in searchResults" :key="`${result.topicId}-${result.term}`" class="search-result-item" @click="goToTopic(result.anchor)">
          <strong>{{ result.number }} · {{ result.title }}</strong>
          <span>Coincide con: {{ result.term }}</span>
        </button>
      </div>
    </div>

    <!-- Tema 1: Concepto de Bloqueo Irreversible -->
    <Accordion id="sd3u3-t1" title="Concepto de Bloqueo Irreversible" :icon="Ban" number="Tema 1" color="amber" :defaultOpen="true">
      <InfoCard type="definition" label="Definición">
        <p>Un <strong>bloqueo irreversible</strong> (interbloqueo o <em>deadlock</em>) es una situación en la que un conjunto de procesos se encuentra en un estado de espera permanente. Cada proceso del grupo aguarda por un recurso que está siendo retenido por otro proceso del mismo conjunto, deteniendo por completo el progreso sin resolución autónoma.</p>
      </InfoCard>

      <InfoCard type="example" label="Ejemplo sencillo">
        <p>Imaginá dos autos que llegan al mismo tiempo a un <strong>cruce de calles</strong> sin semáforo, uno desde el norte y otro desde el este. Ambos avanzan y quedan trabados en la intersección: el auto del norte no puede seguir porque el del este le bloquea el paso, y viceversa. Ninguno puede retroceder y ninguno cede — están en un <strong>bloqueo irreversible (deadlock)</strong>. No habrá progreso a menos que alguien intervenga desde afuera.</p>
      </InfoCard>
    </Accordion>

    <!-- Tema 2: Tipos de Recursos -->
    <Accordion id="sd3u3-t2" title="Recursos Expropiables y No Expropiables" :icon="Package" number="Tema 2" color="amber">
      <InfoCard type="example" label="Ejemplo sencillo">
        <p>Pensá en un <strong>aula escolar</strong>. La pizarra puede ser "expropiada": el profesor puede borrarla en cualquier momento y asignarla a otro alumno sin que se pierda trabajo permanente (recurso expropiable — como la CPU, que se puede quitar a un proceso). Pero la hoja de examen no puede ser retirada a mitad de uso: si se la sacás al alumno, la respuesta queda incompleta y hay que empezar de nuevo (recurso no expropiable — como una impresora en medio de una impresión).</p>
      </InfoCard>

      <div class="section-block">
        <h4>Clasificación</h4>
        <ul class="list-styled">
          <li><strong>Recursos Expropiables (Los prestados):</strong> El SO puede retirarlos de un proceso por la fuerza sin romper nada. El estado se guarda para seguir después. <em>Ejemplos:</em> La CPU (se le quita turnos) y la Memoria RAM (se manda a disco por un rato).</li>
          <li><strong>Recursos No Expropiables (Los de uso exclusivo):</strong> Si se los sacás por la fuerza al proceso, arruinás lo que estaba haciendo. Son los únicos culpables de que existan los interbloqueos. <em>Ejemplos:</em> Impresoras (mitad de un documento), unidades de cinta, mutexes y semáforos.</li>
        </ul>
      </div>

      <InfoCard type="important" label="Clave">
        <p>Los <strong>deadlocks ocurren con recursos no expropiables</strong>. Si un recurso es expropiable, el SO puede simplemente quitárselo a un proceso y dárselo a otro, evitando la espera circular.</p>
      </InfoCard>
    </Accordion>

    <!-- Tema 3: Condiciones de Coffman -->
    <Accordion id="sd3u3-t3" title="Las 4 Condiciones de Coffman (1971)" :icon="AlertTriangle" number="Tema 3" color="amber">
      <InfoCard type="example" label="Ejemplo sencillo">
        <p>Imaginá una <strong>cena con cuatro amigos</strong> que comparten cubiertos. Para que ocurra un deadlock se necesitan estas cuatro condiciones al mismo tiempo: (1) Cada cuchillo solo lo puede usar una persona a la vez (exclusión mutua). (2) Cada amigo agarra un cuchillo con la mano izquierda y espera conseguir otro con la derecha (retención y espera). (3) Nadie puede quitarle el cuchillo a otro — solo lo suelta voluntariamente (sin expropiación). (4) Juan espera el de Pedro, Pedro el de María, María el de Ana, y Ana el de Juan (espera circular). Si falta cualquiera de estas 4 condiciones, el deadlock no puede ocurrir.</p>
      </InfoCard>

      <InfoCard type="definition" label="Las 4 Condiciones">
        <p>Un interbloqueo <strong>solo puede ocurrir</strong> si se cumplen las cuatro condiciones simultáneamente:</p>
      </InfoCard>

      <div class="section-block">
        <ul class="list-styled">
          <li><strong>1. Exclusión Mutua ("Solo mío"):</strong> Al menos un recurso se mantiene en modo no compartible (solo un proceso a la vez puede usarlo). Ningún otro puede meter mano.</li>
          <li><strong>2. Retención y Espera ("No suelto y quiero más"):</strong> Un proceso retiene al menos un recurso mientras se queda cruzado de brazos esperando que otro proceso suelte lo que él necesita.</li>
          <li><strong>3. Sin Expropiación ("A mí no me lo sacás"):</strong> Nadie le puede arrancar el recurso a un proceso; el proceso tiene que decidir soltarlo por las buenas.</li>
          <li><strong>4. Espera Circular ("La ronda del bloqueo"):</strong> Dos o más procesos forman un círculo viciado: A espera por B, B espera por C, y C espera a que A suelte algo.</li>
        </ul>
      </div>

      <InfoCard type="warning" label="Fundamental">
        <p>Si se elimina <strong>cualquiera</strong> de las cuatro condiciones, el deadlock se vuelve imposible. Este principio es la base de todas las estrategias de prevención.</p>
      </InfoCard>
    </Accordion>

    <!-- Tema 4: Detección y Recuperación -->
    <Accordion id="sd3u3-t4" title="Detección y Recuperación de Deadlocks" :icon="Search" number="Tema 4" color="amber">
      <InfoCard type="example" label="Ejemplo sencillo">
        <p>Imaginá un <strong>tránsito en una rotonda</strong> que se trabó completamente. Un policía (algoritmo de detección) llega, analiza qué autos están bloqueando a cuáles (grafo de asignación de recursos) y detecta que hay un círculo sin salida (ciclo en el grafo). Para resolver, puede: pedirle a un conductor que retroceda a su punto de partida (rollback/retroceso), sacar a un auto con una grúa (terminación forzada del proceso) o reasignar un carril (expropiación de recursos).</p>
      </InfoCard>

      <div class="section-block">
        <h4>Mecanismos de Detección</h4>
        <ul class="list-styled">
          <li><strong>Grafo de Asignación de Recursos (RAG):</strong> Se modelan procesos y recursos como nodos. Si hay un solo ejemplar por recurso, un <strong>ciclo</strong> confirma un deadlock.</li>
          <li><strong>Algoritmos Matriciales:</strong> Para múltiples instancias por recurso, se usan matrices de asignación y peticiones para buscar una secuencia viable de finalización. Si no se puede reducir, hay deadlock.</li>
        </ul>
      </div>

      <div class="section-block">
        <h4>Estrategias de Recuperación</h4>
        <ul class="list-styled">
          <li><strong>Terminación a la fuerza:</strong> Matar a todos los procesos bloqueados de un plumazo (solución rápida pero dolorosa) o matarlos uno por uno hasta que la ronda maldita (el círculo) se rompa.</li>
          <li><strong>Expropiación:</strong> Quitarle un recurso por la fuerza al que lo tiene. Problema: Al que se lo quitás casi seguro crashea.</li>
          <li><strong>El "Ctrl+Z" (Rollback):</strong> El SO tiene la costumbre de sacar "fotos" periódicas del estado de la PC (checkpoints). Si hay bloqueo, el SO retrocede un proceso al estado de la última foto y se queda con su recurso temporalmente.</li>
        </ul>
      </div>

      <InfoCard type="tip" label="Tip de final">
        <p>En el RAG (Grafo de Asignación de Recursos): <strong>Ciclo = Deadlock... casi siempre.</strong> Si cada recurso tiene un <em>único ejemplar</em> (ej. una sola impresora), un círculo en el dibujo confirma un Deadlock al 100%. Pero si los recursos tienen <em>múltiples instancias</em>, un ciclo solo avisa que _podría_ haber uno, y ahí entran en juego las matrices tontas de detección.</p>
      </InfoCard>
    </Accordion>

    <!-- Tema 5: Evitación de Bloqueos -->
    <Accordion id="sd3u3-t5" title="Evitación de Bloqueos — Algoritmo del Banquero" :icon="Shield" number="Tema 5" color="amber">
      <InfoCard type="example" label="Ejemplo sencillo">
        <p>Imaginá que sos un <strong>banquero</strong> con $10 millones disponibles y tres clientes. Cada cliente te dice cuánto podría necesitar como máximo. Antes de prestarle más dinero a uno, hacés la cuenta: "Si le doy esto, ¿me alcanza para garantizar que al menos uno termine su proyecto, me devuelva la plata, y así pueda ir prestándole a los demás?" (estado seguro). Si la respuesta es sí, prestás. Si la respuesta es "podría quedarme sin plata para todos" (estado inseguro), no prestás, aunque tengas el dinero disponible.</p>
      </InfoCard>

      <InfoCard type="definition" label="Estado Seguro">
        <p>Un <strong>estado seguro</strong> es aquel en el que existe al menos una secuencia de ejecución que permite a todos los procesos obtener su demanda máxima sin bloquearse.</p>
      </InfoCard>

      <div class="section-block">
        <h4>Algoritmo del Banquero (Dijkstra)</h4>
        <ul class="list-styled">
          <li><strong>La simulación secreta:</strong> El SO hace cálculos matemáticos en papel antes de prestar nada.</li>
          <li>Solo entrega el recurso si comprueba que el nuevo estado sigue cayendo dentro de la "zona verde segura". Si no, el proceso entra en lista de espera.</li>
          <li><strong>El gran defecto:</strong> Requiere que cada programa declare de antemano el máximo número de recursos de cada tipo que va a usar en toda su vida. ¡Casi ningún programa real sabe eso al arrancar! Por eso casi no se usa fuera de la teoría.</li>
        </ul>
      </div>

      <InfoCard type="warning" label="Estado inseguro ≠ deadlock">
        <p>Un estado inseguro no significa que haya deadlock, sino que <strong>podría</strong> haberlo. Es una zona de riesgo que el algoritmo del banquero evita preventivamente.</p>
      </InfoCard>
    </Accordion>

    <!-- Tema 6: Prevención de Bloqueos -->
    <Accordion id="sd3u3-t6" title="Prevención de Bloqueos" :icon="ShieldCheck" number="Tema 6" color="amber">
      <InfoCard type="example" label="Ejemplo sencillo">
        <p>Si el deadlock es una enfermedad que necesita 4 síntomas simultáneos (las condiciones de Coffman), la prevención es como <strong>vacunarse contra uno de los síntomas</strong> para que la enfermedad nunca se manifieste. No importa cuál elimines — con que falte uno, el deadlock no puede ocurrir.</p>
      </InfoCard>

      <div class="section-block">
        <h4>Estrategias (Rompiendo las Condiciones de Coffman)</h4>
        <ul class="list-styled">
          <li><strong>1. Romper la Exclusión Mutua:</strong> Hacer que todo parezca compartible para todos, por ejemplo usando una recepcionista virtual (<em>spooler</em> para impresoras) que tome el pedido de todos sin bloquearlos.</li>
          <li><strong>2. Romper Retención y Espera (El codicioso total):</strong> Obligar al proceso a que pida la escoba, la pala y el balde <em>antes</em> de empezar. Si no le podemos dar las tres juntas, entonces no empieza. ("Todo o Nada").</li>
          <li><strong>3. Romper la No-Expropiación (El caballero que cede):</strong> Si un programa retiene cosas y pide algo que justo está ocupado ahora, el SO lo obliga a soltar todo lo que tenía, volverse a la cola y empezar de cero. Muy ineficiente.</li>
          <li><strong>4. Romper la Espera Circular (La regla alfabética):</strong> Etiquetamos los recursos con números. Si querés pedir un recurso, el número debe ser <strong>estrictamente mayor</strong> al último que pediste. Como siempre se avanza en una dirección ascendente, el temido círculo de espera se vuelve matemáticamente imposible.</li>
        </ul>
      </div>

      <ComparisonTable
        title="Resumen de Estrategias"
        :columns="['Estrategia', 'Condición atacada', 'Efecto práctico']"
        :rows="preventionRows"
      />
    </Accordion>

    <UnitQuiz
      unitId="sd3-3"
      title="Quiz — Unidad 3: Bloqueo Irreversible"
      :questions="quizQuestions"
    />
  </div>
</template>

<script setup>
import { computed, onMounted, reactive } from 'vue'
import Accordion from '../components/Accordion.vue'
import InfoCard from '../components/InfoCard.vue'
import ComparisonTable from '../components/ComparisonTable.vue'
import UnitQuiz from '../components/UnitQuiz.vue'
import { useStudyProgress } from '../composables/useStudyProgress'
import { Ban, Package, AlertTriangle, Search, Shield, ShieldCheck } from 'lucide-vue-next'

const props = defineProps({ searchQuery: { type: String, default: '' } })

const topicMeta = [
  { id: 'sd3u3-t1', anchor: 'sd3u3-t1', number: 'Tema 1', title: 'Concepto de Deadlock', keywords: ['deadlock', 'interbloqueo', 'bloqueo irreversible', 'espera permanente'], summary: ['Espera permanente entre procesos.', 'Cada uno retiene lo que otro necesita.', 'No se resuelve solo.'] },
  { id: 'sd3u3-t2', anchor: 'sd3u3-t2', number: 'Tema 2', title: 'Recursos Expropiables y No Expropiables', keywords: ['expropiable', 'no expropiable', 'preemptable', 'CPU', 'impresora', 'mutex'], summary: ['Expropiables: CPU, memoria.', 'No expropiables: impresora, mutex.', 'Deadlocks son por los no expropiables.'] },
  { id: 'sd3u3-t3', anchor: 'sd3u3-t3', number: 'Tema 3', title: 'Condiciones de Coffman', keywords: ['Coffman', 'exclusión mutua', 'retención y espera', 'espera circular', 'sin expropiación'], summary: ['4 condiciones simultáneas necesarias.', 'Si falta una, no hay deadlock.', 'Base de todas las estrategias.'] },
  { id: 'sd3u3-t4', anchor: 'sd3u3-t4', number: 'Tema 4', title: 'Detección y Recuperación', keywords: ['detección', 'RAG', 'grafo', 'ciclo', 'rollback', 'terminación', 'recuperación'], summary: ['Grafos con ciclo = deadlock.', 'Matrices para múltiples instancias.', 'Terminar, expropiar o retroceder.'] },
  { id: 'sd3u3-t5', anchor: 'sd3u3-t5', number: 'Tema 5', title: 'Evitación — Algoritmo del Banquero', keywords: ['banquero', 'estado seguro', 'estado inseguro', 'Dijkstra', 'evitación', 'avoidance'], summary: ['Simular antes de conceder.', 'Estado seguro: hay secuencia viable.', 'Requiere conocer demanda máxima.'] },
  { id: 'sd3u3-t6', anchor: 'sd3u3-t6', number: 'Tema 6', title: 'Prevención de Bloqueos', keywords: ['prevención', 'spooling', 'todo o nada', 'orden jerárquico', 'prevention'], summary: ['Eliminar 1 condición de Coffman.', 'Spooling, todo o nada, orden lineal.', 'Cada una tiene limitaciones prácticas.'] }
]

const { getTopicStatus, setTopicStatus, getSummary } = useStudyProgress('sd3-3')
const topicStatus = reactive({})
onMounted(() => { topicMeta.forEach((t) => { topicStatus[t.id] = getTopicStatus(t.id) }) })
const studySummary = computed(() => getSummary(topicMeta.map((t) => t.id)))

const searchResults = computed(() => {
  const term = props.searchQuery.trim().toLowerCase()
  if (!term) return []
  return topicMeta.map((topic) => {
    const match = topic.keywords.find((k) => k.toLowerCase().includes(term)) || (topic.title.toLowerCase().includes(term) && topic.title)
    if (!match) return null
    return { topicId: topic.id, anchor: topic.anchor, number: topic.number, title: topic.title, term: typeof match === 'string' ? match : term }
  }).filter(Boolean)
})

function setStatus(topicId, status) { topicStatus[topicId] = status; setTopicStatus(topicId, status) }
function goToTopic(anchor) { const el = document.getElementById(anchor); if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' }) }

const preventionRows = [
  { 'Estrategia': 'Spooling', 'Condición atacada': 'Exclusión Mutua', 'Efecto práctico': 'Recursos parecen compartibles (ej. cola de impresión)' },
  { 'Estrategia': 'Todo o nada', 'Condición atacada': 'Retención y Espera', 'Efecto práctico': 'Proceso pide todo al inicio o no arranca' },
  { 'Estrategia': 'Liberar y reintentar', 'Condición atacada': 'Sin Expropiación', 'Efecto práctico': 'Proceso libera recursos si no consigue más' },
  { 'Estrategia': 'Orden jerárquico', 'Condición atacada': 'Espera Circular', 'Efecto práctico': 'Recursos solo se piden en orden ascendente' }
]

const quizQuestions = [
  { id: 'sd3u3q1', topic: 'Tema 1', question: '¿Qué define a un bloqueo irreversible?', options: ['Un proceso lento', 'Procesos en espera permanente por recursos mutuamente retenidos', 'Un error de memoria', 'Un proceso sin CPU asignada'], correctIndex: 1 },
  { id: 'sd3u3q2', topic: 'Tema 2', question: '¿Por qué la impresora es un recurso no expropiable?', options: ['Porque es lenta', 'Porque retirarla a mitad de impresión causa inconsistencia', 'Porque es muy cara', 'Porque solo hay una'], correctIndex: 1 },
  { id: 'sd3u3q3', topic: 'Tema 3', question: '¿Cuál es la condición de "Hold and Wait"?', options: ['Un proceso espera sin tener nada', 'Un proceso retiene recursos mientras pide otros que están ocupados', 'Un proceso libera todo y espera', 'Los recursos se comparten libremente'], correctIndex: 1 },
  { id: 'sd3u3q4', topic: 'Tema 3', question: 'Si se elimina la espera circular, ¿puede ocurrir deadlock?', options: ['Sí, con las otras 3 condiciones', 'No, porque falta una condición necesaria', 'Solo si hay más de 4 procesos', 'Depende del hardware'], correctIndex: 1 },
  { id: 'sd3u3q5', topic: 'Tema 4', question: 'En un RAG con un solo ejemplar por recurso, ¿qué indica un ciclo?', options: ['Uso eficiente', 'Deadlock confirmado', 'Fragmentación de memoria', 'Proceso terminado'], correctIndex: 1 },
  { id: 'sd3u3q6', topic: 'Tema 4', question: '¿Qué es un rollback?', options: ['Reiniciar la computadora', 'Regresar un proceso a un estado seguro previo (checkpoint)', 'Eliminar todos los procesos', 'Agregar más memoria'], correctIndex: 1 },
  { id: 'sd3u3q7', topic: 'Tema 5', question: '¿Qué requiere el Algoritmo del Banquero como información previa?', options: ['El nombre de los procesos', 'Las necesidades máximas de cada proceso', 'La velocidad de la CPU', 'El tamaño del disco'], correctIndex: 1 },
  { id: 'sd3u3q8', topic: 'Tema 5', question: 'Un estado seguro garantiza que...', options: ['Nunca habrá procesos nuevos', 'Existe al menos una secuencia en la que todos los procesos pueden terminar', 'La CPU trabaja al 100%', 'No se usa memoria virtual'], correctIndex: 1 },
  { id: 'sd3u3q9', topic: 'Tema 6', question: '¿Cómo se invalida la exclusión mutua?', options: ['Eliminando recursos', 'Usando spooling para hacer que los recursos parezcan compartibles', 'Agregando más CPUs', 'Matando procesos'], correctIndex: 1 },
  { id: 'sd3u3q10', topic: 'Tema 6', question: 'La estrategia de orden jerárquico impone que los procesos...', options: ['Pidan todos los recursos de golpe', 'Solo pidan recursos en orden ascendente de numeración', 'Liberen todo antes de pedir', 'Compartan todos los recursos'], correctIndex: 1 }
]
</script>

<style scoped>
.unit-view { animation: fadeInUp 0.4s ease-out; }
.unit-header { margin-bottom: 32px; }
.unit-badge { margin-bottom: 12px; }
.unit-header h1 { margin-bottom: 8px; }
.unit-subtitle { color: var(--text-muted); font-size: 0.95rem; }
.study-toolbar { display: grid; grid-template-columns: 1fr; gap: 12px; margin-bottom: 18px; }
.study-progress-card, .search-results-card { border: 1px solid var(--border-color); border-radius: var(--radius-lg); background: var(--bg-card); padding: 14px; }
.card-head { display: flex; align-items: center; justify-content: space-between; margin-bottom: 10px; }
.status-grid { display: grid; gap: 8px; }
.status-row { border: 1px solid var(--border-color); border-radius: var(--radius-sm); padding: 8px; display: flex; align-items: center; justify-content: space-between; gap: 10px; }
.status-row p { margin: 0; font-size: 0.8rem; }
.status-actions { display: flex; gap: 6px; }
.status-btn { border: 1px solid var(--border-color); background: var(--bg-tertiary); color: var(--text-secondary); border-radius: 6px; font-size: 0.72rem; padding: 5px 8px; cursor: pointer; }
.status-btn.active { color: var(--accent-amber); border-color: var(--accent-amber); background: var(--accent-amber-soft); }
.search-results-list { display: grid; gap: 8px; margin-top: 10px; }
.search-result-item { border: 1px solid var(--border-color); background: var(--bg-tertiary); border-radius: var(--radius-sm); padding: 10px; text-align: left; cursor: pointer; display: flex; flex-direction: column; gap: 2px; }
.search-result-item span { color: var(--text-secondary); font-size: 0.8rem; }
@keyframes fadeInUp { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }
</style>
