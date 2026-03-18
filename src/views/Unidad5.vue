<template>
  <div class="unit-view">
    <div class="unit-header">
      <span class="unit-badge badge badge-red">Unidad 5</span>
      <h1>Registración Contable y Normativa Legal</h1>
      <p class="unit-subtitle">Normativa, libros obligatorios, orden de uso, medios de registración y ejemplos de operaciones</p>
    </div>

    <UnitStudyToolkit
      title="Unidad 5"
      unitId="5"
      :searchQuery="props.searchQuery"
      :topicMeta="topicMeta"
      :flashcards="flashcards"
      :topicQuickChecks="topicQuickChecks"
      accent="red"
    />

    <!-- 1. Contabilidad y Normativa -->
    <Accordion id="u5-t1" title="Normas Legales que Regulan la Contabilidad" :icon="Scale" number="Tema 1" color="red" :defaultOpen="true">
      <InfoCard type="definition" label="Contabilidad">
        <p>Disciplina social o técnica que procesa datos sobre la composición y evolución del <strong>patrimonio</strong> de un ente, incluyendo bienes de terceros en su poder y ciertas contingencias, para producir información expresada en moneda.</p>
      </InfoCard>

      <div class="section-block">
        <h4>Principales normativas en Argentina</h4>
        <ul class="list-styled">
          <li><strong>Código Civil y Comercial de la Nación (CCC):</strong>
            <ul class="sub-list">
              <li>Art. 320: Obligación de llevar contabilidad.</li>
              <li>Art. 328: Conservar documentación probatoria por 10 años.</li>
              <li>Establece libros indispensables y requisitos de forma.</li>
            </ul>
          </li>
          <li><strong>Ley General de Sociedades (L.19550):</strong> Requisitos por tipo societario, capital, denominación social, responsabilidad de socios, libros específicos (Actas de Asambleas, Accionistas).</li>
          <li><strong>Resoluciones Técnicas (FACPCE):</strong> RT N° 8, 9, 16 — normas sobre valuación, exposición, clasificación, capital a mantener, moneda homogénea.</li>
          <li><strong>AFIP:</strong> Aplicar, recaudar y fiscalizar tributos. Define tipos de comprobantes según categoría frente al IVA.</li>
        </ul>
      </div>
    </Accordion>

    <!-- 2. Sujetos obligados -->
    <Accordion id="u5-t2" title="Sujetos Obligados a Llevar Libros" :icon="Users" number="Tema 2" color="red">
      <div class="section-block">
        <h4>Obligados</h4>
        <ul class="list-styled">
          <li>Todas las <strong>personas jurídicas privadas</strong> (sociedades, asociaciones civiles, fundaciones, cooperativas, mutuales, consorcios, etc.).</li>
          <li>Quienes realizan una <strong>actividad económica organizada</strong>.</li>
          <li>Titulares de empresa o establecimiento comercial, industrial, agropecuario o de servicios.</li>
          <li>Cualquier persona que solicite inscripción y habilitación de registros.</li>
        </ul>
      </div>
      <InfoCard type="warning" label="Excepciones">
        <p>Personas humanas con <strong>profesiones liberales</strong> o actividades agropecuarias no organizadas en forma de empresa. También pueden eximirse actividades que por su bajo volumen resulten inconvenientes de sujetar a estos deberes.</p>
      </InfoCard>
    </Accordion>

    <!-- 3. Libros obligatorios -->
    <Accordion id="u5-t3" title="Libros Obligatorios y sus Funciones" :icon="BookMarked" number="Tema 3" color="red">
      <div class="section-block">
        <h4>1. Libro Diario</h4>
        <InfoCard type="info" label="Finalidad">
          <p>Registra <strong>cronológicamente</strong> todas las operaciones diarias, basándose en los comprobantes comerciales. Cada anotación se llama <strong>asiento contable</strong>. Es un registro de primera entrada, heterogéneo.</p>
        </InfoCard>
        <ul class="list-styled">
          <li>Debe estar <strong>encuadernado, foliado y rubricado</strong>.</li>
          <li>No se puede alterar el orden, dejar espacios en blanco, borrar, tachar, enmendar, arrancar hojas o mutilar.</li>
        </ul>
        <AccountingEntry
          date="05/03/2019"
          description="Depósito bancario - El Descanso SAS"
          :entries="[
            { cuenta: 'Banco Río cuenta corriente', tipo: 'Activo', debe: 4000 },
            { cuenta: 'Caja', tipo: 'Activo', haber: 4000 }
          ]"
          legend="P/R. depósito bancario"
        />
      </div>

      <div class="section-block">
        <h4>2. Libro de Inventarios y Balances</h4>
        <InfoCard type="info" label="Finalidad">
          <p>Transcribe el detalle del patrimonio al inicio de la empresa y, <strong>anualmente al cierre</strong> de cada ejercicio, el detalle del patrimonio junto con los Estados Contables. También incluye informes de síndicos, dictámenes de auditores y el plan de cuentas.</p>
        </InfoCard>
        <ul class="list-styled">
          <li>Encuadernado, foliado y rubricado.</li>
          <li>Es un registro de <strong>segunda entrada</strong> (compila información de otros registros).</li>
        </ul>
      </div>

      <div class="section-block">
        <h4>Otros libros obligatorios</h4>
        <ul class="list-styled">
          <li><strong>Subdiarios de IVA Compras y Ventas</strong> (exigidos por AFIP).</li>
          <li><strong>Registro Único de Trabajo</strong> (exigido por ley de trabajo).</li>
        </ul>
      </div>

      <div class="section-block">
        <h4>Funciones — Punto de vista Contable</h4>
        <ul class="list-styled">
          <li>Registro detallado y clasificado de todas las operaciones económicas.</li>
          <li>Base para informes financieros (Balance, Estado de Resultados, EEPN, EFE).</li>
          <li>Herramienta de control interno (detecta errores, fraudes).</li>
          <li>Datos útiles para la toma de decisiones.</li>
        </ul>
      </div>

      <div class="section-block">
        <h4>Funciones — Punto de vista Legal</h4>
        <ul class="list-styled">
          <li>Cumplimiento legal y fiscal (evita sanciones).</li>
          <li><strong>Validez probatoria en juicio</strong> (si están en forma, son prueba; si no, prueba en contra).</li>
          <li>Prevención de quiebras fraudulentas.</li>
          <li>Convocatoria de acreedores para evitar quiebra.</li>
          <li>Conservación obligatoria (10 años CCC, 6-10 años según legislaciones).</li>
        </ul>
      </div>
    </Accordion>

    <!-- 4. Orden de uso -->
    <Accordion id="u5-t4" title="Orden de Uso de los Libros Contables" :icon="GitMerge" number="Tema 4" color="red">
      <InfoCard type="definition" label="Proceso contable">
        <p>Conjunto de etapas sucesivas: <strong>Entrada</strong> (comprobantes) → <strong>Procesamiento</strong> (clasificación, registro, cálculo, almacenamiento) → <strong>Salida</strong> (informes contables).</p>
      </InfoCard>

      <div class="flow-steps">
        <div class="flow-step">
          <span class="flow-num">1</span>
          <div class="flow-body">
            <h4>Libro Diario</h4>
            <p>Primer registro. Operaciones cronológicas basadas en comprobantes. Registro heterogéneo de primera entrada.</p>
          </div>
        </div>
        <div class="flow-step">
          <span class="flow-num">2</span>
          <div class="flow-body">
            <h4>Subdiarios (Diarios Auxiliares)</h4>
            <p>Segregación del Diario General. Registros homogéneos (Caja, Ventas, Compras). Permiten división del trabajo. Primera entrada.</p>
          </div>
        </div>
        <div class="flow-step">
          <span class="flow-num">3</span>
          <div class="flow-body">
            <h4>Libro Mayor (Cuentas)</h4>
            <p>Eje del sistema. Datos del Diario se transfieren a cuentas específicas. Registro individualizado (débitos, créditos, saldo). Homogéneo y de segunda entrada. No obligatorio por Código pero habitual.</p>
          </div>
        </div>
        <div class="flow-step">
          <span class="flow-num">4</span>
          <div class="flow-body">
            <h4>Submayores (Subcuentas)</h4>
            <p>Segregación de una cuenta colectiva del Mayor. Ej: "Cliente Carla", "Cliente Mauro". Control analítico. Primera entrada.</p>
          </div>
        </div>
        <div class="flow-step">
          <span class="flow-num">5</span>
          <div class="flow-body">
            <h4>Libro de Inventarios y Balances</h4>
            <p>Se transcriben los Estados Contables básicos (ESP, ER, EEPN, EFE) e inventarios al cierre. Segunda entrada.</p>
          </div>
        </div>
      </div>
    </Accordion>

    <!-- 5. Medios de registración -->
    <Accordion id="u5-t5" title="Medios de Registración Contable" :icon="Laptop" number="Tema 5" color="red">
      <div class="section-block">
        <h4>1. Manual (Manuscrito)</h4>
        <p>Transcripción a mano. Históricamente el más usado, hoy en desuso por lentitud.</p>
      </div>
      <div class="section-block">
        <h4>2. Mecánico (Electrónica antigua)</h4>
        <p>Máquinas de escribir + calculadoras (años 40-70). Mayor velocidad que el manual, pero sin capacidad de almacenamiento contable. Elementos mecánicos aplicados desde 1642.</p>
      </div>
      <div class="section-block">
        <h4>3. Electrónico (Computarizado/Simultáneo)</h4>
        <p>El medio más avanzado. Software contable especializado.</p>
        <ul class="list-styled">
          <li>Mayor velocidad de procesamiento.</li>
          <li>Confiabilidad y precisión.</li>
          <li>Automatización y reportes integrados (inventarios, facturación).</li>
          <li>Gran capacidad de almacenamiento.</li>
          <li>Actualización en tiempo real.</li>
          <li>Ejemplos: Tango Gestión, Bejerman, Tiempo, Quipu, Manager.cl.</li>
        </ul>
      </div>
    </Accordion>

    <!-- 6. Ejemplos de operaciones -->
    <Accordion id="u5-t6" title="Ejemplos de Registración de Operaciones" :icon="PenTool" number="Tema 6" color="red">
      
      <div class="section-block">
        <h4>1. Constitución de la Empresa — Aportes solo de Activos</h4>
        <p>Sra. Carla Páez inicia librería aportando efectivo ($20.000), mobiliario ($50.000) y artículos ($30.000).</p>
        <AccountingEntry
          :entries="[
            { cuenta: 'Caja', tipo: 'Activo', debe: 20000 },
            { cuenta: 'Muebles y útiles', tipo: 'Activo', debe: 50000 },
            { cuenta: 'Mercaderías', tipo: 'Activo', debe: 30000 },
            { cuenta: 'Capital Social', tipo: 'PN', haber: 100000 }
          ]"
          legend="P/R. asiento de constitución de la empresa"
        />
      </div>

      <div class="section-block">
        <h4>2. Constitución con Aportes de A y P (Sociedad)</h4>
        <p>Lamadrid aporta $40.000 en efectivo + vehículo por $60.000. Páez aporta inmueble por $150.000 (excede los $100.000 comprometidos).</p>
        <AccountingEntry
          description="Suscripción de capital"
          :entries="[
            { cuenta: 'Socio Lamadrid cuenta aporte', debe: 100000 },
            { cuenta: 'Socia Páez cuenta aporte', debe: 100000 },
            { cuenta: 'Capital Social', tipo: 'PN', haber: 200000 }
          ]"
          legend="P/R. suscripción de capital"
        />
        <AccountingEntry
          description="Integración Lamadrid"
          :entries="[
            { cuenta: 'Caja', tipo: 'Activo', debe: 40000 },
            { cuenta: 'Rodados', tipo: 'Activo', debe: 60000 },
            { cuenta: 'Socio Lamadrid cuenta aporte', haber: 100000 }
          ]"
          legend="P/R. integración de capital del socio Lamadrid"
        />
        <AccountingEntry
          description="Integración Páez (con exceso)"
          :entries="[
            { cuenta: 'Inmuebles', tipo: 'Activo', debe: 150000 },
            { cuenta: 'Socia Páez cuenta aporte', haber: 100000 },
            { cuenta: 'Socia Páez cuenta particular', haber: 50000 }
          ]"
          legend="P/R. integración de capital del socio Páez (con exceso de aporte)"
        />
      </div>

      <div class="section-block">
        <h4>3. Compra de Mercaderías al Contado</h4>
        <p>"Boin SA" compra 100 pen drives a $100 c/u = $10.000 en efectivo.</p>
        <AccountingEntry
          :entries="[
            { cuenta: 'Mercaderías', tipo: 'Activo', debe: 10000 },
            { cuenta: 'Caja', tipo: 'Activo', haber: 10000 }
          ]"
          legend="P/R. compra de mercaderías al contado"
        />
      </div>

      <div class="section-block">
        <h4>4. Compra de Mercaderías a Crédito</h4>
        <p>"El Descanso SAS" compra 2 colchones a $3.000 c/u ($6.000 total), 50% efectivo y 50% a cuenta corriente.</p>
        <AccountingEntry
          :entries="[
            { cuenta: 'Mercaderías', tipo: 'Activo', debe: 6000 },
            { cuenta: 'Caja', tipo: 'Activo', haber: 3000 },
            { cuenta: 'Proveedores', tipo: 'Pasivo', haber: 3000 }
          ]"
          legend="P/R. compra de mercaderías (parte en efectivo, parte a crédito)"
        />
      </div>

      <div class="section-block">
        <h4>5. Venta de Mercaderías al Contado</h4>
        <p>"El Descanso SAS" vende 2 colchones por $10.000 en efectivo. Costo: $6.000.</p>
        <AccountingEntry
          description="Registro de la venta"
          :entries="[
            { cuenta: 'Caja', tipo: 'Activo', debe: 10000 },
            { cuenta: 'Ventas', tipo: 'R+', haber: 10000 }
          ]"
          legend="P/R. venta de mercaderías al contado"
        />
        <AccountingEntry
          description="Registro del costo"
          :entries="[
            { cuenta: 'Costo de Merc. Vendidas', tipo: 'R-', debe: 6000 },
            { cuenta: 'Mercaderías', tipo: 'Activo', haber: 6000 }
          ]"
          legend="P/R. costo de mercaderías vendidas"
        />
      </div>

      <div class="section-block">
        <h4>6. Pago de Gastos de Servicios</h4>
        <p>"Boin SA" paga boleta de gas por $2.500 en efectivo.</p>
        <AccountingEntry
          :entries="[
            { cuenta: 'Luz, gas y teléfono', tipo: 'R-', debe: 2500 },
            { cuenta: 'Caja', tipo: 'Activo', haber: 2500 }
          ]"
          legend="P/R. pago boleta del gas"
        />
      </div>

      <div class="section-block">
        <h4>7. Pago de Deudas</h4>
        <p>"El Descanso SAS" cancela deuda con Proveedores por $1.000 con cheque del Banco Río.</p>
        <AccountingEntry
          :entries="[
            { cuenta: 'Proveedores', tipo: 'Pasivo', debe: 1000 },
            { cuenta: 'Banco Río cuenta corriente', tipo: 'Activo', haber: 1000 }
          ]"
          legend="P/R. pago deuda en cuenta corriente"
        />
      </div>

      <div class="section-block">
        <h4>8. Cobro de Deudas</h4>
        <AccountingEntry
          :entries="[
            { cuenta: 'Caja', tipo: 'Activo', debe: null },
            { cuenta: 'Deudores por Ventas', tipo: 'Activo', haber: null }
          ]"
          :showTotals="false"
          legend="P/R. cobro de cuenta pendiente a clientes"
        />
      </div>

      <div class="section-block">
        <h4>9. Refinanciación de Deuda</h4>
        <p>"El Descanso SAS" refinancia deuda de $200 con Acreedores Varios, entregando pagaré a 60 días.</p>
        <AccountingEntry
          :entries="[
            { cuenta: 'Acreedores Varios', tipo: 'Pasivo', debe: 200 },
            { cuenta: 'Documentos a pagar', tipo: 'Pasivo', haber: 200 }
          ]"
          legend="P/R. refinanciación de deuda"
        />
      </div>

      <InfoCard type="important" label="Regla de oro">
        <p>En todos los asientos, la suma de los <strong>débitos</strong> debe ser <strong>igual</strong> a la suma de los <strong>créditos</strong> (principio de la partida doble).</p>
      </InfoCard>
    </Accordion>

    <UnitQuiz unitId="5" :questions="quizQuestions" />
  </div>
