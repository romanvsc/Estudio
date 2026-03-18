
Necesito esto para mi estudio en el que, de la manera más optima, minimalista y profesional posible, poder comprender las 5 unidades.

### Unidad 1 Introducción ###
Esta Unidad 1 proporciona una visión integral sobre los **sistemas operativos (SO)**, cubriendo su definición, evolución, funciones y arquitectura técnica. A continuación, se presenta un resumen profesional detallado:

### 1. Definición y Propósito del Sistema Operativo
Un sistema operativo es un conjunto de programas que actúan como **intermediarios fundamentales entre el hardware de un ordenador y el usuario**. Su propósito primordial es gestionar los recursos del sistema de manera eficiente y ofrecer una interfaz que oculte la complejidad física de la máquina, permitiendo que otros programas realicen trabajo útil de forma cómoda. Se le considera el **gobierno central** de la computadora, ya que administra el tiempo de CPU, el espacio de memoria, el almacenamiento y los dispositivos de entrada/salida.

### 2. Evolución Histórica
La historia de los sistemas operativos se divide en cinco generaciones conectadas al hardware de su época:
*   **1ª Generación (1945-1955):** Caracterizada por válvulas de vacío y la **ausencia de sistemas operativos**. La programación se realizaba directamente en lenguaje máquina mediante cables y microconmutadores.
*   **2ª Generación (1955-1965):** Aparecen los transistores y el **procesamiento por lotes (batch)**. El sistema GM-NAA I/O (1956) fue el primer SO, diseñado para automatizar la carga de trabajos en mainframes IBM.
*   **3ª Generación (1965-1980):** Con el circuito integrado surge la **multiprogramación** y el tiempo compartido, permitiendo que varios programas residan en memoria simultáneamente para maximizar el uso de la CPU.
*   **4ª Generación (1980-1990):** El microprocesador permite el auge del **ordenador personal (PC)**. Nacen sistemas como MS-DOS, las primeras versiones de Windows y UNIX se consolida como estándar.
*   **5ª Generación y Actualidad (desde 1990):** Surgimiento de sistemas distribuidos, interfaces gráficas intuitivas (GUI) y el dominio de sistemas móviles como **Android e iOS**, junto con la integración de servicios en la nube.

### 3. Funciones Principales y Componentes
El sistema operativo se organiza internamente en varios gestores o componentes críticos:
*   **Gestor de procesos:** Administra el ciclo de vida de los programas en ejecución (procesos), incluyendo su creación, planificación en la CPU y terminación.
*   **Gestor de memoria:** Controla el uso de la RAM, asignando espacio a los procesos y protegiendo las áreas de memoria para evitar interferencias entre ellos.
*   **Gestor de E/S:** Gestiona la comunicación con periféricos (impresoras, discos) a través de controladores o **drivers**.
*   **Gestor de archivos:** Ofrece una visión lógica y estructurada del almacenamiento secundario (carpetas y archivos), ocultando los detalles de los bloques físicos del disco.
*   **Gestor de permisos y seguridad:** Garantiza la integridad del sistema controlando el acceso autorizado a los recursos.

### 4. Taxonomía de los Sistemas Operativos
Los sistemas se clasifican según diversos criterios operativos:
*   **Por el número de usuarios:** **Monousuario** (un solo individuo a la vez) o **multiusuario** (varios usuarios simultáneos compartiendo recursos).
*   **Por el número de tareas:** **Monotarea** (solo un proceso en un instante dado) o **multitarea** (múltiples procesos ejecutándose concurrentemente).
*   **Por el número de procesadores:** **Monoproceso** o **multiproceso** (donde varias CPUs trabajan en conjunto de forma simétrica o asimétrica).
*   **Por la forma de ofrecer servicios:** Sistemas **centralizados**, **distribuidos** (múltiples máquinas actúan como una sola), de **red** (interactúan para intercambiar datos) y de **tiempo real** (respuestas en plazos críticos estrictos).

### 5. Estructuras de los Sistemas Operativos
La organización interna del software determina su rendimiento y estabilidad:
*   **Monolítica:** Todas las funciones están integradas en un único binario que corre en modo núcleo (ej. Linux).
*   **Por capas:** El sistema se divide en niveles jerárquicos donde cada capa solo puede usar funciones de la capa inferior.
*   **Micronúcleo (Microkernel):** El núcleo solo contiene funciones mínimas de comunicación; los demás servicios se ejecutan como procesos de usuario independientes.
*   **Cliente-Servidor:** El núcleo gestiona la comunicación entre procesos clientes y procesos servidores que implementan funciones del SO.
*   **Máquina Virtual:** Presenta una réplica del hardware real a cada proceso, permitiendo ejecutar varios sistemas operativos sobre un mismo anfitrión.


