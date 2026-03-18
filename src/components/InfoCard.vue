<template>
  <div class="info-card" :class="[`type-${type}`]">
    <div class="card-accent"></div>
    <div class="card-body">
      <div v-if="label" class="card-label">
        <component :is="labelIcon" :size="14" stroke-width="2.5" class="card-label-icon" />
        {{ label }}
      </div>
      <h4 v-if="title" class="card-title">{{ title }}</h4>
      <div class="card-content">
        <slot />
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { Info, BookOpen, Lightbulb, AlertTriangle, CheckCircle, Key, Scale } from 'lucide-vue-next'

const props = defineProps({
  type: { type: String, default: 'info' },
  title: { type: String, default: '' },
  label: { type: String, default: '' }
})

const labelIcon = computed(() => {
  const icons = {
    info: Info,
    definition: BookOpen,
    example: Lightbulb,
    warning: AlertTriangle,
    tip: CheckCircle,
    important: Key,
    law: Scale
  }
  return icons[props.type] || icons.info
})
</script>

<style scoped>
.info-card {
  display: flex;
  border-radius: var(--radius-sm);
  overflow: hidden;
  margin: 12px 0;
  border: var(--border-width) solid var(--border-color);
  box-shadow: var(--shadow-sm);
  transition: all var(--transition-fast);
}

.info-card:hover {
  transform: translate(-2px, -2px);
  box-shadow: var(--shadow-md);
}

.card-accent {
  width: 6px;
  flex-shrink: 0;
}

.card-body {
  flex: 1;
  padding: 14px 18px;
}

.card-label {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 0.72rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  margin-bottom: 6px;
}

.card-label-icon {
  font-size: 0.85rem;
}

.card-title {
  font-size: 0.95rem;
  margin-bottom: 8px;
}

.card-content {
  font-size: 0.88rem;
  line-height: 1.7;
  color: var(--text-secondary);
}

.card-content :deep(strong) {
  color: var(--text-primary);
}

/* Type variants */
.type-info .card-accent { background: var(--accent-blue); }
.type-info .card-body { background: var(--accent-blue-soft); }
.type-info .card-label { color: var(--accent-blue); }

.type-definition .card-accent { background: var(--accent-purple); }
.type-definition .card-body { background: var(--accent-purple-soft); }
.type-definition .card-label { color: var(--accent-purple); }

.type-example .card-accent { background: var(--accent-teal); }
.type-example .card-body { background: var(--accent-teal-soft); }
.type-example .card-label { color: var(--accent-teal); }

.type-warning .card-accent { background: var(--accent-amber); }
.type-warning .card-body { background: var(--accent-amber-soft); }
.type-warning .card-label { color: var(--accent-amber); }

.type-tip .card-accent { background: var(--accent-teal); }
.type-tip .card-body { background: var(--accent-teal-soft); }
.type-tip .card-label { color: var(--accent-teal); }

.type-important .card-accent { background: var(--accent-amber); }
.type-important .card-body { background: var(--accent-amber-soft); }
.type-important .card-label { color: var(--accent-amber); }

.type-law .card-accent { background: var(--accent-red); }
.type-law .card-body { background: var(--accent-red-soft); }
.type-law .card-label { color: var(--accent-red); }
</style>
