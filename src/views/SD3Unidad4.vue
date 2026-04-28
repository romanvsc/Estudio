<template>
  <div class="unit-view">
    <div class="unit-header">
      <span class="unit-badge badge badge-purple">Unidad 4</span>
      <h1>Administración de Memoria</h1>
      <p class="unit-subtitle">Monoprogramación, particiones, swapping, memoria virtual y segmentación paginada</p>
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
      <h3>Resultados en Unidad 4 ({{ searchResults.length }})</h3>
      <div class="search-results-list">
        <button v-for="result in searchResults" :key="`${result.topicId}-${result.term}`" class="search-result-item" @click="goToTopic(result.anchor)">
          <strong>{{ result.number }} · {{ result.title }}</strong>
          <span>Coincide con: {{ result.term }}</span>
        </button>
      </div>
    </div>

    <!-- Tema 1: Monoprogramación -->
    <Accordion id="sd3u4-t1" title="Monoprogramación sin Intercambio ni Paginación" :icon="Monitor" number="Tema 1" color="purple" :defaultOpen="true">
      <InfoCard type="definition" label="Definición">
        <p>Es el esquema más sencillo: <strong>solo un programa tiene el control total del procesador y la memoria</strong> en un instante dado. La memoria se divide en dos: una parte para el SO (núcleo) y otra para el único proceso de usuario.</p>
      </InfoCard>

      <InfoCard type="example" label="Ejemplo sencillo">
        <p>Imaginá una <strong>cocina con un solo hornillo</strong>. Solo podés cocinar un plato a la vez (un proceso). Mientras esperás que hierva el agua (operación de E/S), no podés usar la hornalla para otra cosa — se desperdicia tiempo (la CPU queda ociosa). Es ineficiente, pero muy simple de controlar: siempre sabés exactamente qué se está cocinando.</p>
      </InfoCard>

      <div class="section-block">
        <h4>Limitaciones</h4>
        <ul class="list-styled">
          <li><strong>CPU de vacaciones:</strong> El procesador queda ocioso (sin hacer nada) durante las largas operaciones de E/S.</li>
          <li><strong>Desperdicio de espacio:</strong> La memoria se infrautiliza si el programa es pequeño (todo el espacio sobrante queda bloqueado sin uso).</li>
          <li><strong>Ubicación del SO:</strong> Puede estar en RAM baja, en ROM alta, o en configuración híbrida (dependiendo de la máquina antigua).</li>
        </ul>
      </div>
    </Accordion>

    <!-- Tema 2: Multiprogramación con Particiones -->
    <Accordion id="sd3u4-t2" title="Multiprogramación con Particiones" :icon="LayoutGrid" number="Tema 2" color="purple">
      <InfoCard type="example" label="Ejemplo sencillo">
        <p>Imaginá un <strong>estacionamiento</strong>. Las <strong>particiones fijas</strong> son como plazas de tamaño predeterminado: si estacionás un auto chico en una plaza grande, el espacio sobrante se pierde (fragmentación interna). Las <strong>particiones variables</strong> son como un terreno libre donde cada auto ocupa solo el espacio justo, pero después de que algunos se van, quedan huecos dispersos que ningún auto grande puede usar (fragmentación externa). La <strong>compactación</strong> es como mover todos los autos hacia un extremo para juntar los huecos en uno solo.</p>
      </InfoCard>

      <div class="section-block">
        <h4>Particiones Fijas (Estáticas)</h4>
        <ul class="list-styled">
          <li><strong>Memoria rígida:</strong> La memoria se divide en regiones <strong>antes de la ejecución</strong>. Pueden ser de igual o distinto tamaño.</li>
          <li><strong>El problema de la ropa grande (Fragmentación interna):</strong> El proceso ocupa una partición (talle L) pero solo necesita un poco (talle S). El espacio sobrante dentro de la partición se desperdicia.</li>
        </ul>
      </div>

      <div class="section-block">
        <h4>Particiones Variables (Dinámicas)</h4>
        <ul class="list-styled">
          <li><strong>Memoria a medida:</strong> Se asigna a cada proceso <strong>exactamente la cantidad de memoria</strong> que solicita.</li>
          <li><strong>El problema de los huecos (Fragmentación externa):</strong> Elimina la fragmentación interna pero deja huecos libres pequeños y dispersos entre procesos. Ningún proceso nuevo grande cabe en ellos por separado.</li>
        </ul>
      </div>

      <div class="section-block">
        <h4>Compactación</h4>
        <ul class="list-styled">
          <li><strong>El "Tetris" de la memoria:</strong> Solución a la fragmentación externa. Desplaza los procesos en ejecución hacia un extremo de la RAM para <strong>agrupar los huecos libres</strong> en un solo bloque grande.</li>
          <li><strong>Costo alto:</strong> Es muy costosa en tiempo de CPU porque requiere copiar y mover físicamente muchos datos en la memoria.</li>
        </ul>
      </div>

      <InfoCard type="important" label="Pregunta de Final">
        <p><strong>¿Cuál es la diferencia entre Fragmentación Interna y Externa?</strong><br>
        La <strong>Interna</strong> es el espacio perdido <em>adentro</em> de una partición (pasa en Fijadas o Paginación).<br>
        La <strong>Externa</strong> es el espacio libre <em>afuera</em> de los procesos, pero tan dividido en pedacitos (huecos) que no sirve para cargar un proceso grande (pasa en Variables o Segmentación).</p>
      </InfoCard>

      <ComparisonTable
        title="Particiones Fijas vs Variables"
        :columns="['Aspecto', 'Fijas', 'Variables']"
        :rows="partitionRows"
      />
    </Accordion>

    <!-- Tema 3: Intercambio (Swapping) -->
    <Accordion id="sd3u4-t3" title="Intercambio (Swapping)" :icon="ArrowLeftRight" number="Tema 3" color="purple">
      <InfoCard type="example" label="Ejemplo sencillo">
        <p>Imaginá que tu escritorio (RAM) es chico y tenés muchos cuadernos (procesos). Cuando necesitás uno que no cabe, guardás un cuaderno que no estás usando en el cajón (área de swap en disco) — eso es un <strong>swap-out</strong>. Cuando lo necesitás de nuevo, lo sacás del cajón y volvés a ponerlo en el escritorio — eso es un <strong>swap-in</strong>. Es práctico, pero ir al cajón lleva mucho más tiempo que simplemente tomar del escritorio (acceso a disco vs. acceso a RAM).</p>
      </InfoCard>

      <InfoCard type="definition" label="Concepto">
        <p>El <strong>intercambio (swapping)</strong> es una técnica para situaciones de sobrecarga de memoria donde la demanda de los procesos supera la RAM disponible. Consiste en mover procesos completos entre la memoria principal y un área de almacenamiento secundario (disco).</p>
      </InfoCard>

      <div class="section-block">
        <h4>Ciclo de operación</h4>
        <ul class="list-styled">
          <li><strong>Swap-out (Al cajón):</strong> Trasladar un proceso al disco para liberar espacio. El SO elige al candidato que está <strong>bloqueado</strong> (esperando algo) o al de <strong>menor prioridad</strong>.</li>
          <li><strong>Swap-in (Al escritorio):</strong> Traer un proceso del disco a la RAM cuando le toca ejecutar.</li>
          <li><strong>El Cuello de Botella:</strong> El acceso al disco mecánico/SSD es muchísimo más lento que la RAM, lo que genera alta latencia y hace que su uso intensivo frene la computadora.</li>
        </ul>
      </div>
    </Accordion>

    <!-- Tema 4: Memoria Virtual -->
    <Accordion id="sd3u4-t4" title="Memoria Virtual" :icon="Eye" number="Tema 4" color="purple">
      <InfoCard type="example" label="Ejemplo sencillo">
        <p>Imaginá que estás leyendo un <strong>libro de 500 páginas</strong>, pero tu atril (RAM) solo cabe 50 páginas. No necesitás tener todo el libro abierto — solo mantenés las páginas que estás leyendo ahora (páginas en RAM) y el resto queda en la estantería (disco). Si necesitás una página que no está en el atril, buscás en la estantería y la traés (fallo de página). Si el atril está lleno, primero guardás una página que ya no estás usando (algoritmo de reemplazo). El <strong>índice del libro</strong> te dice dónde está cada página — eso es la <strong>tabla de páginas</strong>.</p>
      </InfoCard>

      <InfoCard type="definition" label="Concepto">
        <p>La <strong>memoria virtual</strong> permite que un programa tenga un espacio de direcciones mucho mayor que la RAM física disponible. Solo las partes que se usan activamente residen en RAM; el resto permanece en disco.</p>
      </InfoCard>

      <div class="section-block">
        <h4>MMU — Unidad de Gestión de Memoria</h4>
        <ul class="list-styled">
          <li><strong>Direcciones lógicas (virtuales):</strong> Generadas por la CPU durante la ejecución.</li>
          <li><strong>Direcciones físicas:</strong> Ubicaciones reales en los chips de RAM.</li>
          <li>La <strong>MMU</strong> traduce de lógica a física, usando una tabla de páginas.</li>
        </ul>
      </div>

      <div class="section-block">
        <h4>Técnicas de Implementación</h4>
        <ul class="list-styled">
          <li><strong>Paginación:</strong> Divide el espacio lógico en <strong>páginas</strong> de tamaño fijo y la RAM en <strong>marcos (frames)</strong> del mismo tamaño. Una <strong>tabla de páginas</strong> mapea cada página a su marco.</li>
          <li><strong>Segmentación:</strong> Divide la memoria según la estructura lógica del programa (código, datos, pila) en <strong>segmentos de longitud variable</strong>.</li>
          <li><strong>Segmentación Paginada:</strong> Combina ambas: segmentos lógicos subdivididos en páginas de tamaño fijo.</li>
        </ul>
      </div>

      <div class="section-block">
        <h4>Fallo de Página (Page Fault)</h4>
        <ul class="list-styled">
          <li><strong>El aviso de "no lo tengo":</strong> Ocurre cuando la CPU intenta acceder a una página que <strong>no está cargada en RAM</strong> (se quedó en el disco).</li>
          <li>El SO debe ir al disco (swap), buscar la página, y cargarla en un marco libre de RAM. Si la RAM está llena, usa un <strong>algoritmo de reemplazo</strong> para echar a alguien:
            <ul class="list-styled" style="margin-top: 6px">
              <li><strong>FIFO (El primero que llegó, se va):</strong> Desaloja la página más vieja. Fácil de programar, pero tonto: puede echar una página que se usa muchísimo solo por ser vieja (Anomalía de Bélády).</li>
              <li><strong>LRU (El más olvidado, se va):</strong> Desaloja la página que hace más tiempo no se lee. Es el mejor matemáticamente, pero muy difícil y costoso de programar exactamente.</li>
              <li><strong>Algoritmo del Reloj / Segunda Oportunidad (El intermedio inteligente):</strong> Usa un bit (la "estrellita de uso"). Si la página se usó hace poco, tiene la estrellita (R=1). El SO recorre las páginas: si tiene estrellita, se la saca (R=0) y le da una segunda oportunidad. Si no la tiene, ¡la reemplaza!</li>
            </ul>
          </li>
          <li>El <strong>TLB (El atajo):</strong> Una caché súper rápida dentro de la CPU que guarda las traducciones recientes de páginas. Así zafamos de ir a leer la tabla lenta en RAM a cada rato.</li>
        </ul>
      </div>

      <div class="section-block">
        <h4>Beneficios de la Memoria Virtual</h4>
        <ul class="list-styled">
          <li><strong>Independencia de la capacidad física:</strong> Un programa de 16 MB puede ejecutarse en una máquina con solo 4 MB de RAM, seleccionando las partes activas en cada instante.</li>
          <li><strong>Protección entre procesos:</strong> Cada proceso tiene su propio espacio de direcciones virtual — un programa no puede acceder a la memoria de otro.</li>
          <li><strong>Bibliotecas compartidas:</strong> Varias aplicaciones pueden compartir una misma copia en memoria de una biblioteca (ej. libc), ahorrando espacio.</li>
        </ul>
      </div>

      <div class="section-block">
        <h4>Riesgos: Hiperpaginación (Thrashing)</h4>
        <ul class="list-styled">
          <li><strong>El colapso del sistema:</strong> Ocurre cuando un proceso tiene tan poca RAM asignada que se la pasa 100% del tiempo traiendo y sacando páginas del disco, en lugar de ejecutar matemáticas útiles en la CPU.</li>
          <li><strong>Síntoma crítico:</strong> La CPU marca casi 0% de uso, pero el disco duro (HDD/SSD) marca 100% de lectura/escritura constante y toda la PC se congela (pantalla frizada).</li>
        </ul>
      </div>

      <ComparisonTable
        title="Paginación vs Segmentación"
        :columns="['Aspecto', 'Paginación', 'Segmentación']"
        :rows="pagSegRows"
      />
    </Accordion>

    <!-- Tema 5: Segmentación Paginada -->
    <Accordion id="sd3u4-t5" title="Segmentación Paginada (Sistema Combinado)" :icon="Layers" number="Tema 5" color="purple">
      <InfoCard type="example" label="Ejemplo sencillo">
        <p>Imaginá una <strong>biblioteca</strong>. Los libros están organizados por materia en <strong>secciones</strong> (segmentos: código, datos, pila). Dentro de cada sección, los libros se guardan en <strong>estantes de tamaño uniforme</strong> (páginas fijas). Esto da lo mejor de ambos mundos: organización lógica por materia (segmentación) y almacenamiento físico eficiente en estantes iguales que no dejan huecos (paginación — sin fragmentación externa).</p>
      </InfoCard>

      <div class="section-block">
        <h4>Cómo funciona la Segmentación Paginada</h4>
        <ul class="list-styled">
          <li><strong>El mejor de ambos mundos:</strong> El programa se divide lógicamente en segmentos (ej. Segmento de Código, de Datos), y a su vez, <em>esos segmentos</em> se cortan físicamente adentro en Páginas iguales.</li>
          <li>Adiós al problema de la segmentación pura: <strong>elimina la fragmentación externa</strong> porque al final todo se almacena en páginas/marcos del mismo tamaño.</li>
          <li>Mantiene la ventaja de la segmentación pura: <strong>protección exacta</strong> (puedes poner el segmento de código como Solo Lectura, sin importar cuántas páginas ocupe).</li>
        </ul>
      </div>

      <InfoCard type="tip" label="¿Por qué me importa?">
        <p>No es solo teoría: <strong>así funciona tu PC y tu celular hoy.</strong> Todos los procesadores modernos (x86 de Intel/AMD y los ARM de Apple/Android) usan hardware diseñado específicamente para correr Memoria Virtual con Segmentación Paginada (usualmente páginas de 4KB).</p>
      </InfoCard>
    </Accordion>

    <UnitQuiz
      unitId="sd3-4"
      title="Quiz — Unidad 4: Administración de Memoria"
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
import { Monitor, LayoutGrid, ArrowLeftRight, Eye, Layers } from 'lucide-vue-next'

