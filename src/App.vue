<template>
  <div class="app-layout" :data-theme="theme">
    <Sidebar
      v-if="isSubjectView"
      :units="units"
      :currentUnit="currentUnit"
      :topics="currentTopics"
      :currentTopic="currentTopicHash"
      :isOpen="sidebarOpen"
      :subject="currentSubject"
      @navigate="navigateTo"
      @navigate-topic="navigateToTopic"
      @close="sidebarOpen = false"
    />

    <div class="main-area" :class="{ 'no-sidebar': !isSubjectView }">
      <header class="top-bar">
        <button class="menu-btn" @click="sidebarOpen = !sidebarOpen" aria-label="Menú">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
            <line x1="3" y1="6" x2="21" y2="6"/>
            <line x1="3" y1="12" x2="21" y2="12"/>
            <line x1="3" y1="18" x2="21" y2="18"/>
          </svg>
        </button>

        <div class="search-wrapper">
          <svg class="search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
            <circle cx="11" cy="11" r="8"/>
            <line x1="21" y1="21" x2="16.65" y2="16.65"/>
          </svg>
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Buscar contenido..."
            class="search-input"
            @focus="searchFocused = true"
            @blur="searchFocused = false"
          />
          <kbd v-if="!searchQuery && !searchFocused" class="search-kbd">Ctrl K</kbd>
        </div>

        <PomodoroTimer />
        <button class="theme-btn" @click="toggleTheme" :aria-label="theme === 'dark' ? 'Modo claro' : 'Modo oscuro'">
          <svg v-if="theme === 'dark'" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
            <circle cx="12" cy="12" r="5"/>
            <line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/>
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
            <line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/>
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
          </svg>
          <svg v-else width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
          </svg>
        </button>
      </header>

      <main class="content-area">
        <router-view v-slot="{ Component }">
          <transition name="slide" mode="out-in">
            <component :is="Component" :key="$route.path" :searchQuery="searchQuery" />
          </transition>
        </router-view>
      </main>
    </div>

    <!-- Mobile overlay -->
    <div v-if="sidebarOpen" class="sidebar-overlay" @click="sidebarOpen = false"></div>

    <AchievementToast />
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, markRaw } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import Sidebar from './components/Sidebar.vue'
import PomodoroTimer from './components/PomodoroTimer.vue'
import AchievementToast from './components/AchievementToast.vue'
import { Building2, ClipboardList, Scale, BarChart3, BookOpen, GraduationCap, LayoutDashboard, Monitor, Cpu, Ban, HardDrive, FolderTree, Calculator } from 'lucide-vue-next'

const route = useRoute()
const router = useRouter()

const theme = ref('light')
const sidebarOpen = ref(false)
const searchQuery = ref('')
const searchFocused = ref(false)

const contabilidadUnits = [
  { id: 'dashboard', title: 'Panel General', icon: markRaw(LayoutDashboard), color: 'blue', label: 'Dashboard', path: '/contabilidad/dashboard' },
  { id: 1, title: 'Contabilidad y Organización', icon: markRaw(Building2), color: 'blue' },
  { id: 2, title: 'Aspectos Contables y Fiscales', icon: markRaw(ClipboardList), color: 'teal' },
  { id: 3, title: 'Informes y Ecuaciones', icon: markRaw(Scale), color: 'amber' },
  { id: 4, title: 'Cuentas Contables', icon: markRaw(BarChart3), color: 'purple' },
  { id: 5, title: 'Registración y Normativa', icon: markRaw(BookOpen), color: 'red' },
  { id: 'final', title: 'Modelo de Final 1', icon: markRaw(GraduationCap), color: 'gold', label: 'Examen', path: '/contabilidad/modelo-final' },
  { id: 'final2', title: 'Modelo de Final 2', icon: markRaw(GraduationCap), color: 'gold', label: 'Examen', path: '/contabilidad/modelo-final-2' },
  { id: 'final3', title: 'Modelo de Final 3', icon: markRaw(GraduationCap), color: 'gold', label: 'Examen', path: '/contabilidad/modelo-final-3' },
  { id: 'final4', title: 'Modelo de Final 4', icon: markRaw(GraduationCap), color: 'gold', label: 'Examen', path: '/contabilidad/modelo-final-4' }
]

const sd3Units = [
  { id: 'dashboard', title: 'Panel General', icon: markRaw(LayoutDashboard), color: 'blue', label: 'Dashboard', path: '/sd3/dashboard' },
  { id: 1, title: 'Introducción a los SO', icon: markRaw(Monitor), color: 'blue' },
  { id: 2, title: 'Procesos', icon: markRaw(Cpu), color: 'teal' },
  { id: 3, title: 'Bloqueo Irreversible', icon: markRaw(Ban), color: 'amber' },
  { id: 4, title: 'Administración de Memoria', icon: markRaw(HardDrive), color: 'purple' },
  { id: 5, title: 'Sistema de Archivos', icon: markRaw(FolderTree), color: 'red' }
]

