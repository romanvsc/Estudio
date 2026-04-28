<template>
  <div class="unit-view">
    <div class="unit-header">
      <span class="unit-badge badge badge-gold">Modelo de Final 2</span>
      <h1>Cuestionario Modelo de Examen Final — N° 2</h1>
      <p class="unit-subtitle">13 preguntas de opción múltiple — temario distinto al Modelo 1, misma metodología</p>
    </div>

    <InfoCard type="important" label="Antes de empezar">
      <p>Las preguntas de este modelo cubren temas <strong>no incluidos en el Modelo 1</strong>. Cada respuesta incluye fundamentación y referencia a su Unidad y Tema específico. Practicá con el cuestionario interactivo al final.</p>
    </InfoCard>

    <!-- UNIDAD 1 -->
    <Accordion title="Unidad 1 — Contabilidad y Organización Empresarial" :icon="Building2" number="Preguntas 1 a 4" color="blue" :defaultOpen="true">

      <div class="exam-question">
        <div class="eq-header">
          <span class="eq-number">1</span>
          <p class="eq-text">¿Quién publicó en 1494 la primera exposición impresa del método de la partida doble?</p>
        </div>
        <div class="eq-options">
          <div class="eq-option wrong"><span class="opt-letter wrong-letter">A</span> Leonardo Fibonacci</div>
          <div class="eq-option correct"><span class="opt-letter correct-letter">B</span> Luca Pacioli <span class="correct-tag">✓ Correcta</span></div>
          <div class="eq-option wrong"><span class="opt-letter wrong-letter">C</span> Francesco Villa</div>
          <div class="eq-option wrong"><span class="opt-letter wrong-letter">D</span> Ninguna de las anteriores</div>
        </div>
        <InfoCard type="info" label="Fundamentación">
          <p>En 1494, <strong>Luca Pacioli</strong> publicó la <em>"Summa de Aritmética, Geometría, Proporción y Proporcionalidad"</em>, que incluía el tratado <em>"De Computis et Scripturis"</em> — la primera exposición impresa de la partida doble. <em>Fibonacci</em> (1202) sentó las bases matemáticas con el "Liber Abaci"; <em>Francesco Villa</em> (1840) marcó el inicio del período científico.</p>
        </InfoCard>
        <p class="eq-ref">📍 <strong>Unidad 1 — Tema 8:</strong> Evolución Histórica de la Contabilidad</p>
      </div>

      <div class="eq-divider"></div>

      <div class="exam-question">
        <div class="eq-header">
          <span class="eq-number">2</span>
          <p class="eq-text">El principio de empresa en marcha implica que la dirección debe evaluar prospectivamente la continuidad de la empresa por un plazo mínimo de:</p>
        </div>
        <div class="eq-options">
          <div class="eq-option wrong"><span class="opt-letter wrong-letter">A</span> 6 meses desde la fecha de los estados contables</div>
          <div class="eq-option correct"><span class="opt-letter correct-letter">B</span> 12 meses desde la fecha de los estados contables <span class="correct-tag">✓ Correcta</span></div>
          <div class="eq-option wrong"><span class="opt-letter wrong-letter">C</span> 3 años desde la fecha de los estados contables</div>
          <div class="eq-option wrong"><span class="opt-letter wrong-letter">D</span> Ninguna de las anteriores</div>
        </div>
        <InfoCard type="info" label="Fundamentación">
          <p>El principio de <strong>empresa en marcha</strong> establece que la empresa está en funcionamiento y continuará sus actividades en el futuro previsible. La dirección debe evaluar prospectivamente esta condición por un <strong>mínimo de 12 meses</strong> desde la fecha de cierre de los estados contables. Si decide liquidarse, las normas de empresa en marcha no son aplicables.</p>
        </InfoCard>
        <p class="eq-ref">📍 <strong>Unidad 1 — Tema 5:</strong> Principio de Empresa en Marcha</p>
      </div>

      <div class="eq-divider"></div>

      <div class="exam-question">
        <div class="eq-header">
          <span class="eq-number">3</span>
          <p class="eq-text">Una empresa que transforma materia prima en productos terminados pertenece al:</p>
        </div>
        <div class="eq-options">
          <div class="eq-option wrong"><span class="opt-letter wrong-letter">A</span> Sector Primario — actividades extractivas</div>
          <div class="eq-option correct"><span class="opt-letter correct-letter">B</span> Sector Secundario — empresas industriales <span class="correct-tag">✓ Correcta</span></div>
          <div class="eq-option wrong"><span class="opt-letter wrong-letter">C</span> Sector Terciario — prestación de servicios</div>
          <div class="eq-option wrong"><span class="opt-letter wrong-letter">D</span> Sector Cuaternario — tecnología e información</div>
        </div>
        <InfoCard type="info" label="Fundamentación">
          <p>Las <strong>empresas industriales</strong> pertenecen al <strong>Sector Secundario</strong>: realizan un proceso de transformación de materia prima en productos terminados (fábricas, automotrices, textiles). El Sector Terciario incluye comercio y servicios. Las de servicios tecnológicos se clasifican también en el Sector Cuaternario.</p>
        </InfoCard>
        <p class="eq-ref">📍 <strong>Unidad 1 — Tema 4:</strong> Tipos de Empresas y Tipos Societarios</p>
      </div>

      <div class="eq-divider"></div>

      <div class="exam-question">
        <div class="eq-header">
          <span class="eq-number">4</span>
          <p class="eq-text">La contabilidad como técnica consiste en:</p>
        </div>
        <div class="eq-options">
          <div class="eq-option wrong"><span class="opt-letter wrong-letter">A</span> Una ciencia social aplicada que estudia la circulación económica de los mercados</div>
          <div class="eq-option correct"><span class="opt-letter correct-letter">B</span> Un conjunto de procedimientos para identificar, medir, clasificar, registrar e informar operaciones <span class="correct-tag">✓ Correcta</span></div>
          <div class="eq-option wrong"><span class="opt-letter wrong-letter">C</span> El arte de resumir operaciones en términos monetarios con agudeza de juicio</div>
          <div class="eq-option wrong"><span class="opt-letter wrong-letter">D</span> Ninguna de las anteriores</div>
        </div>
        <InfoCard type="info" label="Fundamentación">
          <p>La contabilidad se puede estudiar desde tres ángulos: como <strong>ciencia</strong> (enseña reglas y analiza la circulación económica), como <strong>técnica</strong> (conjunto de procedimientos para identificar, medir, clasificar, registrar, interpretar, analizar, evaluar e informar las operaciones) y como <strong>arte</strong> (requiere juicio y habilidad para resumir operaciones en términos monetarios). La pregunta apunta específicamente a la dimensión técnica.</p>
        </InfoCard>
        <p class="eq-ref">📍 <strong>Unidad 1 — Tema 7:</strong> Contabilidad: Ciencia, Técnica y Arte</p>
      </div>
    </Accordion>

    <!-- UNIDAD 2 -->
    <Accordion title="Unidad 2 — Aspectos Contables y Fiscales" :icon="ClipboardList" number="Preguntas 5, 6 y 7" color="teal">

      <div class="exam-question">
        <div class="eq-header">
          <span class="eq-number">5</span>
          <p class="eq-text">¿Quiénes NO pueden ser monotributistas?</p>
        </div>
        <div class="eq-options">
          <div class="eq-option wrong"><span class="opt-letter wrong-letter">A</span> Personas físicas que venden productos</div>
          <div class="eq-option wrong"><span class="opt-letter wrong-letter">B</span> Sociedades de hecho con máximo 3 socios</div>
          <div class="eq-option correct"><span class="opt-letter correct-letter">C</span> Integrantes de SA, SRL o Sociedades Colectivas por esa actividad <span class="correct-tag">✓ Correcta</span></div>
          <div class="eq-option wrong"><span class="opt-letter wrong-letter">D</span> Trabajadores independientes o colaboradores de cooperativas de trabajo</div>
        </div>
        <InfoCard type="info" label="Fundamentación">
          <p>Los <strong>integrantes de SA, SRL o Sociedades Colectivas</strong> no pueden ser monotributistas por la actividad que desarrollan en esas sociedades; deben estar en el Régimen General. Sí pueden ser monotributistas: personas físicas que venden o prestan servicios, sociedades de hecho (máx. 3 socios), trabajadores independientes y colaboradores de cooperativas de trabajo.</p>
        </InfoCard>
        <p class="eq-ref">📍 <strong>Unidad 2 — Tema 2:</strong> Monotributo — Régimen Simplificado</p>
      </div>

      <div class="eq-divider"></div>

      <div class="exam-question">
        <div class="eq-header">
          <span class="eq-number">6</span>
          <p class="eq-text">Los libros, registros obligatorios y documentación respaldatoria deben conservarse por un plazo mínimo de:</p>
        </div>
        <div class="eq-options">
          <div class="eq-option wrong"><span class="opt-letter wrong-letter">A</span> 5 años desde la última anotación</div>
          <div class="eq-option correct"><span class="opt-letter correct-letter">B</span> 10 años, según el Código Civil y Comercial <span class="correct-tag">✓ Correcta</span></div>
          <div class="eq-option wrong"><span class="opt-letter wrong-letter">C</span> 3 años, salvo que AFIP exija mayor plazo</div>
          <div class="eq-option wrong"><span class="opt-letter wrong-letter">D</span> Ninguna de las anteriores</div>
        </div>
        <InfoCard type="info" label="Fundamentación">
          <p>El <strong>Código Civil y Comercial (Art. 328)</strong> establece que los libros, registros obligatorios y documentación respaldatoria deben conservarse por un plazo mínimo de <strong>10 años</strong>, salvo leyes especiales con plazos superiores. El cómputo varía: libros desde el último asiento, registros desde la última anotación, e instrumentos desde su fecha.</p>
        </InfoCard>
        <p class="eq-ref">📍 <strong>Unidad 2 — Tema 5:</strong> Archivo, Conservación y Documentación</p>
      </div>

      <div class="eq-divider"></div>

      <div class="exam-question">
        <div class="eq-header">
          <span class="eq-number">7</span>
          <p class="eq-text">La nota de débito es el documento que:</p>
        </div>
        <div class="eq-options">
          <div class="eq-option wrong"><span class="opt-letter wrong-letter">A</span> Respalda un pago realizado y reduce la deuda del cliente</div>
          <div class="eq-option wrong"><span class="opt-letter wrong-letter">B</span> Acompaña la entrega de mercaderías sin efecto contable</div>
          <div class="eq-option correct"><span class="opt-letter correct-letter">C</span> Genera un cargo adicional al cliente (errores, fletes, intereses no facturados) <span class="correct-tag">✓ Correcta</span></div>
          <div class="eq-option wrong"><span class="opt-letter wrong-letter">D</span> Registra una devolución o descuento a favor del cliente</div>
        </div>
        <InfoCard type="info" label="Fundamentación">
          <p>La <strong>nota de débito</strong> genera un cargo adicional al cliente: se usa para corregir errores de facturación, cargos por fletes o intereses que no se incluyeron en la factura original. Es un comprobante registrable que <em>aumenta</em> la deuda del cliente. <em>La nota de crédito</em> (opción D) es lo contrario: descarga al cliente por devoluciones, descuentos o errores que resultan a su favor.</p>
        </InfoCard>
        <p class="eq-ref">📍 <strong>Unidad 2 — Tema 6:</strong> Documentación Respaldatoria en Detalle</p>
      </div>
    </Accordion>

    <!-- UNIDAD 3 -->
    <Accordion title="Unidad 3 — Informes, Patrimonio y Ecuaciones" :icon="Scale" number="Preguntas 8, 9 y 10" color="amber">

      <div class="exam-question">
        <div class="eq-header">
          <span class="eq-number">8</span>
          <p class="eq-text">Una variación patrimonial permutativa (cualitativa):</p>
        </div>
        <div class="eq-options">
          <div class="eq-option wrong"><span class="opt-letter wrong-letter">A</span> Aumenta el Patrimonio Neto e involucra cuentas de resultado positivo</div>
          <div class="eq-option wrong"><span class="opt-letter wrong-letter">B</span> Disminuye el Patrimonio Neto e involucra cuentas de resultado negativo</div>
          <div class="eq-option correct"><span class="opt-letter correct-letter">C</span> Cambia la composición del Activo y/o Pasivo sin modificar el PN <span class="correct-tag">✓ Correcta</span></div>
          <div class="eq-option wrong"><span class="opt-letter wrong-letter">D</span> Ninguna de las anteriores</div>
        </div>
        <InfoCard type="info" label="Fundamentación">
          <p>Las <strong>variaciones permutativas</strong> (cualitativas) cambian la composición del Activo y/o Pasivo, pero <strong>no modifican el Patrimonio Neto</strong>. No involucran cuentas de resultado. Ejemplos: comprar muebles en efectivo (A×A), comprar mercaderías a crédito (A↑P↑), firmar un pagaré a proveedor (P×P). Las <em>modificativas</em> sí alteran el PN porque involucran cuentas de resultado.</p>
        </InfoCard>
        <p class="eq-ref">📍 <strong>Unidad 3 — Tema 7:</strong> Variaciones Patrimoniales</p>
      </div>

      <div class="eq-divider"></div>

      <div class="exam-question">
        <div class="eq-header">
          <span class="eq-number">9</span>
          <p class="eq-text">El principio fundamental de la partida doble establece que:</p>
        </div>
        <div class="eq-options">
          <div class="eq-option wrong"><span class="opt-letter wrong-letter">A</span> Todo asiento debe tener al menos dos cuentas del mismo tipo (activo o pasivo)</div>
          <div class="eq-option correct"><span class="opt-letter correct-letter">B</span> No hay deudor sin acreedor, ni acreedor sin deudor — Debe siempre igual a Haber <span class="correct-tag">✓ Correcta</span></div>
          <div class="eq-option wrong"><span class="opt-letter wrong-letter">C</span> Cada operación se registra una sola vez en el libro que corresponda</div>
          <div class="eq-option wrong"><span class="opt-letter wrong-letter">D</span> Las ganancias siempre se registran en el Debe y las pérdidas en el Haber</div>
        </div>
        <InfoCard type="info" label="Fundamentación">
          <p>La <strong>partida doble</strong> se basa en que <em>"no hay deudor sin acreedor, ni acreedor sin deudor"</em>. Esto implica que el total del <strong>Debe siempre iguala al total del Haber</strong> en cada asiento. Reglas complementarias: Activo y Pérdidas aumentan por el Debe y disminuyen por el Haber; Pasivo, PN y Ganancias aumentan por el Haber y disminuyen por el Debe.</p>
        </InfoCard>
        <p class="eq-ref">📍 <strong>Unidad 3 — Tema 8:</strong> Partida Doble vs Partida Simple</p>
      </div>

      <div class="eq-divider"></div>

      <div class="exam-question">
        <div class="eq-header">
          <span class="eq-number">10</span>
          <p class="eq-text">Los resultados positivos (ganancias):</p>
        </div>
        <div class="eq-options">
          <div class="eq-option wrong"><span class="opt-letter wrong-letter">A</span> Provocan una disminución del Patrimonio Neto</div>
          <div class="eq-option correct"><span class="opt-letter correct-letter">B</span> Provocan un aumento del Patrimonio Neto <span class="correct-tag">✓ Correcta</span></div>
          <div class="eq-option wrong"><span class="opt-letter wrong-letter">C</span> No modifican el Patrimonio Neto, solo la composición del Activo</div>
          <div class="eq-option wrong"><span class="opt-letter wrong-letter">D</span> Ninguna de las anteriores</div>
        </div>
        <InfoCard type="info" label="Fundamentación">
          <p>Los <strong>resultados positivos</strong> (ganancias) provocan un <strong>aumento del Patrimonio Neto</strong>. Son ejemplos: Ventas, Alquileres Cobrados, Intereses Cobrados, Comisiones Cobradas, Descuentos Obtenidos. Los <em>resultados negativos</em> (pérdidas) hacen lo contrario: disminuyen el PN. Ambos se encuadran dentro de las variaciones patrimoniales <em>modificativas</em>.</p>
        </InfoCard>
        <p class="eq-ref">📍 <strong>Unidad 3 — Tema 4:</strong> Resultados Positivos y Negativos</p>
      </div>
    </Accordion>

    <!-- UNIDAD 4 -->
    <Accordion title="Unidad 4 — Cuentas Contables" :icon="BarChart3" number="Preguntas 11 y 12" color="purple">

      <div class="exam-question">
        <div class="eq-header">
          <span class="eq-number">11</span>
          <p class="eq-text">El plan de cuentas es:</p>
        </div>
        <div class="eq-options">
          <div class="eq-option correct"><span class="opt-letter correct-letter">A</span> Un listado ordenado y codificado de todas las cuentas contables que se utilizarán en la registración <span class="correct-tag">✓ Correcta</span></div>
          <div class="eq-option wrong"><span class="opt-letter wrong-letter">B</span> El documento que explica cuándo debitar y acreditar cada cuenta</div>
          <div class="eq-option wrong"><span class="opt-letter wrong-letter">C</span> El registro cronológico de todas las operaciones diarias</div>
          <div class="eq-option wrong"><span class="opt-letter wrong-letter">D</span> Ninguna de las anteriores</div>
        </div>
        <InfoCard type="info" label="Fundamentación">
          <p>El <strong>Plan de Cuentas</strong> es un listado ordenado de todas las cuentas contables que se utilizarán en la registración, con código único y descripción por cuenta (sistema decimal con niveles). Su finalidad es dotar de máxima eficiencia a la contabilidad. <em>No confundir con el Manual de Cuentas</em> (opción B), que es su complemento y explica cómo utilizar cada cuenta.</p>
        </InfoCard>
        <p class="eq-ref">📍 <strong>Unidad 4 — Tema 6:</strong> Plan de Cuentas</p>
      </div>

      <div class="eq-divider"></div>

      <div class="exam-question">
        <div class="eq-header">
          <span class="eq-number">12</span>
          <p class="eq-text">El valor recuperable de un activo es:</p>
        </div>
        <div class="eq-options">
          <div class="eq-option wrong"><span class="opt-letter wrong-letter">A</span> El precio original de adquisición del bien</div>
          <div class="eq-option wrong"><span class="opt-letter wrong-letter">B</span> El valor de mercado menos los gastos de mantenimiento acumulados</div>
          <div class="eq-option correct"><span class="opt-letter correct-letter">C</span> El mayor entre el VNR (Valor Neto de Realización) y el Valor de Uso <span class="correct-tag">✓ Correcta</span></div>
          <div class="eq-option wrong"><span class="opt-letter wrong-letter">D</span> El menor entre el costo histórico y el valor de mercado actual</div>
        </div>
        <InfoCard type="info" label="Fundamentación">
          <p>Ningún activo puede presentarse por un importe superior a su <strong>valor recuperable</strong>, definido como el <strong>mayor</strong> entre: el <em>VNR</em> (precio de contado de venta menos costos directos de venta) y el <em>Valor de Uso</em> (valor actual esperado de los flujos netos de fondos que generarán los bienes). Este criterio es parte de las Resoluciones Técnicas de la FACPCE.</p>
        </InfoCard>
        <p class="eq-ref">📍 <strong>Unidad 4 — Tema 4:</strong> Unidades de Medida y Criterios de Valuación</p>
      </div>
    </Accordion>

    <!-- UNIDAD 5 -->
    <Accordion title="Unidad 5 — Registración Contable y Normativa Legal" :icon="BookOpen" number="Pregunta 13" color="red">

      <div class="exam-question">
        <div class="eq-header">
          <span class="eq-number">13</span>
          <p class="eq-text">El Libro Diario:</p>
        </div>
        <div class="eq-options">
          <div class="eq-option wrong"><span class="opt-letter wrong-letter">A</span> Registra cada cuenta individual con sus débitos, créditos y saldo actualizado</div>
          <div class="eq-option wrong"><span class="opt-letter wrong-letter">B</span> Transcribe el detalle del patrimonio al cierre de cada ejercicio anual</div>
          <div class="eq-option correct"><span class="opt-letter correct-letter">C</span> Registra cronológicamente todas las operaciones diarias basándose en los comprobantes <span class="correct-tag">✓ Correcta</span></div>
          <div class="eq-option wrong"><span class="opt-letter wrong-letter">D</span> Ninguna de las anteriores</div>
        </div>
        <InfoCard type="info" label="Fundamentación">
          <p>El <strong>Libro Diario</strong> registra <strong>cronológicamente</strong> todas las operaciones diarias, basándose en los comprobantes comerciales. Cada anotación se llama asiento contable. Es un registro de <em>primera entrada</em> y heterogéneo. Debe estar encuadernado, foliado y rubricado, y no puede alterarse su orden ni dejarse espacios en blanco. <em>El Libro Mayor</em> (opción A) es donde se trasladan los datos por cuenta individual; <em>el Libro de Inventarios y Balances</em> (opción B) transcribe el patrimonio al cierre.</p>
        </InfoCard>
        <p class="eq-ref">📍 <strong>Unidad 5 — Tema 3:</strong> Libros Obligatorios y sus Funciones</p>
      </div>
    </Accordion>

    <!-- Resumen tabla -->
    <Accordion title="Resumen de distribución por unidad" :icon="GraduationCap" number="Mapa" color="gold">
      <div class="summary-grid">
        <div class="summary-card card-blue">
          <span class="summary-badge">Unidad 1</span>
          <p class="summary-title">Contabilidad y Organización</p>
          <p class="summary-qs">Preguntas 1, 2, 3, 4</p>
        </div>
        <div class="summary-card card-teal">
          <span class="summary-badge">Unidad 2</span>
          <p class="summary-title">Aspectos Contables y Fiscales</p>
          <p class="summary-qs">Preguntas 5, 6, 7</p>
        </div>
        <div class="summary-card card-amber">
          <span class="summary-badge">Unidad 3</span>
          <p class="summary-title">Informes, Patrimonio y Ecuaciones</p>
          <p class="summary-qs">Preguntas 8, 9, 10</p>
        </div>
        <div class="summary-card card-purple">
          <span class="summary-badge">Unidad 4</span>
          <p class="summary-title">Cuentas Contables</p>
          <p class="summary-qs">Preguntas 11, 12</p>
        </div>
        <div class="summary-card card-red">
          <span class="summary-badge">Unidad 5</span>
          <p class="summary-title">Registración y Normativa</p>
          <p class="summary-qs">Pregunta 13</p>
        </div>
      </div>
    </Accordion>

    <UnitQuiz unitId="final-2" :questions="quizQuestions" />
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
    question: '¿Quién publicó en 1494 la primera exposición impresa de la partida doble?',
    options: [
      'Leonardo Fibonacci, con el "Liber Abaci" en 1202',
      'Luca Pacioli, con el tratado "De Computis et Scripturis"',
      'Francesco Villa, marcando el inicio del período científico',
      'Los comerciantes venecianos de forma anónima y colectiva'
    ],
    correctIndex: 1
  },
  {
    question: 'Según el principio de empresa en marcha, la dirección debe evaluar la continuidad prospectiva por un mínimo de:',
    options: [
      '6 meses desde la fecha del balance',
      '12 meses desde la fecha de los estados contables',
      '24 meses desde el primer día del ejercicio',
      '3 años como exige la normativa de la FACPCE'
    ],
    correctIndex: 1
  },
  {
    question: 'Una fábrica automotriz que convierte materia prima en vehículos terminados pertenece al:',
    options: [
      'Sector Primario — actividades agropecuarias y extractivas',
      'Sector Terciario — comercialización de bienes',
      'Sector Secundario — empresas industriales de transformación',
      'Sector Cuaternario — tecnología e investigación'
    ],
    correctIndex: 2
  },
  {
    question: 'La contabilidad como técnica consiste en:',
    options: [
      'Una ciencia social que analiza la circulación económica de los mercados',
      'El arte de registrar con agudeza de juicio y conocimiento desarrollado',
      'Un conjunto de procedimientos para identificar, medir, clasificar, registrar e informar operaciones',
      'El estudio de las organizaciones y su estructura interna'
    ],
    correctIndex: 2
  },
  {
    question: '¿Quiénes NO pueden ser monotributistas por una actividad determinada?',
    options: [
      'Personas físicas que prestan servicios con ingresos menores al límite',
      'Sociedades de hecho con hasta 3 socios',
      'Integrantes de SA, SRL o Sociedades Colectivas por esa actividad',
      'Trabajadores independientes colaboradores de cooperativas de trabajo'
    ],
    correctIndex: 2
  },
  {
    question: 'El plazo mínimo de conservación de libros y documentación respaldatoria según el Código Civil y Comercial es:',
    options: [
      '5 años desde la fecha del documento',
      '3 años, renovables si AFIP lo requiere',
      '10 años desde el último asiento, anotación o fecha del instrumento',
      '15 años para documentos respaldatorios de inversiones'
    ],
    correctIndex: 2
  },
  {
    question: 'La nota de débito se emite para:',
    options: [
      'Respaldar un pago recibido y reducir la deuda del cliente',
      'Acompañar la entrega de mercaderías como constancia de remisión',
      'Cargar importes adicionales al cliente por errores, fletes o intereses no facturados',
      'Registrar una devolución o descuento a favor del cliente'
    ],
    correctIndex: 2
  },
  {
    question: 'Una variación patrimonial permutativa:',
    options: [
      'Aumenta el Patrimonio Neto e involucra una cuenta de resultado positivo',
      'Disminuye el Patrimonio Neto e involucra una cuenta de resultado negativo',
      'Cambia la composición del Activo y/o Pasivo sin alterar el Patrimonio Neto',
      'Solo puede darse cuando intervienen cuentas de resultado simultáneamente'
    ],
    correctIndex: 2
  },
  {
    question: 'El principio de la partida doble establece que:',
    options: [
      'Cada operación se registra una única vez, en el libro que corresponda',
      'No hay deudor sin acreedor, ni acreedor sin deudor: Debe = Haber en todo asiento',
      'Las ganancias se registran en el Debe y las pérdidas en el Haber siempre',
      'Solo se registran operaciones que involucran al menos dos cuentas del mismo rubro'
    ],
    correctIndex: 1
  },
  {
    question: 'Los resultados positivos (ganancias) en una empresa provocan:',
    options: [
      'Una disminución del Patrimonio Neto al distribuirse entre los socios',
      'Un aumento del Patrimonio Neto',
      'Solo un cambio en la composición del Activo, sin tocar el PN',
      'Un aumento del Pasivo porque generan obligaciones fiscales'
    ],
    correctIndex: 1
  },
  {
    question: 'Un plan de cuentas es:',
    options: [
      'El listado ordenado y codificado de todas las cuentas contables a utilizar',
      'El documento que detalla cuándo debitar y acreditar cada cuenta',
      'El registro cronológico de las operaciones de cada jornada',
      'El estado contable que resume el patrimonio al cierre del ejercicio'
    ],
    correctIndex: 0
  },
  {
    question: 'Para la valuación de activos, el valor recuperable se define como:',
    options: [
      'El precio de adquisición original del bien sin ajuste alguno',
      'El valor de mercado menos todos los gastos de mantenimiento incurridos',
      'El mayor entre el VNR (Valor Neto de Realización) y el Valor de Uso',
      'El menor entre el costo histórico y el valor actual de mercado'
    ],
    correctIndex: 2
  },
  {
    question: 'El Libro Diario es el registro contable que:',
    options: [
      'Agrupa cronológicamente los saldos de cada cuenta al cierre del mes',
      'Transcribe el detalle del patrimonio y los estados contables al cierre del ejercicio',
      'Registra cronológicamente todas las operaciones diarias basándose en los comprobantes',
      'Contiene únicamente los asientos de apertura y cierre de cada ejercicio'
    ],
    correctIndex: 2
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
