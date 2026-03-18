<template>
  <div class="unit-view">
    <div class="unit-header">
      <span class="unit-badge badge badge-blue">Unidad 1</span>
      <h1>Introducción a los Sistemas Operativos</h1>
      <p class="unit-subtitle">Definición, evolución histórica, funciones, clasificación y arquitectura</p>
    </div>

    <div class="study-toolbar">
      <div class="study-progress-card">
        <div class="card-head">
          <h3>Progreso por tema</h3>
          <span class="badge badge-blue">{{ studySummary.completion }}% dominado</span>
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

    <StudyFlashcards :cards="flashcards" />

    <div class="mini-quiz-grid">
      <TopicQuickQuiz
        v-for="quiz in topicQuickChecks"
        :key="quiz.topicId"
        :title="quiz.title"
        :topicId="quiz.topicId"
        :question="quiz.question"
        :options="quiz.options"
        :correctIndex="quiz.correctIndex"
        @answered="handleQuickCheck"
      />
    </div>

    <!-- Tema 1: Definición y Propósito del SO -->
    <Accordion id="sd3u1-t1" title="Definición y Propósito del Sistema Operativo" :icon="Monitor" number="Tema 1" color="blue" :defaultOpen="true">
      <InfoCard type="definition" label="Definición">
        <p>Un <strong>sistema operativo (SO)</strong> es un conjunto de programas que actúan como intermediarios fundamentales entre el hardware de un ordenador y el usuario. Su propósito es gestionar los recursos del sistema de manera eficiente y ofrecer una interfaz que oculte la complejidad física de la máquina.</p>
        <p>Se lo considera el <strong>gobierno central</strong> de la computadora, ya que administra el tiempo de CPU, el espacio de memoria, el almacenamiento y los dispositivos de entrada/salida.</p>
      </InfoCard>

      <InfoCard type="example" label="Ejemplo sencillo">
        <p>Imaginá que tu computadora es un <strong>restaurante</strong>. El hardware (procesador, memoria, disco) son la cocina, las mesas y los insumos. El sistema operativo es el <strong>gerente del restaurante</strong> (intermediario entre hardware y usuario): decide quién cocina qué, quién atiende cada mesa y cuántos platos se pueden preparar a la vez. Vos, como cliente (usuario), solo pedís del menú sin necesidad de saber cómo funciona la cocina (abstracción del hardware). Si no hubiera gerente, tendrías que entrar a la cocina y cocinar vos mismo (programación directa del hardware).</p>
      </InfoCard>

      <InfoCard type="important" label="Clave">
        <p>El SO tiene dos funciones esenciales: <strong>gestionar recursos</strong> (asignar CPU, memoria, disco entre programas) y ofrecer una <strong>máquina extendida</strong> (una interfaz simplificada que esconde los detalles técnicos del hardware).</p>
      </InfoCard>
    </Accordion>

    <!-- Tema 2: Evolución Histórica -->
    <Accordion id="sd3u1-t2" title="Evolución Histórica de los Sistemas Operativos" :icon="History" number="Tema 2" color="blue">
      <InfoCard type="example" label="Ejemplo sencillo">
        <p>Pensá en cómo evolucionó la música: primero tenías que ir al concierto en vivo para escuchar algo (1ª generación: sin SO, interacción directa). Después vinieron los discos de vinilo donde ponías uno y esperabas a que termine (2ª generación: procesamiento por lotes). Luego los CDs multidisco con cambio automático (3ª generación: multiprogramación). Después el reproductor MP3 portátil (4ª generación: computadora personal). Y hoy Spotify te reproduce lo que quieras desde la nube en cualquier dispositivo (5ª generación: sistemas distribuidos y móviles).</p>
      </InfoCard>

      <div class="section-block">
        <h4>1ª Generación (1945-1955) — Válvulas de vacío</h4>
        <ul class="list-styled">
          <li><strong>Sin sistema operativo.</strong> La programación se realizaba directamente en lenguaje máquina mediante cables y microconmutadores.</li>
          <li>Un solo programa a la vez, controlado manualmente por el operador.</li>
          <li><strong>Tarjetas perforadas:</strong> eran el principal medio de entrada de datos e instrucciones. El programador codificaba su programa perforando patrones en cartulinas rectangulares, que luego la máquina leía mecánicamente. Cada tarjeta representaba una línea de código o un dato numérico. Un error implicaba volver a perforar la tarjeta; las pilas de cientos de tarjetas debían entregarse al operador y el resultado podía tardar horas o días en obtenerse.</li>
        </ul>
      </div>

      <div class="section-block">
        <h4>2ª Generación (1955-1965) — Transistores</h4>
        <ul class="list-styled">
          <li>Aparece el <strong>procesamiento por lotes (batch)</strong>: los trabajos se agrupaban y ejecutaban secuencialmente sin intervención manual entre ellos.</li>
          <li>El <strong>GM-NAA I/O (1956)</strong> fue el primer sistema operativo, diseñado para automatizar la carga de trabajos en mainframes IBM.</li>
        </ul>
      </div>

      <div class="section-block">
        <h4>3ª Generación (1965-1980) — Circuito integrado</h4>
        <ul class="list-styled">
          <li>Surge la <strong>multiprogramación</strong>: varios programas residen en memoria simultáneamente.</li>
          <li>Aparece el <strong>tiempo compartido (time-sharing)</strong>: la CPU alterna rápidamente entre programas para dar la ilusión de ejecución simultánea.</li>
        </ul>
      </div>

      <div class="section-block">
        <h4>4ª Generación (1980-1990) — Microprocesador</h4>
        <ul class="list-styled">
          <li>Auge del <strong>ordenador personal (PC)</strong>.</li>
          <li>Nacen sistemas como <strong>MS-DOS</strong>, las primeras versiones de <strong>Windows</strong> y UNIX se consolida como estándar.</li>
        </ul>
      </div>

      <div class="section-block">
        <h4>5ª Generación y Actualidad (desde 1990)</h4>
        <ul class="list-styled">
          <li>Surgimiento de <strong>sistemas distribuidos</strong>, interfaces gráficas intuitivas (GUI).</li>
          <li>Dominio de sistemas móviles como <strong>Android e iOS</strong>, junto con la integración de servicios en la nube.</li>
        </ul>
      </div>
    </Accordion>

    <!-- Tema 3: Funciones Principales y Componentes -->
    <Accordion id="sd3u1-t3" title="Funciones Principales y Componentes" :icon="Layers" number="Tema 3" color="blue">
      <InfoCard type="example" label="Ejemplo sencillo">
        <p>Imaginá un <strong>director de orquesta</strong> (sistema operativo) que coordina a los músicos (programas). Él decide cuándo toca cada sección (gestor de procesos), cuántas partituras caben en los atriles (gestor de memoria), quién usa el micrófono (gestor de E/S), dónde se guardan las partituras en el archivo (gestor de archivos) y quién tiene permiso de entrar a la sala (gestor de permisos y seguridad).</p>
      </InfoCard>

      <div class="section-block">
        <h4>Componentes del SO</h4>
        <ul class="list-styled">
          <li><strong>Gestor de procesos (El planificador):</strong> Administra el ciclo de vida de los programas en ejecución, decidiendo quién usa la CPU, por cuánto tiempo, y cuándo deben pausarse o terminar.</li>
          <li><strong>Gestor de memoria (El loteador):</strong> Controla el uso de la RAM. Le asigna a cada programa su "terreno" privado y se asegura de que ninguno invada el espacio del vecino.</li>
          <li><strong>Gestor de E/S (El traductor de hardware):</strong> Gestiona la comunicación con periféricos (impresoras, discos, mouses) usando pequeños manuales de instrucciones llamados <strong>drivers</strong>.</li>
          <li><strong>Gestor de archivos (El bibliotecario):</strong> Ofrece una visión lógica (carpetas, archivos y nombres fáciles) para ocultar el desastre físico de dónde están guardados los bytes reales en el disco duro.</li>
          <li><strong>Gestor de permisos y seguridad (El patovica):</strong> Garantiza que nadie lea ni modifique cosas para las que no tiene nivel de autorización.</li>
        </ul>
      </div>
    </Accordion>

    <!-- Tema 4: Taxonomía de los Sistemas Operativos -->
    <Accordion id="sd3u1-t4" title="Clasificación de los Sistemas Operativos" :icon="Grid3x3" number="Tema 4" color="blue">
      <InfoCard type="example" label="Ejemplo sencillo">
        <p>Pensá en distintos tipos de vehículos. Un <strong>monopatín</strong> lleva a una sola persona y hace una sola cosa (monousuario y monotarea). Un <strong>colectivo</strong> lleva a muchas personas simultáneamente (multiusuario). Un <strong>auto con piloto automático</strong> puede navegar, regular la temperatura y reproducir música a la vez (multitarea). Y una <strong>flota de camiones coordinados</strong> por una central funciona como un sistema distribuido, donde muchas máquinas (camiones) trabajan juntas como si fueran una sola.</p>
      </InfoCard>

      <ComparisonTable
        title="Clasificación por criterio"
        :columns="['Criterio', 'Tipo A', 'Tipo B', 'Ejemplo']"
        :rows="taxonomyRows"
      />

      <div class="section-block">
        <h4>Por la forma de ofrecer servicios</h4>
        <ul class="list-styled">
          <li><strong>Centralizados (El rey absoluto):</strong> Todos los recursos y el cerebro están en una sola gran máquina física.</li>
          <li><strong>Distribuidos (El trabajo en equipo invisible):</strong> Múltiples máquinas separadas físicamente actúan juntas. Vos como usuario sentís que usás una sola súper-PC (transparencia total). Ejemplo: Google Search.</li>
          <li><strong>De red (Los vecinos que se prestan cosas):</strong> Las máquinas interactúan para pasarse archivos o compartir una impresora, pero cada una mantiene su propia identidad y SO independiente.</li>
          <li><strong>De tiempo real (A prueba de balas):</strong> Sistemas que no pueden darse el lujo de tener "lag". Si dicen "freno el auto en 0.5s", lo hacen o el sistema falla con consecuencias catastróficas (ej. bolsas de aire, respiradores médicos).</li>
        </ul>
      </div>
    </Accordion>

    <!-- Tema 5: Estructuras de los SO -->
    <Accordion id="sd3u1-t5" title="Arquitecturas y Estructuras del SO" :icon="Blocks" number="Tema 5" color="blue">
      <InfoCard type="example" label="Ejemplo sencillo">
        <p>Pensá en <strong>cómo se organiza un edificio</strong>. Una estructura <strong>monolítica</strong> es como un galpón enorme donde todo pasa en el mismo espacio: cocina, oficina y depósito juntos (todo el código del SO en un solo bloque). Una estructura <strong>por capas</strong> es un edificio con pisos, donde cada piso solo puede hablar con el de abajo (cada capa del SO solo usa servicios de la inferior). Un <strong>micronúcleo</strong> es como un edificio inteligente con un hall central mínimo (núcleo) y oficinas independientes (servicios) que se comunican a través de ese hall. Y una <strong>máquina virtual</strong> es como tener varios departamentos idénticos dentro del mismo edificio, cada uno con su propia "casa" completa.</p>
      </InfoCard>

      <div class="section-block">
        <h4>Tipos de estructura</h4>
        <ul class="list-styled">
          <li><strong>Monolítica (El bloque macizo):</strong> Todo el núcleo del SO está fusionado en un gigantesco archivo maestro. Es rapidísimo, pero si una línea de código falla (ej. un driver pirata), explota todo el sistema (el famoso pantallazo azul). Ejemplo: Linux, MS-DOS.</li>
          <li><strong>Por capas (La torta milhojas):</strong> El código se divide en niveles apilados. Cada capa solo puede pedirle favores a la capa que tiene inmediatamente abajo. Es muy ordenado para programar, pero más lento.</li>
          <li><strong>Micronúcleo / Microkernel (El policía de tránsito):</strong> El núcleo es enano; solo sabe pasar mensajes. Todo lo demás (hasta los drivers o el sistema de archivos) corren como programas normales (procesos de usuario). Si se cae el programa de la placa de red, el SO sigue vivo y simplemente lo reinicia. Ejemplo: Minix.</li>
          <li><strong>Máquina Virtual (La Inception):</strong> No es un sistema operativo real, es un engaño. El sistema le hace creer a cada programa visitante (guest) que tiene su propia CPU, RAM y disco en blanco para instalar otro SO encima. Ejemplo: VirtualBox, VMware.</li>
        </ul>
      </div>

      <InfoCard type="tip" label="Pregunta de Final">
        <p><strong>¿Qué usan los sistemas de hoy en día (Windows 11 / macOS)?</strong><br>
        En la práctica pura casi nadie es 100% uno solo. Usan estructuras <strong>Híbridas</strong>. Por ejemplo, Windows tiene un núcleo que parece un Micronúcleo (por diseño), pero lo corre todo junto en modo privilegiado para no perder rendimiento (como en Monolítica).</p>
      </InfoCard>

      <ComparisonTable
        title="Comparación de Arquitecturas"
        :columns="['Arquitectura', 'Ventaja Principal', 'Desventaja Principal']"
        :rows="architectureRows"
      />
    </Accordion>

    <!-- Quiz -->
    <UnitQuiz
      unitId="sd3-1"
      title="Quiz — Unidad 1: Introducción a los SO"
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
import StudyFlashcards from '../components/StudyFlashcards.vue'
import TopicQuickQuiz from '../components/TopicQuickQuiz.vue'
import { useStudyProgress } from '../composables/useStudyProgress'
import { Monitor, History, Layers, Grid3x3, Blocks } from 'lucide-vue-next'

