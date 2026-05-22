export const contabilidad = {
  id: 'contabilidad',
  title: 'Contabilidad',
  shortTitle: 'Contabilidad',
  icon: 'building',
  emoji: '🧾',
  color: 'blue',
  description: 'Organización empresarial, aspectos fiscales, informes, cuentas contables y registración.',
  defaultPath: '/contabilidad/unidad/1',
  dashboardPath: '/contabilidad/dashboard',
  units: [
    {
      id: 1,
      storageId: '1',
      title: 'Contabilidad y Organización',
      icon: 'building',
      color: 'blue',
      component: () => import('../../views/contabilidad/Unidad1.vue'),
      topics: [
        { id: 'u1-t1', number: 'Tema 1', title: 'Ente y persona jurídica' },
        { id: 'u1-t2', number: 'Tema 2', title: 'Organización y elementos' },
        { id: 'u1-t3', number: 'Tema 3', title: 'Clasificación de organizaciones' },
        { id: 'u1-t4', number: 'Tema 4', title: 'Tipos societarios' },
        { id: 'u1-t5', number: 'Tema 5', title: 'Empresa en marcha' },
        { id: 'u1-t6', number: 'Tema 6', title: 'Inversión inicial y capital de trabajo' },
        { id: 'u1-t7', number: 'Tema 7', title: 'Contabilidad como ciencia, técnica y arte' },
        { id: 'u1-t8', number: 'Tema 8', title: 'Evolución histórica' },
        { id: 'u1-t9', number: 'Temas 9-11', title: 'Objeto, objetivo e informes contables' }
      ]
    },
    {
      id: 2,
      storageId: '2',
      title: 'Aspectos Contables y Fiscales',
      icon: 'clipboard',
      color: 'teal',
      component: () => import('../../views/contabilidad/Unidad2.vue'),
      topics: [
        { id: 'u2-t1', number: 'Tema 1', title: 'Relación empresa-Estado' },
        { id: 'u2-t2', number: 'Tema 2', title: 'Monotributo' },
        { id: 'u2-t3', number: 'Tema 3', title: 'Régimen general' },
        { id: 'u2-t4', number: 'Tema 4', title: 'Comprobantes' },
        { id: 'u2-t5', number: 'Tema 5', title: 'Archivo y conservación' },
        { id: 'u2-t6', number: 'Tema 6', title: 'Documentación respaldatoria' }
      ]
    },
    {
      id: 3,
      storageId: '3',
      title: 'Informes y Ecuaciones',
      icon: 'scale',
      color: 'amber',
      component: () => import('../../views/contabilidad/Unidad3.vue'),
      topics: [
        { id: 'u3-t1', number: 'Tema 1', title: 'Informes contables' },
        { id: 'u3-t2', number: 'Tema 2', title: 'Activo, pasivo y patrimonio neto' },
        { id: 'u3-t3', number: 'Tema 3', title: 'Capital y ecuación patrimonial estática' },
        { id: 'u3-t4', number: 'Tema 4', title: 'Resultados positivos y negativos' },
        { id: 'u3-t5', number: 'Tema 5', title: 'Ecuación contable dinámica' },
        { id: 'u3-t6', number: 'Tema 6', title: 'Rueda operativa' },
        { id: 'u3-t7', number: 'Tema 7', title: 'Variaciones patrimoniales' },
        { id: 'u3-t8', number: 'Tema 8', title: 'Partida doble vs partida simple' },
        { id: 'u3-t9', number: 'Tema 9', title: 'Base devengado vs percibido' }
      ]
    },
    {
      id: 4,
      storageId: '4',
      title: 'Cuentas Contables',
      icon: 'barChart',
      color: 'purple',
      component: () => import('../../views/contabilidad/Unidad4.vue'),
      topics: [
        { id: 'u4-t1', number: 'Tema 1', title: 'Definición de cuenta contable' },
        { id: 'u4-t2', number: 'Tema 2', title: 'Clasificación según naturaleza' },
        { id: 'u4-t3', number: 'Tema 3', title: 'Agrupación por rubro' },
        { id: 'u4-t4', number: 'Tema 4', title: 'Unidades y criterios de valuación' },
        { id: 'u4-t5', number: 'Tema 5', title: 'Clasificación por grado de análisis' },
        { id: 'u4-t6', number: 'Tema 6', title: 'Plan de cuentas' },
        { id: 'u4-t7', number: 'Tema 7', title: 'Manual de cuentas' },
        { id: 'u4-t8', number: 'Tema 8', title: 'Componentes financieros explícitos e implícitos' }
      ]
    },
    {
      id: 5,
      storageId: '5',
      title: 'Registración y Normativa',
      icon: 'book',
      color: 'red',
      component: () => import('../../views/contabilidad/Unidad5.vue'),
      topics: [
        { id: 'u5-t1', number: 'Tema 1', title: 'Normas legales de la contabilidad' },
        { id: 'u5-t2', number: 'Tema 2', title: 'Sujetos obligados a llevar libros' },
        { id: 'u5-t3', number: 'Tema 3', title: 'Libros obligatorios' },
        { id: 'u5-t4', number: 'Tema 4', title: 'Orden de uso de libros contables' },
        { id: 'u5-t5', number: 'Tema 5', title: 'Medios de registración contable' },
        { id: 'u5-t6', number: 'Tema 6', title: 'Ejemplos de registración' }
      ]
    }
  ],
  exams: [
    { id: 'final-1', legacyId: 'final', storageId: 'final-1', title: 'Modelo de Final 1', subtitle: 'Cuestionario modelo de examen final', icon: 'graduationCap', color: 'gold', route: '/modelos-final/contabilidad/final-1', legacyPath: '/contabilidad/modelo-final', component: () => import('../../views/contabilidad/ModeloFinal.vue'), keywords: ['contabilidad', 'modelo final', 'cuestionario', 'unidades', 'opción múltiple'] },
    { id: 'final-2', legacyId: 'final2', storageId: 'final-2', title: 'Modelo de Final 2', subtitle: 'Segundo cuestionario integral', icon: 'graduationCap', color: 'gold', route: '/modelos-final/contabilidad/final-2', legacyPath: '/contabilidad/modelo-final-2', component: () => import('../../views/contabilidad/ModeloFinal2.vue'), keywords: ['contabilidad', 'modelo final 2', 'cuestionario', 'práctica'] },
    { id: 'final-3', legacyId: 'final3', storageId: 'final-3', title: 'Modelo de Final 3', subtitle: 'Tercer modelo de práctica integral', icon: 'graduationCap', color: 'gold', route: '/modelos-final/contabilidad/final-3', legacyPath: '/contabilidad/modelo-final-3', component: () => import('../../views/contabilidad/ModeloFinal3.vue'), keywords: ['contabilidad', 'modelo final 3', 'asientos', 'práctica'] },
    { id: 'final-4', legacyId: 'final4', storageId: 'final-4', title: 'Modelo de Final 4', subtitle: 'Modelo práctico propuesto y resuelto', icon: 'graduationCap', color: 'gold', route: '/modelos-final/contabilidad/final-4', legacyPath: '/contabilidad/modelo-final-4', component: () => import('../../views/contabilidad/ModeloFinal4.vue'), keywords: ['contabilidad', 'modelo final 4', 'práctico', 'asientos', 'resuelto'] }
  ]
}
