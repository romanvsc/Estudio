<template>
  <div class="unit-view">
    <div class="unit-header">
      <span class="unit-badge badge badge-teal">Unidad 2</span>
      <h1>Procesos</h1>
      <p class="unit-subtitle">Anatomía, ciclo de vida, sincronización, IPC y problemas clásicos</p>
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

      <div class="summary-card">
        <h3>Resumen de 1 minuto</h3>
        <div class="summary-grid">
          <div v-for="topic in topicMeta" :key="`${topic.id}-summary`" class="summary-item">
            <strong>{{ topic.number }} · {{ topic.title }}</strong>
            <ul>
              <li v-for="point in topic.summary" :key="point">{{ point }}</li>
            </ul>
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

    <StudyFlashcards :cards="flashcards" />

    <div class="mini-quiz-grid">
      <TopicQuickQuiz v-for="quiz in topicQuickChecks" :key="quiz.topicId" :title="quiz.title" :topicId="quiz.topicId" :question="quiz.question" :options="quiz.options" :correctIndex="quiz.correctIndex" @answered="handleQuickCheck" />
    </div>

    <!-- Tema 1: Anatomía de un Proceso -->
    <Accordion id="sd3u2-t1" title="Anatomía Detallada de un Proceso" :icon="Cpu" number="Tema 1" color="teal" :defaultOpen="true">
      <InfoCard type="definition" label="Definición">
        <p>Un <strong>proceso</strong> no es solo un programa en ejecución, sino una entidad dinámica y activa gestionada por el núcleo. El SO abstrae el procesador físico en múltiples <strong>procesadores virtuales</strong>, permitiendo que varios programas se ejecuten "simultáneamente".</p>
      </InfoCard>

      <InfoCard type="example" label="Ejemplo sencillo">
        <p>Pensá en una <strong>receta de cocina</strong>. La receta escrita en el libro es el <strong>programa</strong> (instrucciones estáticas guardadas en disco). Cuando empezás a cocinar siguiendo esa receta, eso es un <strong>proceso</strong> (el programa en ejecución). Tu mesa de trabajo tiene zonas separadas: una con el libro abierto en la página actual (zona de texto/código), los ingredientes preparados (zona de datos), los que vas cortando sobre la marcha (heap/montículo — memoria dinámica) y la pila de platos que vas apilando y sacando (stack/pila — variables locales). Cada zona está separada para que no se mezclen los ingredientes con los platos sucios (aislamiento de memoria).</p>
      </InfoCard>

      <div class="section-block">
        <h4>Organización de la Memoria de un Proceso</h4>
        <ul class="list-styled">
          <li><strong>Texto (El manual blindado):</strong> Instrucciones binarias del programa. Son de solo lectura para evitar que un bug sobreescriba el propio código y lo rompa.</li>
          <li><strong>Datos y BSS (Las variables estáticas):</strong> <em>Datos</em> guarda variables globales que ya tienen un valor inicial (ej. <code>vidas=3</code>). <em>BSS</em> guarda las que arrancan vacías y el sistema rellena con ceros por seguridad.</li>
          <li><strong>Heap/Montículo (El terreno baldío):</strong> Crece hacia arriba. Se usa cuando el programa necesita pedir memoria "sobre la marcha" y no sabía cuánta iba a usar antes de arrancar (memoria dinámica, ej. <code>malloc</code> en C o la palabra <code>new</code> en Java/JS).</li>
          <li><strong>Stack/Pila (La bandeja de entrada):</strong> Crece hacia abajo. Gestiona mágicamente todas las variables locales de tus funciones cortitas. Funciona LIFO (último en entrar, primero en salir), por eso una función sabe volver exacto a donde fue llamada.</li>
        </ul>
      </div>

      <InfoCard type="important" label="Aislamiento">
        <p>Este diseño asegura que un error en una aplicación no afecte a otras ni al núcleo del sistema. Cada proceso tiene su propio espacio de direcciones protegido.</p>
      </InfoCard>
    </Accordion>

    <!-- Tema 2: PCB y Cambio de Contexto -->
    <Accordion id="sd3u2-t2" title="PCB y Cambio de Contexto" :icon="FileText" number="Tema 2" color="teal">
      <InfoCard type="example" label="Ejemplo sencillo">
        <p>Imaginá que sos un <strong>profesor particular</strong> que da clases a tres alumnos por turno. Cuando cambiás de alumno, anotás en una ficha (PCB — Bloque de Control de Proceso) exactamente dónde quedó cada uno: "Juan iba por el ejercicio 5, tema fracciones, con la calculadora prestada". Cuando le toca de nuevo, leés la ficha y retomás exactamente donde lo dejaste. Esa acción de guardar la ficha del alumno saliente y cargar la del entrante es el <strong>cambio de contexto</strong>.</p>
      </InfoCard>

      <InfoCard type="definition" label="PCB (Bloque de Control de Proceso)">
        <p>Es la estructura de datos que contiene toda la información necesaria para que el SO pueda pausar y reanudar un proceso. Es el repositorio central de la multiprogramación.</p>
      </InfoCard>

      <div class="section-block">
        <h4>Contenido del PCB (El Documento de Identidad del Proceso)</h4>
        <ul class="list-styled">
          <li><strong>PID (El DNI):</strong> Identificador único del proceso (un número entero). El sistema lo usa para referirse a él (ej. matar el proceso 4021).</li>
          <li><strong>Contador de Programa / PC (El marcapáginas):</strong> Guarda la dirección exacta de la <em>siguiente</em> instrucción de código que la CPU tiene que ejecutar cuando este proceso vuelva a correr.</li>
          <li><strong>Registros (La memoria a corto plazo de la CPU):</strong> Valores actuales de las cuentas matemáticas que estaba haciendo el procesador justo antes de pausarlo.</li>
          <li><strong>Estado del proceso:</strong> Nuevo, Listo, Ejecutando, Bloqueado o Finalizado.</li>
          <li><strong>Estado de E/S (El inventario de mochilas):</strong> Lista de todos los archivos y periféricos que el proceso pidió prestados y todavía no devolvió.</li>
        </ul>
      </div>

      <InfoCard type="warning" label="Costo del cambio de contexto">
        <p>El cambio de contexto consume tiempo de CPU sin producir trabajo útil. A más cambios de contexto, mayor sobrecarga administrativa (overhead) del sistema.</p>
      </InfoCard>
    </Accordion>

    <!-- Tema 3: Ciclo de vida y Jerarquías -->
    <Accordion id="sd3u2-t3" title="Ciclo de Vida y Jerarquías de Procesos" :icon="GitBranch" number="Tema 3" color="teal">
      <InfoCard type="example" label="Ejemplo sencillo">
        <p>Pensá en un <strong>trabajador en una fábrica</strong>. Cuando es contratado, está en estado <strong>Nuevo</strong>. Cuando ya tiene su uniforme y espera que lo llamen al puesto de trabajo, está <strong>Listo</strong>. Cuando está operando una máquina, está <strong>Ejecutando</strong>. Si necesita esperar a que llegue materia prima de un proveedor, queda <strong>Bloqueado</strong> (esperando un evento de E/S). Y cuando termina su jornada y cierra todo, está <strong>Finalizado</strong>.</p>
      </InfoCard>

      <div class="section-block">
        <h4>Los 5 Estados de un Proceso</h4>
        <ul class="list-styled">
          <li><strong>Nuevo (Naciendo):</strong> Se está creando el proceso, reservando memoria inicial y armando su PCB. Todavía no puede competir por la CPU.</li>
          <li><strong>Listo / Ready (En la sala de espera):</strong> El proceso tiene TODO lo que necesita para correr... excepto el procesador. Forma fila en la "Cola de Listos".</li>
          <li><strong>Ejecutando / Running (En el escenario):</strong> El afortunado proceso que las instrucciones de la CPU están operando <em>ahora mismo</em>.</li>
          <li><strong>Bloqueado / Waiting (Congelado por un motivo):</strong> El proceso decidió parar solito porque necesita algo súper lento (leer de disco duro, esperar respuesta de red). Lo sacan volando del procesador para no perder el tiempo.</li>
          <li><strong>Finalizado / Terminated (Muerto o casi):</strong> Terminó su código o el SO lo mató por mandarse una infracción de memoria (Segmentation Fault).</li>
        </ul>
      </div>

      <div class="section-block">
        <h4>Jerarquía de Procesos (UNIX)</h4>
        <ul class="list-styled">
          <li>La creación es jerárquica mediante la llamada <code>fork()</code>, que crea una copia idéntica del proceso padre.</li>
          <li><strong>Proceso Raíz (Init):</strong> Ancestro de todos los procesos del sistema.</li>
          <li><strong>Proceso Huérfano:</strong> Su padre finalizó antes que él; es adoptado por <em>init</em>.</li>
          <li><strong>Proceso Zombie:</strong> Ha terminado pero sigue en la tabla de procesos hasta que el padre lea su estado de salida.</li>
        </ul>
      </div>

      <InfoCard type="example" label="Ejemplo de jerarquía">
        <p>Imaginá una <strong>empresa familiar</strong>. El abuelo fundador es el proceso <strong>init</strong> (proceso raíz). Tiene hijos (procesos hijos creados con fork). Si un padre muere antes que su hijo, el abuelo (init) adopta al nieto — es un <strong>proceso huérfano</strong>. Si un hijo muere pero nadie verifica su acta de defunción (el padre no lee su estado), queda como un fantasma en el registro civil — es un <strong>proceso zombie</strong>.</p>
      </InfoCard>
    </Accordion>

    <!-- Tema 4: Sincronización y Comunicación IPC -->
    <Accordion id="sd3u2-t4" title="Sincronización y Comunicación entre Procesos (IPC)" :icon="Lock" number="Tema 4" color="teal">
      <InfoCard type="example" label="Ejemplo sencillo">
        <p>Imaginá un <strong>baño público con una sola cabina</strong>. Si dos personas intentan entrar al mismo tiempo, hay un problema (condición de competencia). La solución es poner una cerradura: cuando alguien entra, pone el pestillo (exclusión mutua) y nadie más puede entrar hasta que salga. La cabina es la <strong>región crítica</strong> (código que accede a un recurso compartido) y el pestillo es el mecanismo de sincronización.</p>
      </InfoCard>

      <InfoCard type="definition" label="Condición de competencia">
        <p>Situación donde el resultado de la ejecución depende del <strong>orden</strong> en que se ejecutan los procesos, causando inconsistencias cuando acceden a datos compartidos sin coordinación.</p>
      </InfoCard>

      <div class="section-block">
        <h4>Requisitos para una Exclusión Mutua Efectiva (Las Reglas del Baño)</h4>
        <ul class="list-styled">
          <li><strong>1. "Solo uno":</strong> Nunca dos procesos pueden estar en su región crítica (adentro del baño) al mismo tiempo.</li>
          <li><strong>2. "Sin favoritismos de PC":</strong> No importa si un proceso corre en un procesador súper rápido y el otro en uno hiper lento; la cerradura tiene que funcionar igual.</li>
          <li><strong>3. "No estorbes desde afuera":</strong> Si un proceso está afuera del baño haciendo sus cosas normales, no tiene derecho a trabarle la puerta a otro que sí quiere entrar.</li>
          <li><strong>4. "Sin muertes de hambre (Inanición)":</strong> Si varios procesos quieren entrar, todos tienen que tener al menos una oportunidad eventual en algún momento. Prohibido monopolizar.</li>
        </ul>
      </div>

      <div class="section-block">
        <h4>Mecanismos de Sincronización</h4>
        <ul class="list-styled">
          <li><strong>TSL (Test and Set Lock):</strong> Instrucción atómica de hardware que lee y modifica una variable en una sola operación. Problema: implica <strong>espera activa</strong> (busy waiting — la CPU gasta ciclos verificando si puede entrar).</li>
          <li><strong>Semáforos (Dijkstra):</strong> Variables con dos operaciones — <strong>Down</strong> (decrementa; si llega a 0, bloquea) y <strong>Up</strong> (incrementa; si había bloqueados, despierta uno). Pueden ser <strong>binarios</strong> (mutex, valor 0 o 1) o <strong>generales</strong> (contadores de N recursos).</li>
          <li><strong>Monitores:</strong> Estructuras de alto nivel donde la exclusión mutua es <strong>automática</strong>. Usan <strong>variables de condición</strong> con operaciones <em>wait</em>/<em>signal</em>. Existen dos semánticas:
            <ul class="list-styled" style="margin-top: 6px">
              <li><strong>Hoare:</strong> Cuando un proceso hace <em>signal</em>, se suspende inmediatamente y cede la CPU al proceso despertado. Garantía fuerte: la condición sigue siendo verdadera cuando el despertado retoma.</li>
              <li><strong>Mesa:</strong> El proceso que hace <em>signal</em> continúa ejecutando; el despertado vuelve a la cola de listos y debe revalidar la condición con un <code>while</code> (no <code>if</code>) al despertar. Es la semántica que usan Java y la mayoría de los lenguajes modernos.</li>
            </ul>
          </li>
        </ul>
      </div>

      <InfoCard type="example" label="Ejemplo de Semáforo">
        <p>Un <strong>estacionamiento con 5 plazas</strong> funciona como un semáforo general con valor inicial 5. Cada auto que entra hace <strong>Down</strong> (resta 1). Cuando el semáforo llega a 0, no hay plazas y el siguiente auto queda bloqueado esperando. Cuando un auto sale, hace <strong>Up</strong> (suma 1) y el auto en espera puede entrar.</p>
      </InfoCard>
    </Accordion>

    <!-- Tema 5: Problemas Clásicos -->
    <Accordion id="sd3u2-t5" title="Problemas Clásicos de Sincronización" :icon="Puzzle" number="Tema 5" color="teal">
      <InfoCard type="example" label="Ejemplo general">
        <p>Los problemas clásicos son como <strong>acertijos de lógica</strong> que representan situaciones reales de coordinación. Cada uno pone de manifiesto un riesgo distinto de la programación concurrente.</p>
      </InfoCard>

      <div class="section-block">
        <h4>1. La Cena de los Filósofos</h4>
        <p>Cinco filósofos sentados en una mesa circular alternan entre pensar y comer. Entre cada par hay un tenedor y cada uno necesita dos para comer.</p>
        <ul class="list-styled">
          <li><strong>Riesgo:</strong> Si todos toman el tenedor de la izquierda a la vez, ninguno tiene el de la derecha → <strong>interbloqueo (deadlock)</strong>.</li>
          <li><strong>Solución:</strong> Imponer jerarquía de recursos (siempre tomar primero el tenedor de menor número) o usar un árbitro central.</li>
        </ul>
      </div>

      <div class="section-block">
        <h4>2. Lectores y Escritores</h4>
        <p>Varios procesos acceden a una base de datos compartida. Los lectores pueden leer simultáneamente, pero un escritor necesita acceso exclusivo.</p>
        <ul class="list-styled">
          <li><strong>Prioridad Lectores:</strong> Los lectores tienen paso libre mientras haya al menos uno leyendo. Riesgo: los escritores pueden sufrir <strong>inanición</strong> (nunca escriben si siempre hay lectores).</li>
          <li><strong>Prioridad Escritores:</strong> Cuando un escritor espera, no se permite la entrada de más lectores. Riesgo: inanición de lectores.</li>
          <li><strong>Solución justa:</strong> FIFO (primero en llegar, primero en ser atendido).</li>
        </ul>
      </div>

      <div class="section-block">
        <h4>3. El Barbero Dormilón</h4>
        <p>Una barbería tiene un barbero, una silla de corte y N sillas de espera.</p>
        <ul class="list-styled">
          <li>Si no hay clientes, el barbero duerme.</li>
          <li>Si un cliente llega y el barbero duerme, lo despierta.</li>
          <li>Si el barbero está ocupado y hay sillas libres, el cliente espera.</li>
          <li>Si no hay sillas libres, el cliente se va.</li>
          <li><strong>Solución:</strong> Tres semáforos: <em>clientes</em> (cuenta los esperando), <em>barberoListo</em> (señal de que puede atender) y <em>mutex</em> (protege el contador).</li>
        </ul>
      </div>

      <InfoCard type="important" label="¿Qué componente modela cada problema?">
        <p>Cada problema clásico representa un componente distinto del hardware de una PC:</p>
        <ul class="list-styled" style="margin-top: 8px">
          <li><strong>Filósofos → Dispositivos de E/S</strong> (impresoras, puertos, unidades de cinta): recursos físicos únicos que no se pueden interrumpir a mitad de uso y que varios procesos necesitan simultáneamente.</li>
          <li><strong>Lectores y Escritores → Memoria RAM / datos compartidos</strong>: modela el acceso concurrente a una estructura de datos en memoria — leer es seguro en paralelo, escribir requiere acceso exclusivo.</li>
          <li><strong>Barbero Dormilón → CPU (Procesador)</strong>: el barbero es la CPU idle cuando no hay procesos; las sillas son la cola de listos (ready queue) con capacidad finita.</li>
        </ul>
      </InfoCard>
    </Accordion>

    <UnitQuiz
      unitId="sd3-2"
      title="Quiz — Unidad 2: Procesos"
      :questions="quizQuestions"
    />
  </div>