const props = defineProps({ searchQuery: { type: String, default: '' } })

const topicMeta = [
  { id: 'sd3u4-t1', anchor: 'sd3u4-t1', number: 'Tema 1', title: 'Monoprogramación', keywords: ['monoprogramación', 'un solo programa', 'CPU ociosa'], summary: ['Un solo proceso en memoria.', 'CPU ociosa durante E/S.', 'Esquema más simple posible.'] },
  { id: 'sd3u4-t2', anchor: 'sd3u4-t2', number: 'Tema 2', title: 'Particiones Fijas y Variables', keywords: ['particiones fijas', 'particiones variables', 'fragmentación interna', 'fragmentación externa', 'compactación'], summary: ['Fijas: fragmentación interna.', 'Variables: fragmentación externa.', 'Compactación agrupa huecos libres.'] },
  { id: 'sd3u4-t3', anchor: 'sd3u4-t3', number: 'Tema 3', title: 'Intercambio (Swapping)', keywords: ['swap', 'swap-in', 'swap-out', 'intercambio', 'disco'], summary: ['Mueve procesos completos a disco.', 'Swap-out: RAM → disco.', 'Alto costo por latencia de disco.'] },
  { id: 'sd3u4-t4', anchor: 'sd3u4-t4', number: 'Tema 4', title: 'Memoria Virtual', keywords: ['memoria virtual', 'paginación', 'segmentación', 'MMU', 'TLB', 'fallo de página', 'thrashing', 'LRU', 'FIFO'], summary: ['Espacio lógico > RAM física.', 'Paginación: páginas fijas en marcos.', 'Thrashing: degradación extrema.'] },
  { id: 'sd3u4-t5', anchor: 'sd3u4-t5', number: 'Tema 5', title: 'Segmentación Paginada', keywords: ['segmentación paginada', 'x86', 'combinado'], summary: ['Segmentos lógicos + páginas fijas.', 'Elimina fragmentación externa.', 'Usado en procesadores x86.'] }
]

