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
}