<template>
  <div class="unit-view">
    <div class="unit-header">
      <span class="unit-badge badge badge-red">Unidad 5</span>
      <h1>Sistema de Archivos</h1>
      <p class="unit-subtitle">Archivos, directorios, implementación, asignación de espacio y espacio libre</p>
    </div>

    <div class="study-toolbar">
      <div class="study-progress-card">
        <div class="card-head">
          <h3>Progreso por tema</h3>
          <span class="badge badge-red">{{ studySummary.completion }}% dominado</span>
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
      <h3>Resultados en Unidad 5 ({{ searchResults.length }})</h3>
      <div class="search-results-list">
        <button v-for="result in searchResults" :key="`${result.topicId}-${result.term}`" class="search-result-item" @click="goToTopic(result.anchor)">
          <strong>{{ result.number }} · {{ result.title }}</strong>
          <span>Coincide con: {{ result.term }}</span>
        </button>
      </div>
    </div>

    <!-- Tema 1: Concepto y Propiedades de Archivos -->
    <Accordion id="sd3u5-t1" title="Concepto, Nombres y Estructura de Archivos" :icon="FileIcon" number="Tema 1" color="red" :defaultOpen="true">
      <InfoCard type="definition" label="Definición">
        <p>Un <strong>archivo</strong> es una unidad lógica de almacenamiento definida por el SO como una colección de información relacionada que reside en almacenamiento secundario. Su función es proporcionar una abstracción que libere al usuario de los detalles físicos de los dispositivos.</p>
      </InfoCard>

      <InfoCard type="example" label="Ejemplo sencillo">
        <p>Pensá en un <strong>cuaderno</strong>. El cuaderno tiene un <strong>nombre en la tapa</strong> (nombre del archivo) y una etiqueta que dice "Matemáticas" (extensión — indica el tipo de contenido). Adentro puede estar organizado de distintas formas: como anotaciones libres página por página (secuencia de bytes), como fichas de un tamaño fijo (secuencia de registros), o como un índice que te lleva rápidamente al tema que buscás (árbol de registros). El cuaderno existe aunque no lo estés leyendo — es <strong>persistente</strong>.</p>
      </InfoCard>

      <div class="section-block">
        <h4>Estructura Interna</h4>
        <ul class="list-styled">
          <li><strong>Secuencia de Bytes (El lienzo en blanco):</strong> El SO solo ve un montón de 1s y 0s. No le importa si es una foto o un texto, la aplicación que lo abre es la que decide qué significa. Usado en UNIX y Windows.</li>
          <li><strong>Secuencia de Registros (El fichero de biblioteca):</strong> Archivos con un tamaño fijo para cada "ficha" adentro. Muy antiguo, hoy casi no se usa a nivel SO.</li>
          <li><strong>Árbol de Registros (El diccionario ordenado):</strong> Registros organizados en un árbol con campo clave para búsquedas rapidísimas (común en supercomputadoras o mainframes viejos).</li>
        </ul>
      </div>

      <div class="section-block">
        <h4>Tipos de Archivos</h4>
        <ul class="list-styled">
          <li><strong>Regulares (Tus cosas):</strong> Contienen información del usuario: archivos de texto plano o binarios opacos (como ejecutables, zips, mp3).</li>
          <li><strong>Directorios (Las carpetas):</strong> No son más que archivos especiales creados por el SO que guardan una tabla (mapeo) entre los nombres de los archivos reales y dónde están físicamente en el disco.</li>
          <li><strong>Especiales (El hardware disfrazado):</strong> El truco mágico de UNIX: modelan dispositivos físicos como si fueran archivos. De <strong>caracteres</strong> (teclados, terminales) y de <strong>bloques</strong> (discos duros).</li>
        </ul>
      </div>

      <div class="section-block">
        <h4>Métodos de Acceso</h4>
        <ul class="list-styled">
          <li><strong>Secuencial:</strong> Es la forma más simple. Si querés llegar al dato 100, tenés que pasar por el 1, el 2, el 3... hasta llegar.</li>
          <li><strong>Directo (Aleatorio):</strong> Acá el Sistema Operativo puede saltar a cualquier parte del archivo al instante. No le importa dónde está parado; le das una dirección y va.</li>
          <li><strong>Indexado El modo "Google":</strong> Primero buscás en el índice (que es chiquito y rápido de leer) para saber en qué bloque está el dato, y después hacés un acceso directo a ese bloque.</li>
        </ul>
      </div>

      <div class="section-block">
        <h4>Atributos (Metadatos: La etiqueta del archivo)</h4>
        <ul class="list-styled">
          <li><strong>El Identificador Único (Inode):</strong> El verdadero nombre del archivo para el SO es un número, no el nombre que le pusiste vos.</li>
          <li><strong>Estado e Historia:</strong> Tamaño, bits de protección (quién puede leer/escribir/ejecutar) y marcas de tiempo (creación, último acceso, última modificación).</li>
        </ul>
      </div>

      <div class="section-block">
        <h4>Operaciones sobre Archivos</h4>
        <ul class="list-styled">
          <li><strong>Create (Crear):</strong> Busca un lugarcito libre en el disco y lo anota en el índice (directorio).</li>
          <li><strong>Open (Abrir y preparar):</strong> Antes de usar un archivo, el SO carga su "ficha de datos" (bloque de control) en la RAM y verifica que tengas permiso de usarlo. ¡Es un paso obligatorio!</li>
          <li><strong>Read/Write (Leer/Escribir):</strong> Mover los verdaderos bytes entre el disco duro y la memoria RAM.</li>
          <li><strong>Seek (Rebobinar/Adelantar):</strong> Mueve el "cabezal de lectura virtual" a una posición específica adentro del archivo abierto.</li>
          <li><strong>Truncate (Vaciar):</strong> Borra todo el contenido de adentro sin borrar el archivo en sí. Ideal para reiniciar archivos de registro (logs).</li>
          <li><strong>Close (Cerrar):</strong> Destruye la ficha en la RAM y se asegura de que la última modificación se guardó bien en el disco físico.</li>
        </ul>
      </div>
    </Accordion>

    <!-- Tema 2: Estructuras de Directorios -->
    <Accordion id="sd3u5-t2" title="Estructuras de Directorios" :icon="FolderTree" number="Tema 2" color="red">
      <InfoCard type="example" label="Ejemplo sencillo">
        <p>Imaginá cómo organizás tus archivos en la vida real. Un cajón con <strong>todo junto</strong> (un solo nivel) — simple pero caótico. Cajones <strong>separados por persona</strong> (dos niveles). Un <strong>mueble con cajones, dentro carpetas, dentro subcarpetas</strong> (jerárquico en árbol) — el modelo moderno. Si dos carpetas comparten un mismo documento poniendo una referencia (link/enlace), tenés un <strong>grafo acíclico</strong>. Y si permitís que una carpeta "apunte" a su propia carpeta padre, tenés un <strong>grafo general</strong> (peligroso: puede causar bucles infinitos).</p>
      </InfoCard>

      <div class="section-block">
        <h4>Tipos de Estructura de Directorios</h4>
        <ul class="list-styled">
          <li><strong>Un solo nivel (El basurero):</strong> Todos los archivos del sistema metidos en una única lista gigante. Imposible llamarle "carta.txt" a dos cosas distintas.</li>
          <li><strong>Dos niveles (Una carpeta por usuario):</strong> Cada usuario tiene su propia carpeta (UFD) controlada por una carpeta maestra general (MFD).</li>
          <li><strong>Jerárquicos en Árbol (El estándar de oro):</strong> Nuestro modelo actual de Windows/Mac/Linux. Carpetas adentro de carpetas adentro de carpetas... partiendo desde una unidad Raíz (Root).</li>
          <li><strong>Grafo Acíclico (Los accesos directos):</strong> Permite que un mismo archivo parezca que está en dos carpetas distintas a la vez (Enlaces / Links). "Acíclico" significa que no se permiten bucles infinitos.</li>
          <li><strong>Grafo General (El laberinto peligroso):</strong> Súper poderoso, pero si permitís hacer un enlace de una carpeta hacia adentro de sí misma, los buscadores pueden quedarse girando en círculos para siempre (ciclos). Requiere detectores especiales.</li>
        </ul>
      </div>

      <div class="section-block">
        <h4>Rutas (Paths)</h4>
        <ul class="list-styled">
          <li><strong>Ruta Absoluta (La dirección completa con código postal):</strong> Empieza siempre desde la mismísima raíz del sistema (<code>/</code> o <code>C:\</code>). Nunca falla. Ej: <code>/home/user/descargas/foto.jpg</code></li>
          <li><strong>Ruta Relativa (El "doblás acá a la izquierda"):</strong> Empieza partiendo de <em>dónde estás parado ahora mismo</em>. Mucho más corto pero depende del contexto. Ej: Si estás en "descargas", la ruta es solo <code>./foto.jpg</code></li>
        </ul>
      </div>

      <div class="section-block">
        <h4>Operaciones sobre Directorios</h4>
        <ul class="list-styled">
          <li><strong>Búsqueda:</strong> Localizar un archivo por su nombre dentro del directorio.</li>
          <li><strong>Creación:</strong> Añadir una nueva entrada (archivo o subdirectorio).</li>
          <li><strong>Eliminación:</strong> Borrar una entrada existente del directorio.</li>
          <li><strong>Renombrado:</strong> Cambiar el nombre de una entrada.</li>
          <li><strong>Listado:</strong> Mostrar el contenido completo del directorio.</li>
          <li><strong>Travesía (Navegación):</strong> Recorrer la estructura del sistema de archivos moviéndose entre directorios.</li>
        </ul>
      </div>
    </Accordion>

    <!-- Tema 3: Implementación del Sistema de Archivos -->
    <Accordion id="sd3u5-t3" title="Implementación del Sistema de Archivos" :icon="HardDrive" number="Tema 3" color="red">
      <InfoCard type="example" label="Ejemplo sencillo">
        <p>Pensá en una <strong>biblioteca completa</strong>. El edificio tiene una placa en la entrada con datos del edificio (superbloque — parámetros del volumen). Cada libro tiene una ficha con su ubicación, autor y tamaño (FCB/inode — bloque de control de archivo). La bibliotecaria tiene un catálogo en su escritorio (tablas en memoria) que le permite encontrar rápidamente cualquier libro sin recorrer todos los estantes. Y la <strong>capa VFS (Sistema de Archivos Virtual)</strong> es como un sistema universal: aunque la biblioteca tenga secciones con distintos sistemas de catalogación, el usuario siempre busca de la misma manera.</p>
      </InfoCard>

      <div class="section-block">
        <h4>Estructuras Particulares en Disco</h4>
        <ul class="list-styled">
          <li><strong>Bloque de arranque (Boot block):</strong> El primer pedacito físico del disco. Tiene el código milagroso que la PC lee al prenderse para despertar al Sistema Operativo.</li>
          <li><strong>Superbloque (El mapa general):</strong> Contiene la "confi" técnica de toda la partición (cuántos bloques tiene, dónde arrancan los archivos, de qué tamaño es cada bloque).</li>
          <li><strong>Inodes / Bloques FCB (El registro civil de archivos):</strong> Una lista estructurada donde cada archivo tiene su "ficha" con sus metadatos (tamaño, fechas, permisos) y la lista de todos los bloques físicos de disco donde están desperdigadas sus partes.</li>
        </ul>
      </div>

      <div class="section-block">
        <h4>Estructuras en Memoria</h4>
        <ul class="list-styled">
          <li>Tablas de montaje, cachés de directorios y tabla global de archivos abiertos.</li>
          <li><strong>VFS (Virtual File System):</strong> Permite al núcleo manejar múltiples tipos de sistemas de archivos uniformemente.</li>
        </ul>
      </div>

      <div class="section-block">
        <h4>Semántica de Consistencia (Las reglas al modificar)</h4>
        <ul class="list-styled">
          <li><strong>Semántica UNIX (Tiempo real):</strong> Lo que un programa escribe a un archivo, los demás programas lo pueden leer inmediatamente en el milisegundo siguiente (usa cachés compartidas intensivamente). Es el estándar.</li>
          <li><strong>Semántica de Sesión (El modelo egoísta):</strong> Mientras modificás un archivo, los demás ven la versión vieja. Recién cuando hacés <em>Close</em>, tus cambios se actualizan para el resto de la red.</li>
          <li><strong>Bloqueos (Los candados protectores):</strong> Para evitar que dos rompan un archivo al mismo tiempo, existen bloqueos compartidos (todos pueden entrar a leer) o bloqueos exclusivos (¡Peligro! Entré yo a escribir, todos los demás fuera).</li>
        </ul>
      </div>
    </Accordion>

    <!-- Tema 4: Asignación de Espacio en Disco -->
    <Accordion id="sd3u5-t4" title="Asignación de Espacio y Espacio Libre" :icon="Database" number="Tema 4" color="red">
      <InfoCard type="example" label="Ejemplo sencillo">
        <p>Pensá en <strong>tres formas de guardar fotos en un álbum</strong>. La <strong>asignación contigua</strong> es pegar las fotos de un viaje todas juntas en páginas consecutivas — rápido de hojear pero si querés agregar una foto más, no hay espacio libre entre medio. La <strong>asignación ligada</strong> es pegar cada foto en cualquier lugar libre y escribir en cada una "la siguiente foto está en la página X" — flexible pero lento si querés ir a la foto 50 (tenés que pasar por las 49 anteriores). La <strong>asignación indexada (inodes)</strong> es tener una hoja índice aparte que dice "foto 1 → pág 3, foto 2 → pág 7, foto 3 → pág 12" — podés ir directo a cualquier foto.</p>
      </InfoCard>

      <div class="section-block">
        <h4>Métodos de Asignación</h4>
        <ul class="list-styled">
          <li><strong>Contigua:</strong> El archivo ocupa bloques adyacentes. Gran velocidad de lectura pero sufre de fragmentación externa y es difícil que el archivo crezca.</li>
          <li><strong>Ligada:</strong> Cada bloque tiene un puntero al siguiente. Elimina fragmentación externa y facilita el crecimiento, pero solo permite acceso secuencial.</li>
          <li><strong>Indexada (Inodes):</strong> Un bloque de índice centraliza todos los punteros del archivo. Soporta acceso directo y elimina fragmentación externa. Usado en Linux (ext2/3/4).</li>
        </ul>
      </div>

      <ComparisonTable
        title="Comparación de Métodos de Asignación"
        :columns="['Aspecto', 'Contigua', 'Ligada', 'Indexada']"
        :rows="allocationRows"
      />

      <div class="section-block">
        <h4>Administración de Espacio Libre (Evitando buscar de a un bloque)</h4>
        <ul class="list-styled">
          <li><strong>Mapa de Bits (El tablero de luces):</strong> Se usa un arreglo gigante de bits donde el primer bit representa al bloque 1 del disco, el segundo al bloque 2, etc. (0=ocupado, 1=libre). Es lo que usa Linux (ext4). La PC busca rachas largas de "11111" rapidísimo.</li>
          <li><strong>Listas Ligadas (La soga larga):</strong> En el primer bloque libre hay una nota que te dice dónde está el segundo libre, y así. Pésimo para buscar mucho espacio rápido de golpe.</li>
          <li><strong>Agrupamiento / Conteo:</strong> Trucos para discos gigantes. En lugar de anotar cada bloque, anoto "Desde el bloque 40.000, los próximos 80 están libres juntos" (conteo por corridas).</li>
        </ul>
      </div>
    </Accordion>

    <UnitQuiz
      unitId="sd3-5"
      title="Quiz — Unidad 5: Sistema de Archivos"
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
import { File as FileIcon, FolderTree, HardDrive, Database } from 'lucide-vue-next'

