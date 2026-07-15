import './style.css';
import { TaskStorage } from './storage/taskStorage.js';
import { TaskService } from './services/taskService.js';
import { TaskView } from './ui/taskView.js';

window.addEventListener('DOMContentLoaded', () => {
  const storage = new TaskStorage();
  const taskService = new TaskService(storage);
  const taskView = new TaskView(taskService);

  taskView.init();
});
