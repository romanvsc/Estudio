import { computed, onMounted, onUnmounted, reactive, toValue } from 'vue'
import { useStudyProgress } from './useStudyProgress'

export function useUnitStudyPage({ unitId, topics, searchQuery }) {
  const topicStatus = reactive({})
  const { getTopicStatus, setTopicStatus, getSummary } = useStudyProgress(unitId)

  const topicList = computed(() => toValue(topics) || [])
  const studySummary = computed(() => getSummary(topicList.value.map((topic) => topic.id)))

  const searchResults = computed(() => {
    const term = String(toValue(searchQuery) || '').trim().toLowerCase()
    if (!term) return []

    return topicList.value
      .map((topic) => {
        const keywords = topic.keywords || []
        const match = keywords.find((keyword) => keyword.toLowerCase().includes(term)) ||
          (topic.title.toLowerCase().includes(term) ? topic.title : null)
        if (!match) return null
        return {
          topicId: topic.id,
          anchor: topic.anchor || topic.id,
          number: topic.number,
          title: topic.title,
          term: typeof match === 'string' ? match : term
        }
      })
      .filter(Boolean)
  })

  function setStatus(topicId, status) {
    topicStatus[topicId] = status
    setTopicStatus(topicId, status)
  }

  function refreshProgressState() {
    topicList.value.forEach((topic) => {
      topicStatus[topic.id] = getTopicStatus(topic.id)
    })
  }

  function goToTopic(anchor) {
    const target = document.getElementById(anchor)
    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  onMounted(() => {
    refreshProgressState()
    window.addEventListener('study-progress-updated', refreshProgressState)
  })

  onUnmounted(() => {
    window.removeEventListener('study-progress-updated', refreshProgressState)
  })

  return {
    topicStatus,
    studySummary,
    searchResults,
    setStatus,
    refreshProgressState,
    goToTopic
  }
}