### Unidad 2 Procesos ###
### 1. Anatomía Detallada de un Proceso
Un proceso no es solo un programa en ejecución, sino una **entidad dinámica y activa** gestionada por el núcleo, que abstrae el procesador físico en múltiples **procesadores virtuales**.

*   **Organización de la Memoria:** El sistema operativo segmenta el espacio de direcciones de cada proceso para garantizar su integridad:
    *   **Texto (Código):** Instrucciones binarias de solo lectura para evitar modificaciones accidentales.
    *   **Datos y BSS:** El primero contiene variables globales inicializadas; el segundo reserva espacio para las no inicializadas, puestas a cero al inicio.
    *   **Heap (Montículo):** Crece hacia direcciones superiores para asignaciones dinámicas (ej. `malloc`).
    *   **Stack (Pila):** Crece hacia direcciones inferiores, gestionando parámetros de funciones y variables locales mediante una estructura LIFO.
*   **Aislamiento:** Este diseño asegura que un error en una aplicación no afecte a otras o al núcleo del sistema.

### 2. El Bloque de Control de Proceso (PCB) y el Cambio de Contexto
El **PCB** actúa como el repositorio central de toda la información técnica necesaria para la multiprogramación. Cuando ocurre un **cambio de contexto**, el kernel salva el estado de los registros de la CPU en el PCB del proceso saliente y carga los del nuevo proceso seleccionado. El PCB incluye:
*   **PID:** Identificador único.
*   **Contador de Programa (PC):** Dirección de la siguiente instrucción.
*   **Registros:** Valores de acumuladores y registros de propósito general.
*   **Estado de E/S:** Lista de archivos abiertos y dispositivos asignados.

### 3. Dinámica del Ciclo de Vida y Jerarquías
Los procesos transitan entre cinco estados: **Nuevo, Listo, Ejecutando, Bloqueado** (esperando un evento de E/S o señal) y **Finalizado**. Un ejemplo clave es cuando un proceso solicita una lectura de disco: pasa de *Ejecutando* a *Bloqueado* para liberar la CPU hasta que los datos estén disponibles.

En sistemas tipo UNIX, la creación de procesos es jerárquica mediante la llamada `fork()`, que crea una copia idéntica del padre. De aquí surgen conceptos críticos:
*   **Proceso Raíz (Init):** Ancestro de todos los procesos.
*   **Proceso Huérfano:** Su padre finalizó y es adoptado por *init*.
*   **Proceso Zombie:** Ha terminado pero sigue en la tabla de procesos hasta que el padre lee su estado.

### 4. Sincronización Avanzada y Comunicación (IPC)
La colaboración entre procesos introduce el riesgo de **condiciones de competencia**, donde el resultado depende del orden de ejecución, causando inconsistencias. Para prevenirlas, se exige la **exclusión mutua** en las **regiones críticas**.

#### Requisitos para una Exclusión Mutua Efectiva:
1.  Solo un proceso puede estar en su región crítica a la vez.
2.  No se asumen velocidades de procesadores.
3.  Un proceso fuera de su región crítica no debe bloquear a otros.
4.  No debe haber espera eterna (**ausencia de inanición**).

#### Mecanismos de Implementación:
*   **Bajo Nivel (Hardware):** La instrucción atómica **TSL (Test and Set Lock)** permite leer y modificar una variable en una sola operación, aunque suele implicar **espera activa** (consumo ineficiente de CPU).
*   **Semáforos (Dijkstra):** Primitivas que utilizan operaciones **Down (decrementa/bloquea)** y **Up (incrementa/despierta)**. Pueden ser **binarios** (mutex) o **generales** (contadores de recursos).
*   **Monitores:** Estructuras de alto nivel donde la **exclusión mutua es automática**. Utilizan **variables de condición** para la sincronización y pueden seguir semánticas como la de **Hoare** (el que despierta se suspende) o **Mesa** (el que despierta continúa).

