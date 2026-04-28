<template>
  <div class="unit-view">
    <div class="unit-header">
      <span class="unit-badge badge badge-blue">Unidad 1</span>
      <h1>Contabilidad y Organización Empresarial</h1>
      <p class="unit-subtitle">Ente, organizaciones, tipos societarios, historia y principios contables</p>
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

    <!-- 1. Ente, Persona Física y Jurídica -->
    <Accordion id="u1-t1" title="Ente, Persona Física y Persona Jurídica" :icon="Landmark" number="Tema 1" color="blue" :defaultOpen="true">
      <InfoCard type="definition" label="Definición">
        <p><strong>Ente</strong> es el sujeto de la Contabilidad. Se refiere a todo organismo económico cuya existencia temporal tiene plena vigencia y proyección futura.</p>
        <p>Un ente puede ser una <strong>persona individual</strong> (persona humana) o una <strong>colectiva</strong> (organización, sociedad o grupo legalmente consolidado), capaces de adquirir derechos y contraer obligaciones.</p>
      </InfoCard>
      <InfoCard type="important" label="Clave">
        <p>No se debe confundir al ente con sus propietarios o dueños. Una misma persona (física o jurídica) puede formar parte de distintos entes o entidades.</p>
      </InfoCard>
      <InfoCard type="example" label="Ejemplo">
        <p>Roxana García (persona física) puede ser socia de una empresa industrial, de un club de hockey y la única dueña de un quiosco.</p>
      </InfoCard>
      <div class="section-block">
        <h4>Tipos de persona</h4>
        <ul class="list-styled">
          <li><strong>Persona Física (Humana):</strong> Se refiere al individuo.</li>
          <li><strong>Persona Jurídica:</strong> Dotada por la ley de capacidad para adquirir derechos y contraer obligaciones. Es la figura que el derecho provee para la actuación asociativa de dos o más seres humanos, aunque también puede ser unipersonal (SAU).</li>
        </ul>
      </div>
    </Accordion>

    <!-- 2. Organización -->
    <Accordion id="u1-t2" title="Organización: Concepto y Elementos" :icon="RefreshCw" number="Tema 2" color="blue">
      <InfoCard type="definition" label="Definición">
        <p>Una <strong>organización</strong> es un sistema social o unidad social deliberadamente construida para alcanzar fines específicos. Está orientada hacia la consecución de metas en base a un sistema coordinado y estructurado en permanente vínculo con el entorno.</p>
      </InfoCard>

      <div class="section-block">
        <h4>Tres características que distinguen a las organizaciones</h4>
        <ul class="list-styled">
          <li><strong>División del Trabajo:</strong> Planificada y reflejada en la estructura organizacional.</li>
          <li><strong>Centros de poder:</strong> Capaces de unificar esfuerzos hacia un objetivo común.</li>
          <li><strong>Sustitución de Personal:</strong> Posibilidad de reemplazar integrantes cuyo desempeño no satisface.</li>
        </ul>
      </div>

      <div class="section-block">
        <h4>Elementos de las organizaciones</h4>
        <ul class="list-styled">
          <li><strong>Valores (Objetivos/Metas/Fines):</strong> Propósitos que justifican la razón de ser de la organización.</li>
          <li><strong>Agentes (Miembros/Participantes):</strong> Individuos y grupos que la conforman.</li>
          <li><strong>Recursos (Bienes Económicos):</strong> Activos disponibles — materiales, financieros, humanos o de información.</li>
          <li><strong>Grupo de Tareas:</strong> Actividades lícitas para lograr los fines (producir, comercializar, comprar, vender, etc.).</li>
          <li><strong>Normas:</strong> Instrucciones, reglas y consignas que guían el actuar de los miembros.</li>
        </ul>
      </div>

      <InfoCard type="warning" label="Importante">
        <p>Ninguno de estos elementos puede faltar para que exista una organización. En contabilidad y administración, una organización se entiende como una persona moral o colectiva (empresa, institución, asociación), no una persona física individual.</p>
      </InfoCard>
    </Accordion>

    <!-- 3. Clasificación de organizaciones -->
    <Accordion id="u1-t3" title="Clasificación de las Organizaciones" :icon="FolderOpen" number="Tema 3" color="blue">
      <div class="section-block">
        <h4>Por su Finalidad</h4>
        <ul class="list-styled">
          <li><strong>Con Fines de Lucro:</strong> Buscan la obtención de ganancia para los aportantes de capital. Ej: Toyota, Kodak.</li>
          <li><strong>Sin Fines de Lucro (ONG/OSC):</strong> Buscan el bien común o fines sociales. Ej: Greenpeace, Cruz Roja.</li>
          <li><strong>Con Fines Administrativos:</strong> Creadas por un gobierno para brindar servicios a la comunidad.</li>
        </ul>
      </div>
      <div class="section-block">
        <h4>Por Número de Participantes</h4>
        <ul class="list-styled">
          <li><strong>Unipersonales:</strong> Conformadas por un socio único (SAU).</li>
          <li><strong>Pluripersonales:</strong> Dos o más socios.</li>
        </ul>
      </div>
      <div class="section-block">
        <h4>Por Origen del Capital</h4>
        <ul class="list-styled">
          <li><strong>Privadas:</strong> Capital de particulares.</li>
          <li><strong>Públicas:</strong> Capital aportado por el Estado.</li>
          <li><strong>Mixtas:</strong> Aporte conjunto.</li>
        </ul>
      </div>
    </Accordion>

    <!-- 4. Tipos de empresas -->
    <Accordion id="u1-t4" title="Tipos de Empresas y Tipos Societarios" :icon="Factory" number="Tema 4" color="blue">
      <div class="section-block">
        <h4>Según su Actividad</h4>
        <ul class="list-styled">
          <li><strong>Industriales (Sector Secundario):</strong> Proceso de transformación de materia prima. Ej: fábricas, automotrices.</li>
          <li><strong>Comerciales (Sector Terciario):</strong> Comercialización de productos. Ej: quioscos, supermercados.</li>
          <li><strong>De Servicios (Sector Terciario y Cuaternario):</strong> Prestación de servicios. Ej: educación, salud, tecnología.</li>
        </ul>
      </div>

      <div class="section-block">
        <h4>Elementos que definen una sociedad (L.19550)</h4>
        <ul class="list-styled">
          <li><strong>Organización:</strong> Estructura coordinada.</li>
          <li><strong>Pluralidad de personas:</strong> (excepto SAU).</li>
          <li><strong>Obligación de aportes:</strong> Para formación del capital social.</li>
          <li><strong>Órganos societarios:</strong> Gobierno, administración, fiscalización.</li>
          <li><strong>Affectio societatis:</strong> Espíritu unificador entre socios.</li>
          <li><strong>Tipicidad:</strong> Obligación de ajustarse a un tipo previsto en la ley.</li>
          <li><strong>Participación en beneficios y pérdidas.</strong></li>
        </ul>
      </div>

      <ComparisonTable
        title="Cuadro Comparativo — Tipos Societarios"
        :columns="['Característica', 'Soc. Colectiva', 'SRL', 'SA', 'SAU']"
        :rows="societyRows"
      />

      <div class="section-block" style="margin-top: 16px">
        <h4>Otros tipos societarios</h4>
        <ul class="list-styled">
          <li><strong>Soc. en Comandita Simple:</strong> Comanditados (responsabilidad ilimitada) y Comanditarios (limitada al aporte).</li>
          <li><strong>Soc. de Capital e Industria:</strong> Capitalistas (ilimitada) e industriales (responden hasta ganancias no percibidas).</li>
          <li><strong>Soc. en Comandita por Acciones:</strong> Mezcla de colectiva y anónima; el capital comanditario se representa en acciones.</li>
          <li><strong>Sociedades Sección IV:</strong> Régimen simple, sin inscripción, responsabilidad mancomunada.</li>
        </ul>
      </div>
    </Accordion>

    <!-- 5. Empresa en Marcha -->
    <Accordion id="u1-t5" title="Principio de Empresa en Marcha" :icon="Rocket" number="Tema 5" color="blue">
      <InfoCard type="definition" label="Definición">
        <p>Se entiende que los estados financieros pertenecen a un organismo económico cuya existencia temporal tiene <strong>plena vigencia y proyección futura</strong>. La empresa está en funcionamiento y continuará sus actividades dentro del futuro previsible.</p>
      </InfoCard>
      <div class="section-block">
        <ul class="list-styled">
          <li>Las normas contables han sido diseñadas para entes que cumplen esta condición.</li>
          <li>La dirección debe evaluar prospectivamente esta condición por <strong>mínimo 12 meses</strong> desde la fecha de los estados contables.</li>
          <li>Si surgen incertidumbres sobre la continuidad, deben revelarse en notas.</li>
        </ul>
      </div>
      <InfoCard type="warning" label="Excepción">
        <p>Si la entidad ha decidido liquidarse o cesar su actividad, las normas basadas en empresa en marcha <strong>no son aplicables</strong> y se cambia la base de preparación de los estados contables.</p>
      </InfoCard>
    </Accordion>

    <!-- 6. Inversión Inicial y Capital de Trabajo -->
    <Accordion id="u1-t6" title="Inversión Inicial y Capital de Trabajo" :icon="Coins" number="Tema 6" color="blue">
      <InfoCard type="definition" label="Inversión Inicial">
        <p>Es el capital necesario para cubrir todos los gastos que se deben realizar <strong>antes de que la empresa pueda empezar a operar</strong> y generar ingresos.</p>
      </InfoCard>
      <div class="section-block">
        <h4>Componentes</h4>
        <ul class="list-styled">
          <li><strong>Costos Fijos Iniciales:</strong> Alquiler, equipos, licencias, permisos, seguros.</li>
          <li><strong>Costos Variables Iniciales:</strong> Inventario, publicidad, contratación y capacitación.</li>
          <li><strong>Costos de Operación Iniciales:</strong> Gastos administrativos, de lanzamiento.</li>
          <li><strong>Fondo de Emergencia:</strong> Reservas para imprevistos (~10% del total).</li>
        </ul>
      </div>
      <InfoCard type="important" label="Diferencia clave">
        <p>La <strong>inversión inicial</strong> es para <em>comenzar</em> un negocio. El <strong>capital de trabajo</strong> es para cubrir los gastos operativos diarios una vez que el negocio <em>ya está en marcha</em>.</p>
      </InfoCard>
      <div class="section-block">
        <h4>Origen y Aplicación de los Recursos</h4>
        <p>ACTIVO = PASIVO + PATRIMONIO NETO</p>
        <ul class="list-styled">
          <li><strong>ACTIVO:</strong> Bienes y derechos sobre los cuales el ente controla los beneficios.</li>
          <li><strong>PASIVO:</strong> Deudas y obligaciones de entregar dinero, cosas o prestar servicios.</li>
          <li><strong>PATRIMONIO NETO:</strong> Aporte de los propietarios + resultados = ACTIVO − PASIVO.</li>
        </ul>
      </div>
    </Accordion>

    <!-- 7. Contabilidad como ciencia, técnica y arte -->
    <Accordion id="u1-t7" title="Contabilidad: Ciencia, Técnica y Arte" :icon="Combine" number="Tema 7" color="blue">
      <div class="section-block">
        <h4>Como Ciencia</h4>
        <ul class="list-styled">
          <li>Enseña las reglas para registrar operaciones y analizar la circulación económica.</li>
          <li>Se la considera una ciencia aplicada dentro de las ciencias sociales.</li>
          <li>Su campo va más allá de las técnicas contables, penetrando en la organización institucional y el funcionamiento de mercados.</li>
        </ul>
      </div>
      <div class="section-block">
        <h4>Como Técnica</h4>
        <ul class="list-styled">
          <li>Conjunto de procedimientos para identificar, medir, clasificar, registrar, interpretar, analizar, evaluar e informar las operaciones.</li>
          <li>Procesamiento de datos para obtener información sobre la composición y evolución del patrimonio.</li>
        </ul>
      </div>
      <div class="section-block">
        <h4>Como Arte</h4>
        <ul class="list-styled">
          <li>Arte de registrar, clasificar y resumir de forma significativa y en términos monetarios las operaciones financieras.</li>
          <li>Requiere agudeza de juicio y conocimientos desarrollados a través del estudio intensivo.</li>
        </ul>
      </div>
    </Accordion>

    <!-- 8. Evolución Histórica -->
    <Accordion id="u1-t8" title="Evolución Histórica de la Contabilidad" :icon="ScrollText" number="Tema 8" color="blue">
      <div class="section-block">
        <h4>Período Empírico o de Partida Simple (Antigüedad — 1202)</h4>
        <ul class="list-styled">
          <li>Orígenes en la comunidad primitiva, asociada al excedente económico.</li>
          <li>Testimonios desde 4 milenios a.C. en Mesopotamia, Grecia, Egipto, Roma.</li>
          <li>Culturas precolombinas: Mayas ("libros pintados"), Incas ("quipu"), Aztecas (sistema vigesimal).</li>
          <li>Registro aislado de operaciones (partida simple).</li>
        </ul>
      </div>
      <div class="section-block">
        <h4>Período de Génesis de la Partida Doble (1202 — 1494)</h4>
        <ul class="list-styled">
          <li>1202: "Liber Abaci" de Leonardo Fibonacci.</li>
          <li>Avances: elaboración de información patrimonial, resultado por transacción, uso de libros Memorial, Diario, Mayor y Balance.</li>
          <li>Crucial para la revolución comercial del siglo XIII en Europa.</li>
        </ul>
      </div>
      <div class="section-block">
        <h4>Período Clásico / Contismo (1494 — 1840)</h4>
        <ul class="list-styled">
          <li>1494: <strong>Luca Pacioli</strong> publica "Summa de Aritmética" con el tratado "De Computis et Scripturis" — primera exposición impresa de la partida doble.</li>
          <li>Generalización universal de la partida doble.</li>
          <li>Se establecen períodos contables fijos y el criterio de prudencia.</li>
        </ul>
      </div>
      <div class="section-block">
        <h4>Período Científico (1840 — actualidad)</h4>
        <ul class="list-styled">
          <li>1840: Francesco Villa marca la separación entre teneduría de libros y ciencia contable.</li>
          <li>Surgen corrientes: jurídico-personalistas, contistas, enfoque económico, teoría matemática, concepción comunicacional.</li>
          <li>Continúa en evolución con nuevas tecnologías.</li>
        </ul>
      </div>
    </Accordion>

    <!-- 9. Objeto y Objetivo -->
    <Accordion id="u1-t9" title="Objeto, Objetivo e Informes Contables" :icon="Target" number="Temas 9-11" color="blue">
      <div class="section-block">
        <h4>Objeto de la Contabilidad</h4>
        <p>El <strong>Patrimonio</strong>: conjunto de bienes y derechos (Activo) y obligaciones (Pasivo) del ente.</p>
      </div>
      <div class="section-block">
        <h4>Objetivo</h4>
        <p>Proporcionar <strong>información útil para la toma de decisiones</strong> — vital para planificación, coordinación y control.</p>
      </div>
      <div class="section-block">
        <h4>Tipos de Información</h4>
        <ul class="list-styled">
          <li><strong>Patrimonial:</strong> Recursos económicos (activos) y obligaciones (pasivos).</li>
          <li><strong>Económica:</strong> Análisis de la circulación económica y creación de valores.</li>
          <li><strong>Financiera:</strong> Soporte para decisiones financieras de inversores y otros usuarios.</li>
        </ul>
      </div>
      <div class="section-block">
        <h4>Sistema de Información Contable</h4>
        <p>La contabilidad como sistema de información: <strong>recibe datos</strong> → <strong>los procesa</strong> → <strong>produce información</strong> útil para la toma de decisiones.</p>
      </div>
      <div class="section-block">
        <h4>Usuarios de la Información</h4>
        <ul class="list-styled">
          <li><strong>Internos:</strong> Dirección, administradores (planificación y control).</li>
          <li><strong>Externos:</strong> Inversores, acreedores, entes fiscales, público en general.</li>
        </ul>
      </div>
    </Accordion>
    <UnitQuiz unitId="1" :questions="quizQuestions" />
  </div>