</template>

<script setup>
import Accordion from '../components/Accordion.vue'
import InfoCard from '../components/InfoCard.vue'
import AccountingEntry from '../components/AccountingEntry.vue'
import UnitQuiz from '../components/UnitQuiz.vue'
import UnitStudyToolkit from '../components/UnitStudyToolkit.vue'
import { Scale, Users, BookMarked, GitMerge, Laptop, PenTool } from 'lucide-vue-next'

const props = defineProps({
  searchQuery: { type: String, default: '' }
})

const topicMeta = [
  { id: 'u5-t1', anchor: 'u5-t1', number: 'Tema 1', title: 'Normas legales contables', keywords: ['ccc', 'ley 19550', 'rt facpce', 'afip'], summary: ['El CCC establece deberes contables básicos.', 'Ley 19550 regula sociedades.', 'RT definen criterios técnicos de información.'] },
  { id: 'u5-t2', anchor: 'u5-t2', number: 'Tema 2', title: 'Sujetos obligados', keywords: ['sujetos obligados', 'actividad organizada', 'excepciones'], summary: ['Personas jurídicas y empresas organizadas deben llevar libros.', 'Existen excepciones para ciertos casos.', 'Depende del tipo y volumen de actividad.'] },
  { id: 'u5-t3', anchor: 'u5-t3', number: 'Tema 3', title: 'Libros obligatorios', keywords: ['libro diario', 'inventarios y balances', 'rubricado'], summary: ['Diario registra en forma cronológica.', 'Inventarios y Balances consolida cierre anual.', 'Cumplen función contable y legal.'] },
  { id: 'u5-t4', anchor: 'u5-t4', number: 'Tema 4', title: 'Orden de uso de libros', keywords: ['orden de uso', 'mayorización', 'subdiarios', 'submayores'], summary: ['El proceso va de comprobante a informe.', 'Diario alimenta Mayor y auxiliares.', 'Luego se elaboran estados contables.'] },
  { id: 'u5-t5', anchor: 'u5-t5', number: 'Tema 5', title: 'Medios de registración', keywords: ['manual', 'mecánico', 'electrónico'], summary: ['Manual: lento y en desuso.', 'Mecánico: transición histórica.', 'Electrónico: rápido, integrado y trazable.'] },
  { id: 'u5-t6', anchor: 'u5-t6', number: 'Tema 6', title: 'Ejemplos de registración', keywords: ['asiento', 'partida doble', 'constitución', 'compras', 'ventas'], summary: ['Los asientos reflejan hechos económicos.', 'Debe y Haber deben equilibrar.', 'Permiten control y toma de decisiones.'] }
]

