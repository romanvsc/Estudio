import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

const STORAGE_KEY = 'study-progress-v1'

function readStorage() {
    try {
        const raw = localStorage.getItem(STORAGE_KEY)
        const data = raw ? JSON.parse(raw) : {}
        if (!data.units) data.units = {}
        if (!data.bookmarks) data.bookmarks = {}
        if (!data.notes) data.notes = {}
        if (!data.achievements) data.achievements = {}
        if (!data.streak) data.streak = { lastDate: null, current: 0, best: 0 }
        return data
    } catch {
        return { units: {}, bookmarks: {}, notes: {}, achievements: {}, streak: { lastDate: null, current: 0, best: 0 } }
    }
}

function writeStorage(data) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
    window.dispatchEvent(new Event('study-progress-updated'))
}

function ensureUnit(data, unitId) {
    const id = String(unitId)
    if (!data.units[id]) {
        data.units[id] = { topics: {}, spacedRepetition: { wrongQuestionIds: [], updatedAt: null }, quizHistory: [] }
    }
    const unit = data.units[id]
    if (!unit.topics) unit.topics = {}
    if (!unit.spacedRepetition) unit.spacedRepetition = { wrongQuestionIds: [], updatedAt: null }
    if (!unit.quizHistory) unit.quizHistory = []
    return unit
}

// ─── Achievement Definitions ───
const ACHIEVEMENTS = [
    { id: 'first-quiz', name: 'Primera Prueba', description: 'Completar 1 quiz', icon: '🧪', rarity: 'common' },
    { id: 'perfect-score', name: 'Nota Perfecta', description: '100% en cualquier quiz', icon: '⭐', rarity: 'rare' },
    { id: 'streak-3', name: 'Racha de 3', description: '3 días seguidos estudiando', icon: '🔥', rarity: 'common' },
    { id: 'streak-7', name: 'Semana Completa', description: '7 días seguidos', icon: '💪', rarity: 'rare' },
    { id: 'unit-master', name: 'Maestro de Unidad', description: '100% dominado en una unidad', icon: '🏆', rarity: 'epic' },
    { id: 'quiz-veteran', name: 'Veterano', description: 'Completar 10 quizzes', icon: '🎖️', rarity: 'rare' },
    { id: 'all-units', name: 'Explorador', description: 'Visitar las 5 unidades', icon: '🧭', rarity: 'common' },
    { id: 'night-owl', name: 'Búho Nocturno', description: 'Estudiar después de las 22:00', icon: '🦉', rarity: 'common' },
    { id: 'early-bird', name: 'Madrugador', description: 'Estudiar antes de las 7:00', icon: '🐦', rarity: 'common' }
]