const { getTopicStatus, setTopicStatus, getSummary } = useStudyProgress('sd3-4')
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

const partitionRows = [
  { 'Aspecto': 'Tamaño', 'Fijas': 'Predefinido antes de ejecutar', 'Variables': 'Exacto según necesidad del proceso' },
  { 'Aspecto': 'Fragmentación', 'Fijas': 'Interna (espacio desaprovechado)', 'Variables': 'Externa (huecos dispersos)' },
  { 'Aspecto': 'Solución', 'Fijas': 'Elegir particiones de tamaño adecuado', 'Variables': 'Compactación (mover procesos)' },
  { 'Aspecto': 'Complejidad', 'Fijas': 'Simple de implementar', 'Variables': 'Más compleja (asignación dinámica)' }
]

const pagSegRows = [
  { 'Aspecto': 'Unidad de división', 'Paginación': 'Páginas de tamaño fijo', 'Segmentación': 'Segmentos de tamaño variable' },
  { 'Aspecto': 'Visión', 'Paginación': 'Física (transparente al programador)', 'Segmentación': 'Lógica (código, datos, pila)' },
  { 'Aspecto': 'Fragmentación', 'Paginación': 'Solo interna (última página)', 'Segmentación': 'Solo externa (segmentos variables)' },
  { 'Aspecto': 'Tabla', 'Paginación': 'Tabla de páginas', 'Segmentación': 'Tabla de segmentos' }
]

