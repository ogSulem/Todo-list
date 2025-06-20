import Observable from '../framework/observable.js';
import { generateID } from '../utils.js';
import { UserAction, UpdateType, Status } from '../const.js';

export default class TasksModel extends Observable {
    #boardtasks = [];
    #tasksApiService = null;

    constructor({tasksApiService}) {
        super();
        this.#tasksApiService = tasksApiService;
     
        this.#tasksApiService.tasks.then((tasks) => {
            console.log(tasks);
        });
    }

    get tasks() {
        return this.#boardtasks;
    }

    async init() {
        try {
            const tasks = await this.#tasksApiService.tasks;
            this.#boardtasks = tasks;
        } catch(err) {
            this.#boardtasks = [];
        }
        this._notify(UpdateType.INIT);
    }     

    async updateTaskStatus(taskId, newStatus) {
        const task = this.#boardtasks.find(task => task.id === taskId);
        if (task) {
            const previousStatus = task.status;
            task.status = newStatus;
            try {
                const updatedTask = await this.#tasksApiService.updateTask(task);
                Object.assign(task, updatedTask);
                this._notify(UserAction.UPDATE_TASK, task);
            } catch (err) {
                console.error('Ошибка при обновлении статуса задачи на сервере:', err);
                task.status = previousStatus;
                throw err;
            }
        }
    }

    getTasksByStatus(status) {
        return this.#boardtasks.filter(task => task.status === status);
    }

    async addTask(title) {
        const newTask = {
            title,
            status: Status.BACKLOG,
            id: generateID(this.#boardtasks),
        };
        try {
            const createdTask = await this.#tasksApiService.addTask(newTask);
            this.#boardtasks.push(createdTask);
            this._notify(UserAction.ADD_TASK, createdTask);
            return createdTask;
        } catch (err) {
            console.error('Ошибка при добавлении задачи на сервер:', err);
            throw err;
        }
    }

    deleteTask(taskId) {
        this.#boardtasks = this.#boardtasks.filter(task => task.id !== taskId);
        this._notify(UserAction.DELETE_TASK, { id: taskId });
    }

    async clearBasketTasks() {
        const basketTasks = this.#boardtasks.filter(task => task.status === Status.TRASH);
        try {
            await Promise.all(basketTasks.map(task => this.#tasksApiService.deleteTask(task.id)));
            this.#boardtasks = this.#boardtasks.filter(task => task.status !== Status.TRASH);
            this._notify(UserAction.DELETE_TASK, { status: Status.TRASH });
        } catch (err) {
            console.error('Ошибка при удалении задач из корзины на сервере:', err);
            throw err;
        }
    }

    hasBasketTasks() {
        return this.#boardtasks.some(task => task.status === Status.TRASH);
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
        this._notify(UserAction.UPDATE_TASK, task);
    }
}