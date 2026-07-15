import { FILTERS, SELECTORS, TEXTS, CLASS_NAMES, BUTTON_TEXT } from '../constants/constants.js';

export class TaskView {
  constructor(taskService) {
    this.taskService = taskService;
    this.elements = {};
  }

  init() {
    this._bindElements();
    this._attachEventListeners();
    this.render();
  }

  _bindElements() {
    this.elements.taskInput = document.querySelector(SELECTORS.TASK_INPUT);
    this.elements.addButton = document.querySelector(SELECTORS.ADD_BUTTON);
    this.elements.taskList = document.querySelector(SELECTORS.TASK_LIST);
    this.elements.stats = document.querySelector(SELECTORS.STATS);
    this.elements.filterButtons = Array.from(document.querySelectorAll(SELECTORS.FILTER_BUTTONS));
  }

  _attachEventListeners() {
    this.elements.addButton.addEventListener('click', () => this._handleAddTask());

    this.elements.taskInput.addEventListener('keypress', (event) => {
      if (event.key === 'Enter') {
        this._handleAddTask();
      }
    });

    this.elements.filterButtons.forEach((button) => {
      button.addEventListener('click', () => this._handleFilterChange(button.dataset.filter));
    });
  }

  render() {
    const tasks = this.taskService.getFilteredTasks();
    this._renderTaskList(tasks);
    this._updateStats();
    this._updateFilterButtons();
  }

  _renderTaskList(tasks) {
    this.elements.taskList.innerHTML = '';

    if (tasks.length === 0) {
      this.elements.taskList.innerHTML = `<p style="text-align: center; color: #999; padding: 20px;">${TEXTS.EMPTY_LIST_MESSAGE}</p>`;
      return;
    }

    tasks.forEach((task) => {
      const taskItem = this._createTaskItem(task);
      this.elements.taskList.appendChild(taskItem);
    });
  }

  _createTaskItem(task) {
    const taskDiv = document.createElement('div');
    taskDiv.className = CLASS_NAMES.TASK_ITEM;

    if (task.completed) {
      taskDiv.classList.add(CLASS_NAMES.COMPLETED);
    }

    taskDiv.innerHTML = `
      <span>${task.text}</span>
      <div class="task-buttons">
        <button class="complete-btn" data-id="${task.id}">
          ${task.completed ? BUTTON_TEXT.REOPEN : BUTTON_TEXT.COMPLETE}
        </button>
        <button class="delete-btn" data-id="${task.id}">${BUTTON_TEXT.DELETE}</button>
      </div>
    `;

    const completeButton = taskDiv.querySelector('.complete-btn');
    const deleteButton = taskDiv.querySelector('.delete-btn');

    completeButton.addEventListener('click', () => this._handleToggleTask(task.id));
    deleteButton.addEventListener('click', () => this._handleDeleteTask(task.id));

    return taskDiv;
  }

  _handleAddTask() {
    const taskText = this.elements.taskInput.value;

    if (taskText.trim() === '') {
      alert(TEXTS.INPUT_EMPTY_ALERT);
      return;
    }

    this.taskService.addTask(taskText);
    this.elements.taskInput.value = '';
    this.render();
  }

  _handleToggleTask(taskId) {
    this.taskService.toggleTask(taskId);
    this.render();
  }

  _handleDeleteTask(taskId) {
    this.taskService.deleteTask(taskId);
    this.render();
  }

  _handleFilterChange(filter) {
    this.taskService.setFilter(filter);
    this.render();
  }

  _updateStats() {
    const { total, completed, active } = this.taskService.getStats();

    this.elements.stats.textContent = `Total: ${total} | Completadas: ${completed} | Activas: ${active}`;
  }

  _updateFilterButtons() {
    this.elements.filterButtons.forEach((button) => {
      const isActive = button.dataset.filter === this.taskService.currentFilter;
      button.classList.toggle(CLASS_NAMES.ACTIVE_BUTTON, isActive);
    });
  }
}
