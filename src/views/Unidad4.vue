<template>
  <div class="unit-view">
    <div class="unit-header">
      <span class="unit-badge badge badge-purple">Unidad 4</span>
      <h1>Cuentas Contables</h1>
      <p class="unit-subtitle">Definición, clasificación, rubros, valuación, plan y manual de cuentas</p>
    </div>

    <UnitStudyToolkit
      title="Unidad 4"
      unitId="4"
      :searchQuery="props.searchQuery"
      :topicMeta="topicMeta"
      :flashcards="flashcards"
      :topicQuickChecks="topicQuickChecks"
      accent="purple"
    />

    <!-- 1. Definición -->
    <Accordion id="u4-t1" title="Definición de Cuenta Contable" :icon="Clipboard" number="Tema 1" color="purple" :defaultOpen="true">
      <InfoCard type="definition" label="Definición">
        <p>Una <strong>cuenta contable</strong> es un registro estructurado que refleja todas las transacciones económicas de una empresa, organizadas cronológica y categorizadamente. Es un instrumento indispensable para evaluar el estado de las finanzas y optimizar la toma de decisiones.</p>
      </InfoCard>

      <div class="section-block">
        <h4>Elementos constitutivos</h4>
        <ul class="list-styled">
          <li><strong>Nombre de la cuenta:</strong> El titular al que se refiere (ej: "Caja", "Clientes", "Proveedores").</li>
          <li><strong>Código identificador:</strong> Según el Plan General Contable (PGC) o Plan Único de Cuentas (PUC).</li>
          <li><strong>Fecha de la operación:</strong> Para seguimiento cronológico.</li>
          <li><strong>Motivo de la operación:</strong> Para mayor claridad.</li>
          <li><strong>Importe registrado:</strong> En el <strong>Debe</strong> (izquierda, lo que entra) o en el <strong>Haber</strong> (derecha, lo que sale).</li>
          <li><strong>Saldo final:</strong> Diferencia entre Debe y Haber. Si Debe > Haber = <span class="badge badge-blue">Saldo Deudor</span>. Si Haber > Debe = <span class="badge badge-red">Saldo Acreedor</span>.</li>
        </ul>
      </div>
    </Accordion>

    <!-- 2. Clasificación -->
    <Accordion id="u4-t2" title="Clasificación de Cuentas según Naturaleza" :icon="Tags" number="Tema 2" color="purple">
      <div class="section-block">
        <h4>A. Cuentas Patrimoniales (Reales)</h4>
        <p>Reflejan la situación financiera en un momento determinado. Permanecen abiertas por más de un período contable.</p>
        <ul class="list-styled">
          <li><strong>Activo:</strong> Bienes y derechos de la empresa.
            <ul class="sub-list">
              <li><strong>Corriente:</strong> Se espera convertir en dinero en ≤ 1 año.</li>
              <li><strong>No Corriente:</strong> Conversión en > 1 año.</li>
            </ul>
          </li>
          <li><strong>Pasivo:</strong> Obligaciones y deudas hacia terceros.
            <ul class="sub-list">
              <li><strong>Corriente:</strong> Exigible en ≤ 12 meses.</li>
              <li><strong>No Corriente:</strong> Exigible en > 12 meses.</li>
            </ul>
          </li>
          <li><strong>Patrimonio Neto:</strong> Participación de los propietarios + resultados acumulados. <strong>PN = A − P</strong> o <strong>Aportes + Resultados Acumulados</strong>.</li>
        </ul>
      </div>

      <div class="section-block">
        <h4>B. Cuentas de Resultados (Nominales)</h4>
        <p>Reflejan ingresos y gastos. Se cierran al finalizar cada período, iniciando desde cero.</p>
        <ul class="list-styled">
          <li><strong>Resultados Positivos:</strong> Ingresos (actividad principal) y Ganancias (operaciones secundarias). Aumentan el PN.</li>
          <li><strong>Resultados Negativos:</strong> Gastos (costos operativos) y Pérdidas (operaciones secundarias). Disminuyen el PN.</li>
        </ul>
      </div>

      <div class="section-block">
        <h4>C. Cuentas Regularizadoras</h4>
        <p>Ajustan el valor de una cuenta principal de A o P para mostrar un monto más fidedigno. Tienen <strong>saldo opuesto</strong> a la cuenta que regularizan.</p>
        <ul class="list-styled">
          <li><strong>Regularizadoras de Activo</strong> (saldo acreedor):
            <ul class="sub-list">
              <li>Previsión para Créditos Incobrables (ajusta Deudores por Ventas).</li>
              <li>Amortizaciones Acumuladas (ajusta Bienes de Uso).</li>
              <li>Intereses a Devengar en activos (ajusta Documentos a Cobrar).</li>
            </ul>
          </li>
          <li><strong>Regularizadoras de Pasivo</strong> (saldo deudor):
            <ul class="sub-list">
              <li>Intereses a Devengar en pasivos (ajusta Deudas Comerciales, Préstamos).</li>
            </ul>
          </li>
        </ul>
      </div>

      <div class="section-block">
        <h4>D. Cuentas de Movimiento (Control)</h4>
        <p>Registran operaciones específicas. Al cierre del ejercicio deben quedar con <strong>saldo cero</strong>, transfiriendo a la cuenta principal.</p>
      </div>

      <div class="section-block">
        <h4>E. Cuentas de Orden</h4>
        <p>Representan un posible compromiso a futuro (contingente). Se registran de a pares y <strong>no se exponen</strong> en los estados contables.</p>
      </div>
    </Accordion>

    <!-- 3. Agrupación por Rubro -->
    <Accordion id="u4-t3" title="Agrupación de Cuentas por Rubro" :icon="Layers" number="Tema 3" color="purple">
      <InfoCard type="info" label="Orden">
        <p>Los rubros del activo se ordenan según su <strong>grado de liquidez</strong>; los del pasivo según su <strong>grado de exigibilidad</strong>.</p>
      </InfoCard>

      <div class="section-block">
        <h4>Rubros del Activo</h4>
        <ul class="list-styled">
          <li><strong>Caja y Bancos (Disponibilidades):</strong> Efectivo, bancos, moneda extranjera para operatoria.</li>
          <li><strong>Inversiones:</strong> Colocaciones de fondos para renta (Plazo fijo, Títulos y acciones). Temporarias (corriente) o permanentes (no corriente).</li>
          <li><strong>Créditos por Ventas:</strong> Deudores por Ventas, Documentos a cobrar, Valores diferidos a cobrar. Se restan regularizadoras.</li>
          <li><strong>Otros Créditos:</strong> Deudores varios, Gastos pagados por adelantado (no de operaciones habituales).</li>
          <li><strong>Bienes de Cambio:</strong> Mercaderías, Materias primas, Productos terminados (destinados a la venta).</li>
          <li><strong>Bienes de Uso:</strong> Inmuebles, Maquinarias, Rodados (para uso, no venta). Se regularizan con amortizaciones.</li>
          <li><strong>Activos Intangibles:</strong> Marcas, Patentes, Licencias, Gastos de organización.</li>
        </ul>
      </div>

      <div class="section-block">
        <h4>Rubros del Pasivo</h4>
        <ul class="list-styled">
          <li><strong>Deudas Comerciales:</strong> Proveedores, Obligaciones a pagar.</li>
          <li><strong>Préstamos:</strong> Obligaciones bancarias, Adelantos en cuenta corriente.</li>
          <li><strong>Remuneraciones y Cargas Sociales:</strong> Sueldos a pagar, Cargas sociales a pagar.</li>
          <li><strong>Cargas Fiscales:</strong> Impuestos a pagar, IVA a pagar.</li>
        </ul>
      </div>
    </Accordion>

    <!-- 4. Valuación -->
    <Accordion id="u4-t4" title="Unidades de Medida y Criterios de Valuación" :icon="Ruler" number="Tema 4" color="purple">
      <div class="section-block">
        <h4>Unidad de Medida</h4>
        <ul class="list-styled">
          <li><strong>Moneda Nominal (Heterogénea):</strong> Moneda de curso legal sin ajuste por inflación. Útil en estabilidad monetaria.</li>
          <li><strong>Moneda Homogénea:</strong> Ajustada por inflación. Obligatoria cuando la inflación acumulada supera el 100% en 3 años (Argentina declarada hiperinflacionaria).</li>
        </ul>
      </div>

      <div class="section-block">
        <h4>Criterios de Medición</h4>
        <ul class="list-styled">
          <li><strong>Valores Históricos:</strong> Bienes registrados a precio de contado + costos de compra. Componentes financieros implícitos se segregan. Valor límite = valor de mercado.</li>
          <li><strong>Valores Corrientes:</strong> Surgen del mercado, ofrecen mayor aproximación a la realidad. Generan resultados transaccionales y no transaccionales.</li>
        </ul>
      </div>

      <InfoCard type="important" label="Valor Recuperable">
        <p>Ningún activo puede presentarse por un importe superior a su <strong>valor recuperable</strong> = mayor entre:</p>
        <ul class="list-styled">
          <li><strong>VNR (Valor Neto de Realización):</strong> Precio de contado de venta − costos directos de venta.</li>
          <li><strong>Valor de Uso:</strong> Valor actual esperado de los flujos netos de fondos que generarán los bienes.</li>
        </ul>
      </InfoCard>
    </Accordion>

    <!-- 5. Grado de análisis -->
    <Accordion id="u4-t5" title="Clasificación por Grado de Análisis" :icon="ZoomIn" number="Tema 5" color="purple">
      <ul class="list-styled">
        <li><strong>Cuentas Analíticas (Simples):</strong> Hecho individual. Ej: "Cliente Pereyra", "Cliente Orsi".</li>
        <li><strong>Cuentas Colectivas (Sintéticas):</strong> Agrupan cuentas simples. Ej: "Clientes", "Deudores por ventas".</li>
        <li><strong>Rubros (Cuentas Compuestas):</strong> Agrupan cuentas colectivas. Ej: "Deudas bancarias".</li>
        <li><strong>Cuentas Recompuestas:</strong> Agrupan rubros. Ej: "Activo", "Pasivo", "Patrimonio Neto".</li>
      </ul>
      <InfoCard type="tip" label="Jerarquía">
        <p>De lo más granular a lo más general: <strong>Analítica → Colectiva → Rubro → Recompuesta</strong></p>
      </InfoCard>
    </Accordion>

    <!-- 6. Plan de Cuentas -->
    <Accordion id="u4-t6" title="Plan de Cuentas" :icon="ListTree" number="Tema 6" color="purple">
      <InfoCard type="definition" label="Definición">
        <p>Un <strong>Plan de Cuentas</strong> es un listado ordenado de todas las cuentas contables que se utilizarán en la registración. Su finalidad es dotar de máxima eficiencia a la contabilidad.</p>
      </InfoCard>
      <div class="section-block">
        <h4>Características</h4>
        <ul class="list-styled">
          <li>Completo, pero no excesivamente extenso.</li>
          <li>Flexible para agregar o eliminar cuentas.</li>
          <li>Código único + descripción por cuenta (sistema decimal con niveles).</li>
        </ul>
      </div>
      <div class="section-block">
        <h4>Factores para su elaboración</h4>
        <ul class="list-styled">
          <li>Tipo de actividad económica (servicio, comercial, fabril).</li>
          <li>Tipificación jurídica (SA, SRL, etc.).</li>
          <li>Magnitud económica de la empresa.</li>
          <li>Necesidades de información de propietarios y terceros.</li>
          <li>Legislación impositiva, laboral y normas técnicas vigentes.</li>
        </ul>
      </div>
    </Accordion>

    <!-- 7. Manual de Cuentas -->
    <Accordion id="u4-t7" title="Manual de Cuentas" :icon="Book" number="Tema 7" color="purple">
      <InfoCard type="definition" label="Definición">
        <p>Complemento del Plan de Cuentas que contiene las <strong>instrucciones detalladas</strong> de cómo deben utilizarse las cuentas.</p>
      </InfoCard>
      <div class="section-block">
        <h4>Contenido</h4>
        <ul class="list-styled">
          <li>Aclara el <strong>tipo</strong> de cuenta.</li>
          <li>Indica el <strong>saldo habitual</strong>.</li>
          <li>Explica qué <strong>representa</strong> el saldo.</li>
          <li>Detalla cuándo se <strong>debita</strong> y cuándo se <strong>acredita</strong>.</li>
          <li>Facilita la comprensión y aplicación uniforme.</li>
        </ul>
      </div>
    </Accordion>

    <!-- 8. Componentes financieros -->
    <Accordion id="u4-t8" title="Componentes Financieros Explícitos e Implícitos" :icon="Percent" number="Tema 8" color="purple">
      <InfoCard type="definition" label="Definición">
        <p>Son las diferencias entre los precios de contado y los precios a plazo. Deben <strong>segregarse</strong> y tratarse como costos o ingresos financieros (RT N° 17).</p>
      </InfoCard>
      <div class="section-block">
        <h4>Reglas de segregación</h4>
        <ul class="list-styled">
          <li>Bienes/servicios adquiridos: usar <strong>precio de contado</strong>. Si no está disponible, usar valor descontado.</li>
          <li>Créditos y pasivos en moneda: medición original basada en valor descontado.</li>
          <li><strong>Entes Pequeños (EPEQ):</strong> Pueden segregar únicamente sobre saldos a la fecha de los estados contables (Res. 266/03 FACPCE).</li>
        </ul>
      </div>
      <InfoCard type="tip" label="Proceso">
        <p><strong>1°</strong> Segregar componentes financieros implícitos (devengados y no devengados). <strong>2°</strong> Valuar el activo o pasivo al cierre según el criterio aplicable.</p>
      </InfoCard>
    </Accordion>

    <UnitQuiz unitId="4" :questions="quizQuestions" />
  </div>
