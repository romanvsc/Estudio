<template>
  <div class="unit-view">
    <div class="unit-header">
      <span class="unit-badge badge badge-teal">Unidad 2</span>
      <h1>Aspectos Contables y Fiscales</h1>
      <p class="unit-subtitle">Relación empresa-Estado, Monotributo, Régimen General, comprobantes y documentación</p>
    </div>

    <UnitStudyToolkit
      title="Unidad 2"
      unitId="2"
      :searchQuery="props.searchQuery"
      :topicMeta="topicMeta"
      accent="teal"
    />

    <!-- 1. Relación Empresa-Estado -->
    <Accordion id="u2-t1" title="Relación entre la Empresa y el Estado" :icon="Landmark" number="Tema 1" color="teal" :defaultOpen="true">
      <InfoCard type="definition" label="Contexto">
        <p>El rol del Estado en el desarrollo y la economía ha variado a lo largo de la historia, manifestándose de distintas maneras: <strong>intervención directa</strong> (empresas públicas), <strong>indirecta</strong> (empresas mixtas, participación accionaria) y <strong>transferencia de tecnología</strong> al sector privado.</p>
      </InfoCard>
      <div class="section-block">
        <ul class="list-styled">
          <li><strong>Intervención Directa:</strong> El Estado provee bienes y servicios a través de empresas públicas (ej: INVAP S.E., Nucleoeléctrica Argentina S.A.).</li>
          <li><strong>Intervención Indirecta:</strong> Participación mediante empresas mixtas o accionaria del sector público en empresas privadas.</li>
          <li><strong>Transferencia de Tecnología:</strong> Fomento del desarrollo económico transfiriendo tecnología al sector privado.</li>
        </ul>
      </div>
      <InfoCard type="info" label="Dato">
        <p>El interés en el rol del Estado empresario se revitalizó tras la crisis financiera de 2007-2008 y la pandemia de COVID-19, y en Argentina tras la crisis de 2001-2002.</p>
      </InfoCard>
    </Accordion>

    <!-- 2. Monotributo -->
    <Accordion id="u2-t2" title="Monotributo - Régimen Simplificado" :icon="FileText" number="Tema 2" color="teal">
      <InfoCard type="definition" label="Definición">
        <p>Régimen tributario <strong>unificado y simplificado</strong> para pequeños contribuyentes. Combina en un único pago mensual: IVA + Ganancias + Aportes Jubilatorios + Obra Social.</p>
      </InfoCard>

      <div class="section-block">
        <h4>¿Quiénes pueden ser Monotributistas?</h4>
        <ul class="list-styled">
          <li>Personas físicas que venden productos, prestan servicios o realizan locación de bienes.</li>
          <li>Sucesiones indivisas que continúan la actividad de un monotributista fallecido.</li>
          <li>Trabajadores independientes o colaboradores de cooperativas de trabajo.</li>
          <li>Sociedades de hecho con un máximo de 3 socios.</li>
        </ul>
      </div>

      <div class="section-block">
        <h4>¿Quiénes NO pueden?</h4>
        <ul class="list-styled">
          <li>Ingresos anuales superan $82.370.281,28 (venta de productos).</li>
          <li>Realizaron importaciones en los últimos 12 meses para comercialización.</li>
          <li>Más de 3 actividades simultáneas o 3 unidades de explotación.</li>
          <li>Precio unitario de venta supera $466.361,15.</li>
          <li>Integrantes de SA, SRL, Soc. Colectivas (deben estar en Régimen General por esa actividad).</li>
        </ul>
      </div>

      <div class="section-block" style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px;">
        <InfoCard type="tip" label="Ventajas">
          <ul class="list-styled">
            <li>Cuota mensual fija</li>
            <li>Acceso a Obra Social y Jubilación</li>
            <li>Simplificación administrativa</li>
            <li>Sin DDJJ mensuales/anuales</li>
            <li>Posible reintegro de pago</li>
          </ul>
        </InfoCard>
        <InfoCard type="warning" label="Desventajas">
          <ul class="list-styled">
            <li>No descuenta crédito fiscal IVA</li>
            <li>Acceso limitado a crédito bancario</li>
            <li>Máximo 3 locales</li>
            <li>Excluye sociedades regulares</li>
          </ul>
        </InfoCard>
      </div>
    </Accordion>

    <!-- 3. Régimen General -->
    <Accordion id="u2-t3" title="Régimen General" :icon="BarChart3" number="Tema 3" color="teal">
      <InfoCard type="definition" label="Definición">
        <p>Se aplica a contribuyentes con mayores niveles de facturación o actividades económicas más complejas. IVA y Ganancias se liquidan y pagan <strong>por separado</strong>. No tiene límite máximo de facturación.</p>
      </InfoCard>

      <div class="section-block">
        <h4>Obligaciones e Implicaciones</h4>
        <ul class="list-styled">
          <li><strong>DDJJ Anual de Ganancias:</strong> Ventas − gastos = resultado neto de la actividad.</li>
          <li><strong>Deducciones Generales:</strong> Medicina prepaga (tope 5%), jubilación autónomos.</li>
          <li><strong>Deducciones Personales:</strong> Mínimo no imponible, deducción especial, cargas de familia.</li>
          <li><strong>Monto Consumido:</strong> AFIP usa info de tarjetas y consumos para establecer perfil del contribuyente.</li>
          <li><strong>Anticipos:</strong> Se pagan anticipos a cuenta de la futura DDJJ anual.</li>
        </ul>
      </div>

      <InfoCard type="info" label="Incentivo de traspaso">
        <p>Al renunciar o ser excluido del Monotributo: beneficio decreciente en IVA — <strong>50%</strong> primer año, <strong>30%</strong> segundo, <strong>10%</strong> tercero. Permite deducir todos los gastos vinculados desde el primer año.</p>
      </InfoCard>
    </Accordion>

    <!-- 4. Comprobantes -->
    <Accordion id="u2-t4" title="Comprobantes: Tipos y Función" :icon="Receipt" number="Tema 4" color="teal">
      <InfoCard type="definition" label="Definición">
        <p>Los documentos comerciales son comprobantes que se emiten como <strong>garantía o resguardo</strong> para probar y legitimar operaciones o transacciones comerciales. Son fuente de datos para el proceso contable.</p>
      </InfoCard>

      <div class="section-block">
        <h4>Requisitos (AFIP)</h4>
        <ul class="list-styled">
          <li>Tipo de comprobante (A, B, C, E, M, T)</li>
          <li>Número de factura y fecha</li>
          <li>CUIT del emisor</li>
          <li>CAE/CAI y fecha de vencimiento</li>
          <li>Logotipo fiscal</li>
        </ul>
      </div>

      <div class="section-block">
        <h4>Comprobantes Válidos según AFIP</h4>
        <ul class="list-styled">
          <li>Facturas (A, B, C, E, T)</li>
          <li>Notas de débito / Notas de crédito</li>
          <li>Recibos emitidos por prestadores de servicios (válidos como factura C)</li>
          <li>Tickets por máquinas registradoras / controladores fiscales homologados</li>
          <li>Documentos equivalentes (certificados de obra, cartas de porte, guías aéreas)</li>
        </ul>
      </div>

      <InfoCard type="warning" label="Comprobantes NO válidos">
        <ul class="list-styled">
          <li>Remitos (salvo que cumplan requisitos de documento equivalente)</li>
          <li>Notas de pedido, órdenes de trabajo, presupuestos</li>
          <li>Recibos que respaldan un pago pero no la operación</li>
          <li>Talones, tiras de máquina, cupones de tarjeta</li>
        </ul>
      </InfoCard>

      <div class="section-block">
        <h4>Clasificación</h4>
        <ul class="list-styled">
          <li><strong>Según emisor:</strong> Internos (uso interno o externo) / Externos (de terceros).</li>
          <li><strong>Según efecto contable:</strong> Registrables (modifican patrimonio) / No Registrables (no lo modifican).</li>
        </ul>
      </div>

      <div class="section-block">
        <h4>Funciones del comprobante</h4>
        <ul class="list-styled">
          <li><strong>Contable:</strong> Proporciona datos para los registros en los libros.</li>
          <li><strong>Jurídica:</strong> Medio de prueba escrita de hechos económicos.</li>
          <li><strong>De Control:</strong> Individualiza partes intervinientes y establece responsabilidades.</li>
        </ul>
      </div>
    </Accordion>

    <!-- 5. Archivo y Conservación -->
    <Accordion id="u2-t5" title="Archivo, Conservación y Documentación" :icon="FolderArchive" number="Tema 5" color="teal">
      <InfoCard type="law" label="Obligación legal">
        <p>Los libros, registros obligatorios y documentación respaldatoria deben conservarse por un plazo mínimo de <strong>10 años</strong>, salvo leyes especiales con plazos superiores.</p>
      </InfoCard>
      <div class="section-block">
        <h4>Cómputo del plazo</h4>
        <ul class="list-styled">
          <li><strong>Libros:</strong> Desde el último asiento.</li>
          <li><strong>Registros:</strong> Desde la última anotación.</li>
          <li><strong>Instrumentos respaldatorios:</strong> Desde su fecha.</li>
        </ul>
      </div>
      <div class="section-block">
        <h4>Medios alternativos</h4>
        <p>Con autorización del Registro Público se pueden sustituir libros (excepto Inventarios y Balances) por ordenadores, medios electrónicos, microfilm u ópticos, siempre que sean equivalentes en inviolabilidad, verosimilitud y completitud.</p>
      </div>
    </Accordion>

    <!-- 6. Documentación Respaldatoria -->
    <Accordion id="u2-t6" title="Documentación Respaldatoria en Detalle" :icon="Files" number="Tema 6" color="teal">
      <div class="section-block">
        <h4>Factura</h4>
        <p>Documento emitido por el vendedor que detalla las condiciones de la operación.</p>
        <ComparisonTable
          :columns="['Tipo', 'Emisor', 'Receptor']"
          :rows="facturaRows"
        />
      </div>

      <div class="section-block">
        <h4>Otros documentos comerciales</h4>
        <ul class="list-styled">
          <li><strong>Remito:</strong> Acompaña mercaderías entregadas. <span class="badge badge-amber">No registrable</span></li>
          <li><strong>Recibo:</strong> Respalda un pago, emitido por el beneficiario. <span class="badge badge-teal">Registrable</span></li>
          <li><strong>Nota de Débito:</strong> Cargo adicional al cliente (errores, fletes, intereses). <span class="badge badge-teal">Registrable</span></li>
          <li><strong>Nota de Crédito:</strong> Descargo al cliente (devoluciones, descuentos, errores). <span class="badge badge-teal">Registrable</span></li>
          <li><strong>Pagaré:</strong> Promesa escrita de pagar una suma determinada. Transferible por endoso. <span class="badge badge-teal">Registrable</span></li>
          <li><strong>Cheque Común:</strong> Orden de pago a la vista contra un banco. Vigencia: 30 días corridos. <span class="badge badge-teal">Registrable</span></li>
          <li><strong>Cheque de Pago Diferido:</strong> Orden de pago a fecha futura. Prescribe 30 días desde el vencimiento. <span class="badge badge-teal">Registrable</span></li>
          <li><strong>Boleta de Depósito:</strong> Documento de depósito bancario sellado por el banco. <span class="badge badge-teal">Registrable</span></li>
        </ul>
      </div>
    </Accordion>
    <UnitQuiz unitId="2" :questions="quizQuestions" />
  </div>
