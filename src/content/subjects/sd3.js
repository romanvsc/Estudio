export const sd3 = {
  id: 'sd3',
  title: 'Sistemas de Datos III',
  shortTitle: 'SD3',
  icon: 'monitor',
  emoji: '💻',
  color: 'blue',
  description: 'Sistemas operativos, procesos, deadlocks, administración de memoria y sistema de archivos.',
  defaultPath: '/sd3/unidad/1',
  dashboardPath: '/sd3/dashboard',
  units: [
    {
      id: 1,
      storageId: 'sd3-1',
      title: 'Introducción a los SO',
      icon: 'monitor',
      color: 'blue',
      component: () => import('../../views/sd3/SD3Unidad1.vue'),
      topics: [
        { id: 'sd3u1-t1', number: 'Tema 1', title: 'Definición y propósito del SO' },
        { id: 'sd3u1-t2', number: 'Tema 2', title: 'Evolución histórica' },
        { id: 'sd3u1-t3', number: 'Tema 3', title: 'Funciones y componentes' },
        { id: 'sd3u1-t4', number: 'Tema 4', title: 'Clasificación de los SO' },
        { id: 'sd3u1-t5', number: 'Tema 5', title: 'Arquitecturas del SO' }
      ]
    },
    {
      id: 2,
      storageId: 'sd3-2',
      title: 'Procesos',
      icon: 'cpu',
      color: 'teal',
      component: () => import('../../views/sd3/SD3Unidad2.vue'),
      topics: [
        { id: 'sd3u2-t1', number: 'Tema 1', title: 'Anatomía de un proceso' },
        { id: 'sd3u2-t2', number: 'Tema 2', title: 'PCB y cambio de contexto' },
        { id: 'sd3u2-t3', number: 'Tema 3', title: 'Ciclo de vida y jerarquías' },
        { id: 'sd3u2-t4', number: 'Tema 4', title: 'Sincronización e IPC' },
        { id: 'sd3u2-t5', number: 'Tema 5', title: 'Problemas clásicos' }
      ]
    },
    {
      id: 3,
      storageId: 'sd3-3',
      title: 'Bloqueo Irreversible',
      icon: 'ban',
      color: 'amber',
      component: () => import('../../views/sd3/SD3Unidad3.vue'),
      topics: [
        { id: 'sd3u3-t1', number: 'Tema 1', title: 'Concepto de deadlock' },
        { id: 'sd3u3-t2', number: 'Tema 2', title: 'Recursos expropiables y no expropiables' },
        { id: 'sd3u3-t3', number: 'Tema 3', title: 'Condiciones de Coffman' },
        { id: 'sd3u3-t4', number: 'Tema 4', title: 'Detección y recuperación' },
        { id: 'sd3u3-t5', number: 'Tema 5', title: 'Evitación (banquero)' },
        { id: 'sd3u3-t6', number: 'Tema 6', title: 'Prevención de bloqueos' }
      ]
    },
    {
      id: 4,
      storageId: 'sd3-4',
      title: 'Administración de Memoria',
      icon: 'hardDrive',
      color: 'purple',
      component: () => import('../../views/sd3/SD3Unidad4.vue'),
      topics: [
        { id: 'sd3u4-t1', number: 'Tema 1', title: 'Monoprogramación' },
        { id: 'sd3u4-t2', number: 'Tema 2', title: 'Multiprogramación con particiones' },
        { id: 'sd3u4-t3', number: 'Tema 3', title: 'Intercambio (swapping)' },
        { id: 'sd3u4-t4', number: 'Tema 4', title: 'Memoria virtual' },
        { id: 'sd3u4-t5', number: 'Tema 5', title: 'Segmentación paginada' }
      ]
    },
    {
      id: 5,
      storageId: 'sd3-5',
      title: 'Sistema de Archivos',
      icon: 'folderTree',
      color: 'red',
      component: () => import('../../views/sd3/SD3Unidad5.vue'),
      topics: [
        { id: 'sd3u5-t1', number: 'Tema 1', title: 'Archivos: concepto y estructura' },
        { id: 'sd3u5-t2', number: 'Tema 2', title: 'Estructuras de directorios' },
        { id: 'sd3u5-t3', number: 'Tema 3', title: 'Implementación del sistema de archivos' },
        { id: 'sd3u5-t4', number: 'Tema 4', title: 'Asignación de espacio y espacio libre' }
      ]
    }
  ],
  exams: []
}
