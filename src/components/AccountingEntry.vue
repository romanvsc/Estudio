<template>
  <div class="accounting-entry">
    <div v-if="date || description" class="entry-header">
      <span v-if="date" class="entry-date mono">{{ date }}</span>
      <span v-if="description" class="entry-desc">{{ description }}</span>
    </div>
    <div class="entry-table">
      <div class="entry-row entry-head">
        <span class="col-account">Cuenta</span>
        <span class="col-debe">Debe</span>
        <span class="col-haber">Haber</span>
      </div>
      <div
        v-for="(row, i) in entries"
        :key="i"
        class="entry-row"
        :class="{ 'is-credit': row.haber }"
      >
        <span class="col-account" :class="{ indented: row.haber }">
          <span v-if="row.haber" class="credit-prefix">a </span>
          {{ row.cuenta }}
          <span v-if="row.tipo" class="account-type badge" :class="badgeClass(row.tipo)">{{ row.tipo }}</span>
        </span>
        <span class="col-debe mono">{{ row.debe ? formatNumber(row.debe) : '' }}</span>
        <span class="col-haber mono">{{ row.haber ? formatNumber(row.haber) : '' }}</span>
      </div>
      <div v-if="showTotals" class="entry-row entry-totals">
        <span class="col-account">Totales</span>
        <span class="col-debe mono">{{ formatNumber(totalDebe) }}</span>
        <span class="col-haber mono">{{ formatNumber(totalHaber) }}</span>
      </div>
    </div>
    <div v-if="legend" class="entry-legend">{{ legend }}</div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  date: { type: String, default: '' },
  description: { type: String, default: '' },
  legend: { type: String, default: '' },
  entries: { type: Array, required: true },
  showTotals: { type: Boolean, default: true }
})

const totalDebe = computed(() =>
  props.entries.reduce((sum, e) => sum + (e.debe || 0), 0)
)

const totalHaber = computed(() =>
  props.entries.reduce((sum, e) => sum + (e.haber || 0), 0)
)

function formatNumber(n) {
  return n ? `$${n.toLocaleString('es-AR')}` : ''
}

function badgeClass(tipo) {
  const map = {
    'Activo': 'badge-blue',
    'Pasivo': 'badge-red',
    'PN': 'badge-purple',
    'R+': 'badge-teal',
    'R-': 'badge-amber'
  }
  return map[tipo] || 'badge-blue'
}
</script>

<style scoped>
.accounting-entry {
  background: var(--bg-card);
  border: var(--border-width) solid var(--border-color);
  border-radius: var(--radius-md);
  overflow: hidden;
  margin: 14px 0;
  font-size: 0.85rem;
}

.entry-header {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 16px;
  background: var(--bg-tertiary);
  border-bottom: 1px solid var(--border-color);
}

.entry-date {
  font-size: 0.78rem;
  font-weight: 500;
  color: var(--accent-blue);
  padding: 2px 8px;
  background: var(--accent-blue-soft);
  border-radius: 4px;
}

.entry-desc {
  color: var(--text-secondary);
  font-size: 0.82rem;
}

.entry-table {
  width: 100%;
}

.entry-row {
  display: grid;
  grid-template-columns: 1fr 110px 110px;
  padding: 8px 16px;
  border-bottom: 1px solid var(--border-color);
  align-items: center;
}

.entry-row:last-child {
  border-bottom: none;
}

.entry-head {
  background: var(--bg-tertiary);
  font-weight: 600;
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--text-muted);
  padding: 6px 16px;
}

.col-account {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
}

.col-account.indented {
  padding-left: 24px;
}

.credit-prefix {
  color: var(--text-muted);
  font-style: italic;
}

.account-type {
  font-size: 0.65rem;
  padding: 1px 6px;
}

.col-debe,
.col-haber {
  text-align: right;
  font-size: 0.85rem;
  color: var(--text-primary);
}

.entry-totals {
  background: var(--bg-tertiary);
  font-weight: 600;
  border-top: 2px solid var(--border-color);
}

.entry-legend {
  padding: 8px 16px;
  font-size: 0.78rem;
  color: var(--text-muted);
  font-style: italic;
  background: var(--bg-tertiary);
  border-top: 1px solid var(--border-color);
}
</style>