</template>

<script setup>
import Accordion from '../components/Accordion.vue'
import InfoCard from '../components/InfoCard.vue'
import ComparisonTable from '../components/ComparisonTable.vue'
import UnitQuiz from '../components/UnitQuiz.vue'
import UnitStudyToolkit from '../components/UnitStudyToolkit.vue'
import { Landmark, FileText, BarChart3, Receipt, FolderArchive, Files } from 'lucide-vue-next'

const props = defineProps({
  searchQuery: { type: String, default: '' }
})

const topicMeta = [
  { id: 'u2-t1', anchor: 'u2-t1', number: 'Tema 1', title: 'Relación empresa-Estado', keywords: ['estado', 'intervención', 'empresa pública'], summary: ['El Estado puede intervenir de forma directa o indirecta.', 'También fomenta mediante tecnología.', 'Impacta en estructura económica.'] },
  { id: 'u2-t2', anchor: 'u2-t2', number: 'Tema 2', title: 'Monotributo', keywords: ['monotributo', 'régimen simplificado', 'tope'], summary: ['Unifica IVA, Ganancias y aportes.', 'Tiene límites de actividades e ingresos.', 'No aplica a ciertos tipos societarios.'] },
  { id: 'u2-t3', anchor: 'u2-t3', number: 'Tema 3', title: 'Régimen general', keywords: ['régimen general', 'ddjj', 'ganancias'], summary: ['IVA y Ganancias se liquidan por separado.', 'Exige DDJJ y anticipos.', 'Permite deducciones más amplias.'] },
  { id: 'u2-t4', anchor: 'u2-t4', number: 'Tema 4', title: 'Comprobantes', keywords: ['comprobantes', 'factura', 'cae', 'afip'], summary: ['Respaldan operaciones comerciales.', 'Deben cumplir requisitos formales.', 'No todo documento es comprobante válido.'] },
  { id: 'u2-t5', anchor: 'u2-t5', number: 'Tema 5', title: 'Conservación documental', keywords: ['conservación', 'archivo', '10 años'], summary: ['Documentación mínima por 10 años.', 'El plazo depende del documento.', 'Se admiten medios alternativos autorizados.'] },
  { id: 'u2-t6', anchor: 'u2-t6', number: 'Tema 6', title: 'Documentación respaldatoria', keywords: ['recibo', 'remito', 'nota de débito', 'pagaré'], summary: ['Cada documento cumple función distinta.', 'No todos modifican patrimonio.', 'La clasificación mejora el control contable.'] }
]