export const useStudyStore = defineStore('study', () => {
    // ─── Reactive state ───
    const snapshot = ref(readStorage())
    const pendingAchievement = ref(null)

    function refresh() {
        snapshot.value = readStorage()
    }

    // ─── Streak ───
    function updateStreak() {
        const data = readStorage()
        const today = new Date().toISOString().slice(0, 10)
        const streak = data.streak || { lastDate: null, current: 0, best: 0 }

        if (streak.lastDate === today) {
            // Already logged today
        } else {
            const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10)
            if (streak.lastDate === yesterday) {
                streak.current += 1
            } else {
                streak.current = 1
            }
            streak.lastDate = today
            if (streak.current > (streak.best || 0)) {
                streak.best = streak.current
            }
        }
        data.streak = streak
        writeStorage(data)
        refresh()
    }

    // ─── Achievements ───
    const achievementDefs = ACHIEVEMENTS

    const unlockedAchievements = computed(() => {
        return snapshot.value.achievements || {}
    })

    function unlockAchievement(id) {
        const data = readStorage()
        if (!data.achievements) data.achievements = {}
        if (data.achievements[id]) return false // already unlocked
        data.achievements[id] = { unlockedAt: new Date().toISOString() }
        writeStorage(data)
        refresh()
        pendingAchievement.value = achievementDefs.find(a => a.id === id) || null
        return true
    }

    function dismissAchievement() {
        pendingAchievement.value = null
    }

    function checkAchievements(context = {}) {
        const data = readStorage()
        const totalQuizzes = getAllQuizHistoryFromData(data).length
        const hour = new Date().getHours()
        const streak = data.streak?.current || 0
        const visitedUnits = new Set(Object.keys(data.units || {}).filter(id => {
            const u = data.units[id]
            return Object.keys(u.topics || {}).length > 0 || (u.quizHistory || []).length > 0
        }))

        // Check conditions
        if (totalQuizzes >= 1) unlockAchievement('first-quiz')
        if (totalQuizzes >= 10) unlockAchievement('quiz-veteran')
        if (streak >= 3) unlockAchievement('streak-3')
        if (streak >= 7) unlockAchievement('streak-7')
        if (hour >= 22) unlockAchievement('night-owl')
        if (hour < 7) unlockAchievement('early-bird')
        if (visitedUnits.size >= 5) unlockAchievement('all-units')

        if (context.perfectScore) unlockAchievement('perfect-score')
        if (context.unitMastered) unlockAchievement('unit-master')
    }

    // ─── Unit-scoped helpers ───
    function getTopicStatus(unitId, topicId) {
        const unit = ensureUnit(snapshot.value, unitId)
        return unit.topics[topicId]?.status || 'pendiente'
    }

    function setTopicStatus(unitId, topicId, status) {
        const data = readStorage()
        const unit = ensureUnit(data, unitId)
        unit.topics[topicId] = { ...(unit.topics[topicId] || {}), status, updatedAt: new Date().toISOString() }
        writeStorage(data)
        updateStreak()
        refresh()
        // Check unit mastery
        const allMastered = Object.values(unit.topics).every(t => t.status === 'dominado')
        if (allMastered && Object.keys(unit.topics).length >= 3) {
            checkAchievements({ unitMastered: true })
        }
    }

    function saveQuizAttempt(unitId, { score, total, duration }) {
        const data = readStorage()
        const unit = ensureUnit(data, unitId)
        unit.quizHistory.push({ score, total, duration: duration || 0, date: new Date().toISOString() })
        if (unit.quizHistory.length > 30) unit.quizHistory = unit.quizHistory.slice(-30)
        writeStorage(data)
        updateStreak()
        refresh()
        checkAchievements({ perfectScore: score === total && total > 0 })
    }

    function getQuizHistory(unitId) {
        const unit = ensureUnit(snapshot.value, unitId)
        return unit.quizHistory || []
    }

    function saveWrongQuestions(unitId, questionIds) {
        const data = readStorage()
        const unit = ensureUnit(data, unitId)
        const previous = new Set(unit.spacedRepetition.wrongQuestionIds || [])
        questionIds.forEach(id => previous.add(id))
        unit.spacedRepetition.wrongQuestionIds = Array.from(previous)
        unit.spacedRepetition.updatedAt = new Date().toISOString()
        writeStorage(data)
        refresh()
    }

    function clearWrongQuestions(unitId, resolvedIds = []) {
        const data = readStorage()
        const unit = ensureUnit(data, unitId)
        if (!resolvedIds.length) {
            unit.spacedRepetition.wrongQuestionIds = []
        } else {
            const resolvedSet = new Set(resolvedIds)
            unit.spacedRepetition.wrongQuestionIds = (unit.spacedRepetition.wrongQuestionIds || []).filter(id => !resolvedSet.has(id))
        }
        unit.spacedRepetition.updatedAt = new Date().toISOString()
        writeStorage(data)
        refresh()
    }

    function getWrongQuestions(unitId) {
        const unit = ensureUnit(snapshot.value, unitId)
        return unit.spacedRepetition.wrongQuestionIds || []
    }

    function getSummary(unitId, topicIds = []) {
        const unit = ensureUnit(snapshot.value, unitId)
        const statuses = topicIds.map(id => unit.topics[id]?.status || 'pendiente')
        const total = topicIds.length
        const mastered = statuses.filter(s => s === 'dominado').length
        const inProgress = statuses.filter(s => s === 'en-curso').length
        return { total, mastered, inProgress, completion: total ? Math.round((mastered / total) * 100) : 0 }
    }

    // ─── Global helpers ───
    function toggleBookmark(topicId, title = '', unitId = '') {
        const data = readStorage()
        if (!data.bookmarks) data.bookmarks = {}
        if (data.bookmarks[topicId]) {
            delete data.bookmarks[topicId]
            writeStorage(data)
            refresh()
            return false
        } else {
            data.bookmarks[topicId] = { title, unitId, addedAt: new Date().toISOString() }
            writeStorage(data)
            refresh()
            return true
        }
    }

    function getBookmarks() {
        return Object.entries(snapshot.value.bookmarks || {}).map(([id, bm]) => ({ id, ...bm }))
    }

    function isBookmarked(topicId) {
        return !!snapshot.value.bookmarks?.[topicId]
    }

    function saveNote(topicId, text, title = '', unitId = '') {
        const data = readStorage()
        if (!data.notes) data.notes = {}
        if (!text || !text.trim()) {
            delete data.notes[topicId]
        } else {
            data.notes[topicId] = { text, title, unitId, updatedAt: new Date().toISOString() }
        }
        writeStorage(data)
        refresh()
    }

    function getNote(topicId) {
        return snapshot.value.notes?.[topicId]?.text || ''
    }

    function getAllNotes() {
        return Object.entries(snapshot.value.notes || {}).map(([id, note]) => ({ id, ...note }))
    }

    function getAllQuizHistoryFromData(data) {
        const history = []
        for (const [unitId, unit] of Object.entries(data.units || {})) {
            for (const attempt of (unit.quizHistory || [])) {
                history.push({ unitId, ...attempt })
            }
        }
        return history.sort((a, b) => new Date(b.date) - new Date(a.date))
    }

    function getAllQuizHistory() {
        return getAllQuizHistoryFromData(snapshot.value)
    }

    function exportAllProgress() {
        return JSON.stringify(readStorage(), null, 2)
    }

    function importAllProgress(jsonString) {
        try {
            const data = JSON.parse(jsonString)
            if (typeof data !== 'object' || !data) throw new Error('Invalid')
            if (!data.units) data.units = {}
            if (!data.bookmarks) data.bookmarks = {}
            if (!data.notes) data.notes = {}
            writeStorage(data)
            refresh()
            return true
        } catch {
            return false
        }
    }

    const currentStreak = computed(() => snapshot.value.streak?.current || 0)
    const bestStreak = computed(() => snapshot.value.streak?.best || 0)

    return {
        snapshot,
        refresh,
        pendingAchievement,
        achievementDefs,
        unlockedAchievements,
        unlockAchievement,
        dismissAchievement,
        checkAchievements,
        updateStreak,
        currentStreak,
        bestStreak,
        getTopicStatus,
        setTopicStatus,
        saveQuizAttempt,
        getQuizHistory,
        saveWrongQuestions,
        clearWrongQuestions,
        getWrongQuestions,
        getSummary,
        toggleBookmark,
        getBookmarks,
        isBookmarked,
        saveNote,
        getNote,
        getAllNotes,
        getAllQuizHistory,
        exportAllProgress,
        importAllProgress
    }
})
