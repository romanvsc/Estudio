import { useStudyStore } from '../stores/studyProgress'

function store() {
  return useStudyStore()
}

export function useStudyProgress(unitId) {
  const id = String(unitId)

  return {
    getTopicStatus(topicId) {
      return store().getTopicStatus(id, topicId)
    },
    setTopicStatus(topicId, status) {
      store().setTopicStatus(id, topicId, status)
    },
    saveWrongQuestions(questionIds) {
      store().saveWrongQuestions(id, questionIds)
    },
    clearWrongQuestions(resolvedIds = []) {
      store().clearWrongQuestions(id, resolvedIds)
    },
    getWrongQuestions() {
      return store().getWrongQuestions(id)
    },
    getSummary(topicIds = []) {
      return store().getSummary(id, topicIds)
    },
    saveQuizAttempt(attempt) {
      store().saveQuizAttempt(id, attempt)
    },
    getQuizHistory() {
      return store().getQuizHistory(id)
    }
  }
}

export function toggleBookmark(topicId, title = '', unitId = '') {
  return store().toggleBookmark(topicId, title, unitId)
}

export function getBookmarks() {
  return store().getBookmarks()
}

export function isBookmarked(topicId) {
  return store().isBookmarked(topicId)
}

export function saveNote(topicId, text, title = '', unitId = '') {
  store().saveNote(topicId, text, title, unitId)
}

export function getNote(topicId) {
  return store().getNote(topicId)
}

export function getAllNotes() {
  return store().getAllNotes()
}

export function exportAllProgress() {
  return store().exportAllProgress()
}

export function importAllProgress(jsonString) {
  return store().importAllProgress(jsonString)
}

export function getStudySnapshot() {
  return store().snapshot
}

export function getAllQuizHistory() {
  return store().getAllQuizHistory()
}