### 5. Resolución de Problemas Clásicos
*   **Cena de los Filósofos:** Enfocado en evitar el **interbloqueo (deadlock)** mediante jerarquías de recursos o árbitros centrales.
*   **Lectores y Escritores:** Modela el acceso a recursos compartidos. Dependiendo de la prioridad (Lectores vs. Escritores), puede causar inanición de uno de los grupos, siendo la solución **FIFO** la más justa.
*   **Barbero Dormilón:** Resuelto mediante el uso de tres semáforos (*clientes*, *barberoListo* y *mutex*) para coordinar la espera en sillas limitadas y el despertar del barbero.


### Unidad 3 Bloqueo Irreversible ###

Este informe técnico detalla el fenómeno de los **bloqueos irreversibles** (o *deadlocks*), analizando su naturaleza, las condiciones que los permiten y las estrategias empleadas por los sistemas operativos para gestionarlos.

---

### 1. Concepto de Bloqueo Irreversible
Un **bloqueo irreversible** o interbloqueo es una situación en la que un conjunto de procesos se encuentra en un estado de espera permanente. Esto ocurre porque cada proceso en el grupo aguarda por un recurso que está siendo retenido por otro proceso del mismo conjunto, deteniendo por completo el progreso computacional sin posibilidad de resolución autónoma.

### 2. Taxonomía de Recursos: Expropiables y No Expropiables
El origen del interbloqueo reside en la competencia por recursos limitados, los cuales se clasifican según su capacidad de ser retirados de un proceso:

*   **Recursos Expropiables (Preemptable):** Son aquellos que el sistema operativo puede retirar de un proceso de forma forzosa sin causar efectos laterales catastróficos. El estado del proceso se guarda para restaurarse más tarde. 
    *   *Ejemplos:* El procesador (CPU) y la memoria principal (mediante *swapping* o paginación).
*   **Recursos No Expropiables (Non-preemptable):** Son recursos cuya retirada antes de que el proceso los libere voluntariamente resultaría en inconsistencia de datos o fallos en la operación. Estos recursos son el componente principal de los interbloqueos.
    *   *Ejemplos:* Unidades de cinta, impresoras y bloqueos lógicos como *mutexes* o semáforos.

### 3. Condiciones Necesarias para el Bloqueo Irreversible
Según la teoría clásica de Coffman (1971), un interbloqueo solo puede ocurrir si se cumplen simultáneamente cuatro condiciones:

1.  **Exclusión Mutua:** Al menos un recurso se mantiene en modo no compartible (solo un proceso a la vez puede usarlo).
2.  **Retención y Espera (*Hold and Wait*):** Un proceso retiene al menos un recurso mientras solicita otros adicionales que están en manos de otros procesos.
3.  **Sin Expropiación:** Los recursos no pueden ser arrebatados; deben ser liberados voluntariamente por el proceso que los posee tras completar su tarea.
4.  **Espera Circular:** Existe una cadena de procesos $\{P_0, P_1, \dots, P_n\}$ tal que $P_0$ espera un recurso de $P_1$, $P_1$ uno de $P_2$, y $P_n$ cierra el ciclo esperando un recurso de $P_0$.

### 4. Detección de Bloqueos y Recuperación Posterior
Cuando un sistema no previene los bloqueos, debe ser capaz de detectarlos y recuperarse de ellos.

#### Mecanismos de Detección
*   **Grafos de Asignación de Recursos (RAG):** Se modelan procesos y recursos como nodos. Si el grafo tiene un solo ejemplar por recurso, la existencia de un **ciclo** es condición necesaria y suficiente para confirmar un bloqueo.
*   **Algoritmos Matriciales:** Para sistemas con múltiples instancias de un mismo recurso, se utilizan matrices de asignación y peticiones para buscar una secuencia de finalización exitosa. Si no se puede reducir el estado para todos los procesos, existe un interbloqueo.

#### Estrategias de Recuperación
Una vez detectado, el sistema debe romper el ciclo mediante:
*   **Terminación de procesos:** Abortar todos los procesos implicados (costoso) o eliminarlos uno por uno hasta que el bloqueo desaparezca.
*   **Expropiación de recursos:** Arrebatar un recurso al poseedor y asignárselo a otro proceso.
*   **Retroceso (*Rollback*):** Regresar al proceso a un estado seguro previo (*checkpoint*) antes de que adquiriera el recurso en conflicto.

### 5. Cómo Evitar Bloqueos (*Deadlock Avoidance*)
Esta técnica utiliza información *a priori* sobre las necesidades futuras de los procesos para decidir si una asignación es "segura".
*   **Estado Seguro:** Existe al menos una secuencia de ejecución que permite a todos los procesos obtener su demanda máxima sin bloquearse.
*   **Algoritmo del Banquero:** Es el mecanismo más influyente. El sistema simula la asignación y solo la concede si el estado resultante sigue siendo seguro. Su limitación principal es que requiere conocer las necesidades máximas de antemano, lo cual es raro en sistemas de propósito general.