const props = defineProps({
  searchQuery: { type: String, default: '' }
})

const topicMeta = [
  {
    id: 'sd3u1-t1', anchor: 'sd3u1-t1', number: 'Tema 1',
    title: 'Definición y Propósito del SO',
    keywords: ['sistema operativo', 'intermediario', 'hardware', 'gobierno central', 'recursos'],
    summary: ['El SO gestiona CPU, memoria, E/S.', 'Actúa como intermediario hardware-usuario.', 'Oculta la complejidad del hardware.']
  },
  {
    id: 'sd3u1-t2', anchor: 'sd3u1-t2', number: 'Tema 2',
    title: 'Evolución Histórica',
    keywords: ['generación', 'batch', 'multiprogramación', 'tiempo compartido', 'PC', 'móvil'],
    summary: ['5 generaciones ligadas al hardware.', 'De válvulas de vacío a la nube.', 'Multiprogramación fue salto clave.']
  },
  {
    id: 'sd3u1-t3', anchor: 'sd3u1-t3', number: 'Tema 3',
    title: 'Funciones y Componentes',
    keywords: ['gestor', 'procesos', 'memoria', 'E/S', 'archivos', 'seguridad'],
    summary: ['5 gestores principales.', 'Procesos, memoria, E/S, archivos, seguridad.', 'Cada uno controla un recurso.']
  },
  {
    id: 'sd3u1-t4', anchor: 'sd3u1-t4', number: 'Tema 4',
    title: 'Clasificación de SO',
    keywords: ['monousuario', 'multiusuario', 'multitarea', 'distribuido', 'tiempo real'],
    summary: ['Por usuarios, tareas, procesadores.', 'También por forma de servicio.', 'Tiempo real para plazos críticos.']
  },
  {
    id: 'sd3u1-t5', anchor: 'sd3u1-t5', number: 'Tema 5',
    title: 'Arquitecturas del SO',
    keywords: ['monolítica', 'capas', 'micronúcleo', 'microkernel', 'máquina virtual'],
    summary: ['Monolítica: todo en un binario.', 'Microkernel: núcleo mínimo.', 'VM: varios SO sobre uno.']
  }
]

