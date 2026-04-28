<template>
  <div class="unit-view">
    <div class="unit-header">
      <span class="unit-badge badge badge-amber">Unidad 3</span>
      <h1>Informes, Patrimonio y Ecuaciones</h1>
      <p class="unit-subtitle">Informes contables, Activo/Pasivo/PN, ecuaciones patrimoniales, variaciones y partida doble</p>
    </div>

    <UnitStudyToolkit
      title="Unidad 3"
      unitId="3"
      :searchQuery="props.searchQuery"
      :topicMeta="topicMeta"
      accent="amber"
    />

    <!-- 1. Informes contables -->
    <Accordion id="u3-t1" title="Informes Contables: Uso Interno y Externo" :icon="FileText" number="Tema 1" color="amber" :defaultOpen="true">
      <div class="section-block">
        <h4>Uso Interno</h4>
        <p>Permite la función de comprobación, gobierno y dirección dentro de la empresa. Vital para los socios o dueños para tomar decisiones sobre desarrollo, mejora de resultados, o conveniencia de endeudamiento.</p>
      </div>
      <div class="section-block">
        <h4>Uso Externo</h4>
        <ul class="list-styled">
          <li><strong>Hacienda (AFIP):</strong> Base para cálculo de impuestos y obligaciones fiscales.</li>
          <li><strong>Entidades de crédito:</strong> Evaluar idoneidad de conceder financiación.</li>
          <li><strong>Otros terceros:</strong> Acceso a cuentas anuales depositadas en registros públicos para evaluar resultados o solidez financiera.</li>
        </ul>
      </div>
    </Accordion>

    <!-- 2. Activo, Pasivo, PN -->
    <Accordion id="u3-t2" title="Activo, Pasivo y Patrimonio Neto" :icon="Package" number="Tema 2" color="amber">
      <InfoCard type="definition" label="Patrimonio">
        <p>Es el conjunto de <strong>bienes, derechos y obligaciones</strong> de una persona física o jurídica.</p>
      </InfoCard>

      <div class="section-block">
        <h4>Activo (A)</h4>
        <ul class="list-styled">
          <li>Conjunto de <strong>bienes y derechos a cobrar</strong> que posee la empresa.</li>
          <li><strong>Bienes:</strong> Cosas propiedad de la empresa (dinero, mercaderías, muebles, vehículos, maquinarias).</li>
          <li><strong>Derechos a cobrar:</strong> Valor de bienes o servicios a recibir de terceros.</li>
          <li>Saldo: <span class="badge badge-blue">Deudor</span></li>
          <li>Ejemplos: Caja, Bancos, Mercaderías, Deudores por Ventas, Documentos a Cobrar, Muebles y Útiles, Rodados.</li>
        </ul>
      </div>

      <div class="section-block">
        <h4>Pasivo (P)</h4>
        <ul class="list-styled">
          <li>Conjunto de <strong>deudas, compromisos u obligaciones a pagar</strong>.</li>
          <li>Valor del dinero o bienes que la empresa debe entregar por operaciones no canceladas.</li>
          <li>Saldo: <span class="badge badge-red">Acreedor</span></li>
          <li>Ejemplos: Proveedores, Acreedores Varios, Documentos a Pagar.</li>
        </ul>
      </div>

      <div class="section-block">
        <h4>Patrimonio Neto (PN)</h4>
        <ul class="list-styled">
          <li>Diferencia entre Activo y Pasivo: <strong>PN = A − P</strong></li>
          <li>Formado por el Capital + Resultados de las operaciones.</li>
          <li>Representa la parte que corresponde a los dueños.</li>
          <li>Saldo: <span class="badge badge-purple">Acreedor</span></li>
          <li>Ejemplos: Capital, Quebranto del Ejercicio, Utilidad del Ejercicio.</li>
        </ul>
      </div>
    </Accordion>

    <!-- 3. Capital e Igualdad Estática -->
    <Accordion id="u3-t3" title="Capital y Ecuación Patrimonial Estática" :icon="Scale" number="Tema 3" color="amber">
      <InfoCard type="definition" label="Capital">
        <p>Es la <strong>inversión inicial</strong> que han realizado los propietarios de la empresa. Es una fuente de financiación propia.</p>
      </InfoCard>
      <InfoCard type="important" label="Igualdad Patrimonial Estática">
        <p class="equation-banner">ACTIVO = PASIVO + CAPITAL SOCIAL</p>
      </InfoCard>
      <InfoCard type="example" label="Ejemplo">
        <p>Si una empresa necesita $100.000 para funcionar: socios aportan $60.000 (Capital) y se obtienen $40.000 de un préstamo (Pasivo):</p>
        <p class="equation-banner equation-banner-compact"><strong>$100.000 (A) = $40.000 (P) + $60.000 (CS)</strong></p>
      </InfoCard>
    </Accordion>

    <!-- 4. Resultados -->
    <Accordion id="u3-t4" title="Resultados Positivos y Negativos" :icon="TrendingUp" number="Tema 4" color="amber">
      <InfoCard type="definition" label="Definición">
        <p>Los resultados son las <strong>variaciones que afectan al Patrimonio Neto</strong> a medida que la empresa realiza sus actividades.</p>
      </InfoCard>
      <div class="section-block" style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px;">
        <InfoCard type="tip" label="Resultados Positivos (Ganancias)">
          <p>Provocan un <strong>aumento</strong> del PN.</p>
          <ul class="list-styled">
            <li>Ventas</li>
            <li>Alquileres Cobrados</li>
            <li>Intereses Cobrados</li>
            <li>Comisiones Cobradas</li>
            <li>Descuentos Obtenidos</li>
          </ul>
        </InfoCard>
        <InfoCard type="warning" label="Resultados Negativos (Pérdidas)">
          <p>Provocan una <strong>disminución</strong> del PN.</p>
          <ul class="list-styled">
            <li>Costo de Mercaderías Vendidas</li>
            <li>Alquileres Pagados</li>
            <li>Impuestos</li>
            <li>Sueldos y Jornales</li>
            <li>Gastos Generales</li>
          </ul>
        </InfoCard>
      </div>
    </Accordion>

    <!-- 5. Ecuación Dinámica -->
    <Accordion id="u3-t5" title="Ecuación Contable Dinámica" :icon="RefreshCcw" number="Tema 5" color="amber">
      <InfoCard type="important" label="Ecuación Dinámica">
        <p class="equation-banner">ACTIVO = PASIVO + CAPITAL ± RESULTADOS</p>
      </InfoCard>
      <div class="section-block">
        <p>La igualdad dinámica es una extensión de la ecuación estática que incorpora los resultados. A medida que se desarrollan operaciones comerciales, esta igualdad se modifica.</p>
        <p><strong>Utilidad:</strong> Es el principio básico para entender la Registración Contable y el método de la partida doble.</p>
      </div>
    </Accordion>

    <!-- 6. Rueda Operativa -->
    <Accordion id="u3-t6" title="La Rueda Operativa (Ciclo Operativo)" :icon="RotateCw" number="Tema 6" color="amber">
      <InfoCard type="definition" label="Definición">
        <p>Secuencia de operaciones comerciales fundamentales que realiza una empresa:</p>
      </InfoCard>
      <div class="cycle-diagram">
        <div class="cycle-step">
          <span class="cycle-number">1</span>
          <span class="cycle-label">Comprar mercaderías</span>
        </div>
        <div class="cycle-arrow">→</div>
        <div class="cycle-step">
          <span class="cycle-number">2</span>
          <span class="cycle-label">Pagar mercaderías</span>
        </div>
        <div class="cycle-arrow">→</div>
        <div class="cycle-step">
          <span class="cycle-number">3</span>
          <span class="cycle-label">Vender mercaderías</span>
        </div>
        <div class="cycle-arrow">→</div>
        <div class="cycle-step">
          <span class="cycle-number">4</span>
          <span class="cycle-label">Cobrar mercaderías</span>
        </div>
        <div class="cycle-arrow cycle-return">↩</div>
      </div>
      <p style="text-align: center; color: var(--text-muted); font-size: 0.85rem; margin-top: 8px;">El ciclo se retroalimenta: después de cobrar, se vuelve a comprar.</p>
    </Accordion>

    <!-- 7. Variaciones Patrimoniales -->
    <Accordion id="u3-t7" title="Variaciones Patrimoniales" :icon="Shuffle" number="Tema 7" color="amber">
      <InfoCard type="definition" label="Definición">
        <p>Son hechos u operaciones que causan modificaciones en el Patrimonio, ya sea en sus elementos (A y/o P) o en el PN (Capital o Resultados).</p>
      </InfoCard>

      <div class="section-block">
        <h4>Permutativas (Cualitativas)</h4>
        <p>Cambian la composición del A y/o P, pero <strong>NO modifican el PN</strong>. No involucran cuentas de resultado.</p>
        <ul class="list-styled">
          <li><strong>A × A:</strong> Comprar muebles en efectivo (↑ Muebles, ↓ Caja).</li>
          <li><strong>A ↑ P ↑:</strong> Comprar telas a crédito (↑ Materia Prima, ↑ Proveedores).</li>
          <li><strong>P × P:</strong> Firmar pagaré a proveedor (↓ Proveedores, ↑ Doc. a Pagar).</li>
          <li><strong>A ↓ P ↓:</strong> Pagar pagaré en efectivo (↓ Doc. a Pagar, ↓ Caja).</li>
        </ul>
      </div>

      <div class="section-block">
        <h4>Modificativas (Cuantitativas)</h4>
        <p>Modifican el PN, aumentándolo o disminuyéndolo. <strong>Siempre involucran cuentas de resultado.</strong></p>
        <ul class="list-styled">
          <li><strong>Positivas (Aumentativas):</strong> ↑ PN. Ej: cobrar alquiler en efectivo (↑ Caja, aparece Alquileres Cobrados R+).</li>
          <li><strong>Negativas (Disminutivas):</strong> ↓ PN. Ej: pagar impuesto en efectivo (↓ Caja, aparece Impuesto R−).</li>
        </ul>
      </div>

      <div class="section-block">
        <h4>Mixtas</h4>
        <p>Un mismo asiento involucra cuentas de resultado positivo y negativo. El tipo se determina por cuál resultado es mayor.</p>
      </div>
    </Accordion>

    <!-- 8. Partida Doble -->
    <Accordion id="u3-t8" title="Partida Doble vs Partida Simple" :icon="BookOpen" number="Tema 8" color="amber">
      <InfoCard type="definition" label="Partida Doble">
        <p>Método que utiliza la contabilidad para registrar las operaciones comerciales. Se basa en el principio de que <strong>no hay deudor sin acreedor, ni acreedor sin deudor</strong>.</p>
      </InfoCard>
      <InfoCard type="example" label="Partida Simple">
        <p>Sistema de registro <strong>unilateral</strong>: cada operación se anota en una sola cuenta, generalmente de caja, bancos, deudores o acreedores. Se usa para controles básicos y no para una contabilidad patrimonial completa.</p>
      </InfoCard>
      <div class="section-block">
        <h4>Reglas fundamentales</h4>
        <ul class="list-styled">
          <li>Total del <strong>Debe</strong> siempre = Total del <strong>Haber</strong>.</li>
          <li>Todo lo que se <strong>recibe</strong> se debita; lo que se <strong>entrega</strong> se acredita.</li>
          <li><strong>Activo y Pérdidas:</strong> ↑ por el Debe, ↓ por el Haber.</li>
          <li><strong>Pasivo, PN y Ganancias:</strong> ↑ por el Haber, ↓ por el Debe.</li>
        </ul>
      </div>
      <div class="section-block">
        <h4>Cómo reconocer la Partida Simple</h4>
        <ul class="list-styled">
          <li>Registra <strong>entradas y salidas de dinero</strong>, sin mostrar el efecto completo sobre el patrimonio.</li>
          <li>No exige igualdad entre Debe y Haber en cada operación.</li>
          <li>Es útil para pequeños controles administrativos, pero tiene <strong>menor capacidad de análisis</strong>.</li>
          <li>Dificulta la elaboración de estados contables completos y el control sistemático de errores.</li>
        </ul>
      </div>
      <InfoCard type="important" label="Ejemplo rápido">
        <p><strong>Compra de mercadería por $100 en efectivo</strong></p>
        <ul class="list-styled">
          <li><strong>Partida simple:</strong> se registra solo <em>salida de caja $100</em>.</li>
          <li><strong>Partida doble:</strong> <em>Debe Mercaderías $100 / Haber Caja $100</em>.</li>
        </ul>
        <p>Por eso, la partida doble permite ver simultáneamente <strong>qué ingresa y qué se entrega</strong>, manteniendo el equilibrio contable.</p>
      </InfoCard>
    </Accordion>

    <!-- 9. Base Devengado vs Percibido -->
    <Accordion id="u3-t9" title="Base Devengado vs Base Percibido" :icon="Calendar" number="Tema 9" color="amber">
      <div class="section-block" style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px;">
        <InfoCard type="info" label="Base Devengado">
          <p>Registro de la transacción <strong>en el momento en que se realiza</strong>, aunque el pago se perciba en el futuro.</p>
          <ul class="list-styled">
            <li>Criterio obligatorio en Argentina (NIIF, PCGA, RT).</li>
            <li>Permite planificación presupuestaria a largo plazo.</li>
            <li>Refleja todos los ingresos/gastos del ejercicio fiscal.</li>
          </ul>
        </InfoCard>
        <InfoCard type="example" label="Base Percibido">
          <p>Registro de la transacción <strong>en el momento en que se recibe el dinero</strong>.</p>
          <ul class="list-styled">
            <li>Sirve para proyecciones de sobrantes/faltantes de fondos.</li>
            <li>Se refleja en el Estado de Flujo de Efectivo.</li>
            <li>Permite conocer la liquidez en caja.</li>
          </ul>
        </InfoCard>
      </div>
      <InfoCard type="important" label="Clave">
        <p>Trabajar con la <strong>base devengado</strong> es la opción más práctica: cumple con normas vigentes, uniformiza la presentación y permite análisis realistas. Es importante reconocer la diferencia para evitar problemas administrativos, en el flujo de caja y con impuestos.</p>
      </InfoCard>
    </Accordion>
    <UnitQuiz unitId="3" :questions="quizQuestions" />
  </div>