</template>

<script setup>
import { computed, onMounted, reactive } from 'vue'
import Accordion from '../components/Accordion.vue'
import InfoCard from '../components/InfoCard.vue'
import ComparisonTable from '../components/ComparisonTable.vue'
import UnitQuiz from '../components/UnitQuiz.vue'
import { useStudyProgress } from '../composables/useStudyProgress'
import { Landmark, RefreshCw, FolderOpen, Factory, Rocket, Coins, Combine, ScrollText, Target } from 'lucide-vue-next'

const props = defineProps({
  searchQuery: { type: String, default: '' }
})

const topicMeta = [
  {
    id: 'u1-t1',
    anchor: 'u1-t1',
    number: 'Tema 1',
    title: 'Ente y persona jurídica',
    keywords: ['ente', 'persona física', 'persona jurídica'],
    summary: ['El ente es sujeto contable.', 'Puede ser físico o jurídico.', 'El ente se separa de sus dueños.']
  },
  {
    id: 'u1-t2',
    anchor: 'u1-t2',
    number: 'Tema 2',
    title: 'Organización y elementos',
    keywords: ['organización', 'división del trabajo', 'normas'],
    summary: ['Sistema social con objetivos.', 'Requiere recursos, agentes y normas.', 'Debe coordinar tareas.']
  },
  {
    id: 'u1-t3',
    anchor: 'u1-t3',
    number: 'Tema 3',
    title: 'Clasificación de organizaciones',
    keywords: ['lucro', 'capital', 'unipersonal', 'pluripersonal'],
    summary: ['Se clasifican por finalidad.', 'También por participantes.', 'Y por origen del capital.']
  },
  {
    id: 'u1-t4',
    anchor: 'u1-t4',
    number: 'Tema 4',
    title: 'Tipos societarios',
    keywords: ['srl', 'sa', 'sau', 'sociedad colectiva'],
    summary: ['Cambian responsabilidad y capital.', 'SRL tiene tope de socios.', 'SA y SAU operan con acciones.']
  },
  {
    id: 'u1-t5',
    anchor: 'u1-t5',
    number: 'Tema 5',
    title: 'Empresa en marcha',
    keywords: ['empresa en marcha', '12 meses', 'continuidad'],
    summary: ['Presume continuidad operativa.', 'Se evalúa por 12 meses.', 'Si hay liquidación, cambia la base.']
  },
  {
    id: 'u1-t6',
    anchor: 'u1-t6',
    number: 'Tema 6',
    title: 'Inversión inicial y capital de trabajo',
    keywords: ['inversión inicial', 'capital de trabajo', 'activo pasivo patrimonio neto'],
    summary: ['Inversión inicial para arrancar.', 'Capital de trabajo para operar.', 'Ecuación: A = P + PN.']
  },
  {
    id: 'u1-t7',
    anchor: 'u1-t7',
    number: 'Tema 7',
    title: 'Contabilidad ciencia/técnica/arte',
    keywords: ['ciencia', 'técnica', 'arte'],
    summary: ['Como ciencia interpreta fenómenos.', 'Como técnica registra operaciones.', 'Como arte exige juicio profesional.']
  },
  {
    id: 'u1-t8',
    anchor: 'u1-t8',
    number: 'Tema 8',
    title: 'Evolución histórica',
    keywords: ['pacioli', 'partida doble', 'historia'],
    summary: ['Empírico, génesis, clásico y científico.', '1494: Pacioli sistematiza.', 'La disciplina sigue evolucionando.']
  },
  {
    id: 'u1-t9',
    anchor: 'u1-t9',
    number: 'Tema 9-11',
    title: 'Objeto, objetivo y usuarios',
    keywords: ['objeto', 'objetivo', 'informes contables', 'usuarios'],
    summary: ['Objeto: patrimonio.', 'Objetivo: decidir mejor.', 'Usuarios internos y externos.']
  }
]