const flashcards = [
  { question: '¿Qué es un sistema operativo?', answer: 'Un conjunto de programas intermediarios entre el hardware y el usuario que gestionan recursos y ofrecen una interfaz simplificada.', level: 'fácil' },
  { question: '¿Qué innovación trajo la 3ª generación?', answer: 'La multiprogramación y el tiempo compartido, permitiendo varios programas en memoria simultáneamente.', level: 'media' },
  { question: '¿Cuáles son los 5 gestores del SO?', answer: 'Gestor de procesos, de memoria, de E/S, de archivos y de permisos/seguridad.', level: 'fácil' },
  { question: '¿Qué diferencia hay entre monolítico y microkernel?', answer: 'Monolítico integra todo en un binario en modo núcleo; microkernel mantiene un núcleo mínimo y los servicios como procesos de usuario.', level: 'difícil' },
  { question: '¿Qué es un SO de tiempo real?', answer: 'Uno que garantiza respuestas dentro de plazos críticos estrictos, como en control de vuelo.', level: 'media' },
  { question: '¿Qué fue el GM-NAA I/O?', answer: 'El primer sistema operativo (1956), diseñado para automatizar la carga de trabajos en mainframes IBM.', level: 'difícil' }
]

const topicQuickChecks = [
  { topicId: 'sd3u1-t1', title: 'Chequeo Tema 1', question: '¿Cuál es la función principal del SO?', options: ['Ejecutar juegos', 'Gestionar recursos y ocultar complejidad del hardware', 'Compilar código fuente'], correctIndex: 1 },
  { topicId: 'sd3u1-t2', title: 'Chequeo Tema 2', question: '¿En qué generación aparece la multiprogramación?', options: ['1ª Generación', '2ª Generación', '3ª Generación'], correctIndex: 2 },
  { topicId: 'sd3u1-t3', title: 'Chequeo Tema 3', question: '¿Qué gestor controla la comunicación con periféricos?', options: ['Gestor de procesos', 'Gestor de E/S', 'Gestor de archivos'], correctIndex: 1 },
  { topicId: 'sd3u1-t4', title: 'Chequeo Tema 4', question: 'Un SO que permite varios programas simultáneos es...', options: ['Monotarea', 'Multitarea', 'Monousuario'], correctIndex: 1 },
  { topicId: 'sd3u1-t5', title: 'Chequeo Tema 5', question: 'Linux tiene una estructura...', options: ['Microkernel', 'Por capas', 'Monolítica'], correctIndex: 2 }
]