</template>

<script setup>
import Accordion from '../components/Accordion.vue'
import InfoCard from '../components/InfoCard.vue'
import UnitQuiz from '../components/UnitQuiz.vue'
import UnitStudyToolkit from '../components/UnitStudyToolkit.vue'
import { Clipboard, Tags, Layers, Ruler, ZoomIn, ListTree, Book, Percent } from 'lucide-vue-next'

const props = defineProps({
  searchQuery: { type: String, default: '' }
})

const topicMeta = [
  { id: 'u4-t1', anchor: 'u4-t1', number: 'Tema 1', title: 'Definición de cuenta contable', keywords: ['cuenta contable', 'debe', 'haber', 'saldo'], summary: ['Una cuenta registra operaciones por concepto.', 'Tiene movimientos en Debe y Haber.', 'Su saldo final informa la posición neta.'] },
  { id: 'u4-t2', anchor: 'u4-t2', number: 'Tema 2', title: 'Clasificación por naturaleza', keywords: ['patrimoniales', 'resultado', 'regularizadoras'], summary: ['Patrimoniales: A, P y PN.', 'Resultados: ingresos y gastos.', 'Regularizadoras corrigen valores de cuentas base.'] },
  { id: 'u4-t3', anchor: 'u4-t3', number: 'Tema 3', title: 'Rubros contables', keywords: ['rubros', 'liquidez', 'exigibilidad'], summary: ['Activo se ordena por liquidez.', 'Pasivo se ordena por exigibilidad.', 'Los rubros facilitan lectura del balance.'] },
  { id: 'u4-t4', anchor: 'u4-t4', number: 'Tema 4', title: 'Valuación y medición', keywords: ['valuación', 'moneda homogénea', 'valor recuperable'], summary: ['La unidad de medida puede ajustarse por inflación.', 'Se usan valores históricos o corrientes.', 'Ningún activo supera su valor recuperable.'] },
  { id: 'u4-t5', anchor: 'u4-t5', number: 'Tema 5', title: 'Grado de análisis', keywords: ['analítica', 'colectiva', 'rubro'], summary: ['Analítica: máximo detalle.', 'Colectiva agrupa analíticas.', 'Rubros y recompuestas sintetizan información.'] },
  { id: 'u4-t6', anchor: 'u4-t6', number: 'Tema 6', title: 'Plan de cuentas', keywords: ['plan de cuentas', 'codificación'], summary: ['Lista ordenada de cuentas del sistema.', 'Debe ser completo y flexible.', 'Se diseña según actividad y necesidades.'] },
  { id: 'u4-t7', anchor: 'u4-t7', number: 'Tema 7', title: 'Manual de cuentas', keywords: ['manual de cuentas', 'debitar', 'acreditar'], summary: ['Define uso de cada cuenta.', 'Indica saldos habituales.', 'Unifica criterio de registración.'] },
  { id: 'u4-t8', anchor: 'u4-t8', number: 'Tema 8', title: 'Componentes financieros', keywords: ['componentes financieros implícitos', 'segregación'], summary: ['Separan precio contado de financiación.', 'Se reconocen como resultado financiero.', 'Mejoran la medición contable.'] }
]