const matfinUnits = [
  { id: 'dashboard', title: 'Panel General', icon: markRaw(LayoutDashboard), color: 'blue', label: 'Dashboard', path: '/matfin/dashboard' },
  { id: 1, title: 'Fundamentos y Cálculo Financiero', icon: markRaw(Calculator), color: 'teal' }
]

const topicCatalog = {
  contabilidad: {
    1: [
      { id: 'u1-t1', number: 'Tema 1', title: 'Ente y persona jurídica' },
      { id: 'u1-t2', number: 'Tema 2', title: 'Organización y elementos' },
      { id: 'u1-t3', number: 'Tema 3', title: 'Clasificación de organizaciones' },
      { id: 'u1-t4', number: 'Tema 4', title: 'Tipos societarios' },
      { id: 'u1-t5', number: 'Tema 5', title: 'Empresa en marcha' },
      { id: 'u1-t6', number: 'Tema 6', title: 'Inversión inicial y capital de trabajo' },
      { id: 'u1-t7', number: 'Tema 7', title: 'Contabilidad como ciencia, técnica y arte' },
      { id: 'u1-t8', number: 'Tema 8', title: 'Evolución histórica' },
      { id: 'u1-t9', number: 'Temas 9-11', title: 'Objeto, objetivo e informes contables' }
    ],
    2: [
      { id: 'u2-t1', number: 'Tema 1', title: 'Relación empresa-Estado' },
      { id: 'u2-t2', number: 'Tema 2', title: 'Monotributo' },
      { id: 'u2-t3', number: 'Tema 3', title: 'Régimen general' },
      { id: 'u2-t4', number: 'Tema 4', title: 'Comprobantes' },
      { id: 'u2-t5', number: 'Tema 5', title: 'Archivo y conservación' },
      { id: 'u2-t6', number: 'Tema 6', title: 'Documentación respaldatoria' }
    ],
    3: [
      { id: 'u3-t1', number: 'Tema 1', title: 'Informes contables' },
      { id: 'u3-t2', number: 'Tema 2', title: 'Activo, pasivo y patrimonio neto' },
      { id: 'u3-t3', number: 'Tema 3', title: 'Capital y ecuación patrimonial estática' },
      { id: 'u3-t4', number: 'Tema 4', title: 'Resultados positivos y negativos' },
      { id: 'u3-t5', number: 'Tema 5', title: 'Ecuación contable dinámica' },
      { id: 'u3-t6', number: 'Tema 6', title: 'Rueda operativa' },
      { id: 'u3-t7', number: 'Tema 7', title: 'Variaciones patrimoniales' },
      { id: 'u3-t8', number: 'Tema 8', title: 'Partida doble vs partida simple' },
      { id: 'u3-t9', number: 'Tema 9', title: 'Base devengado vs percibido' }
    ],
    4: [
      { id: 'u4-t1', number: 'Tema 1', title: 'Definición de cuenta contable' },
      { id: 'u4-t2', number: 'Tema 2', title: 'Clasificación según naturaleza' },
      { id: 'u4-t3', number: 'Tema 3', title: 'Agrupación por rubro' },
      { id: 'u4-t4', number: 'Tema 4', title: 'Unidades y criterios de valuación' },
      { id: 'u4-t5', number: 'Tema 5', title: 'Clasificación por grado de análisis' },
      { id: 'u4-t6', number: 'Tema 6', title: 'Plan de cuentas' },
      { id: 'u4-t7', number: 'Tema 7', title: 'Manual de cuentas' },
      { id: 'u4-t8', number: 'Tema 8', title: 'Componentes financieros explícitos e implícitos' }
    ],
    5: [
      { id: 'u5-t1', number: 'Tema 1', title: 'Normas legales de la contabilidad' },
      { id: 'u5-t2', number: 'Tema 2', title: 'Sujetos obligados a llevar libros' },
      { id: 'u5-t3', number: 'Tema 3', title: 'Libros obligatorios' },
      { id: 'u5-t4', number: 'Tema 4', title: 'Orden de uso de libros contables' },
      { id: 'u5-t5', number: 'Tema 5', title: 'Medios de registración contable' },
      { id: 'u5-t6', number: 'Tema 6', title: 'Ejemplos de registración' }
    ]
  },
  sd3: {
    1: [
      { id: 'sd3u1-t1', number: 'Tema 1', title: 'Definición y propósito del SO' },
      { id: 'sd3u1-t2', number: 'Tema 2', title: 'Evolución histórica' },
      { id: 'sd3u1-t3', number: 'Tema 3', title: 'Funciones y componentes' },
      { id: 'sd3u1-t4', number: 'Tema 4', title: 'Clasificación de los SO' },
      { id: 'sd3u1-t5', number: 'Tema 5', title: 'Arquitecturas del SO' }
    ],
    2: [
      { id: 'sd3u2-t1', number: 'Tema 1', title: 'Anatomía de un proceso' },
      { id: 'sd3u2-t2', number: 'Tema 2', title: 'PCB y cambio de contexto' },
      { id: 'sd3u2-t3', number: 'Tema 3', title: 'Ciclo de vida y jerarquías' },
      { id: 'sd3u2-t4', number: 'Tema 4', title: 'Sincronización e IPC' },
      { id: 'sd3u2-t5', number: 'Tema 5', title: 'Problemas clásicos' }
    ],
    3: [
      { id: 'sd3u3-t1', number: 'Tema 1', title: 'Concepto de deadlock' },
      { id: 'sd3u3-t2', number: 'Tema 2', title: 'Recursos expropiables y no expropiables' },
      { id: 'sd3u3-t3', number: 'Tema 3', title: 'Condiciones de Coffman' },
      { id: 'sd3u3-t4', number: 'Tema 4', title: 'Detección y recuperación' },
      { id: 'sd3u3-t5', number: 'Tema 5', title: 'Evitación (banquero)' },
      { id: 'sd3u3-t6', number: 'Tema 6', title: 'Prevención de bloqueos' }
    ],
    4: [
      { id: 'sd3u4-t1', number: 'Tema 1', title: 'Monoprogramación' },
      { id: 'sd3u4-t2', number: 'Tema 2', title: 'Multiprogramación con particiones' },
      { id: 'sd3u4-t3', number: 'Tema 3', title: 'Intercambio (swapping)' },
      { id: 'sd3u4-t4', number: 'Tema 4', title: 'Memoria virtual' },
      { id: 'sd3u4-t5', number: 'Tema 5', title: 'Segmentación paginada' }
    ],
    5: [
      { id: 'sd3u5-t1', number: 'Tema 1', title: 'Archivos: concepto y estructura' },
      { id: 'sd3u5-t2', number: 'Tema 2', title: 'Estructuras de directorios' },
      { id: 'sd3u5-t3', number: 'Tema 3', title: 'Implementación del sistema de archivos' },
      { id: 'sd3u5-t4', number: 'Tema 4', title: 'Asignación de espacio y espacio libre' }
    ]
  },
  matfin: {
    1: [
      { id: 'mfu1-t1', number: 'Tema 1', title: 'Decisiones financieras y principios' },
      { id: 'mfu1-t2', number: 'Tema 2', title: 'Tasa de interés y componentes' },
      { id: 'mfu1-t3', number: 'Tema 3', title: 'Operación financiera y elementos' },
      { id: 'mfu1-t4', number: 'Tema 4', title: 'Interés simple' },
      { id: 'mfu1-t5', number: 'Tema 5', title: 'Interés compuesto' },
      { id: 'mfu1-t6', number: 'Tema 6', title: 'Descuento simple y compuesto' },
      { id: 'mfu1-t7', number: 'Tema 7', title: 'Equivalencia de tasas' }
    ]
  }
}

