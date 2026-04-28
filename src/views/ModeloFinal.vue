<template>
  <div class="unit-view">
    <div class="unit-header">
      <span class="unit-badge badge badge-gold">Modelo de Final</span>
      <h1>Cuestionario Modelo de Examen Final</h1>
      <p class="unit-subtitle">13 preguntas de opción múltiple — revisá las respuestas correctas y su fundamentación antes de practicar</p>
    </div>

    <InfoCard type="important" label="Antes de empezar">
      <p>Cada pregunta está referenciada a la <strong>Unidad y Tema</strong> donde se desarrolla el contenido. Revisá la fundamentación de cada respuesta, luego usá el cuestionario interactivo al final para ponerte a prueba.</p>
    </InfoCard>

    <!-- UNIDAD 1 -->
    <Accordion title="Unidad 1 — Contabilidad y Organización Empresarial" :icon="Building2" number="Preguntas 1 a 4" color="blue" :defaultOpen="true">

      <div class="exam-question">
        <div class="eq-header">
          <span class="eq-number">1</span>
          <p class="eq-text">Un ente puede ser:</p>
        </div>
        <div class="eq-options">
          <div class="eq-option correct"><span class="opt-letter correct-letter">A</span> Una persona física <span class="correct-tag">✓ Correcta</span></div>
          <div class="eq-option correct"><span class="opt-letter correct-letter">B</span> Una persona colectiva <span class="correct-tag">✓ Correcta</span></div>
          <div class="eq-option wrong"><span class="opt-letter wrong-letter">C</span> Física con categoría jurídica</div>
          <div class="eq-option wrong"><span class="opt-letter wrong-letter">D</span> Ninguna de las anteriores</div>
        </div>
        <InfoCard type="info" label="Fundamentación">
          <p>El ente es el sujeto de la Contabilidad. Puede ser una <strong>persona individual (humana)</strong> o una <strong>persona colectiva</strong> (organización, sociedad o grupo legalmente consolidado), capaces de adquirir derechos y contraer obligaciones. <em>La opción C no existe como categoría.</em></p>
        </InfoCard>
        <p class="eq-ref">📍 <strong>Unidad 1 — Tema 1:</strong> Ente, Persona Física y Persona Jurídica</p>
      </div>

      <div class="eq-divider"></div>

      <div class="exam-question">
        <div class="eq-header">
          <span class="eq-number">2</span>
          <p class="eq-text">Una organización puede referirse solamente a:</p>
        </div>
        <div class="eq-options">
          <div class="eq-option wrong"><span class="opt-letter wrong-letter">A</span> Una persona física</div>
          <div class="eq-option correct"><span class="opt-letter correct-letter">B</span> Una persona colectiva <span class="correct-tag">✓ Correcta</span></div>
          <div class="eq-option wrong"><span class="opt-letter wrong-letter">C</span> Física con categoría jurídica</div>
          <div class="eq-option wrong"><span class="opt-letter wrong-letter">D</span> Ninguna de las anteriores</div>
        </div>
        <InfoCard type="info" label="Fundamentación">
          <p>En contabilidad y administración, una <strong>organización</strong> se refiere a una persona <strong>moral o colectiva</strong> (empresa, institución, asociación). <em>No es una persona física individual.</em> A diferencia del ente, la organización requiere estructura, división del trabajo y centros de poder.</p>
        </InfoCard>
        <p class="eq-ref">📍 <strong>Unidad 1 — Tema 2:</strong> Organización: Concepto y Elementos</p>
      </div>

      <div class="eq-divider"></div>

      <div class="exam-question">
        <div class="eq-header">
          <span class="eq-number">3</span>
          <p class="eq-text">Característica de la organización:</p>
        </div>
        <div class="eq-options">
          <div class="eq-option correct"><span class="opt-letter correct-letter">A</span> Son sistemas sociales <span class="correct-tag">✓ Correcta</span></div>
          <div class="eq-option wrong"><span class="opt-letter wrong-letter">B</span> Perduran en el tiempo</div>
          <div class="eq-option wrong"><span class="opt-letter wrong-letter">C</span> Informan patrimonio de una organización</div>
          <div class="eq-option wrong"><span class="opt-letter wrong-letter">D</span> Ninguna de las anteriores</div>
        </div>
        <InfoCard type="info" label="Fundamentación">
          <p>La organización es definida como un <strong>sistema social</strong> o unidad social deliberadamente construida para alcanzar fines específicos. Las opciones B y C corresponden a otras definiciones (la empresa en marcha y los informes contables, respectivamente).</p>
        </InfoCard>
        <p class="eq-ref">📍 <strong>Unidad 1 — Tema 2:</strong> Organización: Concepto y Elementos</p>
      </div>

      <div class="eq-divider"></div>

      <div class="exam-question">
        <div class="eq-header">
          <span class="eq-number">4</span>
          <p class="eq-text">La Administración, su objeto de estudio es:</p>
        </div>
        <div class="eq-options">
          <div class="eq-option wrong"><span class="opt-letter wrong-letter">A</span> Ciencia social</div>
          <div class="eq-option correct"><span class="opt-letter correct-letter">B</span> Organizaciones <span class="correct-tag">✓ Correcta</span></div>
          <div class="eq-option wrong"><span class="opt-letter wrong-letter">C</span> Integrantes</div>
          <div class="eq-option wrong"><span class="opt-letter wrong-letter">D</span> Ninguna de las anteriores</div>
        </div>
        <InfoCard type="info" label="Fundamentación">
          <p>La <strong>Administración</strong> tiene como objeto de estudio las <strong>organizaciones</strong>: cómo se estructuran, funcionan, coordinan recursos y logran sus fines. La Contabilidad, en cambio, estudia el patrimonio. La opción A describe la naturaleza de la Administración como disciplina, no su objeto.</p>
        </InfoCard>
        <p class="eq-ref">📍 <strong>Unidad 1 — Tema 2:</strong> Organización: Concepto y Elementos</p>
      </div>
    </Accordion>

    <!-- UNIDAD 2 -->
    <Accordion title="Unidad 2 — Aspectos Contables y Fiscales" :icon="ClipboardList" number="Preguntas 5 y 6" color="teal">

      <div class="exam-question">
        <div class="eq-header">
          <span class="eq-number">5</span>
          <p class="eq-text">El recibo es el documento que se envía informando que:</p>
        </div>
        <div class="eq-options">
          <div class="eq-option correct"><span class="opt-letter correct-letter">A</span> Disminuyó la deuda <span class="correct-tag">✓ Correcta</span></div>
          <div class="eq-option wrong"><span class="opt-letter wrong-letter">B</span> Aumentó la deuda</div>
          <div class="eq-option wrong"><span class="opt-letter wrong-letter">C</span> Pago parcial</div>
          <div class="eq-option wrong"><span class="opt-letter wrong-letter">D</span> Ninguna de las anteriores</div>
        </div>
        <InfoCard type="info" label="Fundamentación">
          <p>El <strong>recibo</strong> es el comprobante que respalda un pago, emitido por el beneficiario. Al recibir un recibo, el deudor obtiene constancia de haber realizado un pago, lo que disminuye su deuda pendiente. <em>No confundir con la Nota de Débito (aumenta la deuda) ni la Nota de Crédito (disminuye por devolución o error, no por pago).</em></p>
        </InfoCard>
        <p class="eq-ref">📍 <strong>Unidad 2 — Tema 6:</strong> Documentación Respaldatoria en Detalle</p>
      </div>

      <div class="eq-divider"></div>

      <div class="exam-question">
        <div class="eq-header">
          <span class="eq-number">6</span>
          <p class="eq-text">Régimen General. Se abona una cuota mensual para la categoría:</p>
        </div>
        <div class="eq-options">
          <div class="eq-option wrong"><span class="opt-letter wrong-letter">A</span> Fija</div>
          <div class="eq-option wrong"><span class="opt-letter wrong-letter">B</span> Creciente</div>
          <div class="eq-option wrong"><span class="opt-letter wrong-letter">C</span> Con aumentos progresivos</div>
          <div class="eq-option correct"><span class="opt-letter correct-letter">D</span> Ninguna de las anteriores <span class="correct-tag">✓ Correcta</span></div>
        </div>
        <InfoCard type="warning" label="Atención — Pregunta con trampa">
          <p>El <strong>Régimen General NO tiene categorías ni cuota mensual fija</strong>. IVA y Ganancias se liquidan por separado según la facturación real de cada período. <strong>Es el Monotributo</strong> (Régimen Simplificado) quien tiene cuota mensual <em>fija</em> por categoría. Si la pregunta dice "Régimen General", la respuesta es D.</p>
        </InfoCard>
        <p class="eq-ref">📍 <strong>Unidad 2 — Tema 2:</strong> Monotributo / <strong>Tema 3:</strong> Régimen General</p>
      </div>
    </Accordion>

    <!-- UNIDAD 3 -->
    <Accordion title="Unidad 3 — Informes, Patrimonio y Ecuaciones" :icon="Scale" number="Preguntas 7, 8, 9 y 11" color="amber">

      <div class="exam-question">
        <div class="eq-header">
          <span class="eq-number">7</span>
          <p class="eq-text">Usuarios de los informes contables:</p>
        </div>
        <div class="eq-options">
          <div class="eq-option correct"><span class="opt-letter correct-letter">A</span> Empleados <span class="correct-tag">✓ Correcta</span></div>
          <div class="eq-option correct"><span class="opt-letter correct-letter">B</span> Propietarios <span class="correct-tag">✓ Correcta</span></div>
          <div class="eq-option correct"><span class="opt-letter correct-letter">C</span> Gobierno <span class="correct-tag">✓ Correcta</span></div>
          <div class="eq-option correct"><span class="opt-letter correct-letter">D</span> Bancos <span class="correct-tag">✓ Correcta</span></div>
          <div class="eq-option wrong"><span class="opt-letter wrong-letter">E</span> Ninguna de las anteriores</div>
        </div>
        <InfoCard type="info" label="Fundamentación">
          <p>Los informes contables tienen <strong>múltiples usuarios</strong>. <em>Internos:</em> dirección, administradores, propietarios, empleados. <em>Externos:</em> AFIP/Gobierno (base para impuestos), entidades de crédito/Bancos (evaluar financiación), inversores, acreedores y el público en general. <strong>Todas las opciones A-D son correctas.</strong></p>
        </InfoCard>
        <p class="eq-ref">📍 <strong>Unidad 1 — Temas 9-11:</strong> Objeto e Informes / <strong>Unidad 3 — Tema 1:</strong> Uso Interno y Externo</p>
      </div>

      <div class="eq-divider"></div>

      <div class="exam-question">
        <div class="eq-header">
          <span class="eq-number">8</span>
          <p class="eq-text">Si estamos en el momento inicial la llamamos ecuación patrimonial:</p>
        </div>
        <div class="eq-options">
          <div class="eq-option correct"><span class="opt-letter correct-letter">A</span> Estática <span class="correct-tag">✓ Correcta</span></div>
          <div class="eq-option wrong"><span class="opt-letter wrong-letter">B</span> Dinámica</div>
          <div class="eq-option wrong"><span class="opt-letter wrong-letter">C</span> General</div>
          <div class="eq-option wrong"><span class="opt-letter wrong-letter">D</span> Ninguna de las anteriores</div>
        </div>
        <InfoCard type="info" label="Fundamentación">
          <p>La <strong>Ecuación Patrimonial Estática</strong> representa el momento inicial: <code>ACTIVO = PASIVO + CAPITAL SOCIAL</code>. Se llama estática porque es una foto del patrimonio en un instante dado, sin resultados acumulados. La <em>dinámica</em> incorpora resultados: <code>A = P + CS ± Resultados</code>.</p>
        </InfoCard>
        <p class="eq-ref">📍 <strong>Unidad 3 — Tema 3:</strong> Capital y Ecuación Patrimonial Estática</p>
      </div>

      <div class="eq-divider"></div>

      <div class="exam-question">
        <div class="eq-header">
          <span class="eq-number">9</span>
          <p class="eq-text">El pasivo está formado por deuda en:</p>
        </div>
        <div class="eq-options">
          <div class="eq-option correct"><span class="opt-letter correct-letter">A</span> Dinero <span class="correct-tag">✓ Correcta</span></div>
          <div class="eq-option correct"><span class="opt-letter correct-letter">B</span> Bienes <span class="correct-tag">✓ Correcta</span></div>
          <div class="eq-option correct"><span class="opt-letter correct-letter">C</span> Prestar servicios <span class="correct-tag">✓ Correcta</span></div>
          <div class="eq-option wrong"><span class="opt-letter wrong-letter">D</span> Solo las vencidas</div>
        </div>
        <InfoCard type="info" label="Fundamentación">
          <p>El <strong>Pasivo</strong> son las deudas, compromisos y obligaciones de la empresa. Incluye la obligación de <strong>entregar dinero, bienes o prestar servicios</strong>. No se limita a las deudas ya vencidas (eso sería solo el Pasivo Corriente); también incluye las no corrientes (a más de 12 meses). Las opciones A, B y C son todas correctas.</p>
        </InfoCard>
        <p class="eq-ref">📍 <strong>Unidad 3 — Tema 2:</strong> Activo, Pasivo y Patrimonio Neto</p>
      </div>

      <div class="eq-divider"></div>

      <div class="exam-question">
        <div class="eq-header">
          <span class="eq-number">11</span>
          <p class="eq-text">El principio de lo devengado es un principio contable según el cual los resultados de la actividad se deben registrar:</p>
        </div>
        <div class="eq-options">
          <div class="eq-option correct"><span class="opt-letter correct-letter">A</span> En el momento en que ocurren <span class="correct-tag">✓ Correcta</span></div>
          <div class="eq-option wrong"><span class="opt-letter wrong-letter">B</span> En el momento del pago</div>
          <div class="eq-option wrong"><span class="opt-letter wrong-letter">C</span> Cuando se producen ambas cosas en forma conjunta</div>
          <div class="eq-option wrong"><span class="opt-letter wrong-letter">D</span> Todas son incorrectas</div>
        </div>
        <InfoCard type="info" label="Fundamentación">
          <p>La <strong>base devengado</strong> registra la transacción <em>en el momento en que se realiza el hecho económico</em>, aunque el cobro o pago sea posterior. Es el criterio <strong>obligatorio en Argentina</strong> (NIIF, PCGA, Resoluciones Técnicas). La opción B describe la <em>base percibido</em>, que se usa para el Estado de Flujo de Efectivo.</p>
        </InfoCard>
        <p class="eq-ref">📍 <strong>Unidad 3 — Tema 9:</strong> Base Devengado vs Base Percibido</p>
      </div>
    </Accordion>

    <!-- UNIDAD 4 -->
    <Accordion title="Unidad 4 — Cuentas Contables" :icon="BarChart3" number="Preguntas 10 y 13" color="purple">

      <div class="exam-question">
        <div class="eq-header">
          <span class="eq-number">10</span>
          <p class="eq-text">El manual de cuentas es:</p>
        </div>
        <div class="eq-options">
          <div class="eq-option wrong"><span class="opt-letter wrong-letter">A</span> Listado analítico de cuentas</div>
          <div class="eq-option correct"><span class="opt-letter correct-letter">B</span> Detalle de cuentas con sus procedimientos <span class="correct-tag">✓ Correcta</span></div>
          <div class="eq-option wrong"><span class="opt-letter wrong-letter">C</span> Casos prácticos de ejemplos</div>
          <div class="eq-option wrong"><span class="opt-letter wrong-letter">D</span> Ninguna de las anteriores</div>
        </div>
        <InfoCard type="info" label="Fundamentación">
          <p>El <strong>Manual de Cuentas</strong> es el complemento del Plan de Cuentas. Contiene instrucciones detalladas de cómo usar cada cuenta: tipo, saldo habitual, qué representa el saldo, cuándo se debita y cuándo se acredita. <em>No confundir con el Plan de Cuentas</em>, que es el listado ordenado y codificado (opción A).</p>
        </InfoCard>
        <p class="eq-ref">📍 <strong>Unidad 4 — Tema 7:</strong> Manual de Cuentas</p>
      </div>

      <div class="eq-divider"></div>

      <div class="exam-question">
        <div class="eq-header">
          <span class="eq-number">13</span>
          <p class="eq-text">Las cuentas regularizadoras:</p>
        </div>
        <div class="eq-options">
          <div class="eq-option correct"><span class="opt-letter correct-letter">A</span> Ajustan a la cuenta principal <span class="correct-tag">✓ Correcta</span></div>
          <div class="eq-option wrong"><span class="opt-letter wrong-letter">B</span> Se registran en la cuenta madre</div>
          <div class="eq-option wrong"><span class="opt-letter wrong-letter">C</span> Tienen el mismo saldo que la principal</div>
          <div class="eq-option wrong"><span class="opt-letter wrong-letter">D</span> Ninguna de las anteriores</div>
        </div>
        <InfoCard type="info" label="Fundamentación">
          <p>Las <strong>cuentas regularizadoras</strong> ajustan el valor de una cuenta principal de Activo o Pasivo para mostrar un monto más fidedigno. Tienen <strong>saldo opuesto</strong> a la cuenta que regularizan (no igual: opción C es incorrecta). Ej: <em>Amortizaciones Acumuladas</em> (saldo acreedor) regulariza <em>Bienes de Uso</em> (saldo deudor).</p>
        </InfoCard>
        <p class="eq-ref">📍 <strong>Unidad 4 — Tema 2:</strong> Clasificación de Cuentas según Naturaleza</p>
      </div>
    </Accordion>

    <!-- UNIDAD 5 -->
    <Accordion title="Unidad 5 — Registración Contable y Normativa Legal" :icon="BookOpen" number="Pregunta 12" color="red">

      <div class="exam-question">
        <div class="eq-header">
          <span class="eq-number">12</span>
          <p class="eq-text">Los sistemas de registración es la coordinación de un conjunto de:</p>
        </div>
        <div class="eq-options">
          <div class="eq-option wrong"><span class="opt-letter wrong-letter">A</span> Comprobantes</div>
          <div class="eq-option wrong"><span class="opt-letter wrong-letter">B</span> Cuentas</div>
          <div class="eq-option wrong"><span class="opt-letter wrong-letter">C</span> Registros</div>
          <div class="eq-option correct"><span class="opt-letter correct-letter">D</span> Todas las anteriores <span class="correct-tag">✓ Correcta</span></div>
          <div class="eq-option wrong"><span class="opt-letter wrong-letter">E</span> Ninguna de las anteriores</div>
        </div>
        <InfoCard type="info" label="Fundamentación">
          <p>Un sistema de registración contable coordina los tres elementos: <strong>comprobantes</strong> (fuente de datos, entrada al sistema), <strong>cuentas</strong> (instrumento de clasificación y medición patrimonial) y <strong>registros/libros</strong> (donde se asientan cronológicamente las operaciones). El proceso contable integra todos en secuencia.</p>
        </InfoCard>
        <p class="eq-ref">📍 <strong>Unidad 5 — Tema 4:</strong> Orden de Uso de los Libros Contables</p>
      </div>
    </Accordion>

    <!-- Resumen tabla -->
    <Accordion title="Resumen de distribución por unidad" :icon="GraduationCap" number="Mapa" color="gold">
      <div class="summary-grid">
        <div class="summary-card card-blue">
          <span class="summary-badge">Unidad 1</span>
          <p class="summary-title">Contabilidad y Organización</p>
          <p class="summary-qs">Preguntas 1, 2, 3, 4 <span class="also">(+ parcial en P7)</span></p>
        </div>
        <div class="summary-card card-teal">
          <span class="summary-badge">Unidad 2</span>
          <p class="summary-title">Aspectos Contables y Fiscales</p>
          <p class="summary-qs">Preguntas 5, 6</p>
        </div>
        <div class="summary-card card-amber">
          <span class="summary-badge">Unidad 3</span>
          <p class="summary-title">Informes, Patrimonio y Ecuaciones</p>
          <p class="summary-qs">Preguntas 7, 8, 9, 11</p>
        </div>
        <div class="summary-card card-purple">
          <span class="summary-badge">Unidad 4</span>
          <p class="summary-title">Cuentas Contables</p>
          <p class="summary-qs">Preguntas 10, 13</p>
        </div>
        <div class="summary-card card-red">
          <span class="summary-badge">Unidad 5</span>
          <p class="summary-title">Registración y Normativa</p>
          <p class="summary-qs">Pregunta 12</p>
        </div>
      </div>
    </Accordion>

    <UnitQuiz unitId="final-1" :questions="quizQuestions" />
  </div>
