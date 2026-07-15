import { FILTERS } from '../constants/constants.js';
import { createTask } from '../models/task.js';

export class TaskService {
  constructor(storage, initialFilter = FILTERS.ALL) {
    this.storage = storage;
    this.tasks = storage.loadTasks();
    this.currentFilter = initialFilter;
    this.nextId = this._calculateNextId();
  }

  _calculateNextId() {
    if (this.tasks.length === 0) {
      return 1;
    }

    return Math.max(...this.tasks.map((task) => task.id)) + 1;
  }

  addTask(text) {
    const trimmedText = text.trim();

    if (trimmedText === '') {
      throw new Error('Task text cannot be empty.');
    }

    const newTask = createTask(trimmedText, this.nextId);
    this.nextId += 1;
    this.tasks.push(newTask);
    this._saveTasks();

    return newTask;
  }

  toggleTask(taskId) {
    const task = this.tasks.find((item) => item.id === taskId);

    if (!task) {
      return;
    }

    task.completed = !task.completed;
    this._saveTasks();
  }

  deleteTask(taskId) {
    this.tasks = this.tasks.filter((item) => item.id !== taskId);
    this._saveTasks();
  }

  setFilter(filter) {
    const validFilters = Object.values(FILTERS);

    if (!validFilters.includes(filter)) {
      return;
    }

    this.currentFilter = filter;
  }

  getFilteredTasks() {
    switch (this.currentFilter) {
      case FILTERS.ACTIVE:
        return this.tasks.filter((task) => !task.completed);
      case FILTERS.COMPLETED:
        return this.tasks.filter((task) => task.completed);
      default:
        return [...this.tasks];
    }
  }

  getStats() {
    const completed = this.tasks.filter((task) => task.completed).length;
    const active = this.tasks.length - completed;

    return {
      total: this.tasks.length,
      completed,
      active
    };
  }

  _saveTasks() {
    this.storage.saveTasks(this.tasks);
  }
}
