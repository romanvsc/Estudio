<template>
  <div class="selector-page">
    <div class="selector-header">
      <span class="logo-icon">📚</span>
      <h1>Guía de Estudio</h1>
      <p>Seleccioná la materia que querés estudiar</p>
    </div>

    <div class="subjects-grid">
      <button class="subject-card" @click="$router.push('/contabilidad/unidad/1')">
        <div class="subject-icon">🧾</div>
        <div class="subject-info">
          <h2>Contabilidad</h2>
          <p>Organización empresarial, aspectos fiscales, informes, cuentas contables y registración</p>
          <span class="subject-units">5 Unidades · 4 Modelos de Final</span>
        </div>
        <svg class="arrow" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><polyline points="9 18 15 12 9 6"/></svg>
      </button>

      <button class="subject-card" @click="$router.push('/sd3/unidad/1')">
        <div class="subject-icon">💻</div>
        <div class="subject-info">
          <h2>Sistemas de Datos III</h2>
          <p>Sistemas operativos, procesos, deadlocks, administración de memoria y sistema de archivos</p>
          <span class="subject-units">5 Unidades</span>
        </div>
        <svg class="arrow" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><polyline points="9 18 15 12 9 6"/></svg>
      </button>

      <button class="subject-card" @click="$router.push('/matfin/unidad/1')">
        <div class="subject-icon">📈</div>
        <div class="subject-info">
          <h2>Matemática Financiera</h2>
          <p>Decisiones financieras, tasa de interés, interés simple y compuesto, y operaciones de descuento</p>
          <span class="subject-units">1 Unidad</span>
        </div>
        <svg class="arrow" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><polyline points="9 18 15 12 9 6"/></svg>
      </button>
    </div>
  </div>
</template>

<style scoped>
.selector-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 80vh;
  animation: fadeIn 0.3s ease;
  padding: 32px 24px;
}

.selector-header {
  text-align: center;
  margin-bottom: 48px;
}

.selector-header .logo-icon {
  font-size: 3.5rem;
  display: block;
  margin-bottom: 16px;
  filter: drop-shadow(3px 3px 0 rgba(0,0,0,0.15));
}

.selector-header h1 {
  font-size: 2.4rem;
  font-weight: 800;
  margin-bottom: 10px;
  letter-spacing: -0.03em;
}

.selector-header p {
  color: var(--text-muted);
  font-size: 1rem;
  font-weight: 500;
}

.subjects-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 16px;
  width: 100%;
  max-width: 580px;
}

.subject-card {
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 24px;
  background: var(--bg-card);
  border: var(--border-width) solid var(--border-color);
  border-radius: var(--radius-md);
  cursor: pointer;
  text-align: left;
  transition: all var(--transition-fast);
  font-family: inherit;
  color: var(--text-primary);
  box-shadow: var(--shadow-md);
}

.subject-card:hover {
  background: var(--accent-blue-soft);
  border-color: var(--accent-blue);
  transform: translate(-3px, -3px);
  box-shadow: 7px 7px 0 var(--border-color);
}

.subject-card:active {
  transform: translate(2px, 2px);
  box-shadow: 2px 2px 0 var(--border-color);
}

.subject-icon {
  font-size: 2.5rem;
  flex-shrink: 0;
  filter: drop-shadow(2px 2px 0 rgba(0,0,0,0.15));
}

.subject-info {
  flex: 1;
  min-width: 0;
}

.subject-info h2 {
  font-size: 1.2rem;
  font-weight: 800;
  margin-bottom: 6px;
  letter-spacing: -0.01em;
}

.subject-info p {
  font-size: 0.82rem;
  color: var(--text-secondary);
  margin-bottom: 8px;
  line-height: 1.4;
  font-weight: 500;
}

.subject-units {
  display: inline-block;
  font-size: 0.7rem;
  font-weight: 700;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 0.06em;
  background: var(--bg-tertiary);
  border: var(--border-width) solid var(--border-color);
  padding: 2px 8px;
  border-radius: 3px;
}

.arrow {
  color: var(--text-muted);
  flex-shrink: 0;
  transition: transform var(--transition-fast);
}

.subject-card:hover .arrow {
  transform: translateX(4px);
  color: var(--accent-blue);
}

@keyframes fadeIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }

@media (max-width: 600px) {
  .subject-card {
    padding: 18px;
    gap: 14px;
  }
  .subject-icon {
    font-size: 2rem;
  }
}
</style>