### 6. Prevención de Bloqueos (*Deadlock Prevention*)
La prevención consiste en diseñar reglas de asignación que invaliden estructuralmente al menos una de las condiciones de Coffman:

*   **Invalidar Exclusión Mutua:** Usar técnicas como *spooling* para que los recursos parezcan compartibles.
*   **Invalidar Retención y Espera:** Exigir que los procesos soliciten todos sus recursos al inicio de su ejecución ("todo o nada").
*   **Invalidar No Expropiación:** Si un proceso que retiene recursos pide otro que no está disponible, debe liberar todos sus recursos actuales y reintentar más tarde.
*   **Invalidar Espera Circular:** Imponer un orden jerárquico lineal a los recursos; un proceso solo puede pedir recursos en orden ascendente.


### UNIDAD 4 ADMINISTRACIÓN DE MEMORIA ###

Este informe detalla la evolución y los mecanismos técnicos de la administración de memoria, abarcando desde los esquemas más simples hasta las arquitecturas modernas de memoria virtual.

### 1. Administración de Memoria Básica

La gestión de memoria es una tarea crítica del sistema operativo que busca optimizar el uso de la RAM, garantizando la integridad de los datos y permitiendo la ejecución de programas.

#### **Monoprogramación sin intercambio ni paginación**
Este es el esquema más sencillo posible, donde **solo un programa tiene el control total del procesador y la memoria** en un instante dado.
*   **Organización:** La memoria se divide tradicionalmente en dos partes: una reservada para el sistema operativo residente (núcleo) y otra para el único proceso de usuario. 
*   **Ubicación del SO:** El sistema operativo puede residir en las direcciones más bajas de la RAM, en las más altas dentro de una ROM, o en una configuración híbrida con controladores en ROM y el núcleo en RAM.
*   **Limitaciones:** Presenta grandes ineficiencias, ya que **el procesador permanece ocioso durante las operaciones de E/S** del proceso y la memoria se infrautiliza si el programa es pequeño.

#### **Multiprogramación con particiones**
Para maximizar el rendimiento, se desarrollaron técnicas para mantener varios procesos en memoria simultáneamente.
*   **Particiones Fijas (Estáticas):** La memoria se divide en $n$ regiones antes de la ejecución. Pueden ser de igual o distinto tamaño. Su principal problema es la **fragmentación interna**, que ocurre cuando un proceso ocupa una partición más grande de lo que necesita, desperdiciando el espacio sobrante.
*   **Particiones Variables (Dinámicas):** El sistema operativo asigna a cada proceso exactamente la cantidad de memoria que solicita en tiempo de ejecución. Aunque elimina la fragmentación interna, introduce la **fragmentación externa**, donde la memoria libre queda dispersa en pequeños huecos no contiguos.
*   **Compactación:** Es la solución a la fragmentación externa y consiste en desplazar los procesos en ejecución hacia un extremo de la RAM para agrupar los huecos libres en un solo bloque grande.

---

### 2. Intercambio (Swapping)

El intercambio es una técnica de gestión para situaciones de **sobrecarga de memoria** (*oversubscription*), donde la demanda total de los procesos supera la capacidad física de la RAM.
*   **Mecanismo:** Consiste en mover procesos completos entre la memoria principal y un área de almacenamiento secundario rápida (disco duro o SSD) denominada **área de intercambio o *swap***.
*   **Ciclo de operación:** Cuando la memoria se agota, el sistema realiza un *swap-out* (traslada un proceso inactivo al disco) para liberar espacio y un *swap-in* (trae un proceso del disco a la RAM) cuando es su turno de ejecución.
*   **Costo de rendimiento:** Debido a que el acceso al disco es significativamente más lento que a la RAM, esta técnica impone una alta latencia y ha caído en desuso parcial frente a métodos más granulares como la paginación.

---

### 3. Memoria Virtual

La memoria virtual permite que **el espacio de direcciones de un programa sea mayor que la memoria física disponible**, manteniendo en RAM solo las partes activas y dejando el resto en el disco de forma transparente.

