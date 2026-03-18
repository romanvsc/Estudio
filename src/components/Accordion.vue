<template>
  <div :id="id" class="accordion" :class="{ open: isOpen }">
    <button
      class="accordion-header"
      @click="toggle"
      :style="headerStyle"
      :aria-expanded="isOpen"
      :aria-controls="contentId"
    >
      <div class="accordion-left">
        <component :is="icon" v-if="icon" class="accordion-lucide-icon" :size="20" stroke-width="2" />
        <div>
          <span v-if="number" class="accordion-number">{{ number }}</span>
          <h3 class="accordion-title">{{ title }}</h3>
        </div>
      </div>
      <div class="accordion-right">
        <button
          class="bookmark-btn"
          :class="{ bookmarked: isBookmarkedTopic }"
          @click.stop="handleBookmark"
          :aria-label="isBookmarkedTopic ? 'Quitar marcador' : 'Agregar marcador'"
          title="Marcador"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" :fill="isBookmarkedTopic ? 'currentColor' : 'none'" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
          </svg>
        </button>
        <svg class="chevron" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
          <polyline points="6 9 12 15 18 9"/>
        </svg>
      </div>
    </button>
    <Transition name="accordion">
      <div v-show="isOpen" class="accordion-body" :id="contentId" role="region" :aria-labelledby="headerId">
        <div class="accordion-content">
          <slot />
          <!-- Personal notes section -->
          <TopicNotes v-if="isOpen && topicKey" :topicKey="topicKey" />
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { toggleBookmark, isBookmarked } from '../composables/useStudyProgress'
import TopicNotes from './TopicNotes.vue'

const route = useRoute()

const props = defineProps({
  id: { type: String, default: '' },
  title: { type: String, required: true },
  icon: { type: String, default: '' },
  number: { type: String, default: '' },
  color: { type: String, default: 'blue' },
  defaultOpen: { type: Boolean, default: false }
})

const isOpen = ref(props.defaultOpen)

// Derive unitId from route, e.g. /unidad/2 → 2
const unitId = computed(() => {
  const m = route.path.match(/unidad\/(\d+)/)
  return m ? m[1] : 'global'
})

const topicKey = computed(() => `${unitId.value}::${props.id || props.title}`)
const contentId = computed(() => `accordion-content-${props.id || props.title.replace(/\s/g, '-')}`)
const headerId = computed(() => `accordion-header-${props.id || props.title.replace(/\s/g, '-')}`)
const isBookmarkedTopic = ref(isBookmarked(topicKey.value))

const headerStyle = computed(() => {
  if (!isOpen.value) return {}
  const colors = {
    blue: 'var(--accent-blue-soft)',
    teal: 'var(--accent-teal-soft)',
    amber: 'var(--accent-amber-soft)',
    red: 'var(--accent-red-soft)',
    purple: 'var(--accent-purple-soft)'
  }
  return { background: colors[props.color] || colors.blue }
})

function toggle() {
  isOpen.value = !isOpen.value
}

function handleBookmark() {
  toggleBookmark(topicKey.value, { title: props.title, unit: unitId.value, route: route.path })
  isBookmarkedTopic.value = isBookmarked(topicKey.value)
}
</script>

<style scoped>
.accordion {
  border: var(--border-width-thick) solid var(--border-color);
  border-radius: var(--radius-md);
  overflow: hidden;
  transition: all var(--transition-base);
  margin-bottom: 14px;
  box-shadow: var(--shadow-sm);
}

.accordion.open {
  box-shadow: var(--shadow-md);
}

.accordion-header {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 20px;
  border: none;
  background: var(--bg-card);
  cursor: pointer;
  font-family: inherit;
  color: var(--text-primary);
  transition: all var(--transition-fast);
}

.accordion-header:hover {
  background: var(--accent-blue-soft);
}

.accordion-left {
  display: flex;
  align-items: center;
  gap: 12px;
}

.accordion-icon {
  font-size: 1.25rem;
  flex-shrink: 0;
}

.accordion-number {
  font-size: 0.68rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--text-muted);
  display: block;
  margin-bottom: 2px;
}

.accordion-title {
  font-size: 0.95rem;
  font-weight: 700;
  text-align: left;
}

.accordion-right {
  display: flex;
  align-items: center;
  gap: 8px;
}

.bookmark-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border: var(--border-width) solid transparent;
  background: transparent;
  border-radius: var(--radius-sm);
  color: var(--text-muted);
  cursor: pointer;
  transition: all var(--transition-fast);
  padding: 0;
}

.bookmark-btn:hover {
  color: var(--accent-amber);
  background: var(--accent-gold-soft);
  border-color: var(--accent-amber);
  transform: translate(-2px, -2px);
  box-shadow: 4px 4px 0 var(--border-color);
}

.bookmark-btn.bookmarked {
  color: var(--accent-amber);
  background: var(--accent-gold-soft);
  border-color: var(--accent-amber);
}

.chevron {
  color: var(--text-muted);
  transition: transform var(--transition-base);
  flex-shrink: 0;
}

.accordion.open .chevron {
  transform: rotate(180deg);
}

.accordion-body {
  overflow: hidden;
}

.accordion-content {
  padding: 20px 24px;
  border-top: var(--border-width-thick) solid var(--border-color);
  background: var(--bg-secondary);
}

/* Transition */
.accordion-enter-active,
.accordion-leave-active {
  transition: all var(--transition-base);
  max-height: 5000px;
}

.accordion-enter-from,
.accordion-leave-to {
  max-height: 0;
  opacity: 0;
}
</style>