</template>

<script setup>
import { computed, onMounted, reactive } from 'vue'
import Accordion from '../components/Accordion.vue'
import InfoCard from '../components/InfoCard.vue'
import UnitQuiz from '../components/UnitQuiz.vue'
import StudyFlashcards from '../components/StudyFlashcards.vue'
import TopicQuickQuiz from '../components/TopicQuickQuiz.vue'
import { useStudyProgress } from '../composables/useStudyProgress'
import { Cpu, FileText, GitBranch, Lock, Puzzle } from 'lucide-vue-next'

const props = defineProps({ searchQuery: { type: String, default: '' } })

const topicMeta = [
  { id: 'sd3u2-t1', anchor: 'sd3u2-t1', number: 'Tema 1', title: 'Anatomía de un Proceso', keywords: ['proceso', 'memoria', 'heap', 'stack', 'código', 'datos', 'BSS'], summary: ['Proceso = programa en ejecución.', 'Memoria: código, datos, heap, pila.', 'Cada proceso tiene espacio aislado.'] },
  { id: 'sd3u2-t2', anchor: 'sd3u2-t2', number: 'Tema 2', title: 'PCB y Cambio de Contexto', keywords: ['PCB', 'PID', 'contador de programa', 'cambio de contexto', 'registros'], summary: ['PCB guarda toda la info del proceso.', 'Cambio de contexto: salvar y restaurar.', 'Tiene costo en tiempo de CPU.'] },
  { id: 'sd3u2-t3', anchor: 'sd3u2-t3', number: 'Tema 3', title: 'Ciclo de Vida y Jerarquías', keywords: ['nuevo', 'listo', 'ejecutando', 'bloqueado', 'zombie', 'huérfano', 'fork'], summary: ['5 estados de un proceso.', 'fork() crea procesos hijos.', 'Zombies y huérfanos son casos especiales.'] },
  { id: 'sd3u2-t4', anchor: 'sd3u2-t4', number: 'Tema 4', title: 'Sincronización e IPC', keywords: ['condición de competencia', 'exclusión mutua', 'semáforo', 'monitor', 'TSL', 'región crítica'], summary: ['Condición de competencia: orden importa.', 'Semáforos: Down/Up para coordinar.', 'Monitores: exclusión mutua automática.'] },
  { id: 'sd3u2-t5', anchor: 'sd3u2-t5', number: 'Tema 5', title: 'Problemas Clásicos', keywords: ['filósofos', 'lectores', 'escritores', 'barbero', 'deadlock', 'inanición'], summary: ['Filósofos: riesgo de deadlock.', 'Lectores/Escritores: riesgo de inanición.', 'Barbero: coordinación con semáforos.'] }
]