</template>

<script setup>
import Accordion from '../components/Accordion.vue'
import InfoCard from '../components/InfoCard.vue'
import UnitQuiz from '../components/UnitQuiz.vue'
import UnitStudyToolkit from '../components/UnitStudyToolkit.vue'
import { FileText, Package, Scale, TrendingUp, RefreshCcw, RotateCw, Shuffle, BookOpen, Calendar } from 'lucide-vue-next'

const props = defineProps({
  searchQuery: { type: String, default: '' }
})

const topicMeta = [
  { id: 'u3-t1', anchor: 'u3-t1', number: 'Tema 1', title: 'Informes internos y externos', keywords: ['interno', 'externo', 'informes'], summary: ['El uso interno guía decisiones de gestión.', 'El uso externo sirve a bancos, AFIP y terceros.', 'Ambos parten de la misma base contable.'] },
  { id: 'u3-t2', anchor: 'u3-t2', number: 'Tema 2', title: 'Activo, Pasivo y PN', keywords: ['activo', 'pasivo', 'patrimonio neto'], summary: ['Activo: bienes y derechos.', 'Pasivo: obligaciones.', 'PN: diferencia A − P.'] },
  { id: 'u3-t3', anchor: 'u3-t3', number: 'Tema 3', title: 'Capital y ecuación estática', keywords: ['capital social', 'ecuación estática'], summary: ['El capital surge de aportes iniciales.', 'Ecuación estática: A = P + CS.', 'Refleja la situación inicial.'] },
  { id: 'u3-t4', anchor: 'u3-t4', number: 'Tema 4', title: 'Resultados positivos y negativos', keywords: ['ganancias', 'pérdidas', 'resultados'], summary: ['Resultados positivos aumentan PN.', 'Resultados negativos disminuyen PN.', 'Se originan en operaciones del período.'] },
  { id: 'u3-t5', anchor: 'u3-t5', number: 'Tema 5', title: 'Ecuación dinámica', keywords: ['ecuación dinámica', 'resultado del ejercicio'], summary: ['Incorpora resultados a la ecuación.', 'Permite analizar evolución patrimonial.', 'Base conceptual de la registración.'] },
  { id: 'u3-t6', anchor: 'u3-t6', number: 'Tema 6', title: 'Rueda operativa', keywords: ['ciclo operativo', 'comprar vender cobrar'], summary: ['Comprar, pagar, vender y cobrar.', 'El ciclo se retroalimenta.', 'Sostiene la operatoria comercial.'] },
  { id: 'u3-t7', anchor: 'u3-t7', number: 'Tema 7', title: 'Variaciones patrimoniales', keywords: ['permutativas', 'modificativas', 'mixtas'], summary: ['Permutativas no cambian PN.', 'Modificativas sí afectan PN.', 'Mixtas combinan resultados.'] },
  { id: 'u3-t8', anchor: 'u3-t8', number: 'Tema 8', title: 'Partida doble', keywords: ['partida doble', 'debe', 'haber'], summary: ['Debe siempre iguala Haber.', 'Recibe: Debe; entrega: Haber.', 'Mantiene equilibrio contable.'] },
  { id: 'u3-t9', anchor: 'u3-t9', number: 'Tema 9', title: 'Devengado vs percibido', keywords: ['devengado', 'percibido', 'flujo de efectivo'], summary: ['Devengado reconoce al generarse.', 'Percibido reconoce al cobrar/pagar.', 'El devengado es criterio principal.'] }
]

