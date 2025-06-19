import TaskBoardComponent from "../view/task-board-component.js";
import TaskListComponent from "../view/task-list-component.js";
import TaskComponent from "../view/task-component.js";
import EmptyListComponent from "../view/empty-list-component.js";
import H3Component from "../view/h3-component.js";
import LoadingViewComponent from "../view/loading-view-component.js";
import { Status, StatusLabel, UserAction } from "../const.js";
import { render, RenderPosition } from '../framework/render.js';
import DeleteButtonComponent from "../view/button-delete-component.js";

export default class TaskBoardPresenter {
    #boardContainer = null;
    #tasksModel = null;
    #tasksBoardComponent = null;
    #isLoading = true;
    #loadingComponent = new LoadingViewComponent();

    constructor({ boardContainer, tasksModel }) {
        this.#boardContainer = boardContainer;
        this.#tasksModel = tasksModel;
        this.#tasksModel.addObserver(this.#handleModelEvent.bind(this));
        this.#tasksBoardComponent = new TaskBoardComponent();
    }

    get tasks() {
        return this.#tasksModel.tasks;
    }

    async init() {
        render(this.#tasksBoardComponent, this.#boardContainer, RenderPosition.BEFOREEND);
        
        if (this.#isLoading) {
            render(this.#loadingComponent, this.#tasksBoardComponent.element, RenderPosition.BEFOREEND);
        }

        await this.#tasksModel.init();
        this.#isLoading = false;
        this.#clearBoard();
        this.#renderBoard();
    }

    #renderBoard() {
        render(this.#tasksBoardComponent, this.#boardContainer, RenderPosition.BEFOREEND);
        this.#renderAllTaskLists();
    }

    #clearBoard() {
        this.#tasksBoardComponent.element.innerHTML = '';
    }

    #renderAllTaskLists() {
        Object.values(Status).forEach(status => {
            if (status === Status.TRASH) {
                this.#renderTrashList();
            } else {
                this.#renderTasksList(status);
            }
        });
    }

    #renderTasksList(status) {
        const tasksListComponent = new TaskListComponent(status, this.#handleTaskDrop.bind(this));
        render(tasksListComponent, this.#tasksBoardComponent.element, RenderPosition.BEFOREEND);

        this.#renderListHeader(status, tasksListComponent.element);

        const tasks = this.#tasksModel.getTasksByStatus(status);
        if (tasks.length > 0) {
            this.#renderTasks(tasks, tasksListComponent.element);
        } else {
            this.#renderEmptyList(tasksListComponent.element, status);
        }
    }

    #renderTrashList() {
        const status = Status.TRASH;
        const tasksListComponent = new TaskListComponent(status, this.#handleTaskDrop.bind(this));
        render(tasksListComponent, this.#tasksBoardComponent.element, RenderPosition.BEFOREEND);

        this.#renderListHeader(status, tasksListComponent.element);

        const tasks = this.#tasksModel.getTasksByStatus(status);
        if (tasks.length > 0) {
            this.#renderTasks(tasks, tasksListComponent.element);
            this.#renderDeleteButton(tasksListComponent.element);
        } else {
            this.#renderEmptyList(tasksListComponent.element, status);
        }
    }

    #renderListHeader(status, container) {
        render(
            new H3Component(StatusLabel[status]),
            container,
            RenderPosition.AFTERBEGIN
        );
    }

    #renderTasks(tasks, container) {
        const tasksListElement = container.querySelector('ul');
        tasks.forEach(task => {
            this.#renderTask(task, tasksListElement);
        });
    }

    #renderTask(task, container) {
        render(
            new TaskComponent(task),
            container,
            RenderPosition.BEFOREEND
        );
    }

    #renderEmptyList(container, status) {
        render(
            new EmptyListComponent(status),
            container.querySelector('ul'),
            RenderPosition.BEFOREEND
        );
    }

    #renderDeleteButton(container) {
        render(
            new DeleteButtonComponent({
                onClick: () => this.#handleClearBasketClick()
            }),
            container,
            RenderPosition.BEFOREEND
        );
    }

    #clearTrash() {
        this.#tasksModel.clearTrash();
    }

    async createTask() {
        const taskTitle = document.querySelector('#add-task').value.trim();
        if (!taskTitle) {
            return;
        }
        try {
            await this.#tasksModel.addTask(taskTitle);
            document.querySelector('#add-task').value = '';
        } catch (err) {
            console.error("Ошибка при создании задачи:", err);
        }
    }

    #handleModelEvent(event, payload) {
        switch (event) {
            case UserAction.ADD_TASK:
            case UserAction.UPDATE_TASK:
            case UserAction.DELETE_TASK:
                this.#clearBoard();
                this.#renderBoard();
                break;
        }
    }

    async #handleTaskDrop(taskId, newStatus, afterId) {
        try {
            await this.#tasksModel.moveTask(taskId, newStatus, afterId);
        } catch (err) {
            console.error('Ошибка при обновлении статуса задачи:', err);
        }
    }

    async #handleClearBasketClick() {
        try {
            await this.#tasksModel.clearBasketTasks();
        } catch (err) {
            console.error('Ошибка при очистке корзины:', err);
        }
    }
}