const { getTopicStatus, setTopicStatus, getSummary } = useStudyProgress('1')
const topicStatus = reactive({})

onMounted(() => {
  topicMeta.forEach((topic) => {
    topicStatus[topic.id] = getTopicStatus(topic.id)
  })
})

const studySummary = computed(() => getSummary(topicMeta.map((topic) => topic.id)))

const searchResults = computed(() => {
  const term = props.searchQuery.trim().toLowerCase()
  if (!term) return []
  return topicMeta
    .map((topic) => {
      const match = topic.keywords.find((keyword) => keyword.toLowerCase().includes(term)) ||
        topic.title.toLowerCase().includes(term) && topic.title
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

function setStatus(topicId, status) {
  topicStatus[topicId] = status
  setTopicStatus(topicId, status)
}

function goToTopic(anchor) {
  const target = document.getElementById(anchor)
  if (target) {
    target.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}

const societyRows = [
  {
    'Característica': 'Responsabilidad',
    'Soc. Colectiva': 'Subsidiaria, ilimitada y solidaria',
    'SRL': 'Limitada al capital suscripto',
    'SA': 'Limitada a las acciones suscriptas',
    'SAU': 'Limitada a las acciones suscriptas'
  },
  {
    'Característica': 'Capital',
    'Soc. Colectiva': 'Partes de interés (indivisible, intransferible)',
    'SRL': 'Cuotas sociales (transmisibles)',
    'SA': 'Acciones (transmisibles, cotización en bolsa)',
    'SAU': 'Acciones'
  },
  {
    'Característica': 'Límite socios',
    'Soc. Colectiva': 'Sin límite',
    'SRL': 'Máximo 50',
    'SA': 'Sin límite',
    'SAU': '1 socio único'
  },
  {
    'Característica': 'Administración',
    'Soc. Colectiva': 'Cualquier socio (salvo pacto)',
    'SRL': 'Gerencia (socios o no)',
    'SA': 'Directorio (órgano colegiado)',
    'SAU': 'Directorio plural obligatorio'
  },
  {
    'Característica': 'Fiscalización',
    'Soc. Colectiva': 'Cualquier socio con libre acceso',
    'SRL': 'Optativa / obligatoria según capital',
    'SA': 'Obligatoria (Sindicatura o Cons. Vigilancia)',
    'SAU': 'Sindicatura plural + estatal permanente'
  },
  {
    'Característica': 'Constitución',
    'Soc. Colectiva': 'Instrumento público o privado',
    'SRL': 'Instrumento público o privado (firma certificada)',
    'SA': 'Instrumento público (acto único)',
    'SAU': 'Acto jurídico unilateral'
  },
  {
    'Característica': 'Integración Capital',
    'Soc. Colectiva': 'Requiere aportes',
    'SRL': 'Requiere aportes',
    'SA': 'Capital mínimo $100.000',
    'SAU': '100% al momento de constitución'
  }
]

const quizQuestions = [
  {
    id: 'u1q1',
    topic: 'Tema 1',
    question: "Roxana García es socia de una SA y también tiene un quiosco a su nombre. Si la SA cae en cesación de pagos, ¿qué ocurre con el patrimonio personal de Roxana?",
    options: [
      "Responde ilimitadamente, porque es socia",
      "Sus bienes personales no se ven afectados; la SA es un ente separado de sus propietarios",
      "Debe entregar el quiosco como garantía de las deudas sociales",
      "Comparte proporcional­mente la deuda con el resto de los socios"
    ],
    correctIndex: 1
  },
  {
    id: 'u1q2',
    topic: 'Tema 2',
    question: "Una startup tiene objetivos claros y recursos suficientes, pero todos los empleados hacen de todo sin roles definidos. ¿Qué elemento típico de las organizaciones les falta?",
    options: [
      "Recursos económicos",
      "Fines y objetivos",
      "División del trabajo planificada",
      "Normativa legal de constitución"
    ],
    correctIndex: 2
  },
  {
    id: 'u1q3',
    topic: 'Tema 3',
    question: "Un municipio crea una empresa de transporte donde el Estado aporta el 60% del capital y privados el 40%. ¿Cómo se clasifica solo por origen del capital?",
    options: [
      "Pública, porque el Estado tiene mayoría",
      "Mixta, porque combina capital público y privado",
      "Privada, porque hay participación de particulares",
      "Sin fines de lucro, porque la gestiona el Estado"
    ],
    correctIndex: 1
  },
  {
    id: 'u1q4',
    topic: 'Tema 4',
    question: "Una SRL tiene actualmente 48 socios y quiere sumar 3 nuevos inversores. ¿Cuál es el problema legal?",
    options: [
      "Las SRL no pueden incorporar socios una vez constituidas",
      "El máximo de socios en una SRL es 50, por lo que solo podría sumar 2, no 3",
      "Para sumar socios la SRL debe convertirse primero en SA",
      "No hay impedimento; las SRL no tienen límite de socios"
    ],
    correctIndex: 1
  },
  {
    id: 'u1q5',
    topic: 'Tema 5',
    question: "Una empresa que acaba de decidir liquidarse está por cerrar sus estados contables. ¿Bajo qué base deben prepararlos?",
    options: [
      "Base empresa en marcha, igual que siempre",
      "No hace falta preparar estados contables al decidir liquidarse",
      "Una base diferente: empresa en marcha no aplica cuando se decidió cesar actividad",
      "Activando todo a valor de mercado sin cambiar la base conceptual"
    ],
    correctIndex: 2
  },
  {
    id: 'u1q6',
    topic: 'Tema 6',
    question: "Al abrir su empresa, Carlos destina $200.000: $120.000 para equipos, $50.000 para publicidad de lanzamiento y $30.000 para cubrir gastos operativos de los próximos dos meses. ¿Qué parte representa el capital de trabajo?",
    options: [
      "Los $120.000 en equipos, porque son la inversión principal",
      "Los $50.000 de publicidad, porque son variables",
      "Los $30.000 para gastos operativos corrientes una vez que el negocio esté en marcha",
      "Todo, porque ya está invirtiendo en el negocio"
    ],
    correctIndex: 2
  },
  {
    id: 'u1q7',
    topic: 'Tema 7',
    question: "¿Cuál de las siguientes actividades refleja a la contabilidad como 'ciencia' y NO como simple técnica de registro?",
    options: [
      "Registrar cronológicamente las operaciones del día en el libro diario",
      "Clasificar los asientos por tipo de cuenta",
      "Estudiar la circulación económica y el rol de las organizaciones en los mercados",
      "Calcular el total del debe y el haber de cada asiento"
    ],
    correctIndex: 2
  },
  {
    id: 'u1q8',
    topic: 'Tema 8',
    question: "El período 1202–1494 se llama 'Génesis de la Partida Doble'. Si ya se usaba antes de Pacioli, ¿por qué 1494 sigue siendo un hito histórico?",
    options: [
      "Porque antes de 1494 no existía ningún registro contable",
      "Porque Pacioli fue el primero en sistematizarla y publicarla de forma impresa, haciéndola accesible universalmente",
      "Porque en 1494 se inventó el dinero en papel, lo que obligó a llevar libros",
      "Porque la obra de Pacioli eliminó el período empírico de la contabilidad"
    ],
    correctIndex: 1
  },
  {
    id: 'u1q9',
    topic: 'Tema 9-11',
    question: "La dirección de una empresa usa información contable para decidir si contratar personal; un inversor externo la usa para decidir si comprar acciones. ¿Qué característica de la contabilidad queda demostrada?",
    options: [
      "Que la contabilidad es un instrumento exclusivamente fiscal",
      "Que los estados contables los deben preparar los propios inversores",
      "Que la información contable satisface necesidades de distintos usuarios, tanto internos como externos",
      "Que la información interna y la externa siempre son documentos separados"
    ],
    correctIndex: 2
  },
  {
    id: 'u1q10',
    topic: 'Tema 4',
    question: "Una SA necesita capital urgente y decide emitir nuevas acciones para captar inversores. ¿Qué característica específica de la SA hace esto viable, a diferencia de una SRL?",
    options: [
      "La SA tiene responsabilidad subsidiaria e ilimitada, lo que da más confianza",
      "El capital de la SA se divide en acciones transmisibles y cotizables en bolsa, lo que facilita la captación de inversores",
      "La SA tiene un máximo de 50 socios, lo que concentra el control",
      "La SA no paga impuesto a las ganancias, lo que la hace más atractiva"
    ],
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
  color: var(--accent-blue);
  border-color: var(--accent-blue);
  background: var(--accent-blue-soft);
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

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(16px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