const flashcards = [
  { question: '¿Qué artículo del CCC obliga a llevar contabilidad?', answer: 'El artículo 320.', level: 'fácil' },
  { question: '¿Cuál es el libro de primera entrada?', answer: 'El Libro Diario.', level: 'fácil' },
  { question: '¿Por qué los libros tienen valor legal?', answer: 'Porque sirven como prueba si cumplen requisitos formales.', level: 'media' },
  { question: '¿Qué ventaja central tiene la registración electrónica?', answer: 'Automatización, velocidad y almacenamiento integrado.', level: 'fácil' },
  { question: '¿Qué regla nunca debe romper un asiento?', answer: 'La igualdad entre débitos y créditos.', level: 'fácil' }
]

const topicQuickChecks = [
  { topicId: 'u5-t1', title: 'Chequeo Tema 1', question: '¿Qué norma técnica emite FACPCE?', options: ['Resoluciones Técnicas', 'Ordenanzas municipales', 'Sentencias'], correctIndex: 0 },
  { topicId: 'u5-t2', title: 'Chequeo Tema 2', question: 'Obligados a llevar libros:', options: ['Solo SA', 'Personas jurídicas y actividad organizada', 'Solo monotributistas'], correctIndex: 1 },
  { topicId: 'u5-t3', title: 'Chequeo Tema 3', question: 'Libro cronológico de operaciones:', options: ['Mayor', 'Inventarios', 'Diario'], correctIndex: 2 },
  { topicId: 'u5-t4', title: 'Chequeo Tema 4', question: 'Mayorización significa:', options: ['Pasar del Diario al Mayor', 'Cerrar caja', 'Rubricar libros'], correctIndex: 0 },
  { topicId: 'u5-t5', title: 'Chequeo Tema 5', question: 'Medio más avanzado de registración:', options: ['Manual', 'Electrónico', 'Mecánico'], correctIndex: 1 },
  { topicId: 'u5-t6', title: 'Chequeo Tema 6', question: 'Principio de partida doble:', options: ['Debe = Haber', 'Activo = Pasivo', 'Caja = Banco'], correctIndex: 0 }
]

