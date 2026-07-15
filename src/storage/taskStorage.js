import { STORAGE_KEY } from '../constants/constants.js';

export class TaskStorage {
  constructor(storage = window.localStorage) {
    this.storage = storage;
  }

  loadTasks() {
    const savedTasks = this.storage.getItem(STORAGE_KEY);

    if (!savedTasks) {
      return [];
    }

    try {
      return JSON.parse(savedTasks);
    } catch (error) {
      console.warn('No se pudo parsear el almacenamiento de tareas, se reinicia el listado.', error);
      return [];
    }
  }

  saveTasks(tasks) {
    this.storage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  }
}