</template>

<script setup>
import Accordion from '../components/Accordion.vue'
import InfoCard from '../components/InfoCard.vue'
import UnitQuiz from '../components/UnitQuiz.vue'
import { Building2, ClipboardList, Scale, BarChart3, BookOpen, GraduationCap } from 'lucide-vue-next'

defineProps({
  searchQuery: { type: String, default: '' }
})

const quizQuestions = [
  {
    question: '¿Qué puede ser un ente?',
    options: [
      'Solo una persona física con actividad económica',
      'Solo una persona colectiva o jurídica',
      'Una persona física o una persona colectiva',
      'Solo entidades inscriptas en registros públicos'
    ],
    correctIndex: 2
  },
  {
    question: 'En términos contables y administrativos, una organización se refiere solamente a:',
    options: [
      'Una persona física con actividad económica registrada',
      'Una persona colectiva (empresa, institución, asociación)',
      'Cualquier individuo que realice operaciones comerciales',
      'Solo empresas con fines de lucro'
    ],
    correctIndex: 1
  },
  {
    question: '¿Cuál de las siguientes es una característica que distingue a las organizaciones?',
    options: [
      'Son sistemas sociales deliberadamente construidos para alcanzar fines',
      'Perduran indefinidamente sin posibilidad de disolución',
      'Informan el patrimonio personal de sus propietarios',
      'Solo pueden tener fines de lucro para ser consideradas organizaciones'
    ],
    correctIndex: 0
  },
  {
    question: '¿Cuál es el objeto de estudio de la Administración?',
    options: [
      'Las ciencias sociales en su conjunto',
      'Las organizaciones',
      'Los integrantes individuales de los entes',
      'El patrimonio de las empresas privadas'
    ],
    correctIndex: 1
  },
  {
    question: 'El recibo es el documento que acredita que:',
    options: [
      'Disminuyó la deuda (se realizó un pago)',
      'Aumentó la deuda del receptor del recibo',
      'Se entregó la mercadería al cliente',
      'Se facturó una nueva operación comercial'
    ],
    correctIndex: 0
  },
  {
    question: 'En el Régimen General, la cuota mensual por categoría es:',
    options: [
      'Fija, determinada según la categoría del contribuyente',
      'Creciente con aumentos progresivos trimestrales',
      'Variable según los ingresos declarados cada mes',
      'Ninguna de las anteriores — el Régimen General no tiene cuota mensual fija por categoría'
    ],
    correctIndex: 3
  },
  {
    question: '¿Quiénes son usuarios de los informes contables?',
    options: [
      'Solo los propietarios, porque son quienes toman decisiones',
      'Solo el gobierno (AFIP) con fines fiscales',
      'Solo los bancos y entidades de crédito externas',
      'Empleados, propietarios, gobierno, bancos y otros terceros interesados'
    ],
    correctIndex: 3
  },
  {
    question: 'La ecuación patrimonial que representa el momento inicial de la empresa se denomina:',
    options: [
      'Ecuación estática: ACTIVO = PASIVO + CAPITAL SOCIAL',
      'Ecuación dinámica: ACTIVO = PASIVO + CS ± RESULTADOS',
      'Ecuación general: PATRIMONIO NETO = ACTIVO − PASIVO',
      'Ninguna de las anteriores'
    ],
    correctIndex: 0
  },
  {
    question: 'El pasivo está formado por obligaciones de:',
    options: [
      'Entregar únicamente dinero en efectivo o depósito',
      'Entregar únicamente bienes materiales',
      'Entregar dinero, bienes o prestar servicios',
      'Solo las deudas ya vencidas (exigibles de inmediato)'
    ],
    correctIndex: 2
  },
  {
    question: 'El manual de cuentas es:',
    options: [
      'Un listado ordenado y codificado de todas las cuentas contables',
      'El detalle de cómo utilizar cada cuenta: tipo, saldo, cuándo debitar/acreditar',
      'Una colección de casos prácticos y ejemplos de asientos contables',
      'El mismo documento que el Plan de Cuentas, con otra denominación'
    ],
    correctIndex: 1
  },
  {
    question: 'El principio de lo devengado establece que los resultados deben registrarse:',
    options: [
      'En el momento en que se percibe el cobro o se efectúa el pago',
      'En el momento en que los hechos económicos ocurren, sin importar el flujo de fondos',
      'Solo cuando el hecho económico y el pago se producen en forma simultánea',
      'Al cierre del ejercicio anual en una sola registración globalizada'
    ],
    correctIndex: 1
  },
  {
    question: 'Los sistemas de registración coordinan un conjunto de:',
    options: [
      'Solo comprobantes como fuente documental primaria',
      'Solo registros y libros contables obligatorios',
      'Solo las cuentas del plan contable vigente',
      'Comprobantes, cuentas y registros (todas las anteriores)'
    ],
    correctIndex: 3
  },
  {
    question: 'Las cuentas regularizadoras:',
    options: [
      'Ajustan el valor de la cuenta principal para mostrar un monto más fidedigno',
      'Se registran directamente dentro de la cuenta madre que regularizan',
      'Tienen el mismo saldo que la cuenta principal que corrigen',
      'Solo existen para cuentas del pasivo (deudas comerciales)'
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

.badge-gold {
  background: var(--accent-gold-soft);
  color: var(--accent-gold);
  border: 1px solid var(--accent-gold);
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

/* Exam question layout */
.exam-question {
  padding: 0 0 4px;
}

.eq-header {
  display: flex;
  align-items: flex-start;
  gap: 14px;
  margin-bottom: 14px;
}

.eq-number {
  flex-shrink: 0;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: var(--accent-gold-soft);
  color: var(--accent-gold);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 0.85rem;
  border: 1px solid var(--accent-gold);
  margin-top: 1px;
}

.eq-text {
  font-size: 1rem;
  font-weight: 600;
  color: var(--text-primary);
  line-height: 1.5;
  margin: 0;
}

.eq-options {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 16px;
  padding-left: 42px;
}

.eq-option {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 9px 14px;
  border-radius: var(--radius-md);
  font-size: 0.9rem;
  background: var(--bg-tertiary);
  border: 1px solid transparent;
  color: var(--text-secondary);
}

.eq-option.correct {
  background: var(--accent-teal-soft);
  border-color: var(--accent-teal);
  color: var(--text-primary);
  font-weight: 500;
}

.eq-option.wrong {
  opacity: 0.6;
}

.exam-question code {
  display: inline-block;
  margin: 0 2px;
  padding: 2px 8px;
  border-radius: 999px;
  border: 1px solid var(--accent-amber);
  background: color-mix(in srgb, var(--accent-amber) 16%, var(--bg-card));
  color: var(--text-primary);
  font-family: 'JetBrains Mono', 'Fira Code', monospace;
  font-size: 0.8rem;
  font-weight: 700;
  letter-spacing: 0.01em;
  box-shadow: 2px 2px 0 var(--border-color);
}

.opt-letter {
  flex-shrink: 0;
  width: 22px;
  height: 22px;
  border-radius: 4px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 0.75rem;
  font-weight: 700;
}

.opt-letter.correct-letter {
  background: var(--accent-teal);
  color: #fff;
}

.opt-letter.wrong-letter {
  background: var(--bg-secondary);
  color: var(--text-muted);
  border: 1px solid var(--border-color);
}

.correct-tag {
  margin-left: auto;
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--accent-teal);
  white-space: nowrap;
}

.eq-ref {
  font-size: 0.8rem;
  color: var(--text-muted);
  padding-left: 42px;
  margin: 12px 0 0;
}

.eq-divider {
  border: none;
  border-top: 1px dashed var(--border-color);
  margin: 24px 0;
}

/* Summary grid */
.summary-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 12px;
}

.summary-card {
  padding: 14px 16px;
  border-radius: var(--radius-md);
  border: 1px solid var(--border-color);
  background: var(--bg-tertiary);
}

.summary-badge {
  font-size: 0.7rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  padding: 2px 8px;
  border-radius: 10px;
  display: inline-block;
  margin-bottom: 8px;
}

.card-blue .summary-badge { background: var(--accent-blue-soft); color: var(--accent-blue); }
.card-teal .summary-badge { background: var(--accent-teal-soft); color: var(--accent-teal); }
.card-amber .summary-badge { background: var(--accent-amber-soft); color: var(--accent-amber); }
.card-purple .summary-badge { background: var(--accent-purple-soft); color: var(--accent-purple); }
.card-red .summary-badge { background: var(--accent-red-soft); color: var(--accent-red); }

.summary-title {
  font-size: 0.82rem;
  font-weight: 600;
  color: var(--text-primary);
  margin: 0 0 4px;
}

.summary-qs {
  font-size: 0.78rem;
  color: var(--text-secondary);
  margin: 0;
}

.summary-qs .also {
  color: var(--text-muted);
  font-size: 0.72rem;
}

@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(16px); }
  to { opacity: 1; transform: translateY(0); }
}

@media (max-width: 768px) {
  .exam-question code {
    font-size: 0.74rem;
  }
}
</style>