const quizQuestions = [
  {
    question: "La Ley 19550 y las Resoluciones Técnicas de FACPCE regulan la contabilidad. ¿Cuál es la diferencia clave entre ambas?",
    options: [
      "La L.19550 reemplaza completamente al Código Civil y Comercial",
      "La L.19550 regula aspectos societarios y de responsabilidad; las RT establecen normas técnicas de valuación y exposición contable",
      "Las RT son voluntarias; la L.19550 es la única norma obligatoria",
      "La FACPCE es un organismo estatal equivalente a AFIP con poder de recaudación"
    ],
    correctIndex: 1
  },
  {
    question: "Un médico trabaja en su propio consultorio sin empleados ni estructura empresarial. ¿Está obligado a llevar contabilidad?",
    options: [
      "Sí, todo contribuyente activo debe llevar libros sin excepción",
      "No, las profesiones liberales no organizadas en forma de empresa pueden estar eximidas de esa obligación",
      "Solo si factura por encima del tope del Monotributo",
      "Sí, pero solo debe llevar el Libro de Caja"
    ],
    correctIndex: 1
  },
  {
    question: "En un juicio comercial, la contraparte alega que los libros de la empresa no son prueba válida. ¿Cuándo sí lo son a favor del ente?",
    options: [
      "Siempre que estén firmados por un contador público matriculado",
      "Cuando están encuadernados, foliados, rubricados y sin alteraciones ni espacios en blanco",
      "Solo si han sido auditados externamente al cierre de cada ejercicio",
      "Únicamente en juicios laborales, no en litigios comerciales"
    ],
    correctIndex: 1
  },
  {
    question: "Los importes registrados en el Libro Diario se 'pasan' a cuentas específicas para conocer el saldo de cada una. ¿Cómo se llama ese proceso?",
    options: [
      "Rubricación del libro",
      "Pasaje al Mayor o mayorización",
      "Foliación del ejercicio",
      "Arqueo de caja"
    ],
    correctIndex: 1
  },
  {
    question: "El software contable actualiza el stock automáticamente al cargar una factura de venta. ¿Qué ventaja específica del medio electrónico ejemplifica esto?",
    options: [
      "Mayor lentitud de procesamiento para reducir errores",
      "Reduce la necesidad de emitir comprobantes físicos",
      "Automatización de procesos y actualización en tiempo real de información integrada",
      "Elimina la obligación legal de llevar el Libro Diario"
    ],
    correctIndex: 2
  },
  {
    question: "'El Descanso SAS' compra mercaderías por $6.000: paga $3.000 en efectivo y deja $3.000 a crédito. ¿Cuántas cuentas intervienen en el asiento y cuáles son?",
    options: [
      "Dos: Mercaderías (D) y Caja (H)",
      "Tres: Mercaderías (D), Caja (H) y Proveedores (H)",
      "Cuatro: Mercaderías (D), IVA Crédito (D), Caja (H) y Proveedores (H)",
      "Una sola: Caja (D) por el pago realizado"
    ],
    correctIndex: 1
  },
  {
    question: "Al constituir la empresa, los socios suscriben capital pero no entregan los bienes de inmediato. ¿Por qué se registra primero 'Socios cuenta aporte' y no directamente los bienes al Capital?",
    options: [
      "Porque todo asiento de constitución debe tener obligatoriamente 3 cuentas",
      "Para separar el momento de la suscripción del de la integración, dejando constancia de cuándo se comprometió y cuándo se entregó efectivamente cada aporte",
      "Porque el Capital Social no puede ser acreditado directamente en ningún asiento",
      "Porque es un requisito exclusivo de las SA con más de 2 socios"
    ],
    correctIndex: 1
  },
  {
    question: "El Libro Mayor no es obligatorio según el Código Civil y Comercial, pero todas las empresas lo llevan. ¿Por qué razón práctica es imprescindible?",
    options: [
      "Porque AFIP lo exige para autorizar la emisión de facturas A",
      "Sin él sería imposible conocer el saldo de cada cuenta y elaborar los estados contables básicos",
      "Porque la Ley 19550 lo exige específicamente para las SA",
      "Porque las NIIF internacionales lo establecen como obligatorio"
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

/* Flow Steps */
.flow-steps {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin: 16px 0;
}

.flow-step {
  display: flex;
  gap: 16px;
  padding: 14px 18px;
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  transition: all var(--transition-fast);
}

.flow-step:hover {
  border-color: var(--border-color-hover);
  background: var(--bg-card-hover);
}

.flow-num {
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--accent-red-soft);
  color: var(--accent-red);
  border-radius: 50%;
  font-weight: 700;
  font-size: 0.85rem;
  flex-shrink: 0;
}

.flow-body h4 {
  font-size: 0.92rem;
  margin-bottom: 4px;
}

.flow-body p {
  font-size: 0.82rem;
  margin: 0;
}

@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(16px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>
