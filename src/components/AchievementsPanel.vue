<template>
  <div class="achievements-panel">
    <div class="panel-header">
      <h3>Logros</h3>
      <span class="badge badge-blue">{{ unlockedCount }}/{{ total }} desbloqueados</span>
    </div>
    <div class="panel-streak" v-if="store.currentStreak > 0">
      <span class="streak-fire">🔥</span>
      <div class="streak-info">
        <strong>Racha de {{ store.currentStreak }} día{{ store.currentStreak === 1 ? '' : 's' }}</strong>
        <small>Mejor racha: {{ store.bestStreak }} días</small>
      </div>
    </div>
    <div class="badges-grid">
      <AchievementBadge
        v-for="def in store.achievementDefs"
        :key="def.id"
        :icon="def.icon"
        :name="def.name"
        :description="def.description"
        :rarity="def.rarity"
        :unlocked="!!unlocked[def.id]"
        :unlockedAt="unlocked[def.id]?.unlockedAt"
      />
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useStudyStore } from '../stores/studyProgress'
import AchievementBadge from './AchievementBadge.vue'

const store = useStudyStore()

const unlocked = computed(() => store.unlockedAchievements)
const unlockedCount = computed(() => Object.keys(unlocked.value).length)
const total = computed(() => store.achievementDefs.length)
</script>

<style scoped>
.achievements-panel {
  background: var(--bg-card);
  border: var(--border-width) solid var(--border-color);
  border-radius: var(--radius-md);
  padding: 18px;
  box-shadow: var(--shadow-md);
}

.panel-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
  padding-bottom: 12px;
  border-bottom: var(--border-width) solid var(--border-color);
}

.panel-streak {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 14px;
  background: var(--accent-amber-soft);
  border: var(--border-width) solid var(--border-color);
  border-radius: var(--radius-sm);
  margin-bottom: 16px;
  box-shadow: var(--shadow-sm);
}

.streak-fire {
  font-size: 1.5rem;
  filter: drop-shadow(2px 2px 0 rgba(0,0,0,0.15));
}

.streak-info {
  display: flex;
  flex-direction: column;
}

.streak-info strong {
  font-size: 0.88rem;
  font-weight: 800;
}

.streak-info small {
  font-size: 0.7rem;
  color: var(--text-muted);
  font-weight: 600;
}

.badges-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 10px;
}

@media (max-width: 600px) {
  .badges-grid {
    grid-template-columns: 1fr;
  }
}
</style>