const flashcards = [
  { question: '¿Qué diferencia hay entre programa y proceso?', answer: 'El programa es código estático en disco; el proceso es ese programa en ejecución con su estado dinámico.', level: 'fácil' },
  { question: '¿Qué contiene el PCB?', answer: 'PID, contador de programa, registros, estado del proceso y estado de E/S.', level: 'media' },
  { question: '¿Qué es un proceso zombie?', answer: 'Un proceso que terminó pero sigue en la tabla porque su padre no leyó su estado de salida.', level: 'media' },
  { question: '¿Qué es una condición de competencia?', answer: 'Cuando el resultado depende del orden de ejecución de los procesos al acceder a datos compartidos.', level: 'fácil' },
  { question: '¿Cómo funciona un semáforo?', answer: 'Es una variable con operaciones Down (decrementa/bloquea) y Up (incrementa/despierta). Puede ser binario o general.', level: 'difícil' },
  { question: '¿Qué problema ilustra la Cena de los Filósofos?', answer: 'El riesgo de interbloqueo (deadlock) cuando procesos compiten por recursos compartidos de forma circular.', level: 'difícil' }
]

const topicQuickChecks = [
  { topicId: 'sd3u2-t1', title: 'Chequeo Tema 1', question: 'El heap crece hacia...', options: ['Direcciones inferiores', 'Direcciones superiores', 'No crece'], correctIndex: 1 },
  { topicId: 'sd3u2-t2', title: 'Chequeo Tema 2', question: 'El PCB guarda...', options: ['Solo el nombre del programa', 'PID, PC, registros y estado', 'El código fuente'], correctIndex: 1 },
  { topicId: 'sd3u2-t3', title: 'Chequeo Tema 3', question: 'Un proceso cuyo padre murió es un...', options: ['Zombie', 'Huérfano', 'Demonio'], correctIndex: 1 },
  { topicId: 'sd3u2-t4', title: 'Chequeo Tema 4', question: 'La operación Down de un semáforo...', options: ['Siempre incrementa', 'Decrementa; si llega a 0, bloquea', 'Elimina el proceso'], correctIndex: 1 },
  { topicId: 'sd3u2-t5', title: 'Chequeo Tema 5', question: 'Los Filósofos que cenan ilustran el problema de...', options: ['Fragmentación de memoria', 'Deadlock', 'Paginación'], correctIndex: 1 }
]