const currentSubject = computed(() => {
  if (route.path.startsWith('/sd3')) return 'sd3'
  if (route.path.startsWith('/matfin')) return 'matfin'
  if (route.path.startsWith('/contabilidad')) return 'contabilidad'
  return null
})

const isSubjectView = computed(() => currentSubject.value !== null)

const units = computed(() => {
  if (currentSubject.value === 'sd3') return sd3Units
  if (currentSubject.value === 'matfin') return matfinUnits
  return contabilidadUnits
})

const currentUnit = computed(() => {
  const p = route.path
  if (p.includes('/dashboard')) return 'dashboard'
  if (p === '/contabilidad/modelo-final') return 'final'
  if (p === '/contabilidad/modelo-final-2') return 'final2'
  if (p === '/contabilidad/modelo-final-3') return 'final3'
  if (p === '/contabilidad/modelo-final-4') return 'final4'
  const match = p.match(/\/unidad\/(\d+)/)
  return match ? parseInt(match[1]) : null
})

const currentTopicHash = computed(() => route.hash.replace(/^#/, ''))

const currentTopics = computed(() => {
  if (!currentSubject.value || typeof currentUnit.value !== 'number') return []
  return topicCatalog[currentSubject.value]?.[currentUnit.value] || []
})

function navigateTo(unitId) {
  const prefix = currentSubject.value === 'sd3'
    ? '/sd3'
    : currentSubject.value === 'matfin'
      ? '/matfin'
      : '/contabilidad'
  const list = units.value
  const unit = list.find(u => u.id === unitId)
  router.push(unit?.path || `${prefix}/unidad/${unitId}`)
  sidebarOpen.value = false
}

function navigateToTopic(topicId) {
  if (!topicId || typeof currentUnit.value !== 'number') return
  router.push({ path: route.path, hash: `#${topicId}` })
  sidebarOpen.value = false
}

function toggleTheme() {
  theme.value = theme.value === 'dark' ? 'light' : 'dark'
  document.documentElement.setAttribute('data-theme', theme.value)
  localStorage.setItem('theme', theme.value)
}

function handleKeydown(e) {
  if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
    e.preventDefault()
    document.querySelector('.search-input')?.focus()
  }
}

onMounted(() => {
  const saved = localStorage.getItem('theme')
  if (saved) {
    theme.value = saved
    document.documentElement.setAttribute('data-theme', saved)
  } else {
    document.documentElement.setAttribute('data-theme', 'light')
  }
  window.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown)
})
</script>

