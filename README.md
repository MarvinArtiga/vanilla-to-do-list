# Refactorización del proyecto To-Do List Vanilla

## Resumen de cambios

Se refactorizó el proyecto manteniendo el comportamiento original de la aplicación. Los cambios principales se enfocaron en:

- Separar responsabilidades entre almacenamiento, lógica de tareas y presentación.
- Extraer constantes y valores mágicos a un módulo central.
- Evitar variables globales mutables en `main.js`.
- Reducir la complejidad de funciones y mejorar la legibilidad.
- Organizar el código en módulos cohesivos y con menor acoplamiento.

## Arquitectura aplicada

Nuevo árbol principal de `src/`:

- `src/constants/constants.js` — constantes compartidas.
- `src/models/task.js` — fábrica de objetos de tarea.
- `src/storage/taskStorage.js` — persistencia con `localStorage`.
- `src/services/taskService.js` — lógica del dominio de tareas.
- `src/ui/taskView.js` — capa de presentación y eventos.
- `src/main.js` — inicialización de la aplicación.

## Problemas resueltos

- Código monolítico en `src/main.js`.
- Persistencia y renderizado mezclados.
- Duplicación de lógica de filtrado, actualización de estadísticas y persistencia.
- Uso de `==`/`!=` y strings mágicos en múltiples sitios.
- Dependencia directa de `localStorage` sin abstracción.

## Verificación

- `npm install`
- `npm run build`

La aplicación se compila y construye sin errores.

## Principios aplicados

- **SRP**: cada módulo tiene responsabilidad única.
- **OCP**: `TaskService` y `TaskView` pueden extenderse sin modificar su lógica interna directa.
- **DIP**: `TaskService` depende de una abstracción de almacenamiento.
- **Clean Code**: nombres claros, funciones pequeñas y eliminación de duplicación.

## Nota

No se cambiaron comportamientos de usuario: la interfaz, los textos de botones y la persistencia permanecen como en la versión original.
