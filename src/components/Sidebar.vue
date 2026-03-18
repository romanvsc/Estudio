<template>
  <aside class="sidebar" :class="{ open: isOpen }">
    <div class="sidebar-header">
      <div class="logo">
        <span class="logo-icon">{{ subject === 'sd3' ? '🖥️' : '📚' }}</span>
        <div class="logo-text">
          <span class="logo-title">{{ subject === 'sd3' ? 'Sistemas de Datos III' : 'Contabilidad' }}</span>
          <span class="logo-sub">Guía de Estudio</span>
        </div>
      </div>
      <router-link to="/" class="back-link">← Cambiar materia</router-link>
    </div>

    <nav class="nav-list">
      <span class="nav-label">Unidades</span>
      <template v-for="unit in units" :key="unit.id">
        <div v-if="unit.id === 'final'" class="nav-section-sep">
          <span class="nav-label" style="margin: 0">Evaluación</span>
        </div>
      <button
        class="nav-item"
        :class="{ active: currentUnit === unit.id, [`color-${unit.color}`]: true }"
        @click="$emit('navigate', unit.id)"
      >
        <span class="nav-icon">
          <component :is="unit.icon" :size="20" stroke-width="2" />
        </span>
        <div class="nav-content">
          <span class="nav-number">{{ unit.label || 'Unidad ' + unit.id }}</span>
          <span class="nav-title">{{ unit.title }}</span>
        </div>
        <div class="nav-indicator"></div>
      </button>
      </template>
    </nav>

    <div class="sidebar-footer">
      <div class="progress-info">
        <span class="progress-label">
          {{ typeof currentUnit === 'number' ? `Unidad ${currentUnit} de 5` : (String(currentUnit).startsWith('final') ? 'Modelo de Final' : 'Dashboard') }}
        </span>
        <div class="progress-bar">
          <div class="progress-fill" :style="{ width: (typeof currentUnit === 'number' ? (currentUnit / 5 * 100) : 100) + '%', background: typeof currentUnit !== 'number' ? 'var(--accent-gold)' : undefined }"></div>
        </div>
      </div>
    </div>
  </aside>
</template>

<script setup>
import { Building2, ClipboardList, Scale, BarChart3, BookOpen } from 'lucide-vue-next'
import { computed } from 'vue'

const props = defineProps({
  units: Array,
  currentUnit: [Number, String],
  isOpen: Boolean,
  subject: String
})

defineEmits(['navigate', 'close'])
</script>

<style scoped>
.sidebar {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  width: var(--sidebar-width);
  background: var(--bg-secondary);
  border-right: var(--border-width-thick) solid var(--border-color);
  display: flex;
  flex-direction: column;
  z-index: 100;
  transition: transform var(--transition-base);
  overflow-y: auto;
}

.sidebar-header {
  padding: 20px 20px 16px;
  border-bottom: var(--border-width-thick) solid var(--border-color);
  background: var(--accent-blue);
  color: #fff;
}

.back-link {
  display: inline-block;
  margin-top: 10px;
  font-size: 0.75rem;
  font-weight: 700;
  color: #fff;
  text-decoration: none;
  background: rgba(0,0,0,0.2);
  border: 2px solid rgba(255,255,255,0.5);
  padding: 3px 10px;
  border-radius: var(--radius-sm);
  transition: all var(--transition-fast);
}

.back-link:hover {
  background: rgba(0,0,0,0.35);
  text-decoration: none;
  color: #fff;
}

.logo {
  display: flex;
  align-items: center;
  gap: 12px;
}

.logo-icon {
  font-size: 1.6rem;
  filter: drop-shadow(2px 2px 0 rgba(0,0,0,0.3));
}

.logo-text {
  display: flex;
  flex-direction: column;
}

.logo-title {
  font-weight: 800;
  font-size: 1rem;
  color: #fff;
  letter-spacing: -0.01em;
}

.logo-sub {
  font-size: 0.68rem;
  color: rgba(255,255,255,0.8);
  text-transform: uppercase;
  letter-spacing: 0.08em;
  font-weight: 600;
}

.nav-list {
  flex: 1;
  padding: 16px 12px;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.nav-label {
  font-size: 0.68rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--text-muted);
  padding: 0 8px;
  margin-bottom: 8px;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 12px;
  border: var(--border-width-thick) solid transparent;
  background: transparent;
  border-radius: var(--radius-sm);
  cursor: pointer;
  text-align: left;
  transition: all var(--transition-fast);
  position: relative;
  color: var(--text-secondary);
  font-family: inherit;
}