const props = defineProps({ searchQuery: { type: String, default: '' } })

const topicMeta = [
  { id: 'sd3u5-t1', anchor: 'sd3u5-t1', number: 'Tema 1', title: 'Archivos: Concepto y Propiedades', keywords: ['archivo', 'extensión', 'secuencial', 'directo', 'indexado', 'metadatos', 'inode', 'atributos', 'open', 'close', 'read', 'write'], summary: ['Unidad lógica de almacenamiento.', 'Acceso: secuencial, directo, indexado.', 'Metadatos: nombre, permisos, timestamps.'] },
  { id: 'sd3u5-t2', anchor: 'sd3u5-t2', number: 'Tema 2', title: 'Estructuras de Directorios', keywords: ['directorio', 'jerárquico', 'árbol', 'grafo', 'enlace', 'link', 'ruta', 'path', 'raíz'], summary: ['De un nivel a grafos generales.', 'Jerárquico en árbol es el estándar.', 'Rutas absolutas y relativas.'] },
  { id: 'sd3u5-t3', anchor: 'sd3u5-t3', number: 'Tema 3', title: 'Implementación del SA', keywords: ['superbloque', 'FCB', 'VFS', 'semántica', 'consistencia', 'montaje', 'bloqueo'], summary: ['Superbloque + FCB/inodes en disco.', 'VFS: interfaz uniforme.', 'Semántica UNIX vs. sesión.'] },
  { id: 'sd3u5-t4', anchor: 'sd3u5-t4', number: 'Tema 4', title: 'Asignación y Espacio Libre', keywords: ['contigua', 'ligada', 'indexada', 'inodes', 'bitmap', 'ext4', 'mapa de bits', 'espacio libre'], summary: ['Contigua: rápida pero rígida.', 'Ligada: flexible, solo secuencial.', 'Indexada: acceso directo (ext4).'] }
]

