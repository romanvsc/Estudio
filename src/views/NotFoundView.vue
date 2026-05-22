<template>
  <div class="not-found-view">
    <span class="badge badge-red">No encontrado</span>
    <h1>Contenido no disponible</h1>
    <p>No pude encontrar la materia, unidad o modelo solicitado.</p>
    <div class="not-found-actions">
      <router-link to="/" class="action-link">Volver a materias</router-link>
      <router-link to="/modelos-final" class="action-link secondary">Ver modelos de final</router-link>
    </div>
  </div>
</template>

<style scoped>
.not-found-view {
  background: var(--bg-card);
  border: var(--border-width) solid var(--border-color);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-sm);
  padding: 28px;
}

.not-found-view h1 {
  margin: 12px 0 8px;
}

.not-found-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 18px;
}

.action-link {
  background: var(--accent-blue);
  border: var(--border-width) solid var(--border-color);
  border-radius: var(--radius-sm);
  box-shadow: var(--shadow-sm);
  color: #fff;
  padding: 8px 12px;
  text-decoration: none;
}

.action-link.secondary {
  background: var(--accent-gold-soft);
  color: var(--text-primary);
}
</style>
