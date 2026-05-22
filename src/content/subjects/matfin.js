export const matfin = {
  id: 'matfin',
  title: 'Matemática Financiera',
  shortTitle: 'MatFin',
  icon: 'calculator',
  emoji: '📈',
  color: 'teal',
  description: 'Decisiones financieras, equivalencia, tasas, interés, descuento y rentas.',
  defaultPath: '/matfin/unidad/1',
  dashboardPath: '/matfin/dashboard',
  units: [
    {
      id: 1,
      storageId: 'mf-1',
      title: 'Fundamentos y cálculo financiero',
      icon: 'calculator',
      color: 'teal',
      component: () => import('../../views/matfin/MatFinUnidad1.vue'),
      topics: [
        { id: 'mfu1-t1', number: 'Tema 1', title: 'Decisiones financieras y principios' },
        { id: 'mfu1-t2', number: 'Tema 2', title: 'Tasa de interés y componentes' },
        { id: 'mfu1-t3', number: 'Tema 3', title: 'Operación financiera y elementos' },
        { id: 'mfu1-t4', number: 'Tema 4', title: 'Interés simple' },
        { id: 'mfu1-t5', number: 'Tema 5', title: 'Interés compuesto' },
        { id: 'mfu1-t6', number: 'Tema 6', title: 'Descuento simple y compuesto' },
        { id: 'mfu1-t7', number: 'Tema 7', title: 'Equivalencia de tasas' }
      ]
    },
    {
      id: 2,
      storageId: 'mf-2',
      title: 'Equivalencia financiera y tasas',
      icon: 'scale',
      color: 'amber',
      component: () => import('../../views/matfin/MatFinUnidad2.vue'),
      topics: [
        { id: 'mfu2-t1', number: 'Tema 1', title: 'Equivalencia financiera de capitales' },
        { id: 'mfu2-t2', number: 'Tema 2', title: 'Equivalencia en régimen simple' },
        { id: 'mfu2-t3', number: 'Tema 3', title: 'Equivalencia en régimen compuesto' },
        { id: 'mfu2-t4', number: 'Tema 4', title: 'TNA, TEA y frecuencia de capitalización' },
        { id: 'mfu2-t5', number: 'Tema 5', title: 'Tasas efectivas equivalentes' },
        { id: 'mfu2-t6', number: 'Tema 6', title: 'Capitalización continua' }
      ]
    },
    {
      id: 3,
      storageId: 'mf-3',
      title: 'Rentas',
      icon: 'barChart',
      color: 'purple',
      component: () => import('../../views/matfin/MatFinUnidad3.vue'),
      topics: [
        { id: 'mfu3-t1', number: 'Tema 1', title: 'Concepto y clasificación de rentas' },
        { id: 'mfu3-t2', number: 'Tema 2', title: 'Valor actual de rentas vencidas' },
        { id: 'mfu3-t3', number: 'Tema 3', title: 'Rentas adelantadas y diferidas' },
        { id: 'mfu3-t4', number: 'Tema 4', title: 'Imposiciones y valor final' },
        { id: 'mfu3-t5', number: 'Tema 5', title: 'Rentas perpetuas' }
      ]
    }
  ],
  exams: []
}
