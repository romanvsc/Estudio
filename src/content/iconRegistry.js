import { markRaw } from 'vue'
import {
  Ban,
  BarChart3,
  BookOpen,
  Building2,
  Calculator,
  ClipboardList,
  Cpu,
  FolderTree,
  GraduationCap,
  HardDrive,
  LayoutDashboard,
  Monitor,
  Scale
} from 'lucide-vue-next'

const icons = {
  ban: Ban,
  barChart: BarChart3,
  book: BookOpen,
  building: Building2,
  calculator: Calculator,
  clipboard: ClipboardList,
  cpu: Cpu,
  folderTree: FolderTree,
  graduationCap: GraduationCap,
  hardDrive: HardDrive,
  layoutDashboard: LayoutDashboard,
  monitor: Monitor,
  scale: Scale
}

export function resolveIcon(name) {
  return markRaw(icons[name] || BookOpen)
}