#### **Paginación**
Es el método predominante para implementar memoria virtual hoy en día.
*   **Funcionamiento:** Divide el espacio de direcciones lógicas en unidades de tamaño fijo llamadas **páginas** y la memoria física en trozos del mismo tamaño denominados **marcos o *frames***.
*   **Traducción:** La Unidad de Gestión de Memoria (**MMU**) utiliza una **Tabla de Páginas** para traducir las direcciones virtuales en físicas.
*   **Optimización (TLB):** Para evitar el doble acceso a memoria (uno para la tabla y otro para el dato), se usa una caché de alta velocidad llamada **Translation Lookaside Buffer (TLB)** que almacena las traducciones más recientes.
*   **Ventajas:** Elimina la fragmentación externa y permite que las páginas de un programa no sean contiguas en la RAM.

#### **Segmentación**
A diferencia de la paginación, la segmentación es una técnica orientada a la **estructura lógica del programa**.
*   **Funcionamiento:** El espacio de direcciones se considera un conjunto de **segmentos de longitud variable**, cada uno con un significado semántico (código, datos, pila, tablas de símbolos).
*   **Direccionamiento:** Una dirección lógica consta de un número de segmento y un desplazamiento. La **Tabla de Segmentos** almacena la dirección base física y el límite (longitud) de cada uno.
*   **Protección y Compartición:** Facilita marcar segmentos como "solo ejecución" o "solo lectura" y permite que varios procesos compartan un mismo segmento de código (como bibliotecas) de forma sencilla.
*   **Desventaja:** Al igual que las particiones variables, la segmentación pura sufre de **fragmentación externa**.

---

### 4. Sistemas Combinados: Segmentación Paginada

La mayoría de los procesadores modernos, como la familia x86 de Intel, utilizan un modelo híbrido para obtener la **potencia lógica de la segmentación con la eficiencia física de la paginación**. En este esquema, el programa se divide lógicamente en segmentos, pero cada segmento se subdivide físicamente en páginas de tamaño fijo. Esto elimina la fragmentación externa y permite una protección de datos de grano fino.

### UNIDAD 5 SISTEMA DE ARCHIVOS ###

---

## 1. Concepto y Propiedades de los Archivos

### Concepto de Archivo
Un archivo es una **unidad lógica de almacenamiento**, definida por el sistema operativo como una colección de información relacionada que reside en el almacenamiento secundario. Su función principal es proporcionar una abstracción que libere al usuario de los detalles físicos de los dispositivos, como discos magnéticos o SSD. La existencia de un archivo es independiente del proceso que lo creó, lo que garantiza su **persistencia**.

### Nombre y Convenciones de Nomenclatura
El sistema de nombres es la interfaz primaria entre el usuario y el sistema. 
*   **Estructura del nombre:** Generalmente se compone de un nombre base y una **extensión**, separados por un punto (ej. `.c`, `.txt`, `.mp3`). 
*   **Propósito de la extensión:** Indica al sistema operativo o a las aplicaciones el formato y el tipo de contenido del archivo para asociarlo con el software correcto.

### Estructura Interna de los Archivos
Los datos dentro de un archivo pueden organizarse de tres formas fundamentales:
1.  **Secuencia de Bytes (Byte Stream):** El archivo es una serie de bytes sin estructura interpretada por el SO; la aplicación decide qué significan (usado en UNIX y Windows).
2.  **Secuencia de Registros:** El archivo consiste en registros de longitud fija con una estructura interna definida.
3.  **Árbol de Registros:** Los registros están organizados en un árbol basado en un campo clave para permitir búsquedas rápidas (común en mainframes y bases de datos).

### Tipos de Archivos
*   **Regulares:** Contienen información del usuario (texto ASCII o binarios como ejecutables).
*   **Directorios:** Archivos de sistema que mantienen la estructura y el mapeo entre nombres y ubicaciones.
*   **Especiales:** Modelan dispositivos de entrada/salida. Se dividen en archivos de **caracteres** (terminales) y de **bloques** (discos).

### Métodos de Acceso
*   **Secuencial:** La información se lee o escribe en orden, un registro tras otro, avanzando el puntero automáticamente. Es ideal para streaming y cintas.
*   **Directo (Aleatorio):** Permite acceder a cualquier bloque o registro de forma inmediata mediante su número de bloque, sin pasar por los anteriores.
*   **Indexado:** Utiliza un índice con punteros para localizar bloques de datos específicos, combinando a menudo el acceso directo con el secuencial.

### Atributos y Metadatos
Cada archivo posee información adicional que lo describe, conocida como **metadatos**. Los atributos comunes incluyen:
*   Nombre, identificador único (ej. *inode*), tipo y ubicación física.
*   Tamaño, bits de protección (permisos) y marcas de tiempo (creación, acceso, modificación).