const quizQuestions = [
  {
    question: "Un banco analiza los estados contables de una empresa antes de otorgarle un préstamo. ¿Qué tipo de uso contable está realizando el banco?",
    options: [
      "Interno, porque el banco es quien toma la decisión crediticia",
      "Externo, porque el banco es un tercero ajeno a la empresa evaluada",
      "Fiscal, porque el banco reporta esa información a AFIP",
      "No puede usarlos sin autorización judicial previa"
    ],
    correctIndex: 1
  },
  {
    question: "La empresa tiene $80.000 en 'Documentos a Cobrar'. Un colega afirma que eso no es un bien real porque no es dinero en caja. ¿Cómo rebatirías esto?",
    options: [
      "No se puede rebatir: solo el efectivo forma parte del Activo",
      "El Activo incluye tanto bienes físicos como derechos a recibir valores de terceros, por eso los documentos a cobrar son Activo",
      "Tiene razón parcialmente: solo cuenta si el documento está firmado ante escribano",
      "Los documentos a cobrar se clasifican como Pasivo hasta que se cobren"
    ],
    correctIndex: 1
  },
  {
    question: "Una empresa tiene Activo $500.000 y Pasivo $180.000. ¿Cuánto es el Patrimonio Neto y qué representa económicamente?",
    options: [
      "$680.000; es la suma total de lo que tiene y lo que debe",
      "$180.000; es lo que le prestaron los bancos",
      "$320.000; es la parte del activo que pertenece efectivamente a los propietarios",
      "$500.000; es todo lo que posee la empresa"
    ],
    correctIndex: 2
  },
  {
    question: "En diciembre, la empresa cobra por adelantado el alquiler de enero. Según la base devengado, ¿cuándo se reconoce como ingreso?",
    options: [
      "En diciembre, cuando se recibe el dinero",
      "En enero, cuando transcurre el período al que corresponde el alquiler",
      "Al cierre del ejercicio anual, sin importar el mes",
      "Cuando el inquilino firma el contrato de locación"
    ],
    correctIndex: 1
  },
  {
    question: "Al cierre del ejercicio, el Activo creció $80.000 y el Pasivo se mantuvo igual. ¿Cuál es la única conclusión válida?",
    options: [
      "La empresa tomó más deuda para financiarse",
      "Se valuaron los activos de forma diferente sin impacto económico real",
      "Hubo un resultado neto positivo que incrementó el Patrimonio Neto en $80.000",
      "El Capital Social fue reducido en $80.000"
    ],
    correctIndex: 2
  },
  {
    question: "Una empresa compró mercaderías, las pagó y las vendió, pero todavía no cobró. ¿En qué punto de la rueda operativa se encuentra?",
    options: [
      "Entre comprar y pagar, porque falta integrar el ciclo",
      "Entre vender y cobrar, a la espera de completar el ciclo",
      "Al inicio del ciclo, listo para volver a comprar",
      "El ciclo ya está completo porque la venta fue realizada"
    ],
    correctIndex: 1
  },
  {
    question: "La empresa paga sueldos por $50.000 en efectivo. ¿Cómo se clasifica esta variación patrimonial y por qué?",
    options: [
      "Permutativa, porque solo cambia la composición del Activo (caja baja)",
      "Modificativa negativa, porque involucra un resultado negativo (sueldos R-) que disminuye el Patrimonio Neto",
      "Modificativa positiva, porque se cumplen obligaciones laborales",
      "Mixta, porque involucra caja y sueldos simultáneamente"
    ],
    correctIndex: 1
  },
  {
    question: "Se realiza una venta al contado. Caja aumenta $5.000 y Ventas aumenta $5.000. ¿Cómo se registran correctamente según la partida doble?",
    options: [
      "Caja al Haber y Ventas al Debe, porque ambas aumentan",
      "Caja al Debe (Activo sube por Debe) y Ventas al Haber (Ganancia sube por Haber)",
      "Ambas cuentas al Debe para reflejar el ingreso",
      "Ambas cuentas al Haber porque es una operación positiva"
    ],
    correctIndex: 1
  },
  {
    question: "En diciembre se presta un servicio, pero el cliente pagará recién en febrero. Según las normas contables argentinas, ¿cuándo se registra el ingreso?",
    options: [
      "En febrero, cuando efectivamente se recibe el dinero",
      "En diciembre, cuando se devenga el ingreso al prestarse el servicio",
      "En el mes de cierre del ejercicio fiscal, sin importar cuándo se prestó",
      "Cuando el cliente manifiesta por escrito su intención de pagar"
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

.equation-banner {
  margin: 0;
  padding: 8px 14px;
  border: 2px solid var(--accent-amber);
  border-radius: 999px;
  background:
    linear-gradient(120deg, color-mix(in srgb, var(--accent-amber) 18%, transparent), transparent 68%),
    var(--bg-card);
  box-shadow: 3px 3px 0 var(--border-color);
  font-family: 'JetBrains Mono', 'Fira Code', monospace;
  font-size: 1rem;
  font-weight: 800;
  letter-spacing: 0.02em;
  text-align: center;
  color: var(--text-primary);
}

.equation-banner-compact {
  margin-top: 8px;
  border-style: dashed;
  font-size: 0.88rem;
}

/* Cycle Diagram */
.cycle-diagram {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 8px;
  padding: 16px;
  margin: 12px 0;
}

.cycle-step {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 14px;
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
}

.cycle-number {
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--accent-amber-soft);
  color: var(--accent-amber);
  border-radius: 50%;
  font-size: 0.75rem;
  font-weight: 700;
}

.cycle-label {
  font-size: 0.82rem;
  font-weight: 500;
}

.cycle-arrow {
  color: var(--text-muted);
  font-size: 1.2rem;
}

.cycle-return {
  color: var(--accent-teal);
}

@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(16px); }
  to { opacity: 1; transform: translateY(0); }
}

@media (max-width: 768px) {
  .equation-banner {
    border-radius: 12px;
    font-size: 0.82rem;
  }

  .equation-banner-compact {
    font-size: 0.78rem;
  }
}
</style>