const facturaRows = [
  { 'Tipo': 'Factura A', 'Emisor': 'Responsable Inscripto', 'Receptor': 'Responsable Inscripto o Monotributista' },
  { 'Tipo': 'Factura B', 'Emisor': 'Responsable Inscripto', 'Receptor': 'Consumidor Final o Exento' },
  { 'Tipo': 'Factura C', 'Emisor': 'Monotributista o Exento', 'Receptor': 'Cualquier destinatario' },
  { 'Tipo': 'Factura E', 'Emisor': 'Exportador', 'Receptor': 'Sujeto del exterior' },
  { 'Tipo': 'Factura T', 'Emisor': 'Hotel / Alojamiento', 'Receptor': 'Turistas extranjeros' }
]

const quizQuestions = [
  {
    question: "El Estado argentino posee el 51% de las acciones de YPF junto a accionistas privados. ¿Qué tipo de intervención del Estado representa esto?",
    options: [
      "Intervención directa, porque el Estado tiene mayoría accionaria",
      "Intervención indirecta, ya que participa mediante acciones en una empresa con capital privado",
      "Solo transferencia de tecnología al sector privado",
      "El Estado no puede intervenir en empresas petroleras"
    ],
    correctIndex: 1
  },
  {
    question: "Martín está inscripto en Monotributo con un estudio contable. Hereda dinero y abre un local de ropa. ¿Qué límite del régimen debe revisar prioritariamente?",
    options: [
      "El monto de la herencia recibida frente a AFIP",
      "El tipo de mercadería que vende en el local",
      "El máximo de 3 actividades simultáneas o unidades de explotación",
      "Su estado civil frente al organismo fiscal"
    ],
    correctIndex: 2
  },
  {
    question: "Carlos es socio de una SRL que factura $10 millones anuales y quiere inscribir esa actividad en Monotributo. ¿Es posible?",
    options: [
      "Sí, siempre que no supere el tope de ingresos del Monotributo",
      "No, porque los integrantes de SRL deben tributar por esa actividad en el Régimen General",
      "Sí, si la SRL tiene menos de 50 socios",
      "Solo si la SRL no tiene empleados"
    ],
    correctIndex: 1
  },
  {
    question: "Al pasarse al Régimen General, un contribuyente pide un crédito bancario el primer año. ¿Cuál de estas afirmaciones sobre la transición es correcta?",
    options: [
      "Durante los primeros 3 años no puede deducir ningún gasto",
      "El beneficio decreciente de IVA en el primer año es del 50% de reducción",
      "No puede emitir facturas A hasta el quinto año de transición",
      "Pierde automáticamente la obra social al renunciar al Monotributo"
    ],
    correctIndex: 1
  },
  {
    question: "Un proveedor le entrega mercaderías a un cliente junto con un remito firmado. El cliente quiere usar ese remito para justificar el pago ante su contador. ¿Es suficiente?",
    options: [
      "Sí, el remito es siempre un documento válido como comprobante de pago",
      "No, el remito acredita entrega de mercaderías, no el pago; se necesita un recibo",
      "Sí, si está firmado por ambas partes y tiene fecha",
      "Solo si lleva número de CAE asignado por AFIP"
    ],
    correctIndex: 1
  },
  {
    question: "Una empresa quiere digitalizar todos sus comprobantes en papel para eliminar los originales al segundo año. ¿Bajo qué condición legal es válido?",
    options: [
      "Basta almacenarlos en un servidor con fecha de carga",
      "Debe contar con autorización del Registro Público y los medios deben garantizar inviolabilidad y completitud",
      "Es suficiente con tenerlos en la nube de cualquier proveedor",
      "Solo el Libro de Inventarios y Balances debe conservarse físicamente"
    ],
    correctIndex: 1
  },
  {
    question: "Al cobrar una deuda vencida, el proveedor endosa el pagaré que tenía de su deudor a un tercero para cancelar su propia deuda. ¿Qué característica del pagaré lo habilita?",
    options: [
      "Que es un comprobante no registrable y por eso libremente transferible",
      "Que puede transferirse por endoso como título de crédito",
      "Que prescribe a los 30 días, lo cual fuerza a usarlo rápido",
      "Que AFIP lo valida equivalente a una factura A"
    ],
    correctIndex: 1
  },
  {
    question: "Una empresa monotributista le presta servicios de diseño a una SA responsable inscripta. ¿Qué tipo de factura debe emitir?",
    options: [
      "Factura A, porque el receptor está inscripto en IVA",
      "Factura B, porque la SA consume más que un particular",
      "Factura C, porque el emisor es monotributista sin importar quién recibe",
      "Factura E, porque es una operación entre empresas"
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