### Operaciones de Archivos
Las llamadas al sistema estandarizadas permiten gestionar el ciclo de vida del archivo:
*   **Creación (Create):** Busca espacio y crea una entrada en el directorio.
*   **Apertura (Open):** Carga el bloque de control del archivo en memoria y verifica permisos.
*   **Lectura/Escritura (Read/Write):** Transfiere datos entre el archivo y los búferes de memoria.
*   **Reposicionamiento (Seek):** Mueve el puntero a una posición específica para acceso aleatorio.
*   **Truncamiento (Truncate):** Borra el contenido manteniendo los atributos.
*   **Cierre (Close):** Libera recursos en memoria y asegura que los datos se escriban en el disco.

---

## 2. Estructuras de Directorios

Los directorios organizan los archivos de forma lógica y facilitan su localización.

### Tipos de Estructuras
1.  **Un solo nivel:** Todos los archivos están en una lista única. Es simple pero presenta colisiones de nombres y dificultad de organización.
2.  **Dos niveles:** Cada usuario tiene su propio directorio (UFD), coordinado por un directorio maestro (MFD). Permite nombres idénticos entre usuarios pero no permite agrupar archivos de un mismo usuario.
3.  **Jerárquicos (en Árbol):** Es el modelo moderno estándar. Los directorios contienen subdirectorios en cascada desde una **raíz (root)**.
4.  **Grafo Acíclico:** Permite compartir archivos o directorios mediante **enlaces (links)** entre ramas, sin permitir ciclos.
5.  **Grafo General:** Permite ciclos, donde un directorio puede apuntar a sus ancestros, requiriendo algoritmos complejos de recolección de basura y búsqueda para evitar bucles infinitos.

### Nombres de Ruta (Paths)
*   **Ruta Absoluta:** Comienza desde el directorio raíz (/).
*   **Ruta Relativa:** Comienza desde el directorio de trabajo actual del proceso.

### Operaciones con Directorios
Incluyen la búsqueda de un archivo, creación de nuevas entradas, eliminación, renombrado, listado del contenido y travesía (navegación) por el sistema.

---

## 3. Implementación de Sistemas de Archivos

### Organización y Estructuras de Datos
La implementación se basa en estructuras tanto en disco como en memoria:
*   **En Disco:** Incluye el **bloque de control de arranque**, el **superbloque** (parámetros del volumen) y los **bloques de control de archivos (FCB/inodes)**.
*   **En Memoria:** El sistema mantiene tablas de montaje, cachés de directorios y una tabla global de archivos abiertos. La capa de **Sistema de Archivos Virtual (VFS)** permite al núcleo manejar múltiples tipos de sistemas de archivos de forma uniforme.

### Archivos Compartidos y Consistencia
La compartición de archivos requiere definir una **semántica de consistencia**:
*   **Semántica UNIX:** Las escrituras son visibles inmediatamente para todos.
*   **Semántica de Sesión:** Los cambios solo se ven cuando se cierra el archivo (ej. AFS).
*   **Bloqueos:** Se usan bloqueos compartidos (para lectura) o exclusivos (para escritura) para gestionar la concurrencia.

### Administración de Espacio en Disco (Asignación)
Existen tres métodos principales para asignar bloques físicos a archivos:
1.  **Asignación Contigua:** El archivo ocupa bloques adyacentes. Ofrece gran velocidad pero sufre de fragmentación externa y dificultad para crecer.
2.  **Asignación Ligada:** Cada bloque contiene un puntero al siguiente. Elimina la fragmentación externa y facilita el crecimiento, pero solo permite acceso secuencial.
3.  **Asignación Indexada (Inodes):** Un bloque de índice centraliza todos los punteros del archivo. Soporta acceso directo y elimina la fragmentación externa (usado en Linux con ext2/3/4).

### Administración de Espacio Libre
Para reutilizar espacio de archivos borrados, el SO mantiene registros de bloques libres mediante:
*   **Mapas de Bits (Bit Vector):** Un bit representa cada bloque (1=libre, 0=ocupado). Es eficiente para encontrar bloques contiguos.
*   **Listas Ligadas:** Los bloques libres se encadenan entre sí.
*   **Agrupamiento y Conteo:** Registran grupos de bloques libres o secuencias de bloques contiguos para optimizar la gestión en discos de gran capacidad.