const flashcards = [
  { question: '¿Qué refleja el saldo de una cuenta?', answer: 'La diferencia neta entre movimientos del Debe y Haber.', level: 'fácil' },
  { question: '¿Qué cuenta regulariza a bienes de uso?', answer: 'Amortizaciones acumuladas.', level: 'fácil' },
  { question: '¿Cómo se ordenan rubros del activo?', answer: 'Por grado de liquidez.', level: 'fácil' },
  { question: '¿Qué limita la valuación de un activo?', answer: 'Su valor recuperable.', level: 'media' },
  { question: '¿Para qué sirve el manual de cuentas?', answer: 'Para establecer reglas uniformes de uso, débito y crédito.', level: 'media' }
]

const topicQuickChecks = [
  { topicId: 'u4-t1', title: 'Chequeo Tema 1', question: 'Si Debe > Haber, el saldo es...', options: ['Acreedor', 'Deudor', 'Nulo siempre'], correctIndex: 1 },
  { topicId: 'u4-t2', title: 'Chequeo Tema 2', question: 'Las cuentas de resultados se...', options: ['Arrastran siempre', 'Cierran al final del período', 'No se usan'], correctIndex: 1 },
  { topicId: 'u4-t3', title: 'Chequeo Tema 3', question: 'Los rubros del pasivo se ordenan por...', options: ['Liquidez', 'Exigibilidad', 'Volumen'], correctIndex: 1 },
  { topicId: 'u4-t4', title: 'Chequeo Tema 4', question: 'Valor recuperable es...', options: ['Mínimo entre VNR y uso', 'Máximo entre VNR y uso', 'Siempre valor histórico'], correctIndex: 1 },
  { topicId: 'u4-t5', title: 'Chequeo Tema 5', question: 'Jerarquía correcta:', options: ['Rubro > analítica > colectiva', 'Analítica > colectiva > rubro', 'Colectiva > rubro > analítica'], correctIndex: 1 },
  { topicId: 'u4-t6', title: 'Chequeo Tema 6', question: 'El plan de cuentas debe ser...', options: ['Rígido y cerrado', 'Flexible y ordenado', 'Sin codificación'], correctIndex: 1 },
  { topicId: 'u4-t7', title: 'Chequeo Tema 7', question: 'El manual aclara principalmente...', options: ['Diseño web', 'Cuándo debitar/acreditar', 'Solo impuestos'], correctIndex: 1 },
  { topicId: 'u4-t8', title: 'Chequeo Tema 8', question: 'Los componentes implícitos se...', options: ['Ignoran', 'Segregan', 'Capitalizan siempre'], correctIndex: 1 }
]