const quizQuestions = [
  { id: 'sd3u4q1', topic: 'Tema 1', question: 'En monoprogramación, ¿cuántos procesos pueden estar en memoria a la vez?', options: ['Varios', 'Solo uno', 'Depende de la RAM', 'Tres'], correctIndex: 1 },
  { id: 'sd3u4q2', topic: 'Tema 2', question: '¿Qué tipo de fragmentación generan las particiones variables?', options: ['Interna', 'Externa', 'Ninguna', 'Tanto interna como externa'], correctIndex: 1 },
  { id: 'sd3u4q3', topic: 'Tema 2', question: '¿Qué hace la compactación?', options: ['Elimina procesos', 'Mueve procesos para agrupar huecos libres en un solo bloque', 'Divide la memoria en particiones fijas', 'Aumenta la RAM'], correctIndex: 1 },
  { id: 'sd3u4q4', topic: 'Tema 3', question: '¿Por qué el swapping tiene alto costo?', options: ['Usa mucha CPU', 'El acceso a disco es mucho más lento que a RAM', 'Necesita más memoria', 'Los procesos se corrompen'], correctIndex: 1 },
  { id: 'sd3u4q5', topic: 'Tema 4', question: '¿Qué traduce la MMU?', options: ['Código fuente a binario', 'Direcciones lógicas a físicas', 'Español a inglés', 'Disco a RAM'], correctIndex: 1 },
  { id: 'sd3u4q6', topic: 'Tema 4', question: '¿Qué ocurre en un fallo de página?', options: ['El programa se cierra', 'La página se busca en disco y se carga a RAM', 'Se reinicia la CPU', 'Se elimina el proceso'], correctIndex: 1 },
  { id: 'sd3u4q7', topic: 'Tema 4', question: '¿Qué algoritmo de reemplazo usa un bit de referencia y da una "segunda oportunidad" a las páginas?', options: ['FIFO', 'LRU', 'Algoritmo del Reloj (Clock)', 'TLB'], correctIndex: 2 },
  { id: 'sd3u4q8', topic: 'Tema 4', question: 'El thrashing se produce cuando...', options: ['Hay mucha RAM disponible', 'El sistema pasa más tiempo intercambiando páginas que ejecutando', 'Se usan particiones fijas', 'El swap está desactivado'], correctIndex: 1 },
  { id: 'sd3u4q9', topic: 'Tema 5', question: '¿Qué elimina la segmentación paginada?', options: ['La necesidad de RAM', 'La fragmentación externa', 'La tabla de páginas', 'Los segmentos'], correctIndex: 1 },
  { id: 'sd3u4q10', topic: 'Tema 4', question: '¿Para qué sirve el TLB?', options: ['Reemplazar páginas', 'Cachear traducciones de páginas para acelerar accesos', 'Almacenar archivos', 'Gestionar procesos'], correctIndex: 1 }
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
.status-btn.active { color: var(--accent-purple); border-color: var(--accent-purple); background: var(--accent-purple-soft); }
.search-results-list { display: grid; gap: 8px; margin-top: 10px; }
.search-result-item { border: 1px solid var(--border-color); background: var(--bg-tertiary); border-radius: var(--radius-sm); padding: 10px; text-align: left; cursor: pointer; display: flex; flex-direction: column; gap: 2px; }
.search-result-item span { color: var(--text-secondary); font-size: 0.8rem; }
@keyframes fadeInUp { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }
</style>