.nav-item:hover {
  background: var(--bg-tertiary);
  border-color: var(--border-color);
  color: var(--text-primary);
  box-shadow: 4px 4px 0 var(--border-color);
  transform: translate(-2px, -2px);
}

.nav-icon {
  font-size: 1.15rem;
  flex-shrink: 0;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--radius-sm);
  background: var(--bg-tertiary);
  border: var(--border-width-thick) solid var(--border-color);
  transition: all var(--transition-fast);
}

.nav-content {
  display: flex;
  flex-direction: column;
  min-width: 0;
}

.nav-number {
  font-size: 0.65rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  opacity: 0.7;
}

.nav-title {
  font-size: 0.82rem;
  font-weight: 600;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.nav-indicator {
  position: absolute;
  right: -2px;
  top: 50%;
  transform: translateY(-50%);
  width: 4px;
  height: 0;
  border-radius: 2px;
  transition: all var(--transition-base);
}

/* Active States */
.nav-item.active {
  background: var(--bg-tertiary);
  border-color: var(--border-color);
  color: var(--text-primary);
  box-shadow: 4px 4px 0 var(--border-color);
  transform: translate(-2px, -2px);
  font-weight: 700;
}

.nav-item.active .nav-indicator {
  height: 24px;
}

.nav-item.active.color-blue  { background: var(--accent-blue-soft); border-color: var(--accent-blue); }
.nav-item.active.color-teal  { background: var(--accent-teal-soft); border-color: var(--accent-teal); }
.nav-item.active.color-amber { background: var(--accent-amber-soft); border-color: var(--accent-amber); }
.nav-item.active.color-purple{ background: var(--accent-purple-soft); border-color: var(--accent-purple); }
.nav-item.active.color-red   { background: var(--accent-red-soft); border-color: var(--accent-red); }
.nav-item.active.color-gold  { background: var(--accent-gold-soft); border-color: var(--accent-gold); }

.nav-item.active.color-blue  .nav-indicator { background: var(--accent-blue); }
.nav-item.active.color-teal  .nav-indicator { background: var(--accent-teal); }
.nav-item.active.color-amber .nav-indicator { background: var(--accent-amber); }
.nav-item.active.color-purple .nav-indicator { background: var(--accent-purple); }
.nav-item.active.color-red   .nav-indicator { background: var(--accent-red); }
.nav-item.active.color-gold  .nav-indicator { background: var(--accent-gold); }

.nav-item.active.color-blue  .nav-icon { background: var(--accent-blue); color: #fff; border-color: var(--accent-blue); }
.nav-item.active.color-teal  .nav-icon { background: var(--accent-teal); color: #fff; border-color: var(--accent-teal); }
.nav-item.active.color-amber .nav-icon { background: var(--accent-amber); color: #fff; border-color: var(--accent-amber); }
.nav-item.active.color-purple .nav-icon { background: var(--accent-purple); color: #fff; border-color: var(--accent-purple); }
.nav-item.active.color-red   .nav-icon { background: var(--accent-red); color: #fff; border-color: var(--accent-red); }
.nav-item.active.color-gold  .nav-icon { background: var(--accent-gold); color: #0a0a0a; border-color: var(--accent-gold); }

/* Footer */
.nav-section-sep {
  margin-top: 12px;
  padding-top: 12px;
  border-top: var(--border-width) solid var(--border-color);
  padding: 12px 8px 0;
}

.sidebar-footer {
  padding: 16px 20px;
  border-top: var(--border-width-thick) solid var(--border-color);
  background: var(--bg-tertiary);
}

.progress-label {
  font-size: 0.72rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: var(--text-muted);
  margin-bottom: 8px;
  display: block;
}

.progress-bar {
  height: 8px;
  background: var(--bg-secondary);
  border: var(--border-width-thick) solid var(--border-color);
  border-radius: 2px;
  overflow: hidden;
  box-shadow: var(--shadow-sm);
}

.progress-fill {
  height: 100%;
  background: var(--accent-blue);
  border-radius: 1px;
  transition: width var(--transition-slow);
}

@media (max-width: 992px) {
  .sidebar {
    transform: translateX(-100%);
  }

  .sidebar.open {
    transform: translateX(0);
  }
}
</style>
