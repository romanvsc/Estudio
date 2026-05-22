<template>
  <div class="app-layout" :data-theme="theme">
    <Sidebar
      v-if="isSubjectView"
      :units="sidebarItems"
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
            <component :is="Component" :key="$route.fullPath" :searchQuery="searchQuery" />
          </transition>
        </router-view>
      </main>
    </div>

    <div v-if="sidebarOpen" class="sidebar-overlay" @click="sidebarOpen = false"></div>
    <AchievementToast />
  </div>
</template>

<script setup>
import { computed, onMounted, onUnmounted, shallowRef } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import AchievementToast from './components/AchievementToast.vue'
import PomodoroTimer from './components/PomodoroTimer.vue'
import Sidebar from './components/Sidebar.vue'
import { getSubjectById } from './content/subjects'
import { resolveIcon } from './content/iconRegistry'

const route = useRoute()
const router = useRouter()

const theme = shallowRef('light')
const sidebarOpen = shallowRef(false)
const searchQuery = shallowRef('')
const searchFocused = shallowRef(false)

const currentSubject = computed(() => {
  const subject = route.params.subject || route.path.split('/')[1]
  return getSubjectById(subject)?.id || null
})

const activeSubject = computed(() => getSubjectById(currentSubject.value))
const isSubjectView = computed(() => Boolean(activeSubject.value))

const sidebarItems = computed(() => {
  if (!activeSubject.value) return []
  return [
    {
      id: 'dashboard',
      title: 'Panel General',
      icon: resolveIcon('layoutDashboard'),
      color: 'blue',
      label: 'Dashboard',
      path: activeSubject.value.dashboardPath
    },
    ...activeSubject.value.units.map((unit) => ({
      id: unit.id,
      title: unit.title,
      icon: resolveIcon(unit.icon),
      color: unit.color,
      path: `/${activeSubject.value.id}/unidad/${unit.id}`
    })),
    ...activeSubject.value.exams.map((exam) => ({
      id: exam.legacyId || exam.id,
      title: exam.title,
      icon: resolveIcon(exam.icon),
      color: exam.color,
      label: 'Examen',
      path: exam.route
    }))
  ]
})

const currentUnit = computed(() => {
  if (route.path.includes('/dashboard')) return 'dashboard'
  const unitMatch = route.path.match(/\/unidad\/(\d+)/)
  if (unitMatch) return Number(unitMatch[1])
  const exam = activeSubject.value?.exams.find((item) => route.path === item.route || route.path === item.legacyPath)
  return exam?.legacyId || exam?.id || null
})

const currentTopicHash = computed(() => route.hash.replace(/^#/, ''))

const currentTopics = computed(() => {
  if (!activeSubject.value || typeof currentUnit.value !== 'number') return []
  return activeSubject.value.units.find((unit) => unit.id === currentUnit.value)?.topics || []
})

function navigateTo(itemId) {
  const item = sidebarItems.value.find((entry) => entry.id === itemId)
  if (!item) return
  router.push(item.path)
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
  theme.value = saved || 'light'
  document.documentElement.setAttribute('data-theme', theme.value)
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
  max-width: 1180px;
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
