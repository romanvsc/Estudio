<template>
  <div class="achievement-badge" :class="[`rarity-${rarity}`, { unlocked, locked: !unlocked }]" :style="badgeStyle">
    <div class="badge-stamp">
      <span class="badge-icon">{{ icon }}</span>
    </div>
    <div class="badge-info">
      <strong>{{ name }}</strong>
      <small v-if="unlocked && unlockedAt">{{ formatDate(unlockedAt) }}</small>
      <small v-else-if="!unlocked">{{ description }}</small>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  icon: { type: String, default: '🏆' },
  name: { type: String, required: true },
  description: { type: String, default: '' },
  unlocked: { type: Boolean, default: false },
  unlockedAt: { type: String, default: '' },
  rarity: { type: String, default: 'common' } // common, rare, epic
})

const badgeStyle = computed(() => {
  const rotation = props.unlocked ? (Math.random() * 6 - 3) : 0
  return { '--badge-rotation': `${rotation}deg` }
})

function formatDate(dateStr) {
  if (!dateStr) return ''
  return new Date(dateStr).toLocaleDateString('es-AR', { day: '2-digit', month: 'short' })
}
</script>

<style scoped>
.achievement-badge {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 14px;
  border: var(--border-width) solid var(--border-color);
  border-radius: var(--radius-md);
  background: var(--bg-card);
  box-shadow: var(--shadow-sm);
  transition: all var(--transition-fast);
  transform: rotate(var(--badge-rotation, 0deg));
}

.achievement-badge.unlocked {
  animation: stampIn 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.achievement-badge.unlocked:hover {
  transform: rotate(var(--badge-rotation, 0deg)) translate(-2px, -2px);
  box-shadow: 5px 5px 0 var(--border-color);
}

.achievement-badge.locked {
  opacity: 0.45;
  filter: grayscale(1);
  transform: scale(0.95);
}

/* Rarity colors */
.achievement-badge.rarity-common.unlocked { background: var(--accent-blue-soft); border-color: var(--accent-blue); }
.achievement-badge.rarity-rare.unlocked { background: var(--accent-purple-soft); border-color: var(--accent-purple); }
.achievement-badge.rarity-epic.unlocked { background: var(--accent-gold-soft); border-color: var(--accent-gold); }

.badge-stamp {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  border: var(--border-width) solid var(--border-color);
  background: var(--bg-secondary);
  font-size: 1.3rem;
  flex-shrink: 0;
  box-shadow: 2px 2px 0 var(--border-color);
}

.rarity-common.unlocked .badge-stamp { background: var(--accent-blue); }
.rarity-rare.unlocked .badge-stamp { background: var(--accent-purple); }
.rarity-epic.unlocked .badge-stamp { background: var(--accent-gold); }

.badge-info {
  display: flex;
  flex-direction: column;
  min-width: 0;
}

.badge-info strong {
  font-size: 0.82rem;
  font-weight: 800;
  color: var(--text-primary);
  letter-spacing: -0.01em;
}

.badge-info small {
  font-size: 0.68rem;
  color: var(--text-muted);
  font-weight: 600;
}

@keyframes stampIn {
  0% { transform: rotate(var(--badge-rotation, 0deg)) scale(0); opacity: 0; }
  60% { transform: rotate(var(--badge-rotation, 0deg)) scale(1.15); }
  100% { transform: rotate(var(--badge-rotation, 0deg)) scale(1); opacity: 1; }
}
</style>
