import { tasks } from '../mock/task.js';
import { generateID } from '../utils.js';

export default class TasksModel {
    #boardtasks = tasks;
    #observers = [];

    getTasksByStatus(status) {
        return this.#boardtasks.filter(task => task.status === status);
    }

    get tasks() {
        return this.#boardtasks;
    }

    addTask(title) {
        const newTask = {
            id: generateID(this.#boardtasks),
            title,
            status: 'backlog'
        };
        this.#boardtasks.push(newTask);
        this._notifyObservers();
        return newTask;
    }

    clearTrash() {
        this.#boardtasks = this.#boardtasks.filter(task => task.status !== 'trash');
        this._notifyObservers();
    }

    addObserver(observer) {
        this.#observers.push(observer);
    }

    removeObserver(observer) {
        this.#observers = this.#observers.filter((obs) => obs !== observer);
    }

    _notifyObservers() {
        this.#observers.forEach((observer) => observer());
    }

    moveTask(taskId, newStatus, afterId = null) {
        const taskIndex = this.#boardtasks.findIndex(task => task.id === taskId);
        if (taskIndex === -1) return;

        const task = this.#boardtasks[taskIndex];
        this.#boardtasks.splice(taskIndex, 1);

        let insertIndex = 0;

        if (afterId !== null) {
            const afterIndex = this.#boardtasks.findIndex(t => t.id === afterId);
            if (afterIndex !== -1) {
                insertIndex = afterIndex + 1;
            } else {
                insertIndex = this.#boardtasks.length;
            }
        } else if (afterId === undefined) {
            insertIndex = this.#boardtasks.length;
        }

        task.status = newStatus;
        this.#boardtasks.splice(insertIndex, 0, task);

        this._notifyObservers();
    }
}