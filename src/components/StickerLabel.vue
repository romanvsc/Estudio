<template>
  <span class="sticker-label" :class="[`sticker-${color}`]" :style="stickerStyle">
    <slot>{{ text }}</slot>
  </span>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  text: { type: String, default: '' },
  color: { type: String, default: 'blue' }, // blue, teal, amber, red, purple, gold
  rotation: { type: Number, default: null } // override random rotation
})

const stickerStyle = computed(() => {
  const r = props.rotation !== null ? props.rotation : (Math.random() * 8 - 4)
  return { transform: `rotate(${r}deg)` }
})
</script>

<style scoped>
.sticker-label {
  display: inline-block;
  padding: 4px 12px;
  font-size: 0.72rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  border: var(--border-width) solid var(--border-color);
  border-radius: var(--radius-sm);
  box-shadow: 2px 2px 0 var(--border-color);
  transition: all var(--transition-fast);
  cursor: default;
  white-space: nowrap;
}

.sticker-label:hover {
  transform: rotate(0deg) scale(1.05) !important;
  box-shadow: 3px 3px 0 var(--border-color);
}

.sticker-blue { background: var(--accent-blue-soft); color: var(--accent-blue); }
.sticker-teal { background: var(--accent-teal-soft); color: var(--accent-teal); }
.sticker-amber { background: var(--accent-amber-soft); color: var(--accent-amber); }
.sticker-red { background: var(--accent-red-soft); color: var(--accent-red); }
.sticker-purple { background: var(--accent-purple-soft); color: var(--accent-purple); }
.sticker-gold { background: var(--accent-gold-soft); color: var(--accent-gold); }
</style>