const { getTopicStatus, setTopicStatus, getSummary } = useStudyProgress('sd3-5')
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

const allocationRows = [
  { 'Aspecto': 'Velocidad lectura', 'Contigua': 'Muy rápida', 'Ligada': 'Lenta (seguir punteros)', 'Indexada': 'Rápida (acceso directo)' },
  { 'Aspecto': 'Fragmentación', 'Contigua': 'Externa', 'Ligada': 'Ninguna', 'Indexada': 'Ninguna' },
  { 'Aspecto': 'Crecimiento', 'Contigua': 'Difícil', 'Ligada': 'Fácil', 'Indexada': 'Fácil' },
  { 'Aspecto': 'Acceso directo', 'Contigua': 'Sí', 'Ligada': 'No (solo secuencial)', 'Indexada': 'Sí' },
  { 'Aspecto': 'Uso real', 'Contigua': 'CD-ROMs, backups', 'Ligada': 'FAT (MS-DOS)', 'Indexada': 'ext2/3/4 (Linux)' }
]

const quizQuestions = [
  { id: 'sd3u5q1', topic: 'Tema 1', question: '¿Qué es la extensión de un archivo?', options: ['El tamaño del archivo', 'Un indicador del formato y tipo de contenido (ej. .txt, .mp3)', 'La ubicación física en disco', 'El permiso de lectura'], correctIndex: 1 },
  { id: 'sd3u5q2', topic: 'Tema 1', question: 'Un archivo que modela un disco es de tipo...', options: ['Regular', 'Directorio', 'Especial de bloques', 'Especial de caracteres'], correctIndex: 2 },
  { id: 'sd3u5q3', topic: 'Tema 1', question: '¿Qué operación mueve el puntero a una posición específica?', options: ['Read', 'Write', 'Seek', 'Truncate'], correctIndex: 2 },
  { id: 'sd3u5q4', topic: 'Tema 2', question: 'Un directorio con un solo nivel tiene el problema de...', options: ['Ser muy lento', 'Colisiones de nombres', 'No poder almacenar archivos', 'Crear ciclos'], correctIndex: 1 },
  { id: 'sd3u5q5', topic: 'Tema 2', question: '¿Qué estructura permite compartir archivos mediante links sin ciclos?', options: ['Un solo nivel', 'Jerárquico en árbol', 'Grafo acíclico', 'Grafo general'], correctIndex: 2 },
  { id: 'sd3u5q6', topic: 'Tema 2', question: 'Una ruta absoluta comienza desde...', options: ['El directorio actual', 'El directorio raíz (/)', 'El directorio del usuario', 'Cualquier lugar'], correctIndex: 1 },
  { id: 'sd3u5q7', topic: 'Tema 3', question: '¿Qué estructura de disco almacena los parámetros del volumen?', options: ['FCB', 'Bloque de arranque', 'Superbloque', 'TLB'], correctIndex: 2 },
  { id: 'sd3u5q8', topic: 'Tema 3', question: 'Con semántica UNIX, las escrituras son...', options: ['Visibles solo al cerrar', 'Visibles inmediatamente para todos', 'Nunca visibles', 'Visibles solo para el autor'], correctIndex: 1 },
  { id: 'sd3u5q9', topic: 'Tema 4', question: '¿Qué método de asignación usa Linux (ext4)?', options: ['Contigua', 'Ligada', 'Indexada (inodes)', 'Ninguna'], correctIndex: 2 },
  { id: 'sd3u5q10', topic: 'Tema 4', question: '¿Qué usa un mapa de bits para indicar un bloque libre?', options: ['Un 0', 'Un 1', 'Un puntero', 'Un nombre'], correctIndex: 1 }
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
.status-btn.active { color: var(--accent-red); border-color: var(--accent-red); background: var(--accent-red-soft); }
.search-results-list { display: grid; gap: 8px; margin-top: 10px; }
.search-result-item { border: 1px solid var(--border-color); background: var(--bg-tertiary); border-radius: var(--radius-sm); padding: 10px; text-align: left; cursor: pointer; display: flex; flex-direction: column; gap: 2px; }
.search-result-item span { color: var(--text-secondary); font-size: 0.8rem; }
@keyframes fadeInUp { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }
</style>
