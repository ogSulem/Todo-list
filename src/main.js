import HeaderComponent from './view/header-component.js';
import AddTaskFormComponent from './view/add-task-form-component.js';
import TaskBoardComponent from './view/task-board-component.js';
import TaskListComponent from './view/task-list-component.js';
import TaskComponent from './view/task-component.js';
import { render, RenderPosition } from './framework/render.js';

const bodyContainer = document.querySelector('.board-app');

const initialTasks = {
    backlog: [
        'Изучить JavaScript',
        'Создать ToDo приложение',
    ],
    progress: [
        'Оптимизировать код',
    ],
    done: [
        'Добавить новые функции',
    ],
    trash: []
};

render(new HeaderComponent(), bodyContainer, RenderPosition.BEFOREBEGIN);
render(new AddTaskFormComponent(), bodyContainer, RenderPosition.AFTERBEGIN);

const taskBoardComponent = new TaskBoardComponent();
render(taskBoardComponent, bodyContainer, RenderPosition.BEFOREEND);

for (const [section, tasks] of Object.entries(initialTasks)) {
    const taskListElement = taskBoardComponent.getElement().querySelector(`.${section}`);
    const taskListComponent = new TaskListComponent();
    render(taskListComponent, taskListElement, RenderPosition.BEFOREEND);

    tasks.forEach((task) => {
        const taskComponent = new TaskComponent(task);
        render(taskComponent, taskListComponent.getElement(), RenderPosition.BEFOREEND);
    });
}