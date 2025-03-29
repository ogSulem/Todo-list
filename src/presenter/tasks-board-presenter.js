import TaskBoardComponent from "../view/task-board-component.js";
import TaskListComponent from "../view/task-list-component.js";
import TaskComponent from "../view/task-component.js";
import H3Component from "../view/h3-component.js";
import { Status, StatusLabel } from "../const.js";
import { render, RenderPosition } from '../framework/render.js';
import DeleteButtonComponent from "../view/button-delete-component.js";
import TasksModel from "../model/tasks-model.js";

export default class TaskBoardPresenter {
    #boardContainer = null;

    #tasksModel = new TasksModel();
    #tasksBoardComponent = new TaskBoardComponent();

    #boardTasks = [];

    constructor({ boardContainer }) {
        this.#boardContainer = boardContainer;
    }

    init() {
        this.#boardTasks = [...this.#tasksModel.getTasks()];

        render(this.#tasksBoardComponent, this.#boardContainer, RenderPosition.BEFOREEND);

        Object.values(Status).forEach(status => {
            const tasksListComponent = new TaskListComponent(status);
            render(tasksListComponent, this.#tasksBoardComponent.getElement(), RenderPosition.BEFOREEND);
            render(new H3Component(StatusLabel[status]), tasksListComponent.getElement(), RenderPosition.AFTERBEGIN);

            const tasksListElement = tasksListComponent.getElement().querySelector('ul');
            const filteredTasks = this.#boardTasks.filter(task => task.status === status);
            filteredTasks.forEach(task => {
                render(new TaskComponent(task.title), tasksListElement, RenderPosition.BEFOREEND);
            });
            if (status == 'trash') render(new DeleteButtonComponent(), tasksListComponent.getElement(), RenderPosition.BEFOREEND);
        });
    }
}
