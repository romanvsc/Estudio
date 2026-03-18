<template>
  <div class="comparison-table-wrapper">
    <h4 v-if="title" class="table-title">{{ title }}</h4>
    <div class="table-scroll">
      <table class="comparison-table">
        <thead>
          <tr>
            <th v-for="col in columns" :key="col">{{ col }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(row, i) in rows" :key="i">
            <td v-for="(col, j) in columns" :key="j" :class="{ 'row-header': j === 0 }">
              {{ row[col] || '—' }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: { type: String, default: '' },
  columns: { type: Array, required: true },
  rows: { type: Array, required: true }
})
</script>

<style scoped>
.comparison-table-wrapper {
  margin: 16px 0;
  border: var(--border-width) solid var(--border-color);
  border-radius: var(--radius-sm);
  overflow: hidden;
  box-shadow: var(--shadow-sm);
}

.table-title {
  padding: 12px 16px;
  background: var(--accent-blue);
  color: #fff;
  border-bottom: var(--border-width) solid var(--border-color);
  font-size: 0.9rem;
  font-weight: 700;
}

.table-scroll {
  overflow-x: auto;
}

.comparison-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.82rem;
}

.comparison-table th {
  padding: 10px 14px;
  background: var(--bg-tertiary);
  color: var(--text-primary);
  font-weight: 800;
  font-size: 0.72rem;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  text-align: left;
  white-space: nowrap;
  border-bottom: var(--border-width) solid var(--border-color);
}

.comparison-table td {
  padding: 10px 14px;
  border-bottom: var(--border-width) solid var(--border-color);
  color: var(--text-secondary);
  vertical-align: top;
  line-height: 1.6;
}

.comparison-table tr:last-child td {
  border-bottom: none;
}

.comparison-table tr:hover td {
  background: var(--bg-card-hover);
}

.row-header {
  font-weight: 600;
  color: var(--text-primary) !important;
  white-space: nowrap;
  min-width: 140px;
}
</style>
