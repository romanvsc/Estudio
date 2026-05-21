<template>
  <section class="formula-block" :class="[{ compact }, `tone-${tone}`]" :aria-label="title">
    <div class="formula-block-head">
      <span class="formula-eyebrow">{{ eyebrow }}</span>
      <h4>{{ title }}</h4>
    </div>

    <div class="formula-grid">
      <article v-for="item in formulas" :key="item.label" class="formula-card">
        <span class="formula-label">{{ item.label }}</span>
        <div class="formula-render" v-html="renderFormula(item.latex)"></div>
        <p v-if="item.note" class="formula-note">{{ item.note }}</p>
      </article>
    </div>
  </section>
</template>

<script setup>
import katex from 'katex'

defineProps({
  title: { type: String, required: true },
  eyebrow: { type: String, default: 'Fórmulas principales' },
  formulas: { type: Array, default: () => [] },
  compact: { type: Boolean, default: false },
  tone: { type: String, default: 'teal' }
})

function renderFormula(latex) {
  return katex.renderToString(latex, {
    throwOnError: false,
    displayMode: true,
    strict: 'ignore'
  })
}
</script>

<style scoped>
.formula-block {
  --formula-accent: var(--accent-teal);
  --formula-accent-soft: var(--accent-teal-soft);
  border: 1px solid color-mix(in srgb, var(--formula-accent) 50%, var(--border-color));
  border-radius: var(--radius-lg);
  background: color-mix(in srgb, var(--formula-accent-soft) 24%, var(--bg-card));
  box-shadow: var(--shadow-sm);
  padding: 16px;
  margin: 12px 0;
}

.formula-block-head {
  display: flex;
  align-items: end;
  justify-content: space-between;
  gap: 14px;
  margin-bottom: 12px;
  border-bottom: 1px solid color-mix(in srgb, var(--formula-accent) 38%, transparent);
  padding-bottom: 10px;
}

.formula-block-head h4 {
  margin: 0;
  font-size: 1rem;
}

.formula-eyebrow,
.formula-label {
  font-size: 0.68rem;
  font-weight: 800;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

.formula-eyebrow {
  color: var(--formula-accent);
  white-space: nowrap;
}

.formula-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 10px;
}

.formula-card {
  background: var(--bg-card);
  border: 1px solid color-mix(in srgb, var(--formula-accent) 34%, var(--border-color));
  border-radius: var(--radius-md);
  padding: 14px 14px 12px;
  min-width: 0;
}

.formula-label {
  display: block;
  margin-bottom: 6px;
  color: var(--formula-accent);
}

.formula-render {
  overflow-x: auto;
}

.formula-render :deep(.katex-display) {
  margin: 0;
  text-align: left;
}

.formula-render :deep(.katex) {
  font-size: 1.12rem;
  color: var(--text-primary);
}

.formula-note {
  margin: 8px 0 0;
  color: var(--text-muted);
  font-size: 0.78rem;
  line-height: 1.45;
}

.formula-block.compact {
  padding: 14px;
}

.formula-block.compact .formula-grid {
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
}

.formula-block.compact .formula-render :deep(.katex) {
  font-size: 1rem;
}

.formula-block.tone-amber {
  --formula-accent: var(--accent-amber);
  --formula-accent-soft: var(--accent-amber-soft);
}

.formula-block.tone-purple {
  --formula-accent: var(--accent-purple);
  --formula-accent-soft: var(--accent-purple-soft);
}

@media (max-width: 640px) {
  .formula-block-head {
    align-items: start;
    flex-direction: column;
    gap: 4px;
  }

  .formula-grid {
    grid-template-columns: 1fr;
  }
}
</style>
