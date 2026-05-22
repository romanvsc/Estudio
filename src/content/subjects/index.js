import { contabilidad } from './contabilidad'
import { matfin } from './matfin'
import { sd3 } from './sd3'

export const subjects = [contabilidad, sd3, matfin]
export const subjectMap = Object.fromEntries(subjects.map((subject) => [subject.id, subject]))
export const allExams = subjects.flatMap((subject) => subject.exams.map((exam) => ({ ...exam, subject })))

export function getSubjectById(subjectId) {
  return subjectMap[subjectId] || null
}

export function getUnitById(subjectId, unitId) {
  const numericId = Number(unitId)
  return getSubjectById(subjectId)?.units.find((unit) => unit.id === numericId) || null
}

export function getUnitByStorageId(storageId) {
  const id = String(storageId)
  for (const subject of subjects) {
    const unit = subject.units.find((item) => item.storageId === id)
    if (unit) return { subject, unit }
    const exam = subject.exams.find((item) => item.storageId === id)
    if (exam) return { subject, exam }
  }
  return null
}

export function getExamById(subjectId, examId) {
  return getSubjectById(subjectId)?.exams.find((exam) => exam.id === examId || exam.legacyId === examId) || null
}

export function getLegacyExamRedirect(path) {
  const match = allExams.find((exam) => exam.legacyPath === path)
  return match?.route || '/modelos-final'
}