const { getTopicStatus, setTopicStatus, getSummary } = useStudyProgress('sd3-2')
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
function handleQuickCheck({ topicId, isCorrect }) { setStatus(topicId, isCorrect ? 'dominado' : 'en-curso') }
function goToTopic(anchor) { const el = document.getElementById(anchor); if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' }) }

const quizQuestions = [
  { id: 'sd3u2q1', topic: 'Tema 1', question: '¿Qué zona de memoria de un proceso usa la estructura LIFO?', options: ['Heap', 'Datos', 'Stack (Pila)', 'Texto'], correctIndex: 2 },
  { id: 'sd3u2q2', topic: 'Tema 1', question: '¿Para qué sirve la zona de Heap?', options: ['Almacenar instrucciones de solo lectura', 'Asignaciones dinámicas de memoria (ej. malloc)', 'Guardar el PID del proceso', 'Contener variables locales de funciones'], correctIndex: 1 },
  { id: 'sd3u2q3', topic: 'Tema 2', question: '¿Qué ocurre durante un cambio de contexto?', options: ['Se elimina el proceso actual', 'Se guardan los registros del proceso saliente en su PCB y se cargan los del entrante', 'Se reinicia la computadora', 'Se duplica la memoria del proceso'], correctIndex: 1 },
  { id: 'sd3u2q4', topic: 'Tema 3', question: 'Un proceso que terminó pero sigue en la tabla de procesos es...', options: ['Un huérfano', 'Un zombie', 'Un demonio', 'Un proceso init'], correctIndex: 1 },
  { id: 'sd3u2q5', topic: 'Tema 3', question: '¿Qué llamada al sistema crea un proceso hijo en UNIX?', options: ['exec()', 'fork()', 'kill()', 'wait()'], correctIndex: 1 },
  { id: 'sd3u2q6', topic: 'Tema 4', question: '¿Cuál es el problema principal de la instrucción TSL?', options: ['No es atómica', 'Implica espera activa (busy waiting)', 'No funciona en hardware moderno', 'Solo sirve para semáforos'], correctIndex: 1 },
  { id: 'sd3u2q7', topic: 'Tema 4', question: 'Un semáforo binario (mutex) tiene valores posibles...', options: ['0 a infinito', '0 o 1', '-1 a 1', 'Solo 1'], correctIndex: 1 },
  { id: 'sd3u2q8', topic: 'Tema 4', question: '¿Qué ventaja tienen los monitores sobre los semáforos?', options: ['Son más rápidos', 'La exclusión mutua es automática', 'No necesitan variables', 'Funcionan sin CPU'], correctIndex: 1 },
  { id: 'sd3u2q9', topic: 'Tema 5', question: 'En el problema de Lectores y Escritores, la solución más justa es...', options: ['Prioridad Lectores', 'Prioridad Escritores', 'FIFO (orden de llegada)', 'No hay solución justa'], correctIndex: 2 },
  { id: 'sd3u2q10', topic: 'Tema 5', question: 'En el Barbero Dormilón, ¿qué pasa si no hay sillas de espera disponibles?', options: ['El cliente espera de pie', 'El barbero trabaja más rápido', 'El cliente se va', 'Se crea una silla nueva'], correctIndex: 2 }
]
</script>

<style scoped>
.unit-view { animation: fadeInUp 0.4s ease-out; }
.unit-header { margin-bottom: 32px; }
.unit-badge { margin-bottom: 12px; }
.unit-header h1 { margin-bottom: 8px; }
.unit-subtitle { color: var(--text-muted); font-size: 0.95rem; }
.study-toolbar { display: grid; grid-template-columns: 1fr; gap: 12px; margin-bottom: 18px; }
.study-progress-card, .summary-card, .search-results-card { border: 1px solid var(--border-color); border-radius: var(--radius-lg); background: var(--bg-card); padding: 14px; }
.card-head { display: flex; align-items: center; justify-content: space-between; margin-bottom: 10px; }
.status-grid { display: grid; gap: 8px; }
.status-row { border: 1px solid var(--border-color); border-radius: var(--radius-sm); padding: 8px; display: flex; align-items: center; justify-content: space-between; gap: 10px; }
.status-row p { margin: 0; font-size: 0.8rem; }
.status-actions { display: flex; gap: 6px; }
.status-btn { border: 1px solid var(--border-color); background: var(--bg-tertiary); color: var(--text-secondary); border-radius: 6px; font-size: 0.72rem; padding: 5px 8px; cursor: pointer; }
.status-btn.active { color: var(--accent-teal); border-color: var(--accent-teal); background: var(--accent-teal-soft); }
.summary-grid { display: grid; gap: 10px; }
.summary-item { border: 1px solid var(--border-color); border-radius: var(--radius-sm); padding: 8px; }
.summary-item ul { margin: 6px 0 0; padding-left: 18px; }
.summary-item li { color: var(--text-secondary); font-size: 0.8rem; }
.search-results-list { display: grid; gap: 8px; margin-top: 10px; }
.search-result-item { border: 1px solid var(--border-color); background: var(--bg-tertiary); border-radius: var(--radius-sm); padding: 10px; text-align: left; cursor: pointer; display: flex; flex-direction: column; gap: 2px; }
.search-result-item span { color: var(--text-secondary); font-size: 0.8rem; }
.mini-quiz-grid { margin-top: 12px; margin-bottom: 18px; display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 10px; }
@keyframes fadeInUp { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }
</style>
