<template>
  <div class="topic-renderer">
    <template v-for="(block, index) in blocks" :key="`${block.type}-${index}`">
      <InfoCard v-if="block.type === 'info'" :type="block.infoType || 'info'" :label="block.label" :title="block.title">
        <p v-for="line in block.text" :key="line">{{ line }}</p>
      </InfoCard>

      <section v-else-if="block.type === 'section'" class="section-block">
        <h4>{{ block.title }}</h4>
        <p v-for="line in block.text || []" :key="line">{{ line }}</p>
        <ul v-if="block.items?.length" class="list-styled">
          <li v-for="item in block.items" :key="item">{{ item }}</li>
        </ul>
      </section>

      <FormulaBlock
        v-else-if="block.type === 'formulaBlock'"
        :title="block.title"
        :eyebrow="block.eyebrow"
        :formulas="block.formulas"
        :compact="block.compact"
        :tone="block.tone"
      />
    </template>
  </div>
</template>

<script setup>
import FormulaBlock from '../FormulaBlock.vue'
import InfoCard from '../InfoCard.vue'

defineProps({
  blocks: { type: Array, default: () => [] }
})
</script>
