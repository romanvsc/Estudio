const STORAGE_KEY = 'study-progress-v1'

function readStorage() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    const data = raw ? JSON.parse(raw) : {}
    if (!data.units) data.units = {}
    if (!data.bookmarks) data.bookmarks = {}
    if (!data.notes) data.notes = {}
    return data
  } catch {
    return { units: {}, bookmarks: {}, notes: {} }
  }
}

function writeStorage(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
  window.dispatchEvent(new Event('study-progress-updated'))
}

function ensureUnit(data, unitId) {
  const id = String(unitId)
  if (!data.units[id]) {
    data.units[id] = {
      topics: {},
      spacedRepetition: { wrongQuestionIds: [], updatedAt: null },
      quizHistory: []
    }
  }
  if (!data.units[id].topics) data.units[id].topics = {}
  if (!data.units[id].spacedRepetition) {
    data.units[id].spacedRepetition = { wrongQuestionIds: [], updatedAt: null }
  }
  if (!data.units[id].quizHistory) data.units[id].quizHistory = []
  return data.units[id]
}

export function useStudyProgress(unitId) {
  const getUnitData = () => {
    const data = readStorage()
    return ensureUnit(data, unitId)
  }

  const setTopicStatus = (topicId, status) => {
    const data = readStorage()
    const unit = ensureUnit(data, unitId)
    unit.topics[topicId] = {
      ...(unit.topics[topicId] || {}),
      status,
      updatedAt: new Date().toISOString()
    }
    writeStorage(data)
  }

  const getTopicStatus = (topicId) => {
    const unit = getUnitData()
    return unit.topics[topicId]?.status || 'pendiente'
  }

  const saveWrongQuestions = (questionIds) => {
    const data = readStorage()
    const unit = ensureUnit(data, unitId)
    const previous = new Set(unit.spacedRepetition.wrongQuestionIds || [])
    questionIds.forEach((id) => previous.add(id))
    unit.spacedRepetition.wrongQuestionIds = Array.from(previous)
    unit.spacedRepetition.updatedAt = new Date().toISOString()
    writeStorage(data)
  }

  const clearWrongQuestions = (resolvedIds = []) => {
    const data = readStorage()
    const unit = ensureUnit(data, unitId)
    if (!resolvedIds.length) {
      unit.spacedRepetition.wrongQuestionIds = []
    } else {
      const resolvedSet = new Set(resolvedIds)
      unit.spacedRepetition.wrongQuestionIds = (unit.spacedRepetition.wrongQuestionIds || []).filter((id) => !resolvedSet.has(id))
    }
    unit.spacedRepetition.updatedAt = new Date().toISOString()
    writeStorage(data)
  }

  const getWrongQuestions = () => {
    const unit = getUnitData()
    return unit.spacedRepetition.wrongQuestionIds || []
  }

  const getSummary = (topicIds = []) => {
    const unit = getUnitData()
    const statuses = topicIds.map((id) => unit.topics[id]?.status || 'pendiente')
    const total = topicIds.length
    const mastered = statuses.filter((status) => status === 'dominado').length
    const inProgress = statuses.filter((status) => status === 'en-curso').length
    return {
      total,
      mastered,
      inProgress,
      completion: total ? Math.round((mastered / total) * 100) : 0
    }
  }

  // --- Quiz History ---
  const saveQuizAttempt = ({ score, total, duration }) => {
    const data = readStorage()
    const unit = ensureUnit(data, unitId)
    unit.quizHistory.push({
      score,
      total,
      duration: duration || 0,
      date: new Date().toISOString()
    })
    if (unit.quizHistory.length > 30) {
      unit.quizHistory = unit.quizHistory.slice(-30)
    }
    writeStorage(data)
  }

  const getQuizHistory = () => {
    const unit = getUnitData()
    return unit.quizHistory || []
  }

  return {
    getTopicStatus,
    setTopicStatus,
    saveWrongQuestions,
    clearWrongQuestions,
    getWrongQuestions,
    getSummary,
    saveQuizAttempt,
    getQuizHistory
  }
}

// ─── Global / Standalone Functions ───

export function toggleBookmark(topicId, title = '', unitId = '') {
  const data = readStorage()
  if (!data.bookmarks) data.bookmarks = {}
  if (data.bookmarks[topicId]) {
    delete data.bookmarks[topicId]
    writeStorage(data)
    return false
  } else {
    data.bookmarks[topicId] = { title, unitId, addedAt: new Date().toISOString() }
    writeStorage(data)
    return true
  }
}

export function getBookmarks() {
  const data = readStorage()
  return Object.entries(data.bookmarks || {}).map(([id, bm]) => ({ id, ...bm }))
}

export function isBookmarked(topicId) {
  const data = readStorage()
  return !!data.bookmarks?.[topicId]
}

export function saveNote(topicId, text, title = '', unitId = '') {
  const data = readStorage()
  if (!data.notes) data.notes = {}
  if (!text || !text.trim()) {
    delete data.notes[topicId]
  } else {
    data.notes[topicId] = { text, title, unitId, updatedAt: new Date().toISOString() }
  }
  writeStorage(data)
}

export function getNote(topicId) {
  const data = readStorage()
  return data.notes?.[topicId]?.text || ''
}

export function getAllNotes() {
  const data = readStorage()
  return Object.entries(data.notes || {}).map(([id, note]) => ({ id, ...note }))
}

export function exportAllProgress() {
  return JSON.stringify(readStorage(), null, 2)
}

export function importAllProgress(jsonString) {
  try {
    const data = JSON.parse(jsonString)
    if (typeof data !== 'object' || !data) throw new Error('Invalid')
    if (!data.units) data.units = {}
    if (!data.bookmarks) data.bookmarks = {}
    if (!data.notes) data.notes = {}
    writeStorage(data)
    return true
  } catch {
    return false
  }
}

export function getStudySnapshot() {
  return readStorage()
}

export function getAllQuizHistory() {
  const data = readStorage()
  const history = []
  for (const [unitId, unit] of Object.entries(data.units || {})) {
    for (const attempt of (unit.quizHistory || [])) {
      history.push({ unitId, ...attempt })
    }
  }
  return history.sort((a, b) => new Date(b.date) - new Date(a.date))
}