const { getTopicStatus, setTopicStatus, getSummary } = useStudyProgress('sd3-1')
const topicStatus = reactive({})

onMounted(() => {
  topicMeta.forEach((topic) => {
    topicStatus[topic.id] = getTopicStatus(topic.id)
  })
})

const studySummary = computed(() => getSummary(topicMeta.map((t) => t.id)))

const searchResults = computed(() => {
  const term = props.searchQuery.trim().toLowerCase()
  if (!term) return []
  return topicMeta
    .map((topic) => {
      const match = topic.keywords.find((k) => k.toLowerCase().includes(term)) ||
        (topic.title.toLowerCase().includes(term) && topic.title)
      if (!match) return null
      return { topicId: topic.id, anchor: topic.anchor, number: topic.number, title: topic.title, term: typeof match === 'string' ? match : term }
    })
    .filter(Boolean)
})

function setStatus(topicId, status) {
  topicStatus[topicId] = status
  setTopicStatus(topicId, status)
}

function handleQuickCheck({ topicId, isCorrect }) {
  setStatus(topicId, isCorrect ? 'dominado' : 'en-curso')
}

function goToTopic(anchor) {
  const el = document.getElementById(anchor)
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

const taxonomyRows = [
  { 'Criterio': 'Usuarios', 'Tipo A': 'Monousuario', 'Tipo B': 'Multiusuario', 'Ejemplo': 'MS-DOS / Linux servidor' },
  { 'Criterio': 'Tareas', 'Tipo A': 'Monotarea', 'Tipo B': 'Multitarea', 'Ejemplo': 'MS-DOS / Windows 11' },
  { 'Criterio': 'Procesadores', 'Tipo A': 'Monoproceso', 'Tipo B': 'Multiproceso', 'Ejemplo': 'DOS / Linux SMP' }
]

const architectureRows = [
  { 'Arquitectura': 'Monolítica', 'Ventaja Principal': 'Alto rendimiento (todo en modo núcleo)', 'Desventaja Principal': 'Un fallo puede tumbar todo el sistema' },
  { 'Arquitectura': 'Por capas', 'Ventaja Principal': 'Diseño modular y ordenado', 'Desventaja Principal': 'Difícil definir capas correctamente' },
  { 'Arquitectura': 'Microkernel', 'Ventaja Principal': 'Aislamiento de fallos, alta estabilidad', 'Desventaja Principal': 'Mayor sobrecarga por comunicación entre procesos' },
  { 'Arquitectura': 'Cliente-Servidor', 'Ventaja Principal': 'Separación clara de responsabilidades', 'Desventaja Principal': 'Depende de la eficiencia de la comunicación' },
  { 'Arquitectura': 'Máquina Virtual', 'Ventaja Principal': 'Aislamiento total, múltiples SO', 'Desventaja Principal': 'Consumo adicional de recursos' }
]

const quizQuestions = [
  {
    id: 'sd3u1q1', topic: 'Tema 1',
    question: '¿Cuál de las siguientes opciones describe mejor al sistema operativo?',
    options: ['Un programa para editar textos', 'Un intermediario entre hardware y usuario que gestiona recursos', 'Un componente físico de la computadora', 'Un lenguaje de programación'],
    correctIndex: 1
  },
  {
    id: 'sd3u1q2', topic: 'Tema 2',
    question: '¿Qué caracterizó a la 2ª generación de los SO?',
    options: ['Interfaces gráficas', 'Válvulas de vacío sin SO', 'Transistores y procesamiento por lotes', 'Sistemas distribuidos en la nube'],
    correctIndex: 2
  },
  {
    id: 'sd3u1q3', topic: 'Tema 2',
    question: '¿Qué permitió la multiprogramación de la 3ª generación?',
    options: ['Que solo un programa use la CPU', 'Que varios programas residan en memoria simultáneamente', 'Conectarse a Internet', 'Usar pantallas táctiles'],
    correctIndex: 1
  },
  {
    id: 'sd3u1q4', topic: 'Tema 3',
    question: '¿Qué gestor del SO se encarga de asignar RAM a los procesos?',
    options: ['Gestor de E/S', 'Gestor de archivos', 'Gestor de memoria', 'Gestor de seguridad'],
    correctIndex: 2
  },
  {
    id: 'sd3u1q5', topic: 'Tema 3',
    question: '¿Qué hacen los drivers en el contexto del SO?',
    options: ['Gestionar los permisos de usuario', 'Permitir la comunicación con periféricos (gestor de E/S)', 'Almacenar archivos en disco', 'Planificar procesos en la CPU'],
    correctIndex: 1
  },
  {
    id: 'sd3u1q6', topic: 'Tema 4',
    question: 'Un servidor Linux al que acceden 100 usuarios simultáneamente es un sistema...',
    options: ['Monousuario y monotarea', 'Multiusuario y multitarea', 'Monousuario y multitarea', 'Solo multiproceso'],
    correctIndex: 1
  },
  {
    id: 'sd3u1q7', topic: 'Tema 4',
    question: '¿Qué tipo de SO garantiza respuestas en plazos críticos?',
    options: ['De red', 'Distribuido', 'De tiempo real', 'Centralizado'],
    correctIndex: 2
  },
  {
    id: 'sd3u1q8', topic: 'Tema 5',
    question: '¿Cuál es la característica principal de un microkernel?',
    options: ['Todo el SO corre en modo núcleo', 'El núcleo contiene solo funciones mínimas; los servicios corren como procesos de usuario', 'No permite multiprogramación', 'Solo funciona con máquinas virtuales'],
    correctIndex: 1
  },
  {
    id: 'sd3u1q9', topic: 'Tema 5',
    question: '¿Qué permite la arquitectura de Máquina Virtual?',
    options: ['Ejecutar varios SO sobre un mismo hardware anfitrión', 'Conectar computadoras en red', 'Que el SO no necesite memoria', 'Eliminar la necesidad de drivers'],
    correctIndex: 0
  },
  {
    id: 'sd3u1q10', topic: 'Tema 5',
    question: 'Linux se clasifica como un SO de estructura...',
    options: ['Microkernel', 'Por capas pura', 'Monolítica', 'Cliente-Servidor'],
    correctIndex: 2
  }
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
.status-btn.active { color: var(--accent-blue); border-color: var(--accent-blue); background: var(--accent-blue-soft); }
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