const quizQuestions = [
  {
    question: "La cuenta 'Caja' en el Mayor muestra un saldo deudor de $10.000. ¿Qué significa eso inequívocamente?",
    options: [
      "La empresa debe $10.000 a un proveedor",
      "Los débitos superaron a los créditos en $10.000 en esa cuenta",
      "El saldo está en negativo porque se gastó más de lo que había",
      "La cuenta fue mal registrada y debe corregirse"
    ],
    correctIndex: 1
  },
  {
    question: "Al cierre del ejercicio, la cuenta 'Ventas' tiene saldo acreedor de $200.000. ¿Adónde va ese saldo y qué efecto produce?",
    options: [
      "Se elimina sin dejar rastro para empezar el ejercicio en cero",
      "Se transfiere al Patrimonio Neto como resultado positivo del ejercicio",
      "Pasa a ser un activo del ejercicio siguiente",
      "Se guarda en el Libro Diario para acumularse con el año próximo"
    ],
    correctIndex: 1
  },
  {
    question: "La empresa tiene un plazo fijo bancario que vence en 14 meses. ¿En qué rubro del balance se expone?",
    options: [
      "Activo corriente – Disponibilidades, porque es dinero en banco",
      "Activo no corriente – Inversiones, porque vence en más de 12 meses",
      "Activo corriente – Créditos por ventas, porque genera un derecho a cobrar",
      "Pasivo corriente, porque genera intereses a favor del banco"
    ],
    correctIndex: 1
  },
  {
    question: "Una empresa compró un camión por $200.000 al contado, cuando el precio de lista era $230.000. ¿A cuánto se debe registrar el activo?",
    options: [
      "$230.000, el precio oficial de lista publicado por el fabricante",
      "$200.000, el precio de contado efectivamente pagado",
      "$215.000, el promedio entre ambos valores como criterio conservador",
      "$180.000, neteando la amortización estimada del primer año"
    ],
    correctIndex: 1
  },
  {
    question: "La cuenta 'Clientes' en el Mayor suma $50.000. El gerente necesita saber exactamente cuánto debe cada cliente por separado. ¿Dónde busca esa información?",
    options: [
      "En el Libro Diario, que registra todo cronológicamente",
      "En el Libro de Inventarios y Balances del ejercicio anterior",
      "En el submayor o cuentas analíticas de cada cliente",
      "En el Plan de Cuentas, que lista todas las cuentas"
    ],
    correctIndex: 2
  },
  {
    question: "'Amortizaciones Acumuladas' tiene saldo acreedor y se resta del bien que corrige. Un colega dice que tiene saldo acreedor porque 'es en realidad un pasivo'. ¿Es correcto?",
    options: [
      "Sí, porque cualquier cuenta con saldo acreedor es un pasivo",
      "No, es una cuenta regularizadora de activo: su saldo es opuesto al de la cuenta que corrige para mostrar un valor neto más fidedigno",
      "Sí, porque la amortización es una deuda con el Estado",
      "No, porque los bienes de uso nunca se amortizan en Argentina"
    ],
    correctIndex: 1
  },
  {
    question: "Una fábrica de autos y una clínica médica necesitan planes de cuentas distintos. ¿Cuál es la razón de fondo?",
    options: [
      "Porque AFIP impone un plan de cuentas diferente según el rubro",
      "Porque el tipo de actividad económica determina las operaciones habituales y las cuentas necesarias para registrarlas",
      "Porque las fábricas siempre son SA y las clínicas SRL, lo que obliga a planes distintos",
      "No debería haber diferencia; el plan de cuentas es universal para todas las empresas"
    ],
    correctIndex: 1
  },
  {
    question: "Si el Plan de Cuentas ya lista y codifica todas las cuentas, ¿por qué sigue siendo necesario el Manual de Cuentas?",
    options: [
      "Porque el Manual reemplaza al Plan y es el documento vigente",
      "Porque el Plan solo codifica y nombra, mientras el Manual detalla cuándo debitar/acreditar y qué representa el saldo de cada cuenta",
      "Porque el Manual contiene los asientos ya hechos del ejercicio anterior",
      "Porque AFIP lo exige como condición para emitir facturas electrónicas"
    ],
    correctIndex: 1
  },
  {
    question: "Una empresa compra mercaderías a $120.000 en 3 cuotas, cuando el precio de contado es $100.000. ¿Cómo debe tratarse la diferencia de $20.000?",
    options: [
      "Registrarse como mayor costo de la mercadería: $120.000 en la cuenta Mercaderías",
      "Segregarse como componente financiero implícito y reconocerse como costo financiero a medida que se devenga",
      "Ignorarse por ser inferior al 20% del valor y no ser significativa",
      "Dividirse en partes iguales entre las 3 cuotas sin separar el concepto financiero"
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

@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(16px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>