<style scoped>
.app-layout {
  display: flex;
  min-height: 100vh;
  position: relative;
  z-index: 1;
}

.main-area {
  flex: 1;
  margin-left: var(--sidebar-width);
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  transition: margin-left var(--transition-base);
}

.main-area.no-sidebar {
  margin-left: 0;
}

.top-bar {
  position: sticky;
  top: 0;
  z-index: 50;
  height: var(--header-height);
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 0 24px;
  background: var(--bg-secondary);
  border-bottom: var(--border-width) solid var(--border-color);
  box-shadow: 0 3px 0 var(--border-color);
}

.menu-btn {
  display: none;
  background: var(--accent-blue);
  border: var(--border-width) solid var(--border-color);
  color: #fff;
  cursor: pointer;
  padding: 6px 8px;
  border-radius: var(--radius-sm);
  box-shadow: var(--shadow-sm);
  transition: all var(--transition-fast);
}

.menu-btn:hover {
  transform: translate(-2px, -2px);
  box-shadow: 6px 6px 0 var(--border-color);
}

.menu-btn:active {
  transform: translate(2px, 2px);
  box-shadow: 1px 1px 0 var(--border-color);
}

.search-wrapper {
  flex: 1;
  max-width: 480px;
  position: relative;
  display: flex;
  align-items: center;
}

.search-icon {
  position: absolute;
  left: 12px;
  color: var(--text-muted);
  pointer-events: none;
}

.search-input {
  width: 100%;
  padding: 8px 12px 8px 38px;
  background: var(--bg-secondary);
  border: var(--border-width) solid var(--border-color);
  border-radius: var(--radius-sm);
  color: var(--text-primary);
  font-family: inherit;
  font-size: 0.875rem;
  font-weight: 500;
  outline: none;
  box-shadow: var(--shadow-sm);
  transition: all var(--transition-fast);
}

.search-input:focus {
  border-color: var(--accent-blue);
  box-shadow: 4px 4px 0 var(--accent-blue);
  transform: translate(-2px, -2px);
}

.search-input::placeholder {
  color: var(--text-muted);
  font-weight: 400;
}

.search-kbd {
  position: absolute;
  right: 10px;
  font-family: inherit;
  font-size: 0.7rem;
  font-weight: 700;
  padding: 2px 6px;
  border-radius: 3px;
  background: var(--accent-blue-soft);
  border: 2px solid var(--border-color);
  color: var(--text-secondary);
  pointer-events: none;
}

.theme-btn {
  margin-left: auto;
  background: var(--accent-gold-soft);
  border: var(--border-width) solid var(--border-color);
  color: var(--text-primary);
  cursor: pointer;
  padding: 8px;
  border-radius: var(--radius-sm);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: var(--shadow-sm);
  transition: all var(--transition-fast);
}

.theme-btn:hover {
  background: var(--accent-gold);
  transform: translate(-2px, -2px);
  box-shadow: 6px 6px 0 var(--border-color);
}

.theme-btn:active {
  transform: translate(2px, 2px);
  box-shadow: 1px 1px 0 var(--border-color);
}

.content-area {
  flex: 1;
  padding: 32px 40px 64px;
  max-width: 960px;
  width: 100%;
  margin: 0 auto;
  position: relative;
  z-index: 1;
}

.sidebar-overlay {
  display: none;
}

@media (max-width: 992px) {
  .main-area {
    margin-left: 0;
  }

  .menu-btn {
    display: flex;
  }

  .sidebar-overlay {
    display: block;
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.6);
    z-index: 90;
  }

  .content-area {
    padding: 24px 20px 48px;
  }
}
</style>